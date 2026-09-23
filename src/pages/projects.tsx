import { useState, useEffect } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import {
  LuExternalLink,
  LuChevronRight,
  LuFolderGit2,
  LuGitFork,
} from 'react-icons/lu';

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

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  owner: {
    login: string;
  };
  topics?: string[];
  originalOwner?: string;
}

function useProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    fetch(`${basePath}projects.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      })
      .catch(err => {
        console.error('Failed to load projects.json:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { repos, loading };
}

interface ProjectCardProps {
  repo: Repo;
  index: number;
}

function ProjectCard({ repo, index }: ProjectCardProps) {
  const accentColor = COLOURS[index % COLOURS.length];

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="repo-card-header">
        <div className="repo-card-icon">
          {repo.fork ? <LuGitFork /> : <LuFolderGit2 />}
        </div>
        <h3 className="repo-card-name" title={repo.name}>
          {repo.name}
        </h3>
      </div>

      <div className="repo-card-body">
        {repo.description ? (
          <p className="repo-desc">{repo.description}</p>
        ) : (
          <p className="repo-desc repo-desc-empty" />
        )}
      </div>

      <div className="repo-card-bottom-group">
        <div className="repo-topics">
          {repo.topics && repo.topics.length > 0 ? (
            repo.topics.map(topic => (
              <span key={topic} className="repo-topic-pill">
                {topic}
              </span>
            ))
          ) : null}
        </div>

        <div className="repo-card-footer">
          <div className="repo-card-footer-left">
            <AiOutlineGithub className="footer-gh-icon" />
            <span>View on GitHub</span>
            <LuExternalLink className="footer-ext-icon" />
          </div>
          <LuChevronRight className="footer-chevron" />
        </div>
      </div>
    </a>
  );
}

export function Project() {
  const { repos, loading } = useProjects();

  return (
    <main className="projects-page-main">
      {loading && repos.length === 0 ? (
        <p className="muted">Loading projects...</p>
      ) : (
        <div className="repos-container">
          {repos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      )}
    </main>
  );
}




