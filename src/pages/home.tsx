import { useState, useRef } from "react";
import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail, AiOutlineDownload, AiOutlineCheck } from "react-icons/ai";
import { 
  LuGraduationCap, 
  LuCodeXml, 
  LuLeaf, 
  LuDatabase, 
  LuWrench, 
  LuSparkles
} from "react-icons/lu";
import siteConfig from "../config";
import { featuredProjects } from "../data/featuredProjects";
import type { FeaturedProjectItem } from "../data/featuredProjects";
import { FeaturedProjectCard, ProjectModal } from "../components";

export function Home() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FeaturedProjectItem | null>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const lastActiveTrigger = useRef<HTMLElement | null>(null);

  const { 
    personal, 
    socials, 
    terminal, 
    about, 
    skills 
  } = siteConfig;

  const handleCopyEmail = async () => {
    if (!socials.email) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(socials.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = socials.email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleSelectProject = (project: FeaturedProjectItem) => {
    lastActiveTrigger.current = triggerRefs.current[project.id] || null;
    setSelectedProject(project);
  };

  const renderAboutIcon = (iconType: string) => {
    switch (iconType) {
      case 'education':
        return <LuGraduationCap />;
      case 'focus':
        return <LuCodeXml />;
      case 'learning':
        return <LuLeaf />;
      default:
        return <LuCodeXml />;
    }
  };

  const renderSkillCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <LuCodeXml />;
      case 1:
        return <LuDatabase />;
      case 2:
        return <LuWrench />;
      case 3:
        return <LuSparkles />;
      default:
        return <LuCodeXml />;
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section id="home-section">
        <div className="home-text-container">
          <div className="home-tag">{personal.tagline}</div>
          <div className="home-name">
            Hey, I'm <span className="home-accent-text">{personal.nickname}.</span>
          </div>
          <p>{personal.bioParagraph1}</p>
          <p className="muted">{personal.bioParagraph2}</p>
          <div className="home-socials-container">
            {socials.linkedin && (
              <a 
                className="home-button" 
                href={socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <AiFillLinkedin />
              </a>
            )}
            {socials.github && (
              <a 
                className="home-button" 
                href={socials.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <AiOutlineGithub />
              </a>
            )}
            {socials.email && (
              <button 
                type="button"
                className={`home-button email-copy-button ${copiedEmail ? "copied" : ""}`} 
                onClick={handleCopyEmail}
              >
                {copiedEmail ? <AiOutlineCheck className="copied-icon" /> : <AiOutlineMail />}
                {copiedEmail && <span className="copy-tooltip">Copied!</span>}
              </button>
            )}
            {personal.cv?.file && (
              <a 
                className="home-cv-download" 
                href={personal.cv.file} 
                download={personal.cv.downloadName}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineDownload className="home-cv-icon" /> {personal.cv.buttonText}
              </a>
            )}
          </div>
        </div>
        <div className="home-terminal-container">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot close"></span>
              <span className="terminal-dot minimize"></span>
              <span className="terminal-dot maximize"></span>
            </div>
            <div className="terminal-title">{terminal.prompt.replace(':~$', ':~')}</div>
          </div>
          <div className="terminal-content">
            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">{terminal.prompt}</span>
                <span className="terminal-command">whoami</span>
              </div>
              <div className="terminal-output">{terminal.commands.whoami}</div>
            </div>

            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">{terminal.prompt}</span>
                <span className="terminal-command">skills --summary</span>
              </div>
              <div className="terminal-output terminal-list">
                {terminal.commands.skillsSummary.map((item, index) => (
                  <div key={index}>- {item}</div>
                ))}
              </div>
            </div>

            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">{terminal.prompt}</span>
                <span className="terminal-command">status</span>
              </div>
              <div className="terminal-output">
                {terminal.commands.status}
              </div>
            </div>

            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">{terminal.prompt}</span>
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section">
        <div className="about-text-container">
          <div className="about-tag">
            <span className="section-dash">—</span> {about.tag}
          </div>
          <h2 className="about-heading">
            {about.heading}
          </h2>
          {about.paragraphs.map((p, idx) => (
            <p key={idx} className={idx > 0 ? "muted" : ""}>
              {p}
            </p>
          ))}
        </div>

        <div className="about-cards-container">
          {about.cards.map((card) => (
            <div key={card.id} className="about-card">
              <div className="about-card-icon">
                {renderAboutIcon(card.icon)}
              </div>
              <div className="about-card-content">
                <div className="about-card-header">
                  <span className="about-card-title">{card.title}</span>
                  {card.date && <span className="about-card-date">{card.date}</span>}
                </div>
                <div className="about-card-desc">
                  {card.desc}
                  {card.subdesc && (
                    <span className="about-card-subdesc">{card.subdesc}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects-section" aria-labelledby="featured-projects-title">
        <div className="section-header-group">
          <div className="project-tag">
            <span className="section-dash">—</span> FEATURED PROJECTS
          </div>
          <h2 id="featured-projects-title" className="section-main-heading">
            Featured Projects
          </h2>
          <p className="section-main-subtitle">
            Selected engineering projects exploring systems, software architecture and practical problem-solving.
          </p>
        </div>

        <div className="featured-projects-grid">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              ref={(el) => { triggerRefs.current[project.id] = el; }}
              className="featured-card-wrapper"
            >
              <FeaturedProjectCard
                project={project}
                onSelect={handleSelectProject}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills-section" aria-labelledby="skills-section-title">
        <div className="section-header-group">
          <div className="project-tag">
            <span className="section-dash">—</span> TECHNICAL SKILLS
          </div>
          <h2 id="skills-section-title" className="section-main-heading">
            Core Technologies & Tooling
          </h2>
          <p className="section-main-subtitle">
            Languages, database engines, systems tools and architectural domains actively applied across projects.
          </p>
        </div>

        <div className="skills-grid-container">
          {skills.map((cat, idx) => (
            <div key={cat.id} className="skills-container" id={`skill-${cat.id}`}>
              <div className="skills-card">
                <div className="skills-logo">
                  {renderSkillCategoryIcon(idx)}
                </div>
                <div className="skills-info">
                  <div className="skills-title">
                    {cat.title}
                  </div>
                  <div className="skills-tags-list">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        triggerRef={lastActiveTrigger}
      />
    </main>
  );
}
