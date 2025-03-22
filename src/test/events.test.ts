import EventEmitter from "events";

import { vi, test, expect } from "vitest";

import { type Api, initEvents } from "../events";

class StreamMock extends EventEmitter {
  isTTY = true;
  setRawMode() {}
  resume() {}
}

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
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "space" });
  expect(api.pausePlay).toHaveBeenCalled();
});

test("It skips on s keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "s" });
  expect(api.skip).toHaveBeenCalled();
});

test("It restarts on r keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "r" });
  expect(api.restart).toHaveBeenCalled();
});

test("It breaks on b keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "b" });
  expect(api.break).toHaveBeenCalled();
});

test("It long breaks on l keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "l" });
  expect(api.longBreak).toHaveBeenCalled();
});

test("It starts pomodoro on p keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "p" });
  expect(api.pomodoro).toHaveBeenCalled();
});

test("It starts pomodoro on p keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "p" });
  expect(api.pomodoro).toHaveBeenCalled();
});

test("It completes on c keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "c" });
  expect(api.complete).toHaveBeenCalled();
});

test("It exits on ctrl + c keypress", () => {
  const api = getMockApi();
  const stream = new StreamMock();
  initEvents(api, stream as any);
  stream.emit("keypress", "", { name: "c", ctrl: true });
  expect(api.exit).toHaveBeenCalled();
});
