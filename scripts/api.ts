export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  fork: boolean;
  owner: {
    login: string;
  };
}

export interface RepoCardProps {
  repo: Repo;
  index: number;
}

export interface ForkedCardProps {
  repo: Repo;
  index: number;
  githubUsername: string;
}
