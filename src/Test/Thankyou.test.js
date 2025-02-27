import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Thankyou from "../Pages/Thankyou";
import logo from "../Components/Assets/logo.png"; // Mocked image

describe("Thankyou Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the Thankyou component correctly", () => {
    render(
      <MemoryRouter>
        <Thankyou />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 2, name: /Thanks for your order!/i })).toBeInTheDocument();
    expect(screen.getByText(/Your order has been placed/i)).toBeInTheDocument();
    expect(screen.getByText(/You will be receiving an email shortly/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Logo/i })).toHaveAttribute("src", logo);
  });

  test("displays the order number correctly", () => {
    render(
      <MemoryRouter>
        <Thankyou />
      </MemoryRouter>
    );

    expect(screen.getByText(/25vb4440k45/i)).toBeInTheDocument();
  });

  test("adds order to purchase history and clears current order", () => {
    const mockOrder = {
      orderId: "123ABC",
      items: [{ id: 1, name: "Test Product", price: 100 }],
    };

    localStorage.setItem("currentOrder", JSON.stringify(mockOrder));
    
    render(
      <MemoryRouter>
        <Thankyou />
      </MemoryRouter>
    );

    const storedHistory = JSON.parse(localStorage.getItem("purchaseHistory"));
    expect(storedHistory).toHaveLength(1);
    expect(storedHistory[0]).toEqual(mockOrder);
    expect(localStorage.getItem("currentOrder")).toBeNull();
  });

  test("renders navigation buttons correctly", () => {
    render(
      <MemoryRouter>
        <Thankyou />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /Go back to shopping/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Track Order/i })).toHaveAttribute("href", "/OrderTimeline");
  });

  test("renders footer correctly", () => {
    render(
      <MemoryRouter>
        <Thankyou />
      </MemoryRouter>
    );

    expect(screen.getByText(/© 2024 Myntra All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByText(/400 University Drive Suite 200 Coral Gables, FL 33134 USA/i)).toBeInTheDocument();
  });
});
