import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Information.css";

const Information = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));

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
        const savedData = JSON.parse(localStorage.getItem("checkoutForm"));
        if (savedData) {
            setFormData((prev) => ({ ...prev, ...savedData }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "firstName" || name === "lastName" || name === "city") {
            if (!/^[A-Za-z]*$/.test(value)) {
                toast.error(`${name.replace(/([A-Z])/g, " $1")} must contain only letters!`, {
                    position: "top-right",
                });
                return;
            }
        }

        if (name === "pinCode" || name === "phone") {
            if (!/^\d*$/.test(value)) return;
        }

        setFormData((prev) => {
            const newData = { ...prev, [name]: value };
            localStorage.setItem("checkoutForm", JSON.stringify(newData));
            return newData;
        });
    };

    const validateForm = () => {
        for (let key in formData) {
            if (!formData[key].trim()) {
                toast.error("All fields are required!", {
                    position: "top-right",
                });
                return false;
            }
        }

        if (!/^[A-Za-z]+$/.test(formData.firstName)) {
            toast.error("First Name must contain only letters!", { position: "top-right" });
            return false;
        }

        if (!/^[A-Za-z]+$/.test(formData.lastName)) {
            toast.error("Last Name must contain only letters!", { position: "top-right" });
            return false;
        }

        if (!/^\d{6}$/.test(formData.pinCode)) {
            toast.error("Pin Code must be exactly 6 digits!", { position: "top-right" });
            return false;
        }

        if (formData.phone.length !== 10) {
            toast.error("Phone number must be 10 digits!", { position: "top-right" });
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success("Information successfully saved!", { position: "top-right" });
            setTimeout(() => navigate("/payment"), 1500);
        }
    };

    return (
        <div className="main">
            <div className="container">
                <h2>Contact Information</h2>
                <input type="email" name="email" value={formData.email} readOnly className="input-fie" />

                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input-field"
                />

                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input-field"
                />

                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input-field" />

                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input-field" />

                <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    maxLength="6"
                    placeholder="Pin Code"
                    className="input-field"
                />

                <input
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