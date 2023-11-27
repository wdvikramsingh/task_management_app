export const addTask = (newTask) => {
  return {
    type: "ADD_TASK",
    payload: newTask,
  };
};

export const editTask = (taskId, updatedTask) => {
  return {
    type: "EDIT_TASK",
    payload: { taskId, updatedTask },
  };
};

export const deleteTask = (taskId) => {
  return {
    type: "DELETE_TASK",
    payload: taskId,
  };
};
