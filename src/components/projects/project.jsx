import React from "react";
import { Link } from "react-router-dom";


import "./styles/project.css";


const Project = (props) => {
  const { title, description, linkText, instanceId, } = props;

  return (
    <React.Fragment>
      <div className="project">

        <div className="project-container">

          <div className="project-title">{title}</div>
          <div className="project-description">{description}</div>
          <div className="project-link">
            <div className="project-wrapper">

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
