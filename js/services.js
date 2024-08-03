const BASE_URL = "http://localhost:8090/api/todo";

async function getTodos() {
    const url = `${BASE_URL}`;
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw Error(text);
    }
    const json = await response.json();
    return json;
}

async function getTodosByTitle(title) {
    const url = `${BASE_URL}/title/${title}`;
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw Error(text);
    }
    const json = await response.json();
    return json;
}

async function getTodosByStatus(status) {
    const url = `${BASE_URL}/status/${status}`;
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw Error(text);
    }
    const json = await response.json();
    return json;
}

async function createTodo(title, status) {
    const url = `${BASE_URL}`;
    const body = {
        title: title,
        status: status
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const text = await response.text();
            console.log(text);
            throw new Error(text);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
}

async function getTodoById(id) {
    const url = `${BASE_URL}/id/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw Error(text);
    }
    const json = await response.json();
    return json;
}

async function updateTodo(id, title, status) {
    const url = `${BASE_URL}/${id}`;
    const body = {
        title: title,
        status: status
    };
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const text = await response.text();
            console.log(text);
            throw new Error(text);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
}

async function deleteTodo(id) {
    const url = `${BASE_URL}/${id}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        if (!response.ok) {
            const text = await response.text();
            console.log(text);
            throw new Error(text);
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
}
