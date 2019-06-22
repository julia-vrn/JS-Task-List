//Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
  //Add task event
  form.addEventListener('submit', addTask);
}

//Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }

  //Create an li element
  const li = document.createElement('li');
  //add class to the li element
  li.className = 'collection-item';
  //create a textnode and append it to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //create nw link element 
  const link = document.createElement('a');
  //add class 
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to the li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //clear the input
  taskInput.value = '';

  e.preventDefault();
}