import { promises as fs } from 'node:fs';
import path from 'node:path';

interface GitHubApiRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  topics?: string[];
  owner: {
    login: string;
  };
}

interface GitHubRepoDetail {
  parent?: {
    owner?: {
      login?: string;
    };
  };
}

export interface ProjectItem {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  owner: {
    login: string;
  };
  topics: string[];
  originalOwner?: string;
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'TiagoJMSantos';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT_DIR = path.resolve(process.cwd(), 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'projects.json');

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'tigas-site-fetcher',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  return headers;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fetchForkOwner(repoName: string): Promise<string | undefined> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`;
    const response = await fetch(url, { headers: getHeaders() });
    if (!response.ok) {
      console.warn(`[fetch-projects] Warning: Failed to fetch fork details for ${repoName} (${response.status} ${response.statusText})`);
      return undefined;
    }
    const data = (await response.json()) as GitHubRepoDetail;
    return data.parent?.owner?.login;
  } catch (error) {
    console.warn(`[fetch-projects] Warning: Error fetching fork details for ${repoName}:`, error);
    return undefined;
  }
}

async function main(): Promise<void> {
  console.log(`[fetch-projects] Starting repository sync for user: "${GITHUB_USERNAME}"...`);
  if (GITHUB_TOKEN) {
    console.log('[fetch-projects] GitHub Token detected, authenticated requests will be used.');
  } else {
    console.log('[fetch-projects] No GitHub Token provided. Requests will be unauthenticated (subject to standard rate limit).');
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

  try {
    const response = await fetch(reposUrl, { headers: getHeaders() });

    if (!response.ok) {
      const remainingRateLimit = response.headers.get('x-ratelimit-remaining');
      const resetTime = response.headers.get('x-ratelimit-reset');
      const isRateLimited = response.status === 403 || response.status === 429;

      console.warn(
        `[fetch-projects] API request failed with status: ${response.status} (${response.statusText}).` +
          (remainingRateLimit !== null ? ` Rate limit remaining: ${remainingRateLimit}.` : '') +
          (resetTime ? ` Reset time: ${new Date(Number(resetTime) * 1000).toISOString()}.` : '')
      );

      if (isRateLimited) {
        console.warn('[fetch-projects] GitHub API rate limit reached.');
      }

      // Check if existing file is available as fallback
      if (await fileExists(OUTPUT_FILE)) {
        console.log(`[fetch-projects] Fallback: Existing "${OUTPUT_FILE}" will be preserved.`);
        return;
      }

      // If no file exists, write empty array so build doesn't crash
      console.warn(`[fetch-projects] Fallback: No existing projects file found. Creating empty array in "${OUTPUT_FILE}".`);
      await fs.writeFile(OUTPUT_FILE, JSON.stringify([], null, 2), 'utf-8');
      return;
    }

    const rawRepos = (await response.json()) as unknown;
    if (!Array.isArray(rawRepos)) {
      throw new Error(`Expected array from GitHub API, received: ${typeof rawRepos}`);
    }

    const repos = rawRepos as GitHubApiRepo[];
    console.log(`[fetch-projects] Retrieved ${repos.length} repositories from GitHub.`);

    const projects: ProjectItem[] = [];

    for (const repo of repos) {
      let originalOwner: string | undefined = undefined;

      if (repo.fork) {
        console.log(`[fetch-projects] Resolving fork parent for ${repo.name}...`);
        originalOwner = await fetchForkOwner(repo.name);
      }

      projects.push({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        fork: repo.fork,
        owner: {
          login: repo.owner.login,
        },
        topics: Array.isArray(repo.topics) ? repo.topics : [],
        originalOwner: originalOwner || (repo.fork ? repo.owner.login : undefined),
      });
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    console.log(`[fetch-projects] Successfully saved ${projects.length} projects to "${OUTPUT_FILE}".`);
  } catch (error) {
    console.error('[fetch-projects] Unexpected error during sync:', error);

    if (await fileExists(OUTPUT_FILE)) {
      console.log(`[fetch-projects] Preserving existing "${OUTPUT_FILE}".`);
    } else {
      console.warn(`[fetch-projects] Writing empty array to "${OUTPUT_FILE}" to prevent build failure.`);
      await fs.writeFile(OUTPUT_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  }
}

main();
