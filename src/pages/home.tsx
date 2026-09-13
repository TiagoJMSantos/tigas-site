import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail, AiOutlineDownload } from "react-icons/ai";

export function Home() {
  return (
    <main>
      <section id="home-section">
        <div className="home-text-container">
          <div className="home-tag">// Computer Science & Engineering Student</div>
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
              href="" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <AiOutlineDownload style={{ fontSize: "1.4vw" }} /> Download CV
            </a>
          </div>
        </div>
        <div className="home-terminal-container">

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