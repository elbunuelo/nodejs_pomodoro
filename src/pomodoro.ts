import type { State } from "./types";
import { getCurrentIntervalLength, MODE } from "./utils";

export const startPomodoro = (state: State, playSound: () => void) => {
  state.mode = MODE.pomodoro;
  state.time = getCurrentIntervalLength(state.mode);
  playSound();
};

export const startBreak = (state: State, playSound: () => void) => {
  state.mode = MODE.break;
  state.time = getCurrentIntervalLength(state.mode);
  playSound();
};

export const startLongBreak = (state: State, playSound: () => void) => {
  state.mode = MODE.long_break;
  state.time = getCurrentIntervalLength(state.mode);
  playSound();
};
