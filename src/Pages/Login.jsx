import { useState, useEffect } from "react";
import "./CSS/Loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../radux/authslice";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedEmail = localStorage.getItem("lastRegisteredEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      localStorage.removeItem("lastRegisteredEmail"); 
    }
  }, []);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
      toast.error("Invalid email format.");
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const userExists = users.some((u) => u.email === email);
    if (!userExists) {
      toast.error("This email ID is not registered");
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      toast.error("Invalid email or password");
      return;
    }

    dispatch(login(user));
    toast.success("Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/");
      window.location.reload(); 
    }, 1000)
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="loginsignup-fields">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="forget">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              /> Show Password
            </label>
            <span>
              <Link to="/Forget">Forget Password?</Link>
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="loginsignup-login">
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
