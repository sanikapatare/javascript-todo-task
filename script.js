// =========================================
// TO-DO LIST APPLICATION
// CRUD + LOCAL STORAGE
// FILTERS + EVENT DELEGATION
// =========================================


// =========================================
// GET HTML ELEMENTS
// =========================================

const todoForm = document.getElementById("todo-form");

const todoInput = document.getElementById("todo-input");

const todoList = document.getElementById("todo-list");

const emptyMessage =
    document.getElementById("empty-message");

const taskSummary =
    document.getElementById("task-summary");

const filterContainer =
    document.querySelector(".filters");


// =========================================
// STORAGE
// =========================================

const STORAGE_KEY = "sanikaTodoTasks";


// =========================================
// APPLICATION STATE
// =========================================

let todos = [];

let currentFilter = "all";


// =========================================
// LOAD TODOS
// =========================================

function loadTodos() {

    const savedTodos =
        localStorage.getItem(STORAGE_KEY);

    if (!savedTodos) {
        todos = [];
        return;
    }

    try {

        const parsedTodos =
            JSON.parse(savedTodos);

        if (Array.isArray(parsedTodos)) {

            todos = parsedTodos;

        } else {

            todos = [];

        }

    } catch (error) {

        console.error(
            "Error loading todos:",
            error
        );

        todos = [];
    }
}


// =========================================
// SAVE TODOS
// =========================================

function saveTodos() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(todos)
    );
}


// =========================================
// GENERATE ID
// =========================================

function generateId() {

    return Date.now().toString() +
        Math.random().toString(16).slice(2);
}


// =========================================
// CREATE TODO
// =========================================

function createTodo(text) {

    const newTodo = {

        id: generateId(),

        text: text,

        completed: false,

        createdAt: new Date().toISOString()

    };

    todos.unshift(newTodo);

    saveTodos();

    renderTodos();
}


// =========================================
// GET FILTERED TODOS
// =========================================

function getFilteredTodos() {

    if (currentFilter === "active") {

        return todos.filter(
            function (todo) {
                return !todo.completed;
            }
        );
    }

    if (currentFilter === "completed") {

        return todos.filter(
            function (todo) {
                return todo.completed;
            }
        );
    }

    return todos;
}


// =========================================
// UPDATE TASK SUMMARY
// =========================================

function updateSummary() {

    const total = todos.length;

    const completed =
        todos.filter(
            function (todo) {
                return todo.completed;
            }
        ).length;

    const active =
        total - completed;


    if (total === 0) {

        taskSummary.textContent =
            "0 tasks";

        return;
    }


    taskSummary.textContent =
        total +
        (total === 1 ? " task" : " tasks") +
        " • " +
        active +
        " active • " +
        completed +
        " completed";
}


// =========================================
// CREATE TASK DOM ELEMENT
// =========================================

function createTodoElement(todo) {

    const listItem =
        document.createElement("li");

    listItem.className =
        "todo-item";

    listItem.dataset.id =
        todo.id;


    if (todo.completed) {

        listItem.classList.add("completed");
    }


    // CHECKBOX
    const checkbox =
        document.createElement("input");

    checkbox.type =
        "checkbox";

    checkbox.className =
        "todo-checkbox";

    checkbox.checked =
        todo.completed;

    checkbox.setAttribute(
        "aria-label",
        "Complete " + todo.text
    );


    // CONTENT
    const content =
        document.createElement("div");

    content.className =
        "todo-content";


    const text =
        document.createElement("span");

    text.className =
        "todo-text";

    text.textContent =
        todo.text;


    const meta =
        document.createElement("small");

    meta.className =
        "todo-meta";

    meta.textContent =
        todo.completed
            ? "Completed"
            : "Active";


    content.appendChild(text);

    content.appendChild(meta);


    // ACTIONS
    const actions =
        document.createElement("div");

    actions.className =
        "todo-actions";


    // EDIT
    const editButton =
        document.createElement("button");

    editButton.type =
        "button";

    editButton.className =
        "btn btn-edit";

    editButton.dataset.action =
        "edit";

    editButton.textContent =
        "Edit";


    // DELETE
    const deleteButton =
        document.createElement("button");

    deleteButton.type =
        "button";

    deleteButton.className =
        "btn btn-delete";

    deleteButton.dataset.action =
        "delete";

    deleteButton.textContent =
        "Delete";


    actions.appendChild(
        editButton
    );

    actions.appendChild(
        deleteButton
    );


    listItem.appendChild(
        checkbox
    );

    listItem.appendChild(
        content
    );

    listItem.appendChild(
        actions
    );


    return listItem;
}


// =========================================
// READ / RENDER TODOS
// =========================================

function renderTodos() {

    const filteredTodos =
        getFilteredTodos();


    todoList.innerHTML =
        "";


    if (filteredTodos.length === 0) {

        emptyMessage.hidden =
            false;

    } else {

        emptyMessage.hidden =
            true;


        filteredTodos.forEach(
            function (todo) {

                const todoElement =
                    createTodoElement(todo);

                todoList.appendChild(
                    todoElement
                );
            }
        );
    }


    updateSummary();

    updateFilterButtons();
}


// =========================================
// FILTER BUTTONS
// =========================================

function updateFilterButtons() {

    const buttons =
        filterContainer.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        function (button) {

            const active =
                button.dataset.filter ===
                currentFilter;


            button.classList.toggle(
                "active",
                active
            );


            button.setAttribute(
                "aria-pressed",
                String(active)
            );
        }
    );
}


// =========================================
// TOGGLE COMPLETED
// =========================================

function toggleTodo(todoId) {

    const todo =
        todos.find(
            function (item) {
                return item.id === todoId;
            }
        );


    if (!todo) {
        return;
    }


    todo.completed =
        !todo.completed;


    saveTodos();

    renderTodos();
}


// =========================================
// EDIT TODO
// =========================================

function editTodo(todoId) {

    const todo =
        todos.find(
            function (item) {
                return item.id === todoId;
            }
        );


    if (!todo) {
        return;
    }


    const newText =
        window.prompt(
            "Edit task:",
            todo.text
        );


    if (newText === null) {
        return;
    }


    const trimmedText =
        newText.trim();


    if (trimmedText === "") {

        window.alert(
            "Task cannot be empty."
        );

        return;
    }


    todo.text =
        trimmedText;


    saveTodos();

    renderTodos();
}


// =========================================
// DELETE TODO
// =========================================

function deleteTodo(todoId) {

    const todo =
        todos.find(
            function (item) {
                return item.id === todoId;
            }
        );


    if (!todo) {
        return;
    }


    const confirmed =
        window.confirm(
            "Delete \"" +
            todo.text +
            "\"?"
        );


    if (!confirmed) {
        return;
    }


    todos =
        todos.filter(
            function (item) {
                return item.id !== todoId;
            }
        );


    saveTodos();

    renderTodos();
}


// =========================================
// FORM SUBMIT
// =========================================

todoForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const text =
            todoInput.value.trim();


        if (text === "") {

            window.alert(
                "Please enter a task."
            );

            todoInput.focus();

            return;
        }


        createTodo(text);


        todoForm.reset();

        todoInput.focus();
    }
);


// =========================================
// EVENT DELEGATION
// FOR EDIT + DELETE
// =========================================

todoList.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button[data-action]"
            );


        if (!button) {
            return;
        }


        const todoItem =
            button.closest(
                ".todo-item"
            );


        if (!todoItem) {
            return;
        }


        const todoId =
            todoItem.dataset.id;


        const action =
            button.dataset.action;


        if (action === "edit") {

            editTodo(todoId);

        }


        if (action === "delete") {

            deleteTodo(todoId);

        }
    }
);


// =========================================
// EVENT DELEGATION
// FOR CHECKBOX
// =========================================

todoList.addEventListener(
    "change",
    function (event) {

        if (
            !event.target.classList.contains(
                "todo-checkbox"
            )
        ) {

            return;
        }


        const todoItem =
            event.target.closest(
                ".todo-item"
            );


        if (!todoItem) {
            return;
        }


        toggleTodo(
            todoItem.dataset.id
        );
    }
);


// =========================================
// FILTER EVENT DELEGATION
// =========================================

filterContainer.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".filter-btn"
            );


        if (!button) {
            return;
        }


        currentFilter =
            button.dataset.filter;


        renderTodos();
    }
);


// =========================================
// INITIALIZE
// =========================================

loadTodos();

renderTodos();