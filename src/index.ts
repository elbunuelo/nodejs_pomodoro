import { initEvents } from "./events";
import { playWorkSound, playBreakSound, playLongBreakSound } from "./sound";
import { renderBar, renderMode, renderPomodoros, renderTimer } from "./render"; // let DEFAULT_POMODORO_LENGTH: number = 60 * 25 * 1000;
import { startPomodoro, startBreak, startLongBreak } from "./pomodoro";
import type { State } from "./types";
import {
  DEFAULT_TOTAL_POMODOROS,
  getCurrentIntervalLength,
  getDisplayTime,
  INTERVAL_LENGTH,
  MODE,
} from "./utils";
import { Escape, moveCursor } from "./escape_codes";

const render = (state: State) => {
  process.stdout.cork();
  process.stdout.write(Escape.HIDE_CURSOR);
  renderTimer(getDisplayTime(state.time));
  renderBar(state.time, state.mode);
  renderPomodoros(state.totalPomodoros, state.completedPomodoros);
  renderMode(state.mode);
  process.stdout.uncork();
};

export const startInterval = (state: State) => {
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
          startLongBreak(state, playLongBreakSound);
        } else {
          startBreak(state, playBreakSound);
        }
      } else {
        startPomodoro(state, playWorkSound);
      }
      return;
    }
    state.time -= INTERVAL_LENGTH;
    render(state);
  }, INTERVAL_LENGTH);
};

const state: State = {
  interval: undefined,
  mode: MODE.pomodoro,
  time: getCurrentIntervalLength(MODE.pomodoro),
  totalPomodoros: DEFAULT_TOTAL_POMODOROS,
  completedPomodoros: 0,
};

startInterval(state);
render(state);

const api = {
  exit(state: State) {
    console.clear();
    process.exit(0);
  },
  complete(state: State) {
    state.time = 0;
  },
  pausePlay(state: State) {
    if (state.interval) {
      clearInterval(state.interval);
      state.interval = undefined;
    } else {
      startInterval(state);
    }
    render(state);
  },
  skip(state: State) {
    if (["break", "long_break"].includes(state.mode)) {
      startPomodoro(state, playWorkSound);
    } else {
      startBreak(state, playBreakSound);
    }
  },
  restart(state: State) {
    switch (state.mode) {
      case "break":
        startBreak(state, playBreakSound);
        break;
      case "long_break":
        startLongBreak(state, playLongBreakSound);
        break;
      case "pomodoro":
        startPomodoro(state, playWorkSound);
        break;
    }
  },
  break(state: State) {
    startBreak(state, playBreakSound);
  },
  longBreak(state: State) {
    startLongBreak(state, playLongBreakSound);
  },
  pomodoro(state: State) {
    startPomodoro(state, playWorkSound);
  },
};
initEvents({ api, state, stream: process.stdin });

process.stdout.write(`${Escape.SHOW_CURSOR}${moveCursor(0, 0)}`);
