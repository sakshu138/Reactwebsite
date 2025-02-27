import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Account from "../Components/Account/Account";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({ toast: { success: jest.fn() } }));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Account Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

 
  test("toggles dropdown on profile icon click", () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    const profileIcon = screen.getByTestId("profile-icon");
    fireEvent.click(profileIcon);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  test("shows profile on clicking Profile option", () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("profile-icon"));
    fireEvent.click(screen.getByText("Profile"));
  });

  test("navigates to history page on clicking History", () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("profile-icon"));
    fireEvent.click(screen.getByText("History"));
    expect(mockNavigate).toHaveBeenCalledWith("/history");
  });

  test("logs out and navigates to login page on clicking Logout", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Test User" }));
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("profile-icon"));
    fireEvent.click(screen.getByText("LogOut"));
    
    expect(localStorage.getItem("user")).toBeNull();
    expect(toast.success).toHaveBeenCalledWith("Logged out successfully");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
