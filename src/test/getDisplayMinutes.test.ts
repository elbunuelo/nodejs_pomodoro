import { test, expect } from "vitest";
import { getDisplayMinutes } from "..";

test("It returns 00 when the time reaches 0", () => {
  expect(getDisplayMinutes(0)).toBe("00");
});

test("It returns 00 when time goes below 0", () => {
  expect(getDisplayMinutes(-1)).toBe("00");
});

test("It returns the correct amount of minutes when exact", () => {
  expect(getDisplayMinutes(60000)).toBe("01");
});

test("It returns the correct amount of minutes when not exact", () => {
  expect(getDisplayMinutes(2 * 60000 + 59000)).toBe("02");
});
