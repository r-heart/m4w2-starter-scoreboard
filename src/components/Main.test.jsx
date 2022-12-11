import Main from "./Main";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CONFIG from "../config";

const choices = CONFIG.map((sport) => sport.sport);

test("initial render", async () => {
  render(<Main />);

  const select = screen.getByRole("combobox");
  const options = screen.getAllByRole("option");

  const toggle = screen.getByRole("checkbox");

  const homeScore = screen.getByRole("heading", { name: "Home" });
  const awayScore = screen.getByRole("heading", { name: "Away" });

  const scores = screen.getAllByText("0");

  expect(select).toBeInTheDocument();

  // First choice is the default placeholder
  expect(options).toHaveLength(choices.length + 1);

  expect(toggle).toBeInTheDocument();

  expect(homeScore).toBeInTheDocument();
  expect(awayScore).toBeInTheDocument();

  expect(scores).toHaveLength(2);
});

it("renders the correct buttons whenever a sport is selected", async () => {
  const user = userEvent.setup();
  render(<Main />);

  const select = screen.getByRole("combobox");

  // Select the first actual choice (not the placeholder option)
  await user.selectOptions(select, "⚾/⚽/🏒");

  const buttons = screen.getAllByRole("button");

  expect(buttons).toHaveLength(CONFIG[0].buttons.length);
});

it("updates the Away score whenever a button is clicked", async () => {
  const user = userEvent.setup();
  render(<Main />);

  const select = screen.getByRole("combobox");

  // Select the first actual choice (not the placeholder option)
  await user.selectOptions(select, "⚾/⚽/🏒");

  // Wait for the buttons to render
  const buttons = await screen.findAllByRole("button");

  await user.click(buttons[0]);

  const awayScore = screen.getByTestId("away-score");

  expect(awayScore).toHaveTextContent("1");
});

it("updates the Home score only when home is toggled (updates Away score otherwise)", async () => {
  const user = userEvent.setup();
  render(<Main />);

  const select = screen.getByRole("combobox");

  // Select the first actual choice (not the placeholder option)
  await user.selectOptions(select, "⚾/⚽/🏒");

  // Wait for the buttons to render
  const buttons = await screen.findAllByRole("button");

  const toggle = screen.getByRole("checkbox");

  const homeScore = screen.getByTestId("home-score");
  const awayScore = screen.getByTestId("away-score");

  await user.click(buttons[0]);

  expect(homeScore).toHaveTextContent("0");
  expect(awayScore).toHaveTextContent("1");

  await user.click(toggle);

  await user.click(buttons[0]);

  expect(homeScore).toHaveTextContent("1");
  expect(awayScore).toHaveTextContent("1");

  await user.click(toggle);

  await user.click(buttons[0]);

  expect(homeScore).toHaveTextContent("1");
  expect(awayScore).toHaveTextContent("2");
});
