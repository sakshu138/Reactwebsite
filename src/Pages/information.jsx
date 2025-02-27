import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Information.css";

const Information = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");


    const [formData, setFormData] = useState({
        email: storedUser?.email || "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        pinCode: "",
        phone: "",
    });

    useEffect(() => {
        try {
            const savedData = localStorage.getItem("checkoutForm");
            if (savedData) {
                setFormData((prev) => ({ ...prev, ...JSON.parse(savedData) }));
            }
        } catch (error) {
            console.error("Error parsing checkoutForm from localStorage", error);
        }
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "firstName" || name === "lastName" || name === "city") {
            if (!/^[A-Za-z]*$/.test(value)) {
                toast.dismiss(); // Remove previous toast before showing a new one
                toast.error(`${name.replace(/([A-Z])/g, " $1")} must contain only letters!`, {
                    position: "top-right",
                    toastId: "nameError"
                });
                return;
            }
        }

        if (name === "pinCode" || name === "phone") {
            if (!/^\d*$/.test(value)) return;
            if (name === "phone" && value.length > 10) return;
            if (name === "pinCode" && value.length > 6) return;
        }

        setFormData((prev) => {
            const newData = { ...prev, [name]: value };
            localStorage.setItem("checkoutForm", JSON.stringify(newData));
            return newData;
        });
    };

    const validateForm = () => {
        toast.dismiss(); // Remove previous toast before showing a new one

        for (let key in formData) {
            if (!formData[key].trim()) {
                toast.error("All fields are required!", { position: "top-right", toastId: "fieldError" });
                return false;
            }
        

        if (!/^[A-Za-z]+$/.test(formData.firstName)) {
            toast.error("First Name must contain only letters!", { position: "top-right", toastId: "firstNameError" });
            return false;
        }

        if (!/^[A-Za-z]+$/.test(formData.lastName)) {
            toast.error("Last Name must contain only letters!", { position: "top-right", toastId: "lastNameError" });
            return false;
        }

        if (!/^\d{6}$/.test(formData.pinCode)) {
            toast.error("Pin Code must be exactly 6 digits!", { position: "top-right", toastId: "pinCodeError" });
            return false;
        }

        if (formData.phone.length !== 10) {
            toast.error("Phone number must be 10 digits!", { position: "top-right", toastId: "phoneError" });
            return false;
        }

        return true;
    };
}

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.dismiss(); 

        if (validateForm()) {
            localStorage.setItem("checkoutForm", JSON.stringify(formData));
            toast.success("Information successfully saved!", { position: "top-right", toastId: "success" });
            setTimeout(() => navigate("/payment"), 1500);
        }
    };

    return (
        <div className="main">
            <div className="container">
                <h2>Contact Information</h2>
                <strong>EmailId :</strong>  <input type="email" name="email" value={formData.email} readOnly className="input-fie" />
<br/>
               <strong>Name :</strong> <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input-field"
                />

<br/>
<strong>Lastname :</strong> <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input-field"
                />
<br/>
<strong>Address :</strong><input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input-field" />
<br/>
<strong>City :</strong><input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input-field" />
<br/>
<strong>Pin :</strong><input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    maxLength="6"
                    placeholder="Pin Code"
                    className="input-field"
                />
<br/>
<strong>Phone no. :</strong><input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="Phone Number"
                    className="input-field"
                />

                <div className="button-container">
                    <button onClick={handleSubmit} className="continue-button">Continue</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Information;