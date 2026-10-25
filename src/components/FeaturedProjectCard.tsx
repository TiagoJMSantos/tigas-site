import React from 'react';
import { 
  LuServer, 
  LuCpu, 
  LuDatabase, 
  LuBoxes, 
  LuArrowUpRight,
  LuLock,
  LuCircleCheck,
  LuClock
} from 'react-icons/lu';
import type { FeaturedProjectItem, ProjectStatus } from '../data/featuredProjects';

interface FeaturedProjectCardProps {
  project: FeaturedProjectItem;
  onSelect: (project: FeaturedProjectItem) => void;
}

export function FeaturedProjectCard({ project, onSelect }: FeaturedProjectCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  const renderIcon = (type: FeaturedProjectItem['iconType']) => {
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

  const isPrivate = project.links.some(l => l.isPrivate);

  return (
    <div
      role="button"
      tabIndex={0}
      className="featured-project-card"
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      aria-label={`View detailed technical information for ${project.title}`}
    >
      <div className="featured-card-top">
        <div className="featured-card-header">
          <div className="featured-card-icon" aria-hidden="true">
            {renderIcon(project.iconType)}
          </div>
          <div className="featured-card-title-group">
            <div className="featured-card-title-row">
              <h3 className="featured-card-title">{project.title}</h3>
              {isPrivate && (
                <span className="featured-private-badge" title="Private academic repository">
                  <LuLock aria-hidden="true" /> Private
                </span>
              )}
            </div>
            {renderStatusBadge(project.status)}
          </div>
        </div>

        <p className="featured-card-desc">
          {project.shortDescription}
        </p>

        {/* Subtle technical architecture wireframe strip */}
        <div className="featured-card-schematic" aria-hidden="true">
          <div className="schematic-line">
            <span className="schematic-node node-active" />
            <span className="schematic-track" />
            <span className="schematic-node" />
            <span className="schematic-track" />
            <span className="schematic-node" />
          </div>
          <span className="schematic-label">
            {project.academicContext ? project.academicContext.replace('Coursework at Instituto Superior Técnico', 'IST Coursework') : 'Systems Architecture'}
          </span>
        </div>
      </div>

      <div className="featured-card-bottom">
        <div className="featured-card-tags" aria-label="Technologies used">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="featured-tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="featured-tech-tag tag-more">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="featured-card-action">
          <span className="action-text">Explore technical details</span>
          <div className="action-arrow-box" aria-hidden="true">
            <LuArrowUpRight className="action-arrow-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
