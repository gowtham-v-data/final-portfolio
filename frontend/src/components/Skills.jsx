import React from "react";
import { Code2, Database, Cloud, Wrench } from "lucide-react";
import "./Skills.css";

const Skills = ({ data }) => {
  const iconMap = {
    "Frontend": Code2,
    "Backend": Database,
    "DevOps & Tools": Cloud,
    "Other": Wrench
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-description">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>
        <div className="skills-grid">
          {data.categories.map((category, index) => {
            const Icon = iconMap[category.name] || Code2;
            return (
              <div key={index} className="skill-category">
                <div className="skill-category-header">
                  <div className="skill-icon-wrapper">
                    <Icon size={24} className="skill-icon" />
                  </div>
                  <h3 className="skill-category-name">{category.name}</h3>
                </div>
                <div className="skill-tags">
                  {category.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="skill-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
