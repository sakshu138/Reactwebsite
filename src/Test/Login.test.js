import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "../Pages/Login"; // Ensure correct path
import { login } from "../radux/authslice"; // Ensure correct path

const mockStore = configureStore([]);

describe("Login Component", () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = mockStore({});
    dispatch = jest.fn();
    store.dispatch = dispatch;
    localStorage.clear(); // Clear localStorage before each test
  });

  test("retrieves stored email from localStorage", () => {
    localStorage.setItem("lastRegisteredEmail", "test@example.com");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Email Address/i)).toHaveValue("test@example.com");
  });

  test("renders login form correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: /^Login$/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("shows error for empty email and password", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  test("shows error for invalid email format", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "invalid-email" } });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
  });

  test("shows error for empty email", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
  
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });
 
  test("shows error for empty password", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
  
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });
  
  test("shows error for short password", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "12345" } }); // Less than 6 characters
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
  
    expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });
  
  

  test("calls dispatch on successful login", async () => {
    localStorage.setItem("users", JSON.stringify([{ email: "test@example.com", password: "password123" }]));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(login({ email: "test@example.com", password: "password123" }));
    });
  });
});
