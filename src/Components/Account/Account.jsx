import { useState, useEffect } from "react";
import "./Account.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from '../../Pages/Profile'
const Account = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutForm"));
    if (savedData) {
      setUserData(savedData);
      setEditData(savedData);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
      localStorage.clear();
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-icon" onClick={toggleDropdown}>
        <FaUserCircle size={50} style={{marginTop:"35px"}} className="user-icon" data-testid="profile-icon"/>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
          <li onClick={() => setShowProfile(!showProfile)}>Profile</li>
            <li onClick={() => navigate("/history")}>History</li>
            {user ? (
              <li onClick={handleLogout} className="logout">LogOut</li>
            ) : (
              <li onClick={() => navigate("/login")} className="logout">Login</li>
            )}
          </ul>
        </div>
      )}
      {showProfile && <Profile />}
    </div>
  );
};

export default Account;
