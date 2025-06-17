const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const columnContainers = document.querySelectorAll(".column");

function createTaskElement(text, id = Date.now().toString) {
  const task = document.createElement("div");
  task.className = "task";
  task.textContent = text;
  task.dataset.id = id;
  task.draggable = true;

  task.addEventListener("dragstart", (e) => {

  });

  task.addEventListener("dragend", () => {

  });

  return task;
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if(taskText) {
    const task = createTaskElement(taskText);
    document.getElementById("todo").appendChild(task);
    taskInput.value = "";
  }
});