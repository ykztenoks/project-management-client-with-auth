import AddProject from "../components/AddProject";
import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";

function ProjectListPage() {
  const [projects, setProjects] = useState(null);

  const getAllProjects = async () => {
    try {
      const response = await api.get("/projects");

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="projectList">
      <h1>Project List Page</h1>
      <AddProject getAllProjects={getAllProjects} />

      {projects ? (
        projects.map((project) => (
          <ProjectCard {...project} key={project._id} />
        ))
      ) : (
        <p>No projects yet</p>
      )}
    </div>
  );
}

export default ProjectListPage;
