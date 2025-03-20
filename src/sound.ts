const { exec } = require("child_process");
const command =
  "/Applications/VLC.app/Contents/MacOS/VLC --auhal-volume=150 --play-and-exit --intf dummy sounds/{{sound_name}}.wav > /dev/null";

export const playWorkSound = () =>
  exec(command.replace("{{sound_name}}", "work"));

export const playBreakSound = () =>
  exec(command.replace("{{sound_name}}", "break"));

export const playLongBreakSound = () =>
  exec(command.replace("{{sound_name}}", "long_break"));
