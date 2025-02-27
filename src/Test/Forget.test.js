import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Forget from "../Pages/Forget"; // Adjust the import based on your file structure

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("renders Forget Password form and validates input", () => {
  render(
    <MemoryRouter>
      <Forget />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText("Email");
  const newPasswordInput = screen.getByPlaceholderText("New Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  const submitButton = screen.getByText("Submit");

  // Check initial form elements presence
  expect(emailInput).toBeInTheDocument();
  expect(newPasswordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // Submit with empty fields
  fireEvent.click(submitButton);
  expect(screen.getByText("All fields are required")).toBeInTheDocument();

  // Submit with invalid email
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  fireEvent.click(submitButton);
  
  

  // Submit with mismatching passwords
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(newPasswordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password321" } });
  fireEvent.click(submitButton);
  expect(screen.getByText("Passwords do not match")).toBeInTheDocument();

  // Successful form submission
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);
  expect(screen.getByText("Registration successful! Redirecting to Login page..."))
    .toBeInTheDocument();
});
