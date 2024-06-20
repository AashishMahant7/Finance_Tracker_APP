import React, { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import userSvg from "../../assets/user.svg";
import { useTheme } from "../../context/ThemeContext"; // Import the ThemeContext
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Destructure theme and toggleTheme from useTheme

  function logout() {
    auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="navbar">
      <p className="navbar-heading">Financly </p>
      <div className="navbar-controls">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <MdDarkMode style={{ fontSize: '2rem' }} /> : <MdLightMode style={{ fontSize: '2rem',color:'yellow' }}  />}
        </button>
        {user ? (
          <p className="navbar-link" onClick={logout}>
            <span className="user-icon">
              <img
                src={user.photoURL ? user.photoURL : userSvg}
                width="32"
                height="32"
                alt="User"
              />
            </span>
            Logout
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
