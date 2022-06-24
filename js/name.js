const nameContainer = document.querySelector("#name-container");
const nameForm = document.querySelector('#name-form');
const nameInput = document.querySelector('#name-form input');
const h1 = document.querySelector('h1');

const USERNAME_KEY = 'username'

function nameSubmit(e){
  e.preventDefault();
  const username = nameInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  nameInput.value = "";
  h1.innerText = 'Hello ' + username 
  nameContainer.classList.toggle('hidden');
  h1.classList.toggle('hidden');
}

nameForm.addEventListener('submit', nameSubmit);

const savedName = localStorage.getItem(USERNAME_KEY);

if(!savedName){
    nameContainer.classList.toggle('hidden');
  nameForm.addEventListener('submit', nameSubmit);
} else {
  h1.classList.toggle('hidden');
  h1.innerText = 'Hello ' + savedName; 
}