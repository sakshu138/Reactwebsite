import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Signup from "../Pages/Signup"; // Ensure correct path
import { registerUser } from "../radux/authslice"; // Ensure correct path
import { toast } from "react-toastify";

// Mock toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    dismiss: jest.fn(),
  },
}));

const mockStore = configureStore([]);

describe("Signup Component", () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null }, // Provide initial state
    });

    dispatch = jest.fn();
    store.dispatch = dispatch;
  });

  test("renders signup form correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: /^Sign Up$/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("shows error when fields are empty", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    const signupButton = screen.getByRole("button", { name: /Sign Up/i });
    
    // Ensure the button exists before clicking
    expect(signupButton).toBeInTheDocument();

    fireEvent.click(signupButton);

    expect(toast.error).toHaveBeenCalledWith("All fields are required", { toastId: "signupFields" });
  });

  test("shows error for invalid password format", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "12345" } });

    const signupButton = screen.getByRole("button", { name: /Sign Up/i });
    
    // Ensure the button exists before clicking
    expect(signupButton).toBeInTheDocument();

    fireEvent.click(signupButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Password must be at least 6 characters, include one uppercase letter and one special character.",
      { toastId: "signupPassword" }
    );
  });

  test("dispatches registerUser action on valid signup", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "Test@123" } });

    const signupButton = screen.getByRole("button", { name: /Sign Up/i });

    // Ensure the button exists before clicking
    expect(signupButton).toBeInTheDocument();

    fireEvent.click(signupButton);

    expect(dispatch).toHaveBeenCalledWith(
      registerUser({ name: "John Doe", email: "test@example.com", password: "Test@123" })
    );
  });
});
