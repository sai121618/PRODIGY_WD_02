// Clean, working stopwatch logic with Start, Pause, Resume, Reset
let timer = null;
let running = false;
let elapsed = 0;
let startTime = 0;

function updateDisplay() {
  let ms = elapsed;
  const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
  ms %= 3600000;
  const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
  ms %= 60000;
  const seconds = String(Math.floor(ms / 1000)).padStart(2, '0');
  document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
}

function setDisplayColor(colorClass) {
  const display = document.getElementById('display');
  display.classList.remove('color-start', 'color-pause', 'color-resume', 'color-reset');
  if (colorClass) display.classList.add(colorClass);
}

function start() {
  if (running) return;
  running = true;
  setDisplayColor('color-start');
  startTime = Date.now() - elapsed;
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 100);
}

function pause() {
  if (!running) return;
  running = false;
  clearInterval(timer);
  setDisplayColor('color-pause');
}

function resume() {
  if (running) return;
  running = true;
  setDisplayColor('color-resume');
  startTime = Date.now() - elapsed;
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 100);
}

function reset() {
  running = false;
  clearInterval(timer);
  elapsed = 0;
  setDisplayColor('color-reset');
  updateDisplay();
}

// Initialize display
updateDisplay();
