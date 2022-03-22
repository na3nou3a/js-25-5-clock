// break length control
const decrementBrkLBtn = document.getElementById('break-decrement');
const incrementBrkLBtn = document.getElementById('break-increment');
const breakLength = document.getElementById('break-length');
// session length control
const decrementSesLBtn = document.getElementById('session-decrement');
const incrementSesLBtn = document.getElementById('session-increment');
const sessionLength = document.getElementById('session-length');
// label for session or break
const label = document.getElementById('timer-label');
const remainingTime = document.getElementById('time-left');
// toggle play pause btn
const togglePlayBtn = document.getElementById('start_stop');
// reset btn
const resetBtn = document.getElementById('reset');
// beep
const beep = document.getElementById('beep');
/*==================== LOGIC ====================*/
let brkL = 5;
let sesL = 25;
let timerType = 'session';
let timerState = 'stopped';
let date = new Date(2022, 0, 1, 0, sesL, 0, 0);
let intervalId = null;
/*==================== EVENTS ====================*/
// break
decrementBrkLBtn.addEventListener('click', () => {
  if (timerState === 'running') return;
  if (brkL <= 1) return;
  brkL--;
  updateBreakLength();
  updateDate();
  remainingTime.textContent = getRemainingTime();
});

incrementBrkLBtn.addEventListener('click', () => {
  if (timerState === 'running') return;
  if (brkL >= 60) return;
  brkL++;
  updateBreakLength();
  updateDate();
  remainingTime.textContent = getRemainingTime();
});
// session
decrementSesLBtn.addEventListener('click', () => {
  if (timerState === 'running') return;
  if (sesL <= 1) return;
  sesL--;
  updateSessionLength();
  updateDate();
  remainingTime.textContent = getRemainingTime();
});

incrementSesLBtn.addEventListener('click', () => {
  if (timerState === 'running') return;
  if (sesL >= 60) return;
  sesL++;
  updateSessionLength();
  updateDate();
  remainingTime.textContent = getRemainingTime();
});

// togle play
togglePlayBtn.addEventListener('click', () => {
  changeIcons();
  toggleTimerState();

  if (timerState === 'running') {
    intervalId = setInterval(() => {
      date.setSeconds(date.getSeconds() - 1);
      const isLastMinut = checkIfLastMin();
      const isLast10seconds = checkIfLast10seconds();
      const isTimerEnded = checkIfTimerEnded();
      if (isLastMinut) {
        remainingTime.classList.add('text-danger', 'bg-light');
        label.classList.add('text-danger', 'bg-light');
      }
      if (isLast10seconds) {
        beep.play();
      }
      if (isTimerEnded) {
        alternateSesBrk();
      }
      remainingTime.textContent = getRemainingTime();
    }, 1000);
  } else {
    clearInterval(intervalId);
  }
});

// reset btn
resetBtn.addEventListener('click', reset);

/*==================== FUNCTIONS ====================*/
// remaining time
const getRemainingTime = () => {
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return `${minutes.toString()}:${seconds.toString()}`;
};
// update break length
const updateBreakLength = () => (breakLength.textContent = brkL);
// update session length
const updateSessionLength = () => (sessionLength.textContent = sesL);
// update label
const updateLabel = () => {
  label.textContent = timerType;
};
// update date
const updateDate = () => {
  if (timerType === 'session') {
    date = new Date(2022, 0, 1, 0, sesL, 0, 0);
  } else {
    date = new Date(2022, 0, 1, 0, brkL, 0, 0);
  }
};
// update bcg image
const updateBcgImage = () => {
  const container = document.querySelector('.bcg-container');
  if (timerType === 'session') {
    container.classList.add('bcg1');
    container.classList.remove('bcg2');
  } else {
    container.classList.add('bcg2');
    container.classList.remove('bcg1');
  }
};
// check if it is the last 60 seconds
const checkIfLastMin = () => {
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (minutes === 0 && seconds <= 60) {
    return true;
  }
  return false;
};
// check if last 5 seconds
const checkIfLast10seconds = () => {
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (minutes <= 0 && seconds <= 10) {
    return true;
  }
  return false;
};
// check if it is 00:00
const checkIfTimerEnded = () => {
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (minutes <= 0 && seconds <= 0) {
    return true;
  }
  return false;
};

// alternate Session Break
const alternateSesBrk = () => {
  if (timerType === 'session') {
    timerType = 'break';
  } else {
    timerType = 'session';
  }
  updateDate();
  updateLabel();
  updateBcgImage();
  beep.pause();
  beep.currentTime = 0;
  remainingTime.classList.remove('text-danger', 'bg-light');
  label.classList.remove('text-danger', 'bg-light');
};

// reset
function reset() {
  brkL = 5;
  sesL = 25;
  timerType = 'session';
  timerState = 'stopped';
  clearInterval(intervalId);
  date = new Date(2022, 0, 1, 0, sesL, 0, 0);
  remainingTime.classList.remove('text-danger', 'bg-light');
  label.classList.remove('text-danger', 'bg-light');
  remainingTime.textContent = getRemainingTime();
  updateBreakLength();
  updateSessionLength();
  updateLabel();
  updateBcgImage();
  beep.pause();
  beep.currentTime = 0;
}
// change play pause icons
const changeIcons = () => {
  const icon = togglePlayBtn.querySelector('.icon');
  if (icon.classList.contains('bi-play-circle')) {
    icon.classList.remove('bi-play-circle');
    icon.classList.add('bi-pause-circle');
  } else {
    icon.classList.remove('bi-pause-circle');
    icon.classList.add('bi-play-circle');
  }
};
// toggle timer state
const toggleTimerState = () => {
  timerState = timerState === 'stopped' ? 'running' : 'stopped';
};
// init
const init = () => {
  updateLabel();
  updateBreakLength();
  updateSessionLength();
  remainingTime.textContent = getRemainingTime();
  updateBcgImage();
};
init();
