import { getTodos, createTodo } from '../services.js';

let globalTodoId = null;
const $TODOS_TABLE_BODY = document.querySelector("#todos-table tbody");

// Create todo variables
const $CONFIRM_CREATE_BUTTON = document.querySelector("#confirm-create-button");
const $CREATE_TODO_TITLE = document.querySelector("#title_create");
const $CREATE_TODO_STATUS = document.querySelector("#status_create");

async function fetchTodos() {
    try {
        const todos = await getTodos();

        let rowHTML = "";

        todos.forEach((todo) => {
            rowHTML += `
                <tr>
                    <td>${todo.id}</td>
                    <td>${todo.title}</td>
                    <td>${todo.status}</td>
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
            button.addEventListener("click", (event) => {
                globalTodoId = event.target.dataset.id;
            });
        });
    } catch (e) {
        console.log(e);
        alert("Error al obtener los todos");
    }
}

$CONFIRM_CREATE_BUTTON.addEventListener("click", async function() {
    try {
        await createTodo(
            $CREATE_TODO_TITLE.value,
            $CREATE_TODO_STATUS.value
        );
        alert("Success!");
        await fetchTodos();
    } catch (e) {
        alert("Error creating todo: " + e.message);
    }
});

window.onload = function () {
    fetchTodos();
};
