import React from "react";
import { render, screen, act } from "@testing-library/react";
import OrderTimeline from "../Pages/OrderTimeline";
import "@testing-library/jest-dom";

jest.useFakeTimers(); // Mock timers for step updates

describe("OrderTimeline Component", () => {
  test("renders the tracking order heading", () => {
    render(<OrderTimeline />);
    expect(screen.getByText("Tracking Order")).toBeInTheDocument();
  });

  test("renders all timeline steps", () => {
    render(<OrderTimeline />);
    
    // Checking if all step titles exist
    expect(screen.getByText("Order Placed")).toBeInTheDocument();
    expect(screen.getByText("Payment Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Order Processed")).toBeInTheDocument();
    expect(screen.getByText("Ready to Pickup")).toBeInTheDocument();
  });

  test("steps should update to completed over time", () => {
    render(<OrderTimeline />);
    
    // Check that the first step is initially incomplete
    expect(screen.getByText("Order Placed").closest(".timeline-item")).toHaveClass("current");

    // Fast-forward time to complete all steps
    act(() => {
      jest.advanceTimersByTime(4000); // 4 seconds to complete all steps
    });

    // Check that the first step is now completed
    expect(screen.getByText("Order Placed").closest(".timeline-item")).toHaveClass("completed");
  });

  test("renders the 'Go to Shop' button", () => {
    render(<OrderTimeline />);
    expect(screen.getByText("Go to Shop")).toBeInTheDocument();
  });
});
