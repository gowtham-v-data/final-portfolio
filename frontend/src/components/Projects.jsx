import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import "./Projects.css";

const Projects = ({ data }) => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>
        <div className="projects-grid">
          {data.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href={project.liveLink !== "#" ? project.liveLink : undefined}
                      className="project-link-btn"
                      aria-label="View live project"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.liveLink === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubLink !== "#" ? project.githubLink : undefined}
                      className="project-link-btn"
                      aria-label="View GitHub repository"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.githubLink === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
