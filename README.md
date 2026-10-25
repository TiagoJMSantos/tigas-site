# Tiago Santos — Personal Website

Personal portfolio website showcasing my projects, experience, and background as a Computer Science and Engineering student.

**Live site:** https://tiagojmsantos.github.io/tigas-site/

## Running Locally

```bash
git clone https://github.com/TiagoJMSantos/tigas-site.git
cd tigas-site
npm install
```

### Environment Variables Setup

Before syncing projects or starting the development server, set up your environment variables:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set your GitHub username:
   ```env
   GITHUB_USERNAME=TiagoJMSantos
   # Optional: add a GitHub Personal Access Token for higher API rate limits
   GITHUB_TOKEN=
   ```

### Syncing GitHub Projects

To fetch the latest public repositories from your GitHub account:

```bash
npm run fetch-projects
```

### Start Dev Server

```bash
npm run dev
```

The site will be available at the local URL shown in the terminal.

## Technologies

* React 19
* TypeScript
* Vite
