import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../components/Display";

test("initial render", () => {
  const rendered = render(
    <Display buttons={[1, 2, 3]} periods={3} timePerPeriod={5} />
  );
  expect(rendered).toMatchSnapshot();
});

it("updates the Away score", () => {
  it("updates the Away score", async () => {
    const user = userEvent.setup();
    render(<Display buttons={[1, 2, 3]} periods={3} timePerPeriod={5} />);
    const awayButton = screen.getByRole("button", { name: "1" });
    const awayScore = screen.getByTestId("away-score");
    await user.click(awayButton);
    expect(awayScore).toHaveTextContent("1");
  });
});

it("update the Home and Away score based on the toggles", async () => {
  const user = userEvent.setup();
  render(<Display buttons={[1, 2, 3]} periods={3} timePerPeriod={5} />);
  const buttons = screen.getByRole("button");

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

it("advances the period only pu to the max periods", async () => {
  const user = userEvent.setup();
  render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={5} />);

  const nextPeriodButton = screen.getByRole("button", { name: "Next Period" });
  const periodP = screen.getByTestId("period");

  await user.click(nextPeriodButton);
  expect(periodP).toHaveTextContent("2");

  // Limited to two periods
  await user.click(nextPeriodButton);
  expect(periodP).toHaveTextContent("2");
});
