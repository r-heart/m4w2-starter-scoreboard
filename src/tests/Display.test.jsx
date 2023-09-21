import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "src/routes/Display.jsx";
import { setup } from "src/setupTests.js";
import { vi } from "vitest";

// use describe blocks to group related tests
// describe block for tests using the setup function
describe("tests using the setup function", () => {
  let rendered;

  // beforeEach block to render the component before each test
  beforeEach(() => {
    rendered = setup(
      <Display buttons={[1, 2, 3]} periods={2} timePerPeriod={5} />
    );
  });

  it("initial render", () => {
    expect(rendered.container).toMatchSnapshot();
  });

  it("updates the Away score", async () => {
    const { user } = setup();
    const awayButton = screen.getByRole("button", { name: "1" });
    const awayScore = screen.getByTestId("away-score");
    await user.click(awayButton);
    expect(awayScore).toHaveTextContent("1");
  });

  it("updates the Home and Away score based on the toggles", async () => {
    const { user } = setup();
    const buttons = screen.getAllByRole("button");

    // Toggle starts with "away" selected
    const toggle = screen.getByRole("checkbox");

    const awayScore = screen.getByTestId("away-score");
    const homeScore = screen.getByTestId("home-score");

    await user.click(buttons[0]);

    expect(awayScore).toHaveTextContent("1");
    expect(homeScore).toHaveTextContent("0");

    await user.click(toggle);
    await user.click(buttons[0]);

    expect(awayScore).toHaveTextContent("1");
    expect(homeScore).toHaveTextContent("1");

    await user.click(toggle);
    await user.click(buttons[0]);

    expect(awayScore).toHaveTextContent("2");
    expect(homeScore).toHaveTextContent("1");
  });

  it("advances the period only up to the max periods", async () => {
    const { user } = setup();

    const nextPeriodButton = screen.getByRole("button", {
      name: "Next Period",
    });
    const periodP = screen.getByTestId("period");

    await user.click(nextPeriodButton);
    expect(periodP).toHaveTextContent("2");

    // Limited to two periods
    await user.click(nextPeriodButton);
    expect(periodP).toHaveTextContent("2");
  });
});

describe("tests without the setup function", () => {
  // Testing Timers

  beforeAll(() => {
    vi.useFakeTimers();
  });

  test("timer reflects MM:SS accurately", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={10} />);

    const startBtn = screen.getByRole("button", { name: "Start" });
    const timeDisplay = screen.getByTestId("time");

    await user.click(startBtn);

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("10:00");
    });

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:30");
    });

    act(() => {
      // 6 more seconds
      vi.advanceTimersByTime(6000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:24");
    });

    act(() => {
      // 1 second left! ⏳
      vi.advanceTimersByTime(563000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("0:01");
    });
  });

  test("stops and restarts timer", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={10} />);

    const startBtn = screen.getByRole("button", { name: "Start" });
    const stopBtn = screen.getByRole("button", { name: "Stop" });
    const timeDisplay = screen.getByTestId("time");

    await user.click(startBtn);

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    await user.click(stopBtn);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      // Even though 40 seconds have elapsed...
      expect(timeDisplay).toHaveTextContent("9:30");
    });

    await user.click(startBtn);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:20");
    });
  });

  test("resets the time display when period is advanced", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={10} />);

    const startBtn = screen.getByRole("button", { name: "Start" });
    const nextPeriodBtn = screen.getByRole("button", { name: "Next Period" });
    const timeDisplay = screen.getByTestId("time");

    await user.click(startBtn);

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:30");
    });

    await user.click(nextPeriodBtn);

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("10:00");
    });
  });
});
