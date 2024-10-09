const API_URL = 'http://localhost:3000/api/todos';

window.onload = fetchTodos;

function fetchTodos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <strong>${todo.title}</strong>
                        <p>${todo.description}</p>
                        <small>Created at: ${todo.created_at}</small>
                    </div>
                    <div>
                        ${todo.is_completed ? 'Completed' : '<button onclick="markCompleted(' + todo.id + ')">Mark Completed</button>'}
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                `;
                todoList.appendChild(li);
            });
        });
}

function addTodo() {
    const title = document.getElementById('todoTitle').value;
    const description = document.getElementById('todoDescription').value;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          fetchTodos();
      });
}

function markCompleted(id) {
    fetch(API_URL + '/' + id, {
        method: 'PUT'
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          fetchTodos();
      });
}

function deleteTodo(id) {
    fetch(API_URL + '/' + id, {
        method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          fetchTodos();
      });
}
