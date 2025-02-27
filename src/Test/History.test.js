import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import History from "../Pages/History"; // Adjust the path based on your file structure

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
  jest.spyOn(window, "confirm").mockImplementation(() => true); // Simulate clicking 'OK' in confirm dialog
});

test("renders 'No past purchases found' when there is no history", () => {
  render(<History />);
  expect(screen.getByText(/No past purchases found/i)).toBeInTheDocument();
});

test("renders purchase history from localStorage", () => {
  const mockHistory = [
    {
      date: "2024-02-20T12:00:00Z",
      total: 50,
      status: "Completed",
      items: [
        {
          name: "Product 1",
          size: "M",
          quantity: 2,
          price: 25,
          total: 50,
          image: "https://via.placeholder.com/150",
          status: "Completed",
        },
      ],
    },
  ];
  localStorage.setItem("purchaseHistory", JSON.stringify(mockHistory));

  render(<History />);

  expect(screen.getByText(/Order Date:/i)).toBeInTheDocument();
  expect(screen.getByText(/Total: \$50/i)).toBeInTheDocument();
  setTimeout(() => {
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    done(); // Tell Jest the test is complete
  }, 1000); 


  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
});

test("clears purchase history when 'Clear All Items' button is clicked", () => {
  const mockHistory = [
    {
      date: "2024-02-20T12:00:00Z",
      total: 100,
      status: "Pending",
      items: [
        {
          name: "Product 2",
          size: "L",
          quantity: 1,
          price: 100,
          total: 100,
          image: "https://via.placeholder.com/150",
          status: "Pending",
        },
      ],
    },
  ];
  localStorage.setItem("purchaseHistory", JSON.stringify(mockHistory));

  render(<History />);
  
  const clearButton = screen.getByText(/Clear All Items/i);
  expect(clearButton).toBeInTheDocument();

  fireEvent.click(clearButton);

  expect(localStorage.getItem("purchaseHistory")).toBeNull();
  expect(screen.getByText(/No past purchases found/i)).toBeInTheDocument();
});
