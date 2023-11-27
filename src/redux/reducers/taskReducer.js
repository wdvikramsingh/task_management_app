const initialState = {
  tasks: [], // Initial state for tasks
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      // Update state with fetched data
      return {
        ...state,
        tasks: action.payload,
      };
    case "ADD_TASK":
      // Logic for adding a task
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "EDIT_TASK":
      const updatedTasks = state.tasks.map((task) =>
        task.id === parseInt(action.payload.taskId, 10)
          ? { ...task, ...action.payload.updatedTask }
          : task
      );

      return {
        ...state,
        tasks: updatedTasks,
      };

    case "DELETE_TASK":
      // Remove the task from the state
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
      };
    default:
      return state;
  }
};

export default taskReducer;
