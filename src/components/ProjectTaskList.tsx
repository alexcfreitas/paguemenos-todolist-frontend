import React, { useEffect } from "react";
import { ProjectTask } from "../domains/ProjectTask";
import {
  getProjectTasks,
  updateProjectTaskStatus,
  deleteProjectTask,
} from "../services/ProjectTaskService";
import SwipeableTaskItem from "./SwipeableTaskItem";

interface ProjectTaskListProps {
  tasks: ProjectTask[];
  setTasks: React.Dispatch<React.SetStateAction<ProjectTask[]>>;
}

const ProjectTaskList: React.FC<ProjectTaskListProps> = ({
  tasks,
  setTasks,
}) => {
  useEffect(() => {
    fetchProjectTasks();
  }, []);

  const fetchProjectTasks = async () => {
    const projectTasks = await getProjectTasks();
    setTasks(projectTasks);
  };

  const toggleCompletion = async (projectTask: ProjectTask) => {
    await updateProjectTaskStatus(projectTask.id, !projectTask.isCompleted);
    setTasks(
      tasks.map((task) =>
        task.id === projectTask.id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  const handleDelete = async (projectTask: ProjectTask) => {
    document.getElementById(`task-${projectTask.id}`)?.classList.add("fadeOut");
    setTimeout(async () => {
      await deleteProjectTask(projectTask.id);
      setTasks(tasks.filter((task) => task.id !== projectTask.id));
    }, 500);
  };

  if (tasks.length === 0) return null;

  return (
    <div className="task-list">
      <h1>Tarefas Do Projeto</h1>
      <ul>
        {tasks.map((projectTask) => (
          <SwipeableTaskItem
            key={projectTask.id}
            projectTask={projectTask}
            onToggleCompletion={() => toggleCompletion(projectTask)}
            onDelete={() => handleDelete(projectTask)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectTaskList;
