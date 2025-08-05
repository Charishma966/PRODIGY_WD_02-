let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateDisplay(time) {
  const hrs = String(Math.floor(time / 3600000)).padStart(2, '0');
  const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  display.textContent = `${hrs}:${mins}:${secs}`;
}

function startTimer() {
  if (!isRunning) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  difference = 0;
  lapCounter = 1;
  updateDisplay(0);
  laps.innerHTML = '';
}

function recordLap() {
  if (isRunning && difference) {
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
    laps.appendChild(li);
  }
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
lapBtn.onclick = recordLap;
