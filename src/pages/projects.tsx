import { useState, useEffect } from 'react';
//import { useTranslation } from 'react-i18next';

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
  }
}
interface RepoCardProps {
  repo: Repo;
  index: number;
}

interface ForkedCardProps {
  repo: Repo;
  index: number;
}

export function Project() {
  //const {t} = useTranslation();
  const repos = useCollectRepos();
  return (
    <main>
      <div className="repos-container">
        {repos.map((repo, index) =>
          repo.fork ? (
            <ForkedRepoCard key={repo.id} repo={repo} index={index}/>
          ) : (
            <RepoCard key={repo.id} repo={repo} index={index} />
          )
        )}
      </div>
    </main>
  );
}

function useCollectRepos() {
  const [repos, setRepos] = useState<Repo[]>(() => {
    const cachedRepos = sessionStorage.getItem('repos_t');
    return cachedRepos ? JSON.parse(cachedRepos) : [];
  });
  useEffect(() => {
    if (repos.length > 0) return;
    fetch('https://api.github.com/users/TiagoJMSantos/repos')
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem('repos_t', JSON.stringify(data));
        setRepos(data);
      });
  }, [repos.length]);
  return repos;
}

function RepoCard({ repo, index }: RepoCardProps) {
  const accentColor = COLOURS[index % COLOURS.length];
  return (
    <div className="repo-card" style={{ '--accent-color': accentColor } as React.CSSProperties}>
      <h3>{repo.owner.login}/{repo.name}</h3>
    </div>
  );
}

function ForkedRepoCard({ repo, index }: ForkedCardProps,) {
  const cacheKey = `fork_owner_${repo.name}`;
  const [originalOwner, setOriginalOwner] = useState<string | null>(() => {
    return sessionStorage.getItem(cacheKey);
  });
  const accentColor = COLOURS[index % COLOURS.length];
  useEffect(() => {
    if (originalOwner) return;
    fetch(`https://api.github.com/repos/TiagoJMSantos/${repo.name}`)
      .then(res => res.json())
      .then(data => {
        const ownerLogin = data.parent?.owner?.login;
        if (ownerLogin) {
          sessionStorage.setItem(cacheKey, ownerLogin);
          setOriginalOwner(ownerLogin);
        }
      });
  }, [repo.name, originalOwner, cacheKey]);
  return (
    <div 
      className="repo-card card-fork" 
      style={{ '--accent-color': accentColor } as React.CSSProperties}>
      <h3>{originalOwner}/{repo.name}</h3>
    </div>
  );
}
