import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./CSS/Payment.css"; 
import UPI from '../Components/Assets/UPI.jpeg';

const PaymentMethod = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        nameOnCard: "",
        expiryMonth: "January",
        expiryYear: "2022",
        ccv: "",
        UPIid: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedPaymentData = localStorage.getItem("paymentDetails");
        if (storedPaymentData) {
            setCardDetails(JSON.parse(storedPaymentData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("paymentDetails", JSON.stringify(cardDetails));
    }, [cardDetails]);
    const handleInputChange = (e) => {
        let { name, value } = e.target;  
        let newErrors = { ...errors };
    
    
        if (name === "cardNumber") {
            value = value.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})/g, "$1 ").trim();
        }
    
        if (name === "ccv") {
            value = value.replace(/\D/g, "").slice(0, 3);
        }
    
    
        if (name === "UPIid") {
            if (!value.includes("@")) {
                newErrors.UPIid = "UPI ID must contain '@'.";
            } else {
                const upiPattern = /^(\d{10}|[a-zA-Z0-9]+)@\w+$/;
                if (!upiPattern.test(value)) {
                    newErrors.UPIid = "Invalid UPI ID format.";
                } else {
                    delete newErrors.UPIid;
                }
            }
        }
    
        if (name === "nameOnCard") {
            const regex = /^[A-Za-z\s]*$/; 
            value = value.replace(/[^A-Za-z\s]/g, ""); 
            if (value.trim() === "") {
                newErrors.nameOnCard = "Cardholder name is required.";
            } else if (!regex.test(value)) {
                newErrors.nameOnCard = "Cardholder name must only contain alphabetic characters and spaces.";
            } else {
                delete newErrors.nameOnCard;
            }
        }
    
        setCardDetails({ ...cardDetails, [name]: value });
        setErrors(newErrors);
    };
    
    const handleSubmit = () => {
        const existingHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

        
        if (existingHistory.length > 0) {
            existingHistory[existingHistory.length - 1].status = "Completed";
            existingHistory[existingHistory.length - 1].items.forEach(item => item.status = "Completed");
        }
      
        
        localStorage.setItem("purchaseHistory", JSON.stringify(existingHistory));

        let newErrors = {};

        if (paymentMethod === "credit") {
            if (!cardDetails.cardNumber.trim()) newErrors.cardNumber = "Card number is required.";
            if (!cardDetails.nameOnCard.trim()) newErrors.nameOnCard = "Cardholder name is required.";
            if (!cardDetails.ccv.trim()) newErrors.ccv = "CCV is required.";
        }

        if (paymentMethod === "UPI") {
            if (!cardDetails.UPIid.trim() || !cardDetails.UPIid.includes("@")) {
                newErrors.UPIid = "Valid UPI ID is required.";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Form Submitted", cardDetails);
        navigate("/thankyou");  
    };

    return (
        <div className="method">
            <div className="payment-container">
                <h2 className="title">Choose Payment Method</h2>

                <div className="payment-options">
                    <label className={`payment-option ${paymentMethod === "credit" ? "active" : ""}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="credit"
                            checked={paymentMethod === "credit"}
                            onChange={() => setPaymentMethod("credit")}
                        />
                        <span className="radio-icon"></span>
                        <span className="label-text">Credit Card</span>
                        <span className="card-icons">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" />
                        </span>
                    </label>

                    {paymentMethod === "credit" && (
                        <div className="credit-card-form">
                            <input type="text" name="cardNumber" placeholder="XXXX XXXX XXXX" value={cardDetails.cardNumber} onChange={handleInputChange} maxLength="16" />
                            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

                            <input type="text" name="nameOnCard" placeholder="Name on Card" value={cardDetails.nameOnCard} onChange={handleInputChange} />
                            {errors.nameOnCard && <p className="error">{errors.nameOnCard}</p>}

                            <div className="expiry-cvv">
                                <select name="expiryMonth" value={cardDetails.expiryMonth} onChange={handleInputChange}>
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select name="expiryYear" value={cardDetails.expiryYear} onChange={handleInputChange}>
                                    {[2022, 2023, 2024, 2025].map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <input type="password" name="ccv" placeholder="CCV" value={cardDetails.ccv} onChange={handleInputChange} maxLength="3" />
                                {errors.ccv && <p className="error">{errors.ccv}</p>}
                            </div>
                        </div>
                    )}

                    <label className={`payment-option ${paymentMethod === "UPI" ? "active" : ""}`}>
                        <input type="radio" name="payment" value="UPI" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />
                        <span className="radio-icon"></span>
                        <span className="label-text">UPI</span>
                        <span className="paypal-icon">
                            <img src={UPI} alt="UPI" />
                        </span>
                    </label>

                    {paymentMethod === "UPI" && (
                        <div className="credit-card-form">
                            <input type="text" name="UPIid" placeholder="Enter UPI ID (9876543210@bank or username@bank)" value={cardDetails.UPIid} onChange={handleInputChange} />
                            {errors.UPIid && <p className="error">{errors.UPIid}</p>}
                        </div>
                    )}
                </div>

                <div className="buttons">
                    <button className="return" onClick={() => navigate("/shippingmethod")}>Return</button>
                    <button className="continue" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
