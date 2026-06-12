import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaYoutube,
  FaHeart,
  FaUser,
  FaBell,
  FaMoon,
} from "react-icons/fa";
import { GiBabyBottle } from "react-icons/gi";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🍳 CookSphere AI
      </div>

      <div className="nav-links">
        <Link to="/">
          <FaHome /> Home
        </Link>

        <Link to="/recipetube">
          <FaYoutube /> RecipeTube
        </Link>

        <Link to="/momcare">
          <GiBabyBottle /> MomCare
        </Link>

        <Link to="/favorites">
          <FaHeart /> Favorites
        </Link>

        <Link to="/profile">
          <FaUser /> Profile
        </Link>
      </div>

      <div className="nav-actions">
        <FaBell />
        <FaMoon />

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="avatar"
        />
      </div>
    </nav>
  );
}

export default Navbar;