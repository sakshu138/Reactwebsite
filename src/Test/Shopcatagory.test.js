import { render, screen, fireEvent } from "@testing-library/react";
import ShopCategory from "../Pages/ShopCategory"; // Adjust path if needed
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import AOS from "aos";

// Mock AOS (to prevent issues with animations)
jest.mock("aos", () => ({
  init: jest.fn(),
}));

// Mock Item component to avoid unnecessary rendering details
jest.mock("../Components/Item/Item", () => (props) => (
  <div>
    <p>{props.name}</p>
    <p>₹{props.new_price}</p>
  </div>
));

describe("ShopCategory Component", () => {
  const mockProducts = [
    { id: 1, name: "Product 1", image: "img1.jpg", new_price: 50, old_price: 80, category: "electronics" },
    { id: 2, name: "Product 2", image: "img2.jpg", new_price: 150, old_price: 200, category: "electronics" },
    { id: 3, name: "Product 3", image: "img3.jpg", new_price: 500, old_price: 700, category: "electronics" },
    { id: 4, name: "Product 4", image: "img4.jpg", new_price: 900, old_price: 1000, category: "electronics" },
    { id: 5, name: "Product 5", image: "img5.jpg", new_price: 120, old_price: 180, category: "clothing" },
  ];

  const mockContextValue = {
    all_product: mockProducts,
  };

  const renderComponent = (category) => {
    return render(
      <ShopContext.Provider value={mockContextValue}>
        <ShopCategory category={category} banner="test-banner.jpg" />
      </ShopContext.Provider>
    );
  };

  test("renders ShopCategory and displays correct products based on category", () => {
    renderComponent("electronics");

    // Check if the banner image is rendered
    const bannerImage = screen.getByRole("img");
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute("src", "test-banner.jpg");

    // Check if the correct number of products are displayed
    expect(screen.getByText(/Showing 4 products/i)).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
    expect(screen.getByText("Product 4")).toBeInTheDocument();
  });

  test("filters products correctly by price range", () => {
    renderComponent("electronics");

    // Select ₹100 - ₹200 filter
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "100-200" } });

    // Check if only the filtered product is displayed
    expect(screen.getByText(/Showing 1 products/i)).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
  });

  test("filters products correctly when selecting ₹800+ range", () => {
    renderComponent("electronics");

    // Select ₹800+ filter
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "800+" } });

    // Only Product 4 should be displayed
    expect(screen.getByText(/Showing 1 products/i)).toBeInTheDocument();
    expect(screen.getByText("Product 4")).toBeInTheDocument();
  });

  test("shows all products when 'All' is selected", () => {
    renderComponent("electronics");

    // Select 'All' option
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "all" } });

    // All products should be displayed again
    expect(screen.getByText(/Showing 4 products/i)).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
    expect(screen.getByText("Product 4")).toBeInTheDocument();
  });
  test("filters products correctly when selecting ₹0 - ₹99 range", () => {
    renderComponent("electronics");

    // Select ₹0 - ₹99 filter
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "0-99" } });

    // Only Product 1 should be displayed
    expect(screen.getByText(/Showing 1 products/i)).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 4")).not.toBeInTheDocument();
  });
  test("filters products correctly when selecting ₹201-₹400 range", () => {
    renderComponent("electronics");

    // Select ₹201 - ₹400 filter
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "201-400" } });

    // No products in this range, so it should show "Showing 0 products"
    expect(screen.getByText(/Showing 0 products/i)).toBeInTheDocument();

    // Ensure no products are displayed
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 4")).not.toBeInTheDocument();
  });
  test("filters products correctly when selecting ₹401-₹600 range", () => {
    renderComponent("electronics");

    // Select ₹401 - ₹600 filter
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "401-600" } });

    // Only Product 3 should be displayed
    expect(screen.getByText(/Showing 1 products/i)).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();

    // Ensure other products are not displayed
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 4")).not.toBeInTheDocument();
  });

  test("filters products correctly when selecting ₹601-₹800 range", () => {
    renderComponent("electronics");

    // Select ₹601 - ₹800 filter
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "601-800" } });

    // No products in this range, so it should show "Showing 0 products"
    expect(screen.getByText(/Showing 0 products/i)).toBeInTheDocument();

    // Ensure no products are displayed
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 4")).not.toBeInTheDocument();
  });

 
});

