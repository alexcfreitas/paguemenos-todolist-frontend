import axios from "axios";
import { ProjectTask } from "../domains/ProjectTask";

const API_URL = "http://localhost:5030/api/project-tasks";

export const getProjectTasks = async (): Promise<ProjectTask[]> => {
  const response = await axios.get<ProjectTask[]>(API_URL);
  return response.data;
};

export const addProjectTask = async (
  title: string,
  description: string
): Promise<ProjectTask> => {
  const response = await axios.post<ProjectTask>(API_URL, {
    title,
    description,
  });
  return response.data;
};

export const updateProjectTaskStatus = async (
  id: number,
  isCompleted: boolean
): Promise<void> => {
  const payload = { isCompleted };
  console.log(`Sending PUT request to ${API_URL}/${id} with payload:`, payload); // Log payload
  await axios.put(`${API_URL}/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProjectTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
