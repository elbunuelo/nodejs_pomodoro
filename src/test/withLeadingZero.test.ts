import { expect, test } from "vitest";
import { withLeadingZero } from "..";

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
