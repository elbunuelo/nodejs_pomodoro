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
