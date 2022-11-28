import Main from "./Main";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("updates the count correctly whenever a button is clicked", async () => {
  // Arrange
  const user = userEvent.setup();

  // We will click 'Add 1' and then 'Add 3' to get a total of 4
  const expected = 4;

  render(<Main />);

  // Act
  const add1Btn = screen.getByRole("button", { name: /add 1/i });
  const add3Btn = screen.getByRole("button", { name: /add 3/i });

  const count = screen.getByText(0);

  await user.click(add1Btn);
  await user.click(add3Btn);

  // Assert
  expect(count).toHaveTextContent(expected);
});
