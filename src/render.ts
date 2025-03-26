import { Escape, moveCursor } from "./escape_codes";
import * as glyphs from "./glyphs";
import { getCurrentIntervalLength } from "./utils";

const PADDING_INLINE = 2;
const PADDING_BLOCK = 1;
export const getGlyph = (character: string): string[][] | undefined => {
  switch (character) {
    case ":":
      return glyphs.colon;
    case "0":
      return glyphs.zero;
    case "1":
      return glyphs.one;
    case "2":
      return glyphs.two;
    case "3":
      return glyphs.three;
    case "4":
      return glyphs.four;
    case "5":
      return glyphs.five;
    case "6":
      return glyphs.six;
    case "7":
      return glyphs.seven;
    case "8":
      return glyphs.eight;
    case "9":
      return glyphs.nine;
  }
};

export const renderMode = (mode: string) => {
  const { rows } = process.stdout;

  let text = "";
  switch (mode) {
    case "pomodoro":
      text = "Work";
      break;
    case "break":
      text = "Break";
      break;
    case "long_break":
      text = "Long Break";
      break;
  }

  const x = rows - 4 - glyphs.zero.length - 1;
  const y = PADDING_INLINE + 1;

  process.stdout.write(moveCursor(x, y));
  process.stdout.write(text);
};
export const renderTimer = (text: string) => {
  const renderArray: string[][] = [];

  for (const character of text) {
    const glyph = getGlyph(character);
    if (!glyph) continue;
    glyph.forEach((line, index) => {
      if (!renderArray[index]) {
        renderArray[index] = [];
      }

      renderArray[index] = renderArray[index].concat([" "], line);
    });
  }

  process.stdout.write(`${Escape.CLEAR_CONSOLE}${moveCursor(0, 0)}`);
  const { rows } = process.stdout;
  const timerPosition = rows - 4 - renderArray.length;
  for (let i = 0; i < renderArray.length; i++) {
    process.stdout.write(moveCursor(timerPosition + i, PADDING_INLINE));
    const line = renderArray[i];
    process.stdout.write(line.join(""));
  }
};

export const renderBar = (time: number, mode: string) => {
  const { columns, rows } = process.stdout;

  const total = getCurrentIntervalLength(mode);
  const barLength = columns - 2 * PADDING_INLINE;
  const completedTotal = time / total;
  const fillPortion = Math.ceil(barLength * completedTotal);

  const barRow = rows - PADDING_BLOCK - 3;

  process.stdout.write(moveCursor(barRow, PADDING_INLINE));
  process.stdout.write("┏");
  process.stdout.write(moveCursor(barRow + 1, PADDING_INLINE));
  process.stdout.write("|");
  process.stdout.write(moveCursor(barRow + 2, PADDING_INLINE));
  process.stdout.write("┗");

  process.stdout.write(moveCursor(barRow, columns - PADDING_INLINE - 1));
  process.stdout.write("┓");
  process.stdout.write(moveCursor(barRow + 1, columns - PADDING_INLINE - 1));
  process.stdout.write("|");
  process.stdout.write(moveCursor(barRow + 2, columns - PADDING_INLINE - 1));
  process.stdout.write("┛");

  for (let i = 1; i < barLength - 1; i++) {
    process.stdout.write(moveCursor(barRow, PADDING_INLINE + i));
    process.stdout.write("-");
    process.stdout.write(moveCursor(barRow + 1, PADDING_INLINE + i));
    process.stdout.write(i <= fillPortion ? "█" : " ");
    process.stdout.write(moveCursor(barRow + 2, PADDING_INLINE + i));
    process.stdout.write("-");
  }
};

export const renderPomodoros = (estimated: number, current: number) => {
  const { rows } = process.stdout;
  for (let i = 0; i < estimated; i++) {
    const x = rows - PADDING_BLOCK - 1;
    const y = PADDING_INLINE + 1 + 2 * i;
    process.stdout.write(moveCursor(x, y));
    let icon = "";
    if (current === i) {
      icon = "";
    }
    if (i < current) {
      icon = "";
    }
    process.stdout.write(icon);
  }
};
