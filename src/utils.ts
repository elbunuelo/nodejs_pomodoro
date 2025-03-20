export const DEFAULT_TOTAL_POMODOROS: number = 16;
export const DEFAULT_POMODORO_LENGTH: number = 60 * 25 * 1000;
export const DEFAULT_BREAK_LENGTH: number = 60 * 5 * 1000;
export const DEFAULT_LONG_BREAK_LENGTH: number = 60 * 15 * 1000;
export const INTERVAL_LENGTH: number = 1000;

export const MODE = {
  break: "break",
  long_break: "long_break",
  pomodoro: "pomodoro",
};

export const getCurrentIntervalLength = (mode: string) => {
  switch (mode) {
    case MODE.break:
      return DEFAULT_BREAK_LENGTH;
    case MODE.long_break:
      return DEFAULT_LONG_BREAK_LENGTH;
    case MODE.pomodoro:
    default:
      return DEFAULT_POMODORO_LENGTH;
  }
};
