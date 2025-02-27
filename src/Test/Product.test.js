import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { toast } from "react-toastify";

// Mock toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock useNavigate properly
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ProductDisplay Component", () => {
  const mockAddToCart = jest.fn();

  const product = {
    id: 1,
    name: "Test Product",
    image: "test-image.jpg",
    old_price: 50,
    new_price: 40,
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <ShopContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductDisplay product={product} />
        </ShopContext.Provider>
      </MemoryRouter>
    );
  };

  test("shows warning if size is not selected before adding to cart", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/add to cart/i));
    expect(toast.warn).toHaveBeenCalledWith("Please select a size!", expect.any(Object));
  });

  test("adds product to cart when size is selected", () => {
    renderComponent();
    fireEvent.click(screen.getByText("M")); // Select size M
    fireEvent.click(screen.getByText(/add to cart/i));

    expect(mockAddToCart).toHaveBeenCalledWith(1, "M");
    expect(toast.success).toHaveBeenCalledWith("Added to cart successfully!", expect.any(Object));
  });

  test("shows warning if size is not selected before buying now", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/buy now/i));
    expect(toast.warn).toHaveBeenCalledWith("Please select a size!", expect.any(Object));
  });

  test("navigates to shipping page when buying now with size selected", () => {
    renderComponent();
    fireEvent.click(screen.getByText("L")); // Select size L
    fireEvent.click(screen.getByRole("button", { name: /buy now/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/shippingmethod", {
      state: {
        productId: 1,
        productName: "Test Product",
        productPrice: 40,
        selectedSize: "L",
        isBuyNow: true,
      },
    });
  });
});
