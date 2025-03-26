import { vi, test, expect } from "vitest";

import { initEvents } from "../events";
import type { Api } from "../types";

const getMockApi = (): Api => ({
  exit: vi.fn(),
  complete: vi.fn(),
  pausePlay: vi.fn(),
  skip: vi.fn(),
  restart: vi.fn(),
  break: vi.fn(),
  longBreak: vi.fn(),
  pomodoro: vi.fn(),
});

test("It pauses on space keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "space" });
  expect(api.pausePlay).toHaveBeenCalled();
});

test("It skips on s keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "s" });
  expect(api.skip).toHaveBeenCalled();
});

test("It restarts on r keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "r" });
  expect(api.restart).toHaveBeenCalled();
});

test("It breaks on b keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "b" });
  expect(api.break).toHaveBeenCalled();
});

test("It long breaks on l keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "l" });
  expect(api.longBreak).toHaveBeenCalled();
});

test("It starts pomodoro on p keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "p" });
  expect(api.pomodoro).toHaveBeenCalled();
});

const state = {
  mode: "pomodoro",
  time: 0,
  totalPomodoros: 10,
  completedPomodoros: 0,
};

test("It starts pomodoro on p keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "p" });
  expect(api.pomodoro).toHaveBeenCalled();
});

test("It completes on c keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "c" });
  expect(api.complete).toHaveBeenCalled();
});

test("It exits on ctrl + c keypress", () => {
  const api = getMockApi();
  const stream = process.stdin;
  initEvents({ api, stream, state });
  stream.emit("keypress", "", { name: "c", ctrl: true });
  expect(api.exit).toHaveBeenCalled();
});
