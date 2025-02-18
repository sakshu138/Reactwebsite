import { useState, useEffect } from "react";
import "./CSS/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutForm"));
    if (savedData) {
      setUserData(savedData);
      setEditData(savedData);
    }
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setUserData(editData);
    localStorage.setItem("checkoutForm", JSON.stringify(editData));
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {isEditing ? (
        <div className="edit-form">
          <input type="text" name="email" value={editData.email || ""} onChange={handleChange} placeholder="Email" />
          <input type="text" name="firstName" value={editData.firstName || ""} onChange={handleChange} placeholder="First Name" />
          <input type="text" name="lastName" value={editData.lastName || ""} onChange={handleChange} placeholder="Last Name" />
          <input type="text" name="address" value={editData.address || ""} onChange={handleChange} placeholder="Address" />
          <input type="text" name="city" value={editData.city || ""} onChange={handleChange} placeholder="City" />
          <input type="text" name="pinCode" value={editData.pinCode || ""} onChange={handleChange} placeholder="Pincode" />
          <input type="text" name="phone" value={editData.phone || ""} onChange={handleChange} placeholder="Phone" />
          <button className="save-button" onClick={saveProfile}>Save</button>
        </div>
      ) : userData ? (
        <div className="profile-details">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Full Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>City:</strong> {userData.city}</p>
          <p><strong>Pincode:</strong> {userData.pinCode}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <button className="edit-button" onClick={toggleEdit}>Edit Profile</button>
        </div>
      ) : (
        <p className="no-data-text">No data available</p>
      )}
    </div>
  );
};

export default Profile;
