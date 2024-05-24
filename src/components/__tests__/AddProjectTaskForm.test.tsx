/* eslint-disable jest/no-mocks-import */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddProjectTaskForm from "../AddProjectTaskForm";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AddProjectTaskForm", () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({
      data: require("../../__mocks__/addProjectTask.json"),
    });
  });

  it("submits new project task", async () => {
    const setTasks = jest.fn();
    render(<AddProjectTaskForm setTasks={setTasks} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.click(screen.getByText(/add project task/i));

    await waitFor(() => {
      expect(setTasks).toHaveBeenCalledWith(expect.any(Function));
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:5030/api/project-tasks",
      { title: "New Task", description: "New Description" }
    );
  });
});
