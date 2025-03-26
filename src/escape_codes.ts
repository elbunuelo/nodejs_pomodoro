export const Escape = {
  HIDE_CURSOR: "\u001B[?25l",
  SHOW_CURSOR: "\u001B[?25h",
  CLEAR_CONSOLE: "\u001B[2J",
};

// Add 1 to row and column so that they can be treated
// as 0-indexed, ANSI scape codes expect rows and columns
// to be 1-indexed.
export const moveCursor = (row: number, column: number) =>
  `\x1b[${row + 1};${column + 1}H`;
