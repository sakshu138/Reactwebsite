import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import ShippingMethod from "../Pages/ShippingMethod";
import { waitFor } from "@testing-library/react";

// Mock toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockGetTotalCartAmount = jest.fn(() => 100);

const mockContextValue = {
  getTotalCartAmount: mockGetTotalCartAmount,
};

const renderComponent = (userInfo = null, state = {}) => {
  localStorage.setItem("checkoutForm", JSON.stringify(userInfo));

  return render(
    <ShopContext.Provider value={mockContextValue}>
      <MemoryRouter initialEntries={[{ pathname: "/shipping", state }]}>
        <Routes>
          <Route path="/shipping" element={<ShippingMethod />} />
        </Routes>
      </MemoryRouter>
    </ShopContext.Provider>
  );
};

describe("ShippingMethod Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  

test("renders shipping methods", () => {
    renderComponent();

    waitFor(() => {
        expect(screen.getByText(/Shipping Method/i)).toBeInTheDocument();
        expect(screen.getByText(/Free Shipping/i)).toBeInTheDocument();
        expect(screen.getByText(/Same Day Delivery/i)).toBeInTheDocument();
    });
});



test("selects a shipping method and updates total price", () => {
    renderComponent();
    const expressShipping = screen.getByLabelText(/Express Shipping/i);
    fireEvent.click(expressShipping);

    expect(expressShipping).toBeChecked();

    // Wait for "$25" to appear
    waitFor(() => {
        expect(screen.getByText("$25")).toBeInTheDocument();
    });
});


  test("shows error and redirects to information page if user details are missing", () => {
    renderComponent(null);

    fireEvent.click(screen.getByText(/Continue/i));
    expect(toast.error).toHaveBeenCalledWith("Please fill in the required information.");
    expect(mockNavigate).toHaveBeenCalledWith("/information");
  });

  test("proceeds to payment when user details are filled", () => {
    const userInfo = {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      pinCode: "10001",
      phone: "1234567890",
    };

    renderComponent(userInfo, {
      productId: 1,
      productName: "Test Product",
      productPrice: 50,
      selectedSize: "M",
      isBuyNow: true,
    });

    fireEvent.click(screen.getByText(/Continue/i));

    expect(toast.success).toHaveBeenCalledWith("Information successfully filled!");
    expect(mockNavigate).toHaveBeenCalledWith("/payment", expect.objectContaining({ state: expect.any(Object) }));
  });
});
