import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail, AiOutlineDownload } from "react-icons/ai";
import cvPdf from "../assets/Tiago_Santos_SWE_Intern_Resume.pdf";

export function Home() {
  return (
    <main>
      <section id="home-section">
        <div className="home-text-container">
          <div className="home-tag">Computer Science & Engineering Student</div>
          <div className="home-name">
            Hey, I'm <span className="home-accent-text">Tigas.</span>
          </div>
          <p>
            I'm a Computer Engineering student, passionate about building things with technology and solving real-world problems.
          </p>
          <p className="muted">
            Currently focused on learning backend development, exploring systems, databases and the technologies that power the web.
          </p>
          <div className="home-socials-container">
            <a 
              className="home-button" 
              href="https://www.linkedin.com/in/tiago-santos-513816398/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <AiFillLinkedin />
            </a>
            <a 
              className="home-button" 
              href="https://www.github.com/TiagoJMSantos" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <AiOutlineGithub />
            </a>
            <a 
              className="home-button" 
              href="mailto:tjmsantos07@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <AiOutlineMail />
            </a>
            <a 
              className="home-cv-download" 
              href={cvPdf} 
              download="Tiago_Santos_SWE_Intern_Resume.pdf"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <AiOutlineDownload style={{ fontSize: "1.4vw" }} /> Download CV
            </a>
          </div>
        </div>
        <div className="home-terminal-container">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot close"></span>
              <span className="terminal-dot minimize"></span>
              <span className="terminal-dot maximize"></span>
            </div>
            <div className="terminal-title">tigas@student:~</div>
          </div>
          <div className="terminal-content">
            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">tigas@student:~$</span>
                <span className="terminal-command">whoami</span>
              </div>
              <div className="terminal-output">tigas</div>
            </div>

            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">tigas@student:~$</span>
                <span className="terminal-command">skills --summary</span>
              </div>
              <div className="terminal-output terminal-list">
                <div>- Learning</div>
                <div>- Building</div>
                <div>- Exploring</div>
                <div>- Improving</div>
              </div>
            </div>

            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">tigas@student:~$</span>
                <span className="terminal-command">status</span>
              </div>
              <div className="terminal-output">
                Student <span className="terminal-separator">•</span> Open to opportunities
              </div>
            </div>

            <div className="terminal-block">
              <div className="terminal-line">
                <span className="terminal-prompt">tigas@student:~$</span>
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about-section">
        <p>This is the home page</p>
      </section>
      <section id="experience-section">
        <p>This is the home page</p>
      </section>
      <section id="projects-section">
        <p>This is the home page</p>
      </section>
      <section id="skills-section">
        <p>This is the home page</p>
      </section>
    </main>
  );
}