const mockAxios = {
  get: jest.fn((url) => {
    if (url === "http://localhost:5030/api/project-tasks") {
      return Promise.resolve({ data: require("./projectTasks.json") });
    }
    return Promise.reject(new Error("not found"));
  }),
  post: jest.fn((url, data) => {
    if (url === "http://localhost:5030/api/project-tasks") {
      return Promise.resolve({ data: require("./addProjectTask.json") });
    }
    return Promise.reject(new Error("not found"));
  }),
  put: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(() => Promise.resolve({})),
};

export default mockAxios;
