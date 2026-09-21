import { useState, useEffect } from 'react';

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

interface RepoCardProps {
  repo: Repo;
  index: number;
}

interface ForkedCardProps {
  repo: Repo;
  index: number;
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
      <div className="repo-card-top">
        <h3>{repo.owner.login}/{repo.name}</h3>
        {repo.description && <p className="repo-desc">{repo.description}</p>}
      </div>
      {repo.topics && repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.map(topic => (
            <span key={topic} className="repo-topic-pill">
              #{topic}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

function ForkedRepoCard({ repo, index }: ForkedCardProps) {
  const accentColor = COLOURS[index % COLOURS.length];
  const owner = repo.originalOwner || repo.owner.login;
  return (
    <a 
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card card-fork" 
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="repo-card-top">
        <h3>{owner}/{repo.name}</h3>
        {repo.description && <p className="repo-desc">{repo.description}</p>}
      </div>
      {repo.topics && repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.map(topic => (
            <span key={topic} className="repo-topic-pill">
              #{topic}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

export function Project() {
  const { repos, loading } = useProjects();
  return (
    <main>
      {loading && repos.length === 0 ? (
        <p className="muted">Loading projects...</p>
      ) : (
        <div className="repos-container">
          {repos.map((repo, index) =>
            repo.fork ? (
              <ForkedRepoCard 
                key={repo.id} 
                repo={repo} 
                index={index} 
              />
            ) : (
              <RepoCard key={repo.id} repo={repo} index={index} />
            )
          )}
        </div>
      )}
    </main>
  );
}
