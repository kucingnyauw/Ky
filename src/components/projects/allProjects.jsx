import { useState, useEffect } from "react";

import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";
import ProjectSkeleton from "../common/skeleton";




const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SECRET}get`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(`data : ${JSON.stringify(data)}`);
          // Check if the data is an array or a single object
          if (Array.isArray(data)) {
            setProjects(data);
          } else if (data && typeof data === 'object') {
            setProjects([data]);
          } else {
            throw new Error('Unexpected JSON structure');
          }
        } else {
          throw new Error('Unexpected content type');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  if (loading) {
    return (
      <div className="all-projects-container">
        {
          Array(2).fill(null).map((_, index) => (
            <div className="all-projects-project" key={index}><ProjectSkeleton key={index} /></div>
          ))
        }
      </div>



    );
  }


  if (error) {
    return (
      <div className="all-projects-container">
        {
          Array(2).fill(null).map((_, index) => (
            <div className="all-projects-project" key={index}><ProjectSkeleton key={index} /></div>
          ))
        }
      </div>
    )
  }

  return (
    <div className="all-projects-container">
      {projects.length === 0 ? (
        <div className="all-projects-project" ><ProjectSkeleton /></div>
      ) : (
        projects.map((project, index) => (
          <div className="all-projects-project" key={index}>
            <Project

              title={project.title}
              description={project.subtitle}
              instanceId={project.instanceId}
              linkText="View Project"

            />
          </div>
        ))
      )}
    </div>
  );
};



export default AllProjects;
