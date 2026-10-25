import React, { useEffect, useRef } from 'react';
import { 
  LuX, 
  LuGithub, 
  LuExternalLink, 
  LuLock, 
  LuMail, 
  LuCircleCheck, 
  LuClock, 
  LuCpu, 
  LuServer, 
  LuDatabase, 
  LuBoxes,
  LuLayers,
  LuCheckCheck,
  LuFileText,
  LuUserCheck
} from 'react-icons/lu';
import type { FeaturedProjectItem, ProjectStatus } from '../data/featuredProjects';

interface ProjectModalProps {
  project: FeaturedProjectItem | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ProjectModal({ project, onClose, triggerRef }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Manage body scroll locking and keyboard Escape listener
  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const triggerElement = triggerRef?.current;

    // Focus the close button on mount for accessibility
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // Return focus to triggering card when modal closes
      if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [project, onClose, triggerRef]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="featured-status-pill completed">
            <LuCircleCheck className="status-dot-icon" aria-hidden="true" />
            {status}
          </span>
        );
      case 'In Progress':
        return (
          <span className="featured-status-pill in-progress">
            <LuClock className="status-dot-icon" aria-hidden="true" />
            {status}
          </span>
        );
      case 'Design Phase / In Progress':
        return (
          <span className="featured-status-pill design-phase">
            <LuClock className="status-dot-icon" aria-hidden="true" />
            {status}
          </span>
        );
    }
  };

  const renderHeaderIcon = (type: FeaturedProjectItem['iconType']) => {
    switch (type) {
      case 'cloud':
        return <LuServer aria-hidden="true" />;
      case 'cpu':
        return <LuCpu aria-hidden="true" />;
      case 'database':
        return <LuDatabase aria-hidden="true" />;
      case 'boxes':
        return <LuBoxes aria-hidden="true" />;
      default:
        return <LuServer aria-hidden="true" />;
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div 
        ref={modalRef}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-overview"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="modal-header">
          <div className="modal-header-main">
            <div className="modal-header-icon" aria-hidden="true">
              {renderHeaderIcon(project.iconType)}
            </div>
            <div className="modal-title-wrap">
              <div className="modal-title-row">
                <h2 id="project-modal-title" className="modal-title">
                  {project.title}
                </h2>
                {renderStatusBadge(project.status)}
              </div>
              {project.academicContext && (
                <div className="modal-context-tag">
                  {project.academicContext}
                </div>
              )}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal (or press Escape)"
            title="Close (Esc)"
          >
            <LuX aria-hidden="true" />
          </button>
        </header>

        {/* Modal Body with internal scrolling */}
        <div className="modal-body">
          {/* Overview Section */}
          <section className="modal-section" aria-labelledby="section-overview">
            <h3 id="section-overview" className="modal-section-title">
              <LuFileText className="section-title-icon" aria-hidden="true" />
              Project Overview
            </h3>
            <div id="project-modal-overview" className="modal-overview-content">
              <p className="overview-statement">
                {project.overview.purpose}
              </p>
              <div className="problem-card">
                <span className="problem-label">The Problem & Scope</span>
                <p className="problem-text">{project.overview.problem}</p>
              </div>
            </div>
          </section>

          {/* Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <section className="modal-section" aria-labelledby="section-highlights">
              <h3 id="section-highlights" className="modal-section-title">
                <LuLayers className="section-title-icon" aria-hidden="true" />
                Technical Highlights & Implementation
              </h3>
              <ul className="modal-bullet-list">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="modal-bullet-item">
                    <span className="bullet-indicator" aria-hidden="true">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* My Contribution */}
          {project.contribution && (
            <section className="modal-section" aria-labelledby="section-contribution">
              <h3 id="section-contribution" className="modal-section-title">
                <LuUserCheck className="section-title-icon" aria-hidden="true" />
                My Contribution & Responsibilities
              </h3>
              <p className="contribution-summary">
                {project.contribution.summary}
              </p>
              {project.contribution.responsibilities && project.contribution.responsibilities.length > 0 && (
                <ul className="modal-bullet-list mt-small">
                  {project.contribution.responsibilities.map((resp, idx) => (
                    <li key={idx} className="modal-bullet-item">
                      <span className="bullet-indicator" aria-hidden="true">✓</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Architecture Section (Rendered only when available) */}
          {project.architecture && (
            <section className="modal-section" aria-labelledby="section-architecture">
              <h3 id="section-architecture" className="modal-section-title">
                <LuCpu className="section-title-icon" aria-hidden="true" />
                Architecture & Design Structure
              </h3>
              <p className="architecture-summary">
                {project.architecture.summary}
              </p>
              {project.architecture.highlights && project.architecture.highlights.length > 0 && (
                <ul className="modal-bullet-list mt-small">
                  {project.architecture.highlights.map((item, idx) => (
                    <li key={idx} className="modal-bullet-item">
                      <span className="bullet-indicator" aria-hidden="true">◈</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Testing and Validation */}
          {project.testing && (
            <section className="modal-section" aria-labelledby="section-testing">
              <h3 id="section-testing" className="modal-section-title">
                <LuCheckCheck className="section-title-icon" aria-hidden="true" />
                Testing & Validation
              </h3>
              <p className="testing-summary">
                {project.testing.summary}
              </p>
              {project.testing.verifiedResults && project.testing.verifiedResults.length > 0 && (
                <div className="verified-results-box">
                  <div className="verified-box-header">Verified Results & Checks:</div>
                  <ul className="verified-list">
                    {project.testing.verifiedResults.map((result, idx) => (
                      <li key={idx} className="verified-item">
                        <span className="verified-badge" aria-hidden="true">PASS</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Technology Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <section className="modal-section" aria-labelledby="section-tech">
              <h3 id="section-tech" className="modal-section-title">
                <LuBoxes className="section-title-icon" aria-hidden="true" />
                Technology Stack
              </h3>
              <div className="modal-tech-pills">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="modal-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Links and Resources */}
          {project.links && project.links.length > 0 && (
            <section className="modal-section border-none" aria-labelledby="section-links">
              <h3 id="section-links" className="modal-section-title">
                <LuExternalLink className="section-title-icon" aria-hidden="true" />
                Links & Repository Access
              </h3>
              <div className="modal-links-container">
                {project.links.map((link, idx) => {
                  if (link.isPrivate) {
                    return (
                      <div key={idx} className="private-repo-box">
                        <div className="private-repo-info">
                          <LuLock className="private-icon" aria-hidden="true" />
                          <div className="private-texts">
                            <span className="private-title">{link.label}</span>
                            <span className="private-desc">
                              Source code is kept private per academic guidelines. Code inspection is available upon request.
                            </span>
                          </div>
                        </div>
                        {link.url && (
                          <a
                            href={link.url}
                            className="modal-action-btn request-access-btn"
                          >
                            <LuMail aria-hidden="true" />
                            <span>Request Access</span>
                          </a>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-action-btn github-btn"
                    >
                      <LuGithub aria-hidden="true" />
                      <span>{link.label}</span>
                      <LuExternalLink className="action-btn-arrow" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="modal-footer">
          <span className="modal-footer-hint">Press <kbd>Esc</kbd> or click outside to close</span>
          <button
            type="button"
            className="modal-footer-close-btn"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
