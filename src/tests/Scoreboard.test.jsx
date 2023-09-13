import { render } from "@testing-library/react";
import Scoreboard from "../components/Scoreboard";

test("renders the scoreboard", () => {
  const rendered = render(<Scoreboard />);
  expect(rendered).toMatchSnapshot();
});

it("initial render", () => {
  const rendered = render(<Scoreboard timeRemaining={1} />);
  expect(rendered).toMatchSnapshot();
});

it("shows minutes and seconds in proper format", () => {
  render(<Scoreboard timeRemaining={899} />);
  const timeP = screen.getByTestID("time");
  expect(timeP).toHaveTextContent("14:59");
});
