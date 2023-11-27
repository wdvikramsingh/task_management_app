import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TaskList from "../components/TaskList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("TaskList Component", () => {
  test("renders TaskList component correctly", () => {
    const initialState = {
      tasks: [
        {
          id: 1,
          taskName: "Task 1",
          description: "Description 1",
          category: "Low",
          status: "Not Completed",
        },
        // Add more tasks as needed
      ],
    };

    const store = mockStore(initialState);

    render(
      <Router>
        <Provider store={store}>
          <TaskList />
        </Provider>
      </Router>
    );

    expect(screen.getByText("Task Management Application")).toBeInTheDocument();

    // Use getAllByText to get an array of all elements with the text "Task 1"
    const taskElements = screen.getAllByText("Task 1");

    //choose the specific element you're interested in
    expect(taskElements[0]).toBeInTheDocument(); // Assuming there is only one element with "Task 1"
  });
});
