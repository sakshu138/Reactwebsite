import { useState, useEffect } from "react";
import "./CSS/Profile.css";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState({}); // Initialized as an object
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isRemoved, setIsRemoved] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutForm")) || {};
    const storeUser = JSON.parse(localStorage.getItem("user")) || {};
    const savedImage = localStorage.getItem("profileImage");

    setUserData({ ...savedData, email: storeUser?.email || "" });
    setEditData({ ...savedData, email: storeUser?.email || "" });

    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName" || name === "city") {
      if (!/^[A-Za-z]*$/.test(value)) {
        toast.dismiss();
        toast.error(`${name.replace(/([A-Z])/g, " $1")} must contain only letters!`, {
          position: "top-right",
          toastId: "nameError",
        });
        return;
      }
    }

    if (name === "pinCode" || name === "phone") {
      if (!/^\d*$/.test(value)) {
        toast.dismiss();
        toast.error(`${name.replace(/([A-Z])/g, " $1")} must contain only numbers!`, {
          position: "top-right",
          toastId: "numberError",
        });
        return;
      }
      if (name === "phone" && value.length > 10) {
        toast.dismiss();
        toast.error("Phone number cannot exceed 10 digits!", {
          position: "top-right",
          toastId: "phoneError",
        });
        return;
      }
      if (name === "pinCode" && value.length > 6) {
        toast.dismiss();
        toast.error("Pincode cannot exceed 6 digits!", {
          position: "top-right",
          toastId: "pinCodeError",
        });
        return;
      }
    }

    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    let errors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinCodeRegex = /^[0-9]{6}$/;
    const cityRegex = /^[A-Za-z\s]+$/;
    const addressRegex = /^[A-Za-z0-9\s,.-]+$/;

    if (!nameRegex.test(editData?.firstName || "")) {
      errors.firstName = "First name should contain only alphabets";
    }
    if (!nameRegex.test(editData?.lastName || "")) {
      errors.lastName = "Last name should contain only alphabets";
    }
    if (!phoneRegex.test(editData?.phone || "")) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!pinCodeRegex.test(editData?.pinCode || "")) {
      errors.pinCode = "Pincode must be exactly 6 digits";
    }
    if (!cityRegex.test(editData?.city || "")) {
      errors.city = "City should contain only alphabets";
    }
    if (!addressRegex.test(editData?.address || "")) {
      errors.address = "Address can contain only letters, numbers, spaces, commas, and dots";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.capture = "environment";
    fileInput.onchange = handleImageUpload;
    fileInput.click();
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = () => {
    if (validateInputs()) {
      setUserData(editData);
      localStorage.setItem("checkoutForm", JSON.stringify(editData));
      setIsEditing(false);
    }
  };

  const removeProfile = () => {
    setIsRemoved(true);
  };

  return (
    <div className={`dashboard-container ${isRemoved ? "collapsed" : ""}`}>
      <div className="dashboard">
        <button className="remove-btn" style={{ width: "50px", height: "50px" }} onClick={removeProfile}>
          ✖
        </button>
        <h2>Profile</h2>
        <div className="profile-image-container">
          {image && <img src={image} alt="Profile" className="profile-images" />}
          <FaCamera className="camera-button" onClick={handleCameraCapture} />
        </div>
        <p>
          {userData?.firstName || ""} {userData?.lastName || ""}
        </p>
        <div className="email">{userData?.email || "No email available"}</div>

        {isEditing ? (
          <div className="edit-form">
            <input type="text" name="firstName" value={editData?.firstName || ""} onChange={handleChange} placeholder="First Name" />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}

            <input type="text" name="lastName" value={editData?.lastName || ""} onChange={handleChange} placeholder="Last Name" />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}

            <input type="text" name="address" value={editData?.address || ""} onChange={handleChange} placeholder="Address" />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <input type="text" name="city" value={editData?.city || ""} onChange={handleChange} placeholder="City" />
            {errors.city && <p className="error-text">{errors.city}</p>}

            <input type="text" name="pinCode" value={editData?.pinCode || ""} onChange={handleChange} placeholder="Pincode" />
            {errors.pinCode && <p className="error-text">{errors.pinCode}</p>}

            <input type="text" name="phone" value={editData?.phone || ""} onChange={handleChange} placeholder="Phone" />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <button className="save-button" onClick={saveProfile}>Save</button>
          </div>
        ) : userData?.firstName ? (
          <div className="profile-details">
            <p><strong>Address:</strong> {userData?.address || "Not provided"}</p>
            <p><strong>City:</strong> {userData?.city || "Not provided"}</p>
            <p><strong>Pincode:</strong> {userData?.pinCode || "Not provided"}</p>
            <p><strong>Phone:</strong> {userData?.phone || "Not provided"}</p>
            <button className="edit-button" onClick={toggleEdit}>Edit Profile</button>
          </div>
        ) : (
          <p className="no-data-text">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
