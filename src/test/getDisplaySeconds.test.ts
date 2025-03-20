import { test, expect } from "vitest";
import { getDisplaySeconds } from "..";

test("It returns 00 when the timer reaches zero", () => {
  expect(getDisplaySeconds(0)).toBe("00");
});

test("It returns 00 when the timer goes below zero", () => {
  expect(getDisplaySeconds(-1)).toBe("00");
});

test("It returns the right amount of seconds when exact", () => {
  expect(getDisplaySeconds(59000)).toBe("59");
});

test("It returns the right amount of seconds when not exact", () => {
  expect(getDisplaySeconds(61234)).toBe("01");
});
