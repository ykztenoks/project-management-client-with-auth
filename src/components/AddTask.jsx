// src/components/AddTask.jsx

import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

function AddTask({ projectId, getProject }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("not started");

  //.post(`${API_URL}/tasks`, requestBody)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !status) {
        alert("You have to provide all the values");
        return;
      }
      const response = await axios.post(`${API_URL}/tasks`, {
        title,
        status,
        projectId,
      });

      if (response.status === 200 || response.status === 201) {
        getProject();
        setTitle("");
        setStatus("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>status:</label>

        <select
          onChange={(e) => setStatus(e.target.value)}
          name="status"
          value={status}
        >
          <option value="not started">not started</option>
          <option value="ongoing">ongoing</option>
          <option value="completed">completed</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
