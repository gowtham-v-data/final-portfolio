import React from "react";
import "./About.css";

const About = ({ data }) => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image-wrapper">
          <div className="about-image-border"></div>
          <img src={data.image} alt="Profile" className="about-image" />
        </div>
        <div className="about-content">
          <h2 className="section-title">{data.title}</h2>
          <p className="about-bio">{data.bio}</p>
          <div className="about-highlights">
            {data.highlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-value">{highlight.value}</div>
                <div className="highlight-label">{highlight.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
