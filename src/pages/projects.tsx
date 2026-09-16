import { useState, useEffect } from 'react';
import siteConfig from '../config';

const COLOURS = [
  '#3b82f6', 
  '#10b981', 
  '#8b5cf6', 
  '#f97316', 
  '#ec4899', 
  '#06b6d4', 
  '#eab308', 
  '#ef4444', 
  '#6366f1',
  '#a855f7', 
  '#0ea5e9', 
  '#14b8a6', 
  '#f43f5e', 
  '#84cc16', 
  '#2563eb', 
  '#d946ef', 
];

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  fork: boolean;
  owner: {
    login: string;
  };
}

interface RepoCardProps {
  repo: Repo;
  index: number;
}

interface ForkedCardProps {
  repo: Repo;
  index: number;
  githubUsername: string;
}

function useCollectRepos(username: string) {
  const [repos, setRepos] = useState<Repo[]>(() => {
    const cachedRepos = sessionStorage.getItem(`repos_${username}`);
    return cachedRepos ? JSON.parse(cachedRepos) : [];
  });

  useEffect(() => {
    if (!username || repos.length > 0) return;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          sessionStorage.setItem(`repos_${username}`, JSON.stringify(data));
          setRepos(data);
        }
      })
      .catch(err => {
        console.error("Failed to fetch GitHub repos:", err);
      });
  }, [repos.length, username]);

  return repos;
}

function RepoCard({ repo, index }: RepoCardProps) {
  const accentColor = COLOURS[index % COLOURS.length];
  return (
    <a 
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card" 
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <h3>{repo.owner.login}/{repo.name}</h3>
      {repo.description && <p className="repo-desc">{repo.description}</p>}
    </a>
  );
}

function ForkedRepoCard({ repo, index, githubUsername }: ForkedCardProps) {
  const cacheKey = `fork_owner_${repo.name}`;
  const [originalOwner, setOriginalOwner] = useState<string | null>(() => {
    return sessionStorage.getItem(cacheKey);
  });
  const accentColor = COLOURS[index % COLOURS.length];

  useEffect(() => {
    if (originalOwner || !githubUsername) return;
    fetch(`https://api.github.com/repos/${githubUsername}/${repo.name}`)
      .then(res => res.json())
      .then(data => {
        const ownerLogin = data.parent?.owner?.login;
        if (ownerLogin) {
          sessionStorage.setItem(cacheKey, ownerLogin);
          setOriginalOwner(ownerLogin);
        }
      })
      .catch(err => {
        console.error("Failed to fetch forked repo info:", err);
      });
  }, [repo.name, originalOwner, cacheKey, githubUsername]);

  return (
    <a 
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card card-fork" 
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <h3>{originalOwner || repo.owner.login}/{repo.name}</h3>
      {repo.description && <p className="repo-desc">{repo.description}</p>}
    </a>
  );
}

export function Project() {
  const githubUsername = siteConfig.socials.githubUsername;
  const repos = useCollectRepos(githubUsername);

  return (
    <main>
      <p>{siteConfig.projectsPage.tagline}</p>
      <div className="repos-container">
        {repos.map((repo, index) =>
          repo.fork ? (
            <ForkedRepoCard 
              key={repo.id} 
              repo={repo} 
              index={index} 
              githubUsername={githubUsername}
            />
          ) : (
            <RepoCard key={repo.id} repo={repo} index={index} />
          )
        )}
      </div>
    </main>
  );
}