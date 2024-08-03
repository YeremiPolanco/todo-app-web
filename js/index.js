let globalTodoId = null;
const $TODOS_TABLE_BODY = document.querySelector("#todos-table tbody");

// Create todo variables
const $CONFIRM_CREATE_BUTTON = document.querySelector("#confirm-create-button");
const $CREATE_TODO_TITLE = document.querySelector("#title_create");
const $CREATE_TODO_STATUS = document.querySelector("#exampleSelect");

// Update todo variables
const $CONFIRM_UPDATE_BUTTON = document.querySelector("#confirm-update-button");
const $UPDATE_TODO_TITLE = document.querySelector("#title_update");
const $UPDATE_TODO_STATUS = document.querySelector("#status_update");

// Delete todo variables
const $CONFIRM_DELETE_BUTTON = document.querySelector("#confirm-delete-button");

// Search bar variables
const $SEARCH_BAR = document.querySelector("#search-bar");
const $SEARCH_BUTTON = document.querySelector("#button-addon2");

// Status filter variables
const $STATUS_FILTER = document.querySelector("#status-filter");

async function fetchTodos() {
    try {
        const todos = await getTodos();
        renderTodos(todos);
    } catch (e) {
        console.log(e);
        alert("Error al obtener los todos");
    }
}

async function fetchTodosByTitle(title) {
    try {
        const todos = await getTodosByTitle(title);
        renderTodos(todos);
    } catch (e) {
        console.log(e);
        alert(`Error fetching todos by title "${title}": ${e.message}`);
    }
}

async function fetchTodosByStatus(status) {
    try {
        const todos = await getTodosByStatus(status);
        renderTodos(todos);
    } catch (e) {
        console.log(e);
        alert(`Error fetching todos by status "${status}": ${e.message}`);
    }
}

async function fetchTodoById(id) {
    try {
        const todo = await getTodoById(id);
        return todo;
    } catch (e) {
        console.log(e);
        alert(`Error fetching todo by ID "${id}": ${e.message}`);
    }
}

function renderTodos(todos) {
    let rowHTML = "";

    todos.forEach((todo) => {
        let statusClass;
        switch (todo.status) {
            case 'TODO':
                statusClass = 'btn-outline-info';
                break;
            case 'IN_PROGRESS':
                statusClass = 'btn-outline-warning';
                break;
            case 'COMPLETE':
                statusClass = 'btn-outline-success';
                break;
            case 'OBSOLETE':
                statusClass = 'btn-outline-danger';
                break;
            default:
                statusClass = 'btn-outline-secondary';
                break;
        }

        rowHTML += `
            <tr>
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td><button class="btn ${statusClass} btn-sm">${todo.status}</button></td>
                <td>
                    <button data-id="${todo.id}" class="js-action btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateTodoModal">Edit</button>
                    <button data-id="${todo.id}" class="js-action btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteTodoModal">Delete</button>
                </td>
            </tr>
        `;
    });

    $TODOS_TABLE_BODY.innerHTML = rowHTML;

    const actionButtons = document.querySelectorAll(".js-action");
    actionButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            globalTodoId = event.target.dataset.id;

            if (event.target.classList.contains('btn-primary')) {
                // Fetch and display todo details in the update modal
                const todo = await fetchTodoById(globalTodoId);
                $UPDATE_TODO_TITLE.value = todo.title;
                $UPDATE_TODO_STATUS.value = todo.status;
            }
        });
    });
}

$CONFIRM_CREATE_BUTTON.addEventListener("click", async function() {
    try {
        await createTodo(
            $CREATE_TODO_TITLE.value,
            $CREATE_TODO_STATUS.value
        );
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Todo creado correctamente!",
            showConfirmButton: false,
            timer: 3500
        });
        await fetchTodos();
    } catch (e) {
        Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Error al crear todo",
            text: e.message,
            showConfirmButton: false,
            timer: 3500
        });
    }
});

$CONFIRM_UPDATE_BUTTON.addEventListener("click", async function() {
    try {
        await updateTodo(
            globalTodoId,
            $UPDATE_TODO_TITLE.value,
            $UPDATE_TODO_STATUS.value
        );
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Todo actualizado correctamente!",
            showConfirmButton: false,
            timer: 3500
        });
        await fetchTodos();
    } catch (e) {
        Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Error al actulizar todo",
            text: e.message,
            showConfirmButton: false,
            timer: 3500
        });
    }
});

$CONFIRM_DELETE_BUTTON.addEventListener("click", async function() {
    try {
        await deleteTodo(globalTodoId);
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Todo eliminado correctamente!",
            showConfirmButton: false,
            timer: 1500
        });
        await fetchTodos();
    } catch (e) {
        Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Error deleting todo",
            text: e.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
});

$SEARCH_BUTTON.addEventListener("click", async function() {
    const title = $SEARCH_BAR.value;
    if (title) {
        await fetchTodosByTitle(title);
    } else {
        await fetchTodos();
    }
});

$STATUS_FILTER.addEventListener("change", async function() {
    const status = $STATUS_FILTER.value;
    if (status) {
        await fetchTodosByStatus(status);
    } else {
        await fetchTodos();
    }
});

window.onload = function () {
    fetchTodos();
};
