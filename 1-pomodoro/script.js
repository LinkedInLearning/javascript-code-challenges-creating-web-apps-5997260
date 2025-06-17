const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let workDuration = 0.3 * 60; // seconds
let breakDuration = 0.1 * 60; // seconds
let isWorkTime = true;
let timeLeft = workDuration;
let timer = null;

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function toggleStatus() {
  isWorkTime = !isWorkTime;
  timeLeft = isWorkTime ? workDuration : breakDuration;
  statusDisplay.textContent = isWorkTime ? "Focus Time" : "Break Time";
}

function startTimer() {
  timer = setInterval(() => {
    if(timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      toggleStatus();
      updateTimerDisplay();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = workDuration;
  updateTimerDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);