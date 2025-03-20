import { initEvents } from "./events";
import { renderBar, renderMode, renderPomodoros, renderTimer } from "./render"; // let DEFAULT_POMODORO_LENGTH: number = 60 * 25 * 1000;
import { playBreakSound, playLongBreakSound, playWorkSound } from "./sound";
import {
  DEFAULT_TOTAL_POMODOROS,
  getCurrentIntervalLength,
  INTERVAL_LENGTH,
  MODE,
} from "./utils";

export const withLeadingZero = (num: number) => {
  num = Math.max(num, 0);
  const leadingZero = num < 10 ? "0" : "";
  return `${leadingZero}${num}`;
};

const getMinutesInMilliseconds = (time: number) => {
  time = Math.max(time, 0);
  return Math.floor(time / 60);
};

export const getDisplayMinutes = (time: number): string => {
  const minutes = Math.floor(getMinutesInMilliseconds(time) / 1000);
  return withLeadingZero(minutes);
};

export const getDisplaySeconds = (time: number): string => {
  time = Math.max(time, 0);
  const seconds = Math.floor((time % 60000) / 1000);

  return withLeadingZero(seconds);
};

export const getDisplayTime = (time: number): string => {
  const minutes = getDisplayMinutes(time);
  const seconds = getDisplaySeconds(time);

  return `${minutes}:${seconds}`;
};

const render = (state: State) => {
  // console.clear();

  process.stdout.write("\u001B[?25l");
  renderTimer(getDisplayTime(state.time));
  renderBar(state.time, state.mode);
  renderPomodoros(state.totalPomodoros, state.completedPomodoros);
  renderMode(state.mode);
};

const startPomodoro = (state: State) => {
  state.mode = MODE.pomodoro;
  state.time = getCurrentIntervalLength(state.mode);
  playWorkSound();
};

const startBreak = (state: State) => {
  state.mode = MODE.break;
  state.time = getCurrentIntervalLength(state.mode);
  playBreakSound();
};

const startLongBreak = (state: State) => {
  state.mode = MODE.long_break;
  state.time = getCurrentIntervalLength(state.mode);
  playLongBreakSound();
};

const startInterval = (state: State) => {
  state.interval = setInterval(() => {
    if (state.time <= 0) {
      if (state.mode === "pomodoro") {
        state.completedPomodoros += 1;
        if (
          state.completedPomodoros === state.totalPomodoros &&
          state.interval
        ) {
          clearInterval(state.interval);
        } else if (state.completedPomodoros % 3 === 0) {
          startLongBreak(state);
        } else {
          startBreak(state);
        }
      } else {
        startPomodoro(state);
      }
      return;
    }
    state.time -= INTERVAL_LENGTH;
    // render(state);
  }, INTERVAL_LENGTH);
};

interface State {
  interval?: NodeJS.Timeout;
  mode: string;
  time: number;
  totalPomodoros: number;
  completedPomodoros: number;
}

const state: State = {
  interval: undefined,
  mode: MODE.pomodoro,
  time: getCurrentIntervalLength(MODE.pomodoro),
  totalPomodoros: DEFAULT_TOTAL_POMODOROS,
  completedPomodoros: 0,
};

startInterval(state);
// render(state);

initEvents({
  pausePlay() {
    if (state.interval) {
      clearInterval(state.interval);
      state.interval = undefined;
    } else {
      startInterval(state);
    }
    render(state);
  },
  skip() {
    if (["break", "long_break"].includes(state.mode)) {
      startPomodoro(state);
    } else {
      startBreak(state);
    }
  },
  restart() {
    switch (state.mode) {
      case "break":
        startBreak(state);
        break;
      case "long_break":
        startLongBreak(state);
        break;
      case "pomodoro":
        startPomodoro(state);
        break;
    }
  },
  break() {
    startBreak(state);
  },
  longBreak() {
    startLongBreak(state);
  },
  pomodoro() {
    startPomodoro(state);
  },
});

process.stdout.write("\u001B[2J\u001B[0;0H");
