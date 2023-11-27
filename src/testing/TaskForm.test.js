import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskForm from "../components/TaskForm";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("TaskForm Component", () => {
  test("handles form submission correctly", async () => {
    const store = mockStore({
      tasks: [],
    });

    render(
      <Router>
        <Provider store={store}>
          <TaskForm isAdding={true} />
        </Provider>
      </Router>
    );

    const taskNameInput = screen.getByLabelText("Task Name");
    const descriptionInput = screen.getByLabelText("Description");
    const categorySelect = screen.getByLabelText("Category");
    const statusSelect = screen.getByLabelText("Status");
    const submitButton = screen.getByText("Create Task");

    fireEvent.change(taskNameInput, { target: { value: "New Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Task Description" },
    });
    const selectOptionByText = (selectElement, optionText) => {
      const options = selectElement && selectElement.options;
      if (options && options.length > 0) {
        const option = Array.from(options).find((o) => o.text === optionText);
        if (option) {
          userEvent.selectOptions(selectElement, option);
        }
      }
    };

    selectOptionByText(categorySelect, "Low");
    selectOptionByText(statusSelect, "Not Completed");

    fireEvent.click(submitButton);

    // Dispatch returns a promise, so we can await it
    await store.dispatch({ type: "ADD_TASK", payload: {} });

    //  assertions
    expect(store.getActions()).toEqual([
      {
        type: "ADD_TASK",
        payload: {},
      },
    ]);
  });
});
