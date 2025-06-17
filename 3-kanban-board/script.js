const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const columnContainers = document.querySelectorAll(".column");

let draggedTask = null;

function createTaskElement(text, id = Date.now().toString) {
  const task = document.createElement("div");
  task.className = "task";
  task.textContent = text;
  task.dataset.id = id;
  task.draggable = true;

  task.addEventListener("dragstart", (e) => {
    draggedTask = task;
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => task.classList.add("hidden"), 0);
  });

  task.addEventListener("dragend", () => {
    draggedTask = null;
    task.classList.remove("hidden");
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

columnContainers.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  column.addEventListener("drop", () => {
    const taskList = column.querySelector(".task-list");
    if(draggedTask && taskList) {
      taskList.appendChild(draggedTask);
    }
  });
});