import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/ShippingMethod.css";

const ShippingMethod = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();
    const productData = location.state || {};

    const productPrice = productData.isBuyNow ? productData.productPrice : 0;
    const selectedSize = productData.selectedSize || "";
    const isBuyNow = productData.isBuyNow || false;

    const cartTotal = getTotalCartAmount();
    const subTotal = isBuyNow ? productPrice : cartTotal;

    const [selectedShipping, setSelectedShipping] = useState(0);
    const [userInformation, setUserInformation] = useState(null);

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem("checkoutForm"));
        setUserInformation(storedUserInfo);
    }, []);

    const shippingMethods = [
        { id: 1, label: "Free Shipping", cost: 0, delivery: "Delivery in 5-7 working days" },
        { id: 2, label: "Local Pickup", cost: 10, delivery: "Delivery in 1-2 working days" },
        { id: 3, label: "Standard Shipping", cost: 15, delivery: "Delivery in 5-7 working days" },
        { id: 4, label: "Express Shipping", cost: 25, delivery: "Delivery in 3-5 working days" },
        { id: 5, label: "Same Day Delivery", cost: 250, delivery: "Same Day Delivery" }
    ];

    const handleShippingChange = (cost) => {
        setSelectedShipping(cost);
    };

    const isInformationFilled = () => {
        return userInformation &&
            userInformation.firstName &&
            userInformation.lastName &&
            userInformation.address &&
            userInformation.city &&
            userInformation.pinCode &&
            userInformation.phone;
    };

    const handleContinue = () => {
        if (isInformationFilled()) {
            toast.success("Information successfully filled!");
            navigate("/payment", {
                state: {
                    productId: productData.productId,
                    productName: productData.productName,
                    productPrice: productData.productPrice,
                    selectedSize: selectedSize,
                    selectedShipping: selectedShipping,
                    isBuyNow: isBuyNow
                }
            });
        } else {
            toast.error("Please fill in the required information.");
            navigate("/information");
        }
    };

    return (
        <div className="main" style={{ backgroundColor: '#fce3fe', height: '80vh', width: '100%', padding: '100px' }}>
            <div className="container">
                <h2 className="heading">Shipping Method</h2>
                <div className="shipping-options">
                    {shippingMethods.map((method) => (
                        <label key={method.id} className="option">
                            <div className="option-left">
                                <input
                                    type="radio"
                                    name="shipping"
                                    value={method.cost}
                                    checked={selectedShipping === method.cost}
                                    onChange={() => handleShippingChange(method.cost)}
                                />
                                <div>
                                    <span className="option-title">{method.label}</span>
                                    <p className="option-desc">{method.delivery}</p>
                                </div>
                            </div>
                            <span className="option-price">${method.cost}</span>
                        </label>
                    ))}
                </div>

                <div className="summary">
                    <h3 className="summary-title">Shopping Bag</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${(subTotal || 0).toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>${selectedShipping}</span>
                    </div>
                    <hr />
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${(subTotal + selectedShipping).toFixed(2)}</span>
                    </div>
                </div>
                <div className="checkout-buttons">
                    <Link to="/cart"><button className="return-button">Return</button></Link>
                    <button className="continue-button" onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default ShippingMethod;
