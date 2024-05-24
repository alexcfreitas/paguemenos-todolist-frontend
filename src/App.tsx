import React, { useState } from "react";
import ProjectTaskList from "./components/ProjectTaskList";
import AddProjectTaskForm from "./components/AddProjectTaskForm";
import { ProjectTask } from "./domains/ProjectTask";
import "./App.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);

  return (
    <div className="App">
      <AddProjectTaskForm setTasks={setTasks} />
      <ProjectTaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
