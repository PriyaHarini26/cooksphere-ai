import "./Login.css";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault(); // 🔥 stops page reload

  const isValidUser = true;

  if (isValidUser) {
    navigate("/home");
  } else {
    alert("Invalid login");
  }
};
  return (
    <div className="login-container">
      <div className="overlay"></div>

      <div className="login-card">
        <div className="logo-section">
          <FaUtensils className="logo-icon" />
          <h1>CookSphere AI</h1>
          <p>Cook Better. Eat Smarter.</p>
        </div>

        <form>
          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

        <button
  type="button"
  onClick={handleLogin}
>
  Login
</button>

          <button
            type="button"
            className="register-btn"
          >
            Create Account
          </button>
        </form>

        <div className="features">
          <span>🍳 Recipes</span>
          <span>🥗 Nutrition</span>
          <span>🤰 MomCare</span>
          <span>🎥 RecipeTube</span>
        </div>
      </div>
    </div>
  );
}

export default Login;