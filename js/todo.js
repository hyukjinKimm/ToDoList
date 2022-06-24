const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form input');
const todoList = document.querySelector('#checklist');
const TODO_KEY = 'todos';
let todos = [];

function submitTodo(e){
  e.preventDefault();
  const newtodo = {
    text: todoInput.value,
    id: Date.now(),
  };
  paintingTodo(newtodo);
  saveTodo(newtodo);
  todoInput.value = '';
}

function paintingTodo(todo){
  const input = document.createElement('input');
  const label = document.createElement('label');

  input.type = 'checkbox'
  input.name = 'r';
  input.id = todo.id
  input.addEventListener('click', (e) => {
    if(input.checked){
      deleteTodo(e.target.id);
    } else {
      saveTodo(todo);
    }
  })

  label.htmlFor = todo.id;
  label.innerText = todo.text;
  todoList.appendChild(input);
  todoList.appendChild(label);
}
function saveTodo(todo){

  todos.push(todo);
  todos.sort((a, b) => {return a.id - b.id});
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}
function deleteTodo(id){
  todos = todos.filter((todo) => {
    return todo.id !== parseInt(id);
  });
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

todoForm.addEventListener('submit', submitTodo);

const savedTodo = localStorage.getItem(TODO_KEY);

if(savedTodo){
  todos = JSON.parse(savedTodo);
  todos.forEach(paintingTodo);
} else {

}
