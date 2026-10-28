import cvPdf from './assets/Tiago_Santos_SWE_Intern_Resume.pdf';

/**
 * =========================================================================
 * SITE CONFIGURATION
 * =========================================================================
 * Edit this file to customize the site with your own personal info, links,
 * terminal commands, projects, and skills.
 */

export interface AboutCard {
  id: string;
  icon: 'education' | 'focus' | 'learning' | 'default';
  title: string;
  date?: string;
  desc: string;
  subdesc?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface FeaturedProject {
  title: string;
  status: string;
  description: string;
  githubUrl: string;
  buttonText: string;
  technologies: string[];
}

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
  };
  personal: {
    name: string;
    nickname: string;
    tagline: string;
    bioParagraph1: string;
    bioParagraph2: string;
    cv: {
      file: string;
      downloadName: string;
      buttonText: string;
    };
  };
  socials: {
    github: string;
    githubUsername: string; // Used for GitHub API requests on /projects
    linkedin: string;
    email: string;
  };
  terminal: {
    user: string;
    host: string;
    prompt: string; // e.g. tigas@student:~$
    commands: {
      whoami: string;
      skillsSummary: string[];
      status: string;
    };
  };
  about: {
    tag: string;
    heading: string;
    paragraphs: string[];
    cards: AboutCard[];
  };
  featuredProject: {
    tag: string;
    project: FeaturedProject;
  };
  skills: SkillCategory[];
  projectsPage: {
    tagline: string;
  };
}

export const siteConfig: SiteConfig = {
  meta: {
    title: "Portfolio do Tigas",
    description: "Personal portfolio and showcase of projects & engineering skills."
  },

  personal: {
    name: "Tiago Santos",
    nickname: "Tigas",
    tagline: "Computer Science & Engineering Student",
    bioParagraph1:
    "Second-year Computer Science & Engineering student at Instituto Superior Técnico. I co-founded Yoda Things in June 2024, where I develop and maintain Lua scripts for multiplayer game servers, with MySQL-backed persistence. My work involves implementing server-side features, managing game state, and keeping scripts reliable as the project evolves. I also contributed to the Saga server, which supported up to 100 concurrent players.",
    bioParagraph2:
    "Alongside this, I work on university projects involving C/POSIX, Java, databases, and software architecture. I enjoy building software that is practical, maintainable, and able to handle real requirements, and I am currently looking to grow as a software engineer through challenging projects and experienced teams.",
    cv: {
      file: cvPdf,
      downloadName: "Tiago_Santos_SWE_Intern_Resume.pdf",
      buttonText: "Download CV"
    }
  },

  socials: {
    github: "https://www.github.com/TiagoJMSantos",
    githubUsername: "TiagoJMSantos",
    linkedin: "https://www.linkedin.com/in/tiago-santos-513816398/",
    email: "tjmsantos07@gmail.com"
  },

  terminal: {
    user: "tigas",
    host: "student",
    prompt: "tigas@student:~$",
    commands: {
      whoami: "Tiago Santos",
      skillsSummary: [
        "Learning",
        "Building",
        "Exploring",
        "Improving"
      ],
      status: "Student • Open to opportunities"
    }
  },

  about: {
    tag: "ABOUT ME",
    heading: "Interested in building reliable software. Making it better.",
    paragraphs: [
      "I enjoy understanding how software works in practice and turning requirements into working, maintainable code. My experience so far is mainly in backend development, server-side scripting, databases, and systems-oriented university projects.",
    "Outside university, I co-founded Yoda Things, where I develop Lua scripts for multiplayer game servers and work with MySQL-backed data. At university, I have also worked on projects involving C/POSIX, Java, software architecture, and processor design."
  ],
    cards: [
      {
        id: "education",
        icon: "education",
        title: "Education",
        date: "2025 — Expected 2028",
        desc: "BSc in Computer Science & Engineering",
        subdesc: "Instituto Superior Técnico - Taguspark"
      },
      {
        id: "focus",
        icon: "focus",
        title: "Focus & Goal",
        desc: "Grow as a software engineer, particularly in backend development, databases, and reliable software."
      },
      {
        id: "learning",
        icon: "learning",
        title: "Currently Learning",
        desc: "Operating Systems • Object-Oriented Programming • Rust"
      }
    ]
  },

  featuredProject: {
    tag: "Currently building / Skills",
    project: {
      title: "Diana by Andromda",
      status: "In Development",
      description: "An open-source, zero-knowledge meal planner, food storage database, built with three teammates.",
      githubUrl: "https://github.com/AndromdaLabs/Diana",
      buttonText: "View on GitHub",
      technologies: ["TypeScript", "Rust", "SQLite", "Docker"]
    }
  },

  skills: [
    {
      id: "languages",
      title: "Languages",
      skills: ["C", "Lua", "TypeScript", "JavaScript", "Python", "Assembly"]
    },
    {
      id: "backend",
      title: "Backend & Databases",
      skills: ["MySQL"]
    },
    {
      id: "tools",
      title: "Tools & Frameworks",
      skills: ["Git", "Docker", "Linux", "React", "Vite", "Valgrind"]
    },
    {
      id: "learning",
      title: "Currently Learning",
      skills: ["Operating Systems", "Object-Oriented Programming", "Rust"]
    }
  ],

  projectsPage: {
    tagline: "IN PROGRESS"
  }
};

export default siteConfig;