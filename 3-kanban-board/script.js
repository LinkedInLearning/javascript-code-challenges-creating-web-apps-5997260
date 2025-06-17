const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const columnContainers = document.querySelectorAll(".column");

let draggedTask = null;

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      id: task.dataset.id,
      text: task.textContent,
      status: task.closest(".column").dataset.status,
    });
  });
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("kanbanTasks");
  if (saved) {
    JSON.parse(saved).forEach(({ id, text, status }) => {
      const task = createTaskElement(text, id);
      document.querySelector(`#${status}`).appendChild(task);
    });
  }
}

function deleteTaskFromStorage(id) {
  const tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];
  const updated = tasks.filter((task) => task.id !== id);
  localStorage.setItem("kanbanTasks", JSON.stringify(updated));
}

function createTaskElement(text, id = Date.now().toString()) {
  const task = document.createElement("div");
  task.className = "task";
  task.textContent = text;
  task.dataset.id = id;
  task.draggable = true;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    task.remove();
    deleteTaskFromStorage(id);
  });

  task.appendChild(deleteBtn);

  task.addEventListener("dragstart", handleDragStart);

  task.addEventListener("dragend", handleDragEnd);

  return task;
}

taskForm.addEventListener("submit", handleTaskSubmit);

columnContainers.forEach((column) => {
  column.addEventListener("dragover", handleDragOver);

  column.addEventListener("drop", handleDrop);
});

function handleDragStart(e) {
  draggedTask = this;
  e.dataTransfer.effectAllowed = "move";
  setTimeout(() => this.classList.add("hidden"), 0);
}

function handleDragEnd() {
  this.classList.remove("hidden");
  draggedTask = null;
  saveTasks();
}

function handleTaskSubmit(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const task = createTaskElement(text);
  document.getElementById("todo").appendChild(task);
  taskInput.value = "";
  saveTasks();
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function handleDrop(e) {
  const taskList = this.querySelector(".task-list");
  if (draggedTask && taskList) {
    taskList.appendChild(draggedTask);
    saveTasks();
  }
}

loadTasks();