const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form input');
const todoList = document.querySelector('#checklist');

function submitTodo(e){
  e.preventDefault();
  const todo = todoInput.value;
  paintingTodo(todo);
}

function paintingTodo(todo){
  const input = document.createElement('input');
  const label = document.createElement('label');

  const id =String(Date.now());
  input.id = id
  input.type = 'checkbox'
  input.name = 'r';
  label.htmlFor = id;
  label.innerText = todo;
  todoList.appendChild(input);
  todoList.appendChild(label);
  todoInput.value = '';
}
todoForm.addEventListener('submit', submitTodo);