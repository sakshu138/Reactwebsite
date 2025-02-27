import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaymentMethod from "../Pages/PaymentMethod";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({ toast: { error: jest.fn(), success: jest.fn() } }));

describe("PaymentMethod Component", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("renders correctly with default credit card selection", () => {
        render(<PaymentMethod />, { wrapper: MemoryRouter });
        expect(screen.getByText("Choose Payment Method")).toBeInTheDocument();
        expect(screen.getByLabelText("Credit Card")).toBeChecked();
    });

    test("allows switching to UPI payment method", () => {
        render(<PaymentMethod />, { wrapper: MemoryRouter });
        fireEvent.click(screen.getByLabelText("UPI"));
        expect(screen.getByLabelText("UPI")).toBeChecked();
    });

    test("validates credit card number length", async () => {
        render(<PaymentMethod />, { wrapper: MemoryRouter });
        const cardInput = screen.getByPlaceholderText("XXXX XXXX XXXX");
        fireEvent.change(cardInput, { target: { value: "1234 5678 90" } });
        fireEvent.click(screen.getByText("Continue"));
        expect(await screen.findByText("Card number must be exactly 12 digits.")).toBeInTheDocument();
    });

    test("validates missing CCV field", async () => {
        render(<PaymentMethod />, { wrapper: MemoryRouter });
        fireEvent.click(screen.getByText("Continue"));
        expect(await screen.findByText("CCV is required.")).toBeInTheDocument();
    });

    test("validates UPI ID format", async () => {
        render(<PaymentMethod />, { wrapper: MemoryRouter });
        fireEvent.click(screen.getByLabelText("UPI"));
        const upiInput = screen.getByPlaceholderText("Enter UPI ID (9876543210@bank or username@bank)");
        fireEvent.change(upiInput, { target: { value: "invalidupi" } });
        fireEvent.click(screen.getByText("Continue"));
        expect(await screen.findByText("Valid UPI ID is required.")).toBeInTheDocument();
    });

    test("successful credit card payment", async () => {
        render(<PaymentMethod />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByPlaceholderText("XXXX XXXX XXXX"), { target: { value: "1234 5678 9012" } });
        fireEvent.change(screen.getByPlaceholderText("Name on Card"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByPlaceholderText("CCV"), { target: { value: "123" } });
        fireEvent.click(screen.getByText("Continue"));
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Payment Successful!", { autoClose: 2000 }));
    });

    test("successful UPI payment", async () => {
        render(<PaymentMethod />, { wrapper: MemoryRouter });
        fireEvent.click(screen.getByLabelText("UPI"));
        fireEvent.change(screen.getByPlaceholderText("Enter UPI ID (9876543210@bank or username@bank)"), { target: { value: "test@upi" } });
        fireEvent.click(screen.getByText("Continue"));
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Payment Successful!", { autoClose: 2000 }));
    });
});
