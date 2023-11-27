import taskReducer from "../redux/reducers/taskReducer";

describe("Task Reducer", () => {
  test("adds a task correctly", () => {
    const initialState = {
      tasks: [],
    };

    const newTask = {
      id: 1,
      taskName: "New Task",
      description: "Task Description",
      category: "Low",
      status: "Not Completed",
    };

    const action = {
      type: "ADD_TASK",
      payload: newTask,
    };

    const newState = taskReducer(initialState, action);

    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0]).toEqual(newTask);
  });

  // Add more tests for other reducer actions
});
