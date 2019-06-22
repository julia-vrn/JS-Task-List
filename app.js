//Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//get tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      //Create an li element
  const li = document.createElement('li');
  //add class to the li element
  li.className = 'collection-item';
  //create a textnode and append it to the li
  li.appendChild(document.createTextNode(task));
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

  });

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

  //Store in local storage
  storeTaskInLocakStorage(taskInput.value);

  //clear the input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocakStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

}


//Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
       e.target.parentElement.parentElement.remove();

       //Remove from loca storage
       removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       
    }
  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
        if(localStorage.getItem('tasks')===null){
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task, index){
          if(taskItem.textContent === task){
            tasks.splice(index, 1);
          }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks(){
  //taskList.innerHTML = '';
  //removing with while loop and removechild
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //Clear tasks from Local Storage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}