import React from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";
import "./Experience.css";

const Experience = ({ data }) => {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="experience-header">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-description">
            My professional journey and key accomplishments
          </p>
        </div>
        <div className="experience-timeline">
          {data.map((job, index) => (
            <div key={job.id} className="experience-item">
              <div className="experience-dot">
                <Briefcase size={20} />
              </div>
              <div className="experience-content">
                <div className="experience-card">
                  <div className="experience-header-card">
                    <div>
                      <h3 className="experience-position">{job.position}</h3>
                      <p className="experience-company">{job.company}</p>
                    </div>
                    <span className="experience-duration">{job.duration}</span>
                  </div>
                  <p className="experience-description">{job.description}</p>
                  <div className="experience-achievements">
                    <h4 className="achievements-title">Key Achievements:</h4>
                    <ul className="achievements-list">
                      {job.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="achievement-item">
                          <CheckCircle2 size={16} className="check-icon" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
