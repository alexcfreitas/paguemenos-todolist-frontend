import React, { useState } from "react";
import { addProjectTask } from "../services/ProjectTaskService";
import { ProjectTask } from "../domains/ProjectTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddProjectTaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<ProjectTask[]>>;
}

const AddProjectTaskForm: React.FC<AddProjectTaskFormProps> = ({
  setTasks,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTask = await addProjectTask(title, description);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
    setDescription("");
    setIsFormVisible(false);
  };

  return (
    <div className="add-task-container">
      {!isFormVisible && (
        <button
          className="add-task-button"
          onClick={() => setIsFormVisible(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="add-task-form fadeIn">
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tarefa"
              className="task-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descricao"
              className="task-input"
            />
          </div>
          <button type="submit" className="add-task-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProjectTaskForm;
