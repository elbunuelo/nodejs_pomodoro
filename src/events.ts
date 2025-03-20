import readline from "readline";

interface Api {
  pausePlay: () => void;
  skip: () => void;
  restart: () => void;
  break: () => void;
  longBreak: () => void;
  pomodoro: () => void;
}

export const initEvents = (api: Api) => {
  // Configure readline
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  // Create interface
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Listen for keypress events
  process.stdin.on("keypress", (str, key) => {
    if (key && key.ctrl && key.name === "c") {
      console.log("Exiting...");
      process.exit();
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
    }
  });
};
