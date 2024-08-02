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
      throw error; // Re-throw the error after logging it
    }
}
