import React from "react";
import { Link } from "react-router-dom";


import "./styles/project.css";


const Project = (props) => {
  const { logo, title, description, linkText, instanceId, } = props;

  return (
    <React.Fragment>
      <div className="project">

        <div className="project-container">
          <div className="project-title">{title}</div>
          <div className="project-description">{description}</div>
          <div className="project-link">
            <div className="project-wrapper">
              <div className="project-logos">
                {logo.map((logo, index) => (
                  <div key={index} className="project-logo">
                    <img src={logo} alt={`logo-${index}`} />
                  </div>
                ))}
              </div>
              <Link
                to={`/project/${instanceId}`}
                className="project-link-text"
              >
                {linkText}
              </Link>

            </div>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
};

export default Project;
