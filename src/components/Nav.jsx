import "./Nav.css";
import constants from "../assets/netflixCloneConstants.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [navVisible, setNavVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 100) setNavVisible(false);
    else setNavVisible(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${navVisible ? "nav_black" : ""}`}>
      <div className="nav-content">
        <Link to="/">
          <img
            className="nav-logo"
            src={constants.navbar.logoUrl}
            alt="Netflix Logo"
          />
        </Link>

        <Link to="/profile">
          <img
            className="nav-avatar"
            src={constants.navbar.avatar}
            alt="Netflix Logo"
          />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
