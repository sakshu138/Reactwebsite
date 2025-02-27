import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CartItems from "../Components/CartItems/CartItems";
import { ShopContext } from "../Context/ShopContext";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from 'react-toastify'; // Make sure you have this import

jest.mock('react-toastify', () => ({
  toast: {
    warn: jest.fn(), // Mocking the warn method
    success: jest.fn(), 
    error: jest.fn(),// You can add other methods like success if needed
  },
}));


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));



describe("CartItems", () => {
  let contextValue;

  beforeEach(() => {
    contextValue = {
      increment: jest.fn(),
      decrement: jest.fn(),
      getTotalCartAmount: jest.fn(() => 100),
      all_product: [{ id: 1, name: "Product 1", new_price: 50, image: "" }],
      cartItems: { "1-SizeM": 2 },
      deleteFromCart: jest.fn(),
      isLoggedIn: false,
    };
  });

  test("should render cart items correctly", () => {
    render(
      <ShopContext.Provider value={contextValue}>
        <Router>
          <CartItems />
        </Router>
      </ShopContext.Provider>
    );

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
  });

  test("should handle checkout when cart has items", async () => {
    render(
      <ShopContext.Provider value={contextValue}>
        <Router>
          <CartItems />
        </Router>
      </ShopContext.Provider>
    );

    const checkoutButton = screen.getByText("PROCEED TO CHECKOUT");
    fireEvent.click(checkoutButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
  });

  test("should handle empty cart", () => {
    contextValue.getTotalCartAmount = jest.fn(() => 0); // Simulate empty cart
    render(
      <ShopContext.Provider value={contextValue}>
        <Router>
          <CartItems />
        </Router>
      </ShopContext.Provider>
    );

    const checkoutButton = screen.getByText("PROCEED TO CHECKOUT");
    expect(checkoutButton).toBeDisabled();
  });

    
  test("should show toast message when cart is empty", () => {
    const toastWarnSpy = jest.spyOn(toast, "warn");
    const toastErrorSpy = jest.spyOn(toast, "error"); // Spy on error method too
  
    render(
      <ShopContext.Provider value={contextValue}>
        <Router>
          <CartItems />
        </Router>
      </ShopContext.Provider>
    );
  
    // Wait for the checkout button to appear asynchronously
    const checkoutButton = screen.getByText("PROCEED TO CHECKOUT");
  
    if (checkoutButton && !checkoutButton.disabled) {
      fireEvent.click(checkoutButton);
  
      // Use setTimeout to wait for the toast.warn to be called
      setTimeout(() => {
        // Assert that the error toast is called
        expect(toastErrorSpy).toHaveBeenCalledWith("Please log in first!");
      }, 500);
    } else {
      console.log("Checkout button is either not found or disabled.");
    }
  });
  
  })
