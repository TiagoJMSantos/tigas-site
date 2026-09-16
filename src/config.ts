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
    bioParagraph1: "Second-year Computer Science & Engineering student at Instituto Superior Técnico. I co-founded Yoda Things with a small team — we build and sell multiplayer game-server backends in Lua and MySQL, and most of what I actually know about systems came from keeping that running under real load.",
    bioParagraph2: "The other projects here — MiniTransformerGPT (a group university assignment, RISC-V assembly + a custom processor in Logisim) and a billing engine in C — were coursework, but the systems side of them is genuinely what I'm into, not just something I did because I had to.",
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
    heading: "Passionate about systems, clean code & architecture.",
    paragraphs: [
      "I like understanding how things work under the hood more than using them as a black box — that's what keeps me at Yoda Things past the point anyone required it, working through it with my co-founders.",
      "The university assignments on this site (MiniTransformerGPT, done in a group, and a billing engine in C) are here because I leaned into the systems side of them harder than the grade required — not because they were solo passion projects."
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
        desc: "Get better at backend and systems engineering, and find a team where I can learn from people more experienced than me."
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
      title: "CoreVault",
      status: "In Development",
      description: "An open-source, zero-knowledge password vault, built with two teammates. Your master password never leaves your device — all vault data is encrypted and decrypted locally before being synced to the cloud.",
      githubUrl: "https://github.com/Vault-Foundation/CoreVault",
      buttonText: "View on GitHub",
      technologies: ["TypeScript", "Rust", "PostgreSQL", "Docker"]
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
      skills: ["MySQL", "PostgreSQL"]
    },
    {
      id: "tools",
      title: "Tools & Frameworks",
      skills: ["Git", "Docker", "Linux", "React", "Vite"]
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