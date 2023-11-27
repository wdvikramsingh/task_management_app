import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore([]);

test("renders TaskList component", () => {
  const store = mockStore(/* initial state here */);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const taskListElement = screen.getByText(/Task Management Application/i);
  expect(taskListElement).toBeInTheDocument();
});
