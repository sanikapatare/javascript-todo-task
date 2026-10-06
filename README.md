# JavaScript To-Do List

## JavaScript Logic & State Management

A responsive client-side To-Do List application built to demonstrate DOM manipulation, event handling, CRUD operations, filtering, and local data persistence.

## Features

- Create new tasks
- Read and display tasks dynamically
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks by All, Active, and Completed
- Save tasks using window.localStorage
- Preserve tasks after browser refresh
- Dynamic DOM element creation
- Event delegation for task actions
- Responsive design

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage

## CRUD Operations

### Create
Users can add a new task using the task input form.

### Read
Tasks are displayed dynamically in the To-Do list.

### Update
Users can edit task text and change the task completion status.

### Delete
Users can remove tasks from the list.

## Filtering

The application provides three filters:

- All
- Active
- Completed

## Local Storage

Tasks are automatically stored using `window.localStorage`.

The saved tasks remain available after refreshing the browser.

## Event Delegation

The application uses event delegation on the task list to handle dynamically created Edit, Delete, and completion controls.

## Project Structure

```text
JavaScript-Todo-Task
│
├── index.html
├── styles.css
├── script.js
└── README.md