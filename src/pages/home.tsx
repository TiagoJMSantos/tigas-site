import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail, AiOutlineDownload } from "react-icons/ai";
import { LuGraduationCap, LuCodeXml, LuLeaf } from "react-icons/lu";
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
        <div className="about-text-container">
          <div className="about-tag">
            <span className="section-dash">—</span> ABOUT ME
          </div>
          <h2 className="about-heading">
            Passionate about systems, <br />
            clean code & architecture.
          </h2>
          <p>
            I believe great software comes from curiosity, strong fundamentals, and an obsession with detail. I enjoy diving deep into how systems work under the hood — from low-level logic to modern cloud infrastructure.
          </p>
          <p className="muted">
            Always eager to tackle challenging problems, collaborate with driven teams, and turn complex ideas into robust, high-performance applications.
          </p>
        </div>

        <div className="about-cards-container">
          <div className="about-card">
            <div className="about-card-icon">
              <LuGraduationCap />
            </div>
            <div className="about-card-content">
              <div className="about-card-header">
                <span className="about-card-title">Education</span>
                <span className="about-card-date">2025 — Expected 2028</span>
              </div>
              <div className="about-card-desc">
                BSc in Computer Science & Engineering
                <span className="about-card-subdesc">Instituto Superior Técnico - Taguspark</span>
              </div>
            </div>
          </div>

          <div className="about-card">
            <div className="about-card-icon">
              <LuCodeXml />
            </div>
            <div className="about-card-content">
              <div className="about-card-header">
                <span className="about-card-title">Focus & Goal</span>
              </div>
              <div className="about-card-desc">
                Build reliable backend software, scale systems, and gain high-impact engineering experience.
              </div>
            </div>
          </div>

          <div className="about-card">
            <div className="about-card-icon">
              <LuLeaf />
            </div>
            <div className="about-card-content">
              <div className="about-card-header">
                <span className="about-card-title">Currently Learning</span>
              </div>
              <div className="about-card-desc">
                Backend Architecture • Databases • Distributed Systems
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="experience-section">
        <p>This is the home page</p>
      </section> */}
      <section id="projects-section">
        <p>This is the home page</p>
      </section>
      <section id="skills-section">
        <p>This is the home page</p>
      </section>
    </main>
  );
}