const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const cycleCountDisplay = document.getElementById("cycleCount");

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;
const workDuration = WORK_MINUTES * 60;
const breakDuration = BREAK_MINUTES * 60;

let isWorkTime = true;
let timeLeft = workDuration;
let timer = null;
let cycleCount = 0;


function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateCycleDisplay() {
  cycleCountDisplay.textContent = `Cycles completed: ${cycleCount}`;
}

function toggleStatus() {
  isWorkTime = !isWorkTime;
  if (isWorkTime) {
    // Completed a break, now entering new focus = 1 full cycle
    cycleCount++;
    updateCycleDisplay();
}
  timeLeft = isWorkTime ? workDuration : breakDuration;
  statusDisplay.textContent = isWorkTime ? "Focus Time" : "Break Time";
}

function startTimer() {
  timer = setInterval(() => {
    if(timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      stopTimer();
      toggleStatus();
      updateTimerDisplay();
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function pauseTimer() {
  stopTimer();
}

function resetTimer() {
  stopTimer();
  timeLeft = workDuration;
  updateTimerDisplay();
  cycleCount = 0; // if you don't want reset to delete the cycle count, remove this
  updateCycleDisplay(); // and this
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();
updateCycleDisplay();