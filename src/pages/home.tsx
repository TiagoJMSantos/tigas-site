import { useState } from "react";
import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail, AiOutlineDownload, AiOutlineCheck } from "react-icons/ai";
import { 
  LuGraduationCap, 
  LuCodeXml, 
  LuLeaf, 
  LuDatabase, 
  LuWrench, 
  LuSparkles, 
  LuExternalLink, 
  LuFolderGit2 
} from "react-icons/lu";
import siteConfig from "../config";

export function Home() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { 
    personal, 
    socials, 
    terminal, 
    about, 
    featuredProject, 
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
                aria-label={copiedEmail ? "Email copiado!" : "Copiar email"}
                title={copiedEmail ? "Email copiado!" : "Copiar email"}
              >
                {copiedEmail ? <AiOutlineCheck className="copied-icon" /> : <AiOutlineMail />}
                {copiedEmail && <span className="copy-tooltip">Copiado!</span>}
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
                <AiOutlineDownload style={{ fontSize: "1.4vw" }} /> {personal.cv.buttonText}
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

      {/* Projects & Skills Section */}
      <section id="projects-section">
        <div className="project-tag">
          <span className="section-dash">—</span> {featuredProject.tag}
        </div>
        <div className="proj-bottom-container">
          {/* Left Column: Featured Project */}
          <div className="single-project-container">
            <div className="sproj-header">
              <div className="sproj-icon">
                <LuFolderGit2 />
              </div>
              <div className="sproj-title-indev">
                <h3>{featuredProject.project.title}</h3>
                <span className="sproj-status">{featuredProject.project.status}</span>
              </div>
            </div>

            <div className="sproj-description">
              <p>{featuredProject.project.description}</p>
            </div>

            {featuredProject.project.technologies && featuredProject.project.technologies.length > 0 && (
              <div className="sproj-tags">
                {featuredProject.project.technologies.map((tech, idx) => (
                  <span key={idx} className="sproj-tech-tag">{tech}</span>
                ))}
              </div>
            )}

            <div className="sproj-spacer" />

            <div className="sproj-buttons">
              <a 
                className="sproj-github-button"
                href={featuredProject.project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineGithub className="sproj-btn-icon" />
                {featuredProject.project.buttonText}
                <LuExternalLink className="sproj-btn-arrow" />
              </a>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="skills-cards-container">
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
        </div>
      </section>
    </main>
  );
}