import { test, expect } from "vitest";
import {
  withLeadingZero,
  getDisplayMinutes,
  getDisplaySeconds,
  getDisplayTime,
} from "../utils";

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

// With leading zero
test("Returns 00 when the value is less than 0", () => {
  expect(withLeadingZero(-1)).toBe("00");
});

test("Returns 00 when the value is 0", () => {
  expect(withLeadingZero(0)).toBe("00");
});

test("Returns a leading 0 when the value is less than 10", () => {
  expect(withLeadingZero(9)).toBe("09");
});

test("Returns 10 when the value is 10", () => {
  expect(withLeadingZero(10)).toBe("10");
});

test("Returns the number when the value is greater than 10", () => {
  expect(withLeadingZero(11)).toBe("11");
});
