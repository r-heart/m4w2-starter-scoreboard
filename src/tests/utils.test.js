import { formatMinutesAndSeconds } from "../utils";

test("formatMinutesAndSeconds", () => {
  expect(formatMinutesAndSeconds(0)).toBe("00:00");
  expect(formatMinutesAndSeconds(1)).toBe("00:01");
  expect(formatMinutesAndSeconds(60)).toBe("1:00");
  expect(formatMinutesAndSeconds(61)).toBe("1:01");
  expect(formatMinutesAndSeconds(3599)).toBe("59:59");
  expect(formatMinutesAndSeconds(3600)).toBe("60:00");
  expect(formatMinutesAndSeconds(3601)).toBe("60:01");
});
