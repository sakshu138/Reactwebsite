import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../radux/authslice";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Loginsignup.css";

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
    toast.dismiss(); // Dismiss previous toasts

    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      toast.error(Object.values(newErrors).join(" "), { toastId: "loginError" });
      return;
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      toast.error("This email ID is not registered.", { toastId: "loginNotFound" });
      return;
    }

    if (user.password !== password) {
      toast.error("Invalid email or password.", { toastId: "loginFailed" });
      return;
    }

    dispatch(login(user));
    toast.success("Login successful! Redirecting...", { toastId: "loginSuccess" });

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="loginsignup-fields">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="error">{errors.email}</p>}
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="forget">
            <label>
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Show Password
            </label>
            <span><Link to="/Forget">Forgot Password?</Link></span>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="loginsignup-login">Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
