import readline from "readline";
import type { ReadStream } from "tty";

export interface Api {
  break: () => void;
  complete: () => void;
  exit: () => void;
  longBreak: () => void;
  pausePlay: () => void;
  pomodoro: () => void;
  restart: () => void;
  skip: () => void;
}

export const initEvents = (api: Api, stream: ReadStream) => {
  // Configure readline
  readline.emitKeypressEvents(stream);
  if (stream.isTTY) {
    stream.setRawMode(true);
  }

  // Create interface
  readline.createInterface({
    input: stream,
    // output: process.stdout,
  });

  // Listen for keypress events
  stream.on("keypress", (str, key) => {
    if (key && key.ctrl && key.name === "c") {
      api.exit();
    }

    switch (key.name) {
      case "space":
        api.pausePlay();
        break;
      case "s":
        api.skip();
        break;
      case "r":
        api.restart();
        break;
      case "b":
        api.break();
        break;
      case "l":
        api.longBreak();
        break;
      case "p":
        api.pomodoro();
        break;
      case "c":
        api.complete();
        break;
    }
  });
};
