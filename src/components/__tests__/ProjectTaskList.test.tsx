/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable jest/no-mocks-import */
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProjectTaskList from "../ProjectTaskList";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ProjectTaskList", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: require("../../__mocks__/projectTasks.json"),
    });
  });

  it("toggles task completion status", async () => {
    const setTasks = jest.fn();
    render(
      <ProjectTaskList
        tasks={require("../../__mocks__/projectTasks.json")}
        setTasks={setTasks}
      />
    );

    const toggleButton = screen.getAllByText("Mark as Completed")[0];
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getAllByText("Unmark")[0]).toBeInTheDocument();
    });
  });
});
