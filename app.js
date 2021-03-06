const minSetter = document.getElementById('set-min');
const secSetter = document.getElementById('set-sec');
const minute = document.getElementById('min');
const second = document.getElementById('sec');
const centisecond = document.getElementById('cs');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');

minute.textContent = '00';
second.textContent = '00';
centisecond.textContent = '00';

const stopWatch = {
  min: 0,
  sec: 0,
  cs: 0,
  isPlay: false,
  isCountDown: false,
};

let { min, sec, cs, isPlay, isCountDown } = stopWatch;

playBtn.textContent = 'Play';
pauseBtn.textContent = 'Pauze';
stopBtn.textContent = 'Stop';

function play() {
  isPlay = true;
  checkSetter();

  if (isCountDown) {
    countDown();
  } else {
    countUp();
  }
}

function checkSetter() {
  if (minSetter.value !== '' && minSetter.value !== 0) {
    isCountDown = true;
    min = minSetter.value;
    cs = 100;
  }
  if (secSetter.value !== '' && secSetter.value !== 0) {
    isCountDown = true;
    sec = secSetter.value;
    cs = 100;
  }
  minSetter.value = '';
  secSetter.value = '';
}

function countDown() {
  cs--;
  if (cs === 0 && sec === 0 && min === 0) {
    stop();
  }
  if (cs === 0 && sec > 0) {
    sec--;
    cs = 100;
  }
  if (cs === 0 && sec === 0 && min !== 0) {
    min--;
    sec = 59;
    cs = 100;
  }
  display();
}

function countUp() {
  cs++;
  if (cs === 100) {
    cs = 0;
    sec++;
  }
  if (sec === 60) {
    sec = 0;
    min++;
  }
  display();
}

function pause() {
  if (isPlay) {
    clearInterval(player);
  }
}

function stop() {
  clearInterval(player);
  reset();
  display();
}

function reset() {
  min = 0;
  sec = 0;
  cs = 0;
  isPlay = false;
  isCountDown = false;
}

function display() {
  minute.textContent = min < 10 ? '0' + min : min;
  second.textContent = sec < 10 ? '0' + sec : sec;
  if (cs === 100) {
    centisecond.textContent = '0' + 0;
  } else {
    centisecond.textContent = cs < 10 ? '0' + cs : cs;
  }
}

playBtn.addEventListener('click', () => {
  player = setInterval(play, 10);
});

pauseBtn.addEventListener('click', pause);
stopBtn.addEventListener('click', stop);

minSetter.addEventListener('input', () => {
  if (!isPlay && minSetter.value !== '' && minSetter.value <= 99) {
    minute.textContent =
      minSetter.value < 10 ? '0' + minSetter.value : minSetter.value;
  }
});

secSetter.addEventListener('input', () => {
  if (!isPlay && secSetter.value !== '' && secSetter.value <= 59) {
    second.textContent =
      secSetter.value < 10 ? '0' + secSetter.value : secSetter.value;
  }
});
