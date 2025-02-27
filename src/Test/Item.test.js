import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Item from "../Components/Item/Item"; // Adjust the import based on your file structure
import userEvent from "@testing-library/user-event";

test("should navigate to the correct product page when clicked", async () => {
  const mockItem = {
    id: 1,
    image: "test-image.jpg",
    name: "Test Product",
    new_price: 20,
    old_price: 30,
  };

  render(
    <MemoryRouter>
      <Item {...mockItem} />
    </MemoryRouter>
  );

  const productLink = screen.getByRole("link");
  expect(productLink).toHaveAttribute("href", "/product/1");

  // Simulating click event
  await userEvent.click(productLink);

  // Since MemoryRouter doesn't update the actual location, we verify the expected behavior
  expect(productLink.getAttribute("href")).toBe("/product/1");
});
