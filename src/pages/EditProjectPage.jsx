// src/pages/EditProjectPage.jsx

import { useState, useEffect } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectToEdit = async () => {
      try {
        const response = await api.get(`/projects/${projectId}`);
        console.log(response);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectToEdit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/projects/${projectId}`, {
        title,
        description,
      });
      console.log(response);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}

export default EditProjectPage;
