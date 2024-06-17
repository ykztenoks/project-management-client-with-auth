import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import api from "../services/api";

function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  const getProject = async () => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      <AddTask getProject={getProject} projectId={projectId} />

      {project && project.tasks.length ? (
        project.tasks.map((task) => <TaskCard key={task._id} {...task} />)
      ) : (
        <h3>No tasks for this project yet</h3>
      )}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
