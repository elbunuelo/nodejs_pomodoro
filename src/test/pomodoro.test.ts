import { vi, test, expect } from "vitest";
import { startPomodoro, startBreak, startLongBreak } from "../pomodoro";

test("start pomodoro", () => {
  const state = {
    mode: "break",
    time: 0,
  };
  const playWorkSound = vi.fn();
  startPomodoro(state as any, playWorkSound);
  expect(state.mode).toBe("pomodoro");
  expect(state.time).toBe(25 * 60 * 1000);
  expect(playWorkSound).toHaveBeenCalled();
});

test("start break", () => {
  const state = {
    mode: "pomodoro",
    time: 0,
  };
  const playBreakSound = vi.fn();
  startBreak(state as any, playBreakSound);
  expect(state.mode).toBe("break");
  expect(state.time).toBe(5 * 60 * 1000);
  expect(playBreakSound).toHaveBeenCalled();
});

test("start long break", () => {
  const state = {
    mode: "pomodoro",
    time: 0,
  };
  const playLongBreakSound = vi.fn();
  startLongBreak(state as any, playLongBreakSound);
  expect(state.mode).toBe("long_break");
  expect(state.time).toBe(15 * 60 * 1000);
  expect(playLongBreakSound).toHaveBeenCalled();
});
