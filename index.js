const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage and add them to the list
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach((task) => addTask(task.text, task.completed));

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText, false);
    taskInput.value = "";
  }
});

function addTask(text, completed) {
  // Create task item and set text
  const taskItem = document.createElement("li");
  const taskText = document.createElement("span");

  // * For Complete Button *
  const button = document.createElement("button")
  button.innerText = `Done`
  taskItem.appendChild(button)

  button.addEventListener('click', () => {
    taskItem.classList.add('completed')
  })

  
  // * For Delete Button *
  const buttondel = document.createElement("button")
  buttondel.innerText = `Delete`
  taskItem.appendChild(buttondel)

  buttondel.addEventListener('click', () => {
    // taskItem.remove('span')
    taskItem.removeChild(taskText);
    localStorage.removeItem("tasks");
  });


  // * For Edit Button *
  const buttonedit = document.createElement("button")
  buttonedit.innerText = `Edit`
  taskItem.appendChild(buttonedit)

  buttonedit.addEventListener('click', () => {
    const newContent = prompt("Enter new content:");
    if (newContent !== null && newContent.trim() !== '') {
      taskText.textContent = newContent;
    }
  })

  taskText.textContent = text;
  taskItem.appendChild(taskText);

  taskList.appendChild(taskItem);

  // Save updated tasks to local storage
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector("span").textContent, // Extract task text
    completed: task.classList.contains("completed") // Check if task is completed
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to local storage
}
