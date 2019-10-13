// Task Constructor
function Task(id, name) {
  this.id = id;
  this.name = name;
}

// UI Element
const list = document.getElementById('task-list');

// Add task to UI
UI.prototype.addTaskToList = function(task) {
  // Create ul
  const row = document.createElement('li');
  // Insert li with task
  row.innerHTML = `
  ${task.name}
  `
  list.appendChild(row);
}

// Delete last task from UI
UI.prototype.deleteLastTask = function() {
  const listItems = list.getElementsByTagName("li");
  var last = listItems[listItems.length-1];
  list.removeChild(last);
}

// Clear Tasks
UI.prototype.clearTask = function() {
  list.innerHTML = '';
}

// Show validation error
UI.prototype.showAlert = function(message, className) {
  // Clear any remaing alert
  this.clearAlert();
  // Create div
  const div = document.createElement('div');
  // Add Classes
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const buttons = document.querySelector('.buttons');
  // Insert alert
  container.insertBefore(div, buttons);
  // Timeout after 3sec
  setTimeout( function() {
    ui.clearAlert();
  }, 3000);
}

UI.prototype.clearAlert = function() {
  const currentAlert = document.querySelector('.alert')
  if (currentAlert) {
    currentAlert.remove();
  }
}

// UI Constructor
function UI() {}

// Store ID in array
const idArr = [];  


// Instaniate UI
const ui = new UI();
// Event listeners
document.getElementById("add-task").addEventListener('click' , function(e) {
  e.preventDefault();
  console.log('add')
  // Create ID
  let id;
  if (idArr.length === 0) {
    id = 1 
  } else {
    id = idArr.length + 1;
  }
  idArr.push(id);
  // Instiantiane Task
  const task = new Task(id, `task number #${id}`);
  // Add task to list
  ui.addTaskToList(task);
  // Show success alert
  ui.showAlert('Task added!', 'success')
});

document.getElementById('delete-task').addEventListener('click', function(e) {
  e.preventDefault();
  if(idArr.length === 0) {
    ui.showAlert('Please add a task', 'error')
  } else {
  // Remove from UI
  ui.deleteLastTask();
  // Show success alert
  ui.showAlert('Task removed!', 'success')
  // Remove last ID from Array
  idArr.pop();
  }
})

document.getElementById('clear-list').addEventListener('click', function(e) {
  e.preventDefault();
  if(idArr.length === 0) {
    ui.showAlert('Please add a task', 'error')
  } else {
  // Remove from UI
  ui.clearTask();
  // Show success alert
  ui.showAlert('List clear!', 'success')
  // Remove all ID's from Array
  idArr.length = 0;
  }
})