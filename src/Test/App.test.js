import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// Mock necessary components
jest.mock("../Components/Navbar/Navbar", () => () => <nav>Navbar</nav>);
jest.mock("../Components/Footer/Footer", () => () => <footer>Footer</footer>);

// Mock ToastContainer correctly
jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container"></div>,
}));

// Mock pages
jest.mock("../Pages/Shop", () => () => <div>Shop Page</div>);
jest.mock("../Pages/ShopCategory", () => () => <div>Shop Category Page</div>);
jest.mock("../Pages/Product", () => () => <div>Product Page</div>);
jest.mock("../Pages/Cart", () => () => <div>Cart Page</div>);
jest.mock("../Pages/Login", () => () => <div>Login Page</div>);
jest.mock("../Pages/Signup", () => () => <div>Signup Page</div>);
jest.mock("../Pages/Forget", () => () => <div>Forget Password Page</div>);
jest.mock("../Pages/ShippingMethod", () => () => <div>Shipping Method Page</div>);
jest.mock("../Pages/PaymentMethod", () => () => <div>Payment Method Page</div>);
jest.mock("../Pages/information", () => () => <div>Information Page</div>);
jest.mock("../Pages/Thankyou", () => () => <div>Thank You Page</div>);
jest.mock("../Pages/OrderTimeline", () => () => <div>Order Timeline Page</div>);
jest.mock("../Pages/Profile", () => () => <div>Profile Page</div>);
jest.mock("../Pages/History", () => () => <div>History Page</div>);

describe("App Component", () => {
  test("renders Navbar, Footer, and ToastContainer", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Navbar")).toBeInTheDocument();
    expect(await screen.findByText("Footer")).toBeInTheDocument();
    expect(await screen.findByTestId("toast-container")).toBeInTheDocument();
  });

  test.each([
    ["/", "Shop Page"],
    ["/mens", "Shop Category Page"],
    ["/womens", "Shop Category Page"],
    ["/kids", "Shop Category Page"],
    ["/product/1", "Product Page"],
    ["/cart", "Cart Page"],
    ["/login", "Login Page"],
    ["/signup", "Signup Page"],
    ["/forget", "Forget Password Page"],
    ["/shippingMethod", "Shipping Method Page"],
    ["/information", "Information Page"],
    ["/thankyou", "Thank You Page"],
    ["/ordertimeline", "Order Timeline Page"],
    ["/payment", "Payment Method Page"],
    ["/profile", "Profile Page"],
    ["/history", "History Page"],
  ])("renders %s route correctly", async (route, expectedText) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(expectedText)).toBeInTheDocument();
  });
});
