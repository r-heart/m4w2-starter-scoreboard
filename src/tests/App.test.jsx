import { render, screen, waitFor } from "@testing-library/react";
import { setup } from "src/setupTests.js";
import App from "../App";
import CONFIG from "../config";

test("intitial render", async () => {
  const rendered = render(<App />);
  expect(rendered).toMatchSnapshot();
});

it("renders the correct buttons whenever a sport is selected", async () => {
  const { user } = setup(<App />);

  const select = screen.getByRole("combobox");

  // Select the first actual choice (not the placeholder option)
  await user.selectOptions(select, "⚽/🏒");

  const buttons = screen.getAllByRole("button");

  expect(buttons).toHaveLength(CONFIG[0].buttons.length);
});

it("limits the numbers of periods to the number specified in the config", async () => {
  const { user } = setup(<App />);

  const periodsInput = screen.getByLabelText(/periods/i);
  const goBtn = screen.getByRole("button", { name: /Go/i });

  await user.type(periodsInput, "3");
  await user.click(goBtn);

  const nextPeriodBtn = await screen.findByRole("button", {
    name: "Next Period",
  });
  const periodP = await screen.findByTestId("period");

  await user.click(nextPeriodBtn);
  await user.click(nextPeriodBtn);
  await user.click(nextPeriodBtn);

  expect(periodP).toHaveTextContent("3");
});

it("starts with the correct time remaining", async () => {
  const { user } = setup(<App />);

  const timeRemainingInput = screen.getByLabelText(/time/i);
  const goBtn = screen.getByRole("button", { name: /Go/i });

  await user.type(timeRemainingInput, "10");
  await user.click(goBtn);

  const startBtn = await screen.findByRole("button", { name: "Start" });
  const timeDisplay = await screen.findByTestId("time");
  await user.click(startBtn);

  await waitFor(() => {
    expect(timeDisplay).toHaveTextContent("10:00");
  });
});
