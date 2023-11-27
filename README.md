## Clone the repository to your local machine.

git clone https://github.com/wdvikramsingh/task_management_app.git

cd task-management-app

npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Feature

Add Task: Click on the "Create Task" button to add a new task. Fill in the required details and click "Create Task."

Edit Task: Click on the "Edit" icon next to a task to edit its details. Update the information and click "Update Task."

Delete Task: Click on the "Delete" icon next to a task to delete it.

Sort and Filter: Use the dropdown menus to sort tasks by name and filter them by category.

Search: Enter a search term in the search bar to find tasks with matching names or descriptions.

## Design Choices

React and Redux

Component Structure: The application is structured using React components, promoting a modular and maintainable design. Redux is used for state management, providing a predictable and centralized state.

Redux Actions and Reducers: Actions such as adding, editing, and deleting tasks are dispatched to update the Redux store. The reducers handle these actions to update the state in a consistent manner.

## Material-UI

Styling: Material-UI components are utilized for consistent and responsive styling. Custom styling is applied where necessary to enhance the visual appeal and user experience.

Grid and Flexbox: The layout is designed using Material-UI's Grid and Flexbox components, ensuring a clean and organized structure.

## Local Storage

Persistence: User preferences, such as search terms, sort options, and filter categories, are persisted in the local storage. This allows users to maintain their preferences between sessions.

## Routing with React Router

Navigation: React Router is used for client-side routing, enabling seamless navigation between different views within the application.

## Project Structure

src/components: Contains React components for the user interface.
src/redux/actions: Defines Redux actions for adding, editing, and deleting tasks.
src/redux/reducers: Implements the Redux reducer to manage the state of tasks.
src/redux/store.js: Configures the Redux store.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
