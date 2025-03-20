import { test, expect } from "vitest";
import { getDisplayTime } from "..";

test("it returns 00:00 when time is negative", () => {
  expect(getDisplayTime(-1)).toEqual("00:00");
});

test("it returns 00:00 when time is 0", () => {
  expect(getDisplayTime(0)).toEqual("00:00");
});

test("it returns the correct time when time is greater than 0", () => {
  expect(getDisplayTime(1000)).toEqual("00:01");
});
test("it returns the correct time with minutes", () => {
  expect(getDisplayTime(60000)).toEqual("01:00");
});

test("it returns the correct time with minutes and seconds", () => {
  expect(getDisplayTime((24 * 60 + 30) * 1000)).toEqual("24:30");
});
