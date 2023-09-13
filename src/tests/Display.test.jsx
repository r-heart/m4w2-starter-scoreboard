import { render } from "@testing-library/react";
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
