import readline from "readline";
import type { EventsOptions } from "./types";

export const initEvents = ({ api, stream, state }: EventsOptions) => {
  if (readline) {
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
  }

  // Listen for keypress events
  stream.on("keypress", (str, key) => {
    if (key && key.ctrl && key.name === "c") {
      api.exit(state);
    }

    switch (key.name) {
      case "space":
        api.pausePlay(state);
        break;
      case "s":
        api.skip(state);
        break;
      case "r":
        api.restart(state);
        break;
      case "b":
        api.break(state);
        break;
      case "l":
        api.longBreak(state);
        break;
      case "p":
        api.pomodoro(state);
        break;
      case "c":
        api.complete(state);
        break;
    }
  });
};
