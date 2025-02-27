import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Information from "../Pages/information";
import { ToastContainer } from "react-toastify";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify({ email: "sample@test.com" }));
 
});

test("renders all input fields correctly", () => {
    render(
        <MemoryRouter>
            <Information />
        </MemoryRouter>
    );

    const inputFields = ["First Name", "Last Name", "Address", "City", "Pin Code", "Phone Number"];
    inputFields.forEach(placeholder => {
        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });
});

test("loads email from local storage if present", () => {
    // Render the component *after* setting localStorage
    render(
        <MemoryRouter>
            <Information />
        </MemoryRouter>
    );

    // Wait briefly to ensure re-render
    setTimeout(() => {
        // Debugging: Log the DOM to check if the email field is rendered
        console.log(screen.debug());

        // Select the input field
        const emailInput = screen.getByPlaceholderText(/email/i); 

        // Ensure the email input is pre-filled correctly
        expect(emailInput.value).toBe("sample@test.com");
    }, 100);
});

test("retrieves saved form data from local storage", () => {
    const savedData = {
        firstName: "Alice",
        lastName: "Smith",
        address: "456 Elm Street",
        city: "Los Angeles",
        pinCode: "654321",
        phone: "1234567890",
    };
    localStorage.setItem("checkoutForm", JSON.stringify(savedData));

    render(
        <MemoryRouter>
            <Information />
        </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("First Name").value).toBe("Alice");
    expect(screen.getByPlaceholderText("Last Name").value).toBe("Smith");
    expect(screen.getByPlaceholderText("Address").value).toBe("456 Elm Street");
    expect(screen.getByPlaceholderText("City").value).toBe("Los Angeles");
    expect(screen.getByPlaceholderText("Pin Code").value).toBe("654321");
    expect(screen.getByPlaceholderText("Phone Number").value).toBe("1234567890");
});

test("displays error when submitting with empty fields", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    // Click the continue button without filling in the fields
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Find the error message asynchronously
    screen.findByText(/all fields are required/i).then((message) => {
        expect(message).toBeInTheDocument();
    });
});

test("restricts invalid characters in name fields", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    // Type invalid names
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "Alice123" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Smith@" } });

    // Log the current state of the rendered DOM for debugging
    console.log(screen.debug());

    // Find error messages using findByText().then()
    screen.findByText(/first name must contain only letters/i).then((message) => {
        expect(message).toBeInTheDocument();
    });

    screen.findByText(/last name must contain only letters/i).then((message) => {
        expect(message).toBeInTheDocument();
    });
});


test("validates pin code length", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    // Type an invalid pin code
    fireEvent.change(screen.getByPlaceholderText("Pin Code"), { target: { value: "1234" } });

    // Click the continue button
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Find the error message using .then()
    screen.findByText(/pin code must be exactly 6 digits/i).then((message) => {
        expect(message).toBeInTheDocument();
    });
});



test("validates phone number length", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    waitFor(() => {
        expect(screen.getByText(/phone number must be 10 digits/i)).toBeInTheDocument();
    });
});

test("shows success message after clicking continue", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer /> {/* Ensure toast messages are rendered */}
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    waitFor(() => {
        expect(screen.getByText(/information successfully saved/i)).toBeInTheDocument();
    });
});

test("prevents submission if pin code is not numeric", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Pin Code"), { target: { value: "abc123" } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    screen.findByText(/pin code must contain only numbers/i).then((message) => {
        expect(message).toBeInTheDocument();
    });
});

test("prevents submission if phone number is not numeric", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "abcd567890" } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    screen.findByText(/phone number must contain only numbers/i).then((message) => {
        expect(message).toBeInTheDocument();
    });
});



test("enables submit button when all required fields are filled", () => {
    render(
        <MemoryRouter>
            <Information />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Address"), { target: { value: "123 Street" } });
    fireEvent.change(screen.getByPlaceholderText("City"), { target: { value: "New York" } });
    fireEvent.change(screen.getByPlaceholderText("Pin Code"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "9876543210" } });

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).not.toBeDisabled();
});

test("does not show error when entering valid pin code", () => {
    render(
        <MemoryRouter>
            <Information />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Pin Code"), { target: { value: "123456" } });

    expect(screen.queryByText(/pin code must be exactly 6 digits/i)).toBeNull();
});

test("does not show error when entering valid phone number", () => {
    render(
        <MemoryRouter>
            <Information />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "9876543210" } });

    expect(screen.queryByText(/phone number must be 10 digits/i)).toBeNull();
});

test("displays success message after entering valid data and clicking continue", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Address"), { target: { value: "123 Street" } });
    fireEvent.change(screen.getByPlaceholderText("City"), { target: { value: "New York" } });
    fireEvent.change(screen.getByPlaceholderText("Pin Code"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "9876543210" } });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    waitFor(() => {
        expect(screen.getByText(/information successfully saved/i)).toBeInTheDocument();
    });
});




test("saves form data and navigates to payment method on success", () => {
    // Clear localStorage before test
    localStorage.clear();

    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    // Fill valid form fields
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Pin Code"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "9876543210" } });

    // Click continue button
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

  
   
    // Verify localStorage contains correct data
    const storedData = JSON.parse(localStorage.getItem("checkoutForm"));
    expect(storedData).toMatchObject({
        firstName: "John",
        lastName: "Doe",
        pinCode: "123456",
        phone: "9876543210",
    });

    // Wait for navigation to trigger after timeout
    setTimeout(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/paymentmethod");
    }, 1600);
});


test("displays error when clicking continue with empty fields", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Check immediately for the error message
    expect(screen.findByText(/all fields are required/i)).resolves.toBeInTheDocument();


});


test("shows error if phone number contains special characters", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "98765@3210" } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

  
});

test("shows error if pin code contains letters", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Pin Code"), { target: { value: "12A456" } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

   
});

test("does not submit if only some fields are filled", () => {
    render(
        <MemoryRouter>
            <Information />
            <ToastContainer />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));


});

test("keeps form data when navigating back", () => {
    const savedData = {
        firstName: "Alice",
        lastName: "Smith",
        address: "123 Main St",
        city: "Los Angeles",
        pinCode: "654321",
        phone: "9876543210",
    };
    localStorage.setItem("checkoutForm", JSON.stringify(savedData));

    render(
        <MemoryRouter>
            <Information />
        </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("First Name").value).toBe("Alice");
    expect(screen.getByPlaceholderText("Last Name").value).toBe("Smith");
    expect(screen.getByPlaceholderText("Address").value).toBe("123 Main St");
    expect(screen.getByPlaceholderText("City").value).toBe("Los Angeles");
    expect(screen.getByPlaceholderText("Pin Code").value).toBe("654321");
    expect(screen.getByPlaceholderText("Phone Number").value).toBe("9876543210");
});