import type { ReadStream } from "tty";

type ApiMethod = (state: State) => void;

export interface Api {
  exit: ApiMethod;
  break: ApiMethod;
  complete: ApiMethod;
  longBreak: ApiMethod;
  pausePlay: ApiMethod;
  pomodoro: ApiMethod;
  restart: ApiMethod;
  skip: ApiMethod;
}

export interface EventsOptions {
  api: Api;
  stream: ReadStream;
  state: State;
}

export interface State {
  interval?: NodeJS.Timeout;
  mode: string;
  time: number;
  totalPomodoros: number;
  completedPomodoros: number;
}
