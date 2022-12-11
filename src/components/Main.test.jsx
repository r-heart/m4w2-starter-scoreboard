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

