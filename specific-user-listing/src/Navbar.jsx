import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import "./App";

function Navbar({ setIsModalOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="nav-container">
      <div className="mobile-nav-container">
        <Link to="/" className="logo">
          <img src="/src/images/samurai_rabbit_logo.jpg" title="Home" />
        </Link>
        <div className="menu-icon-wrapper" onClick={toggleMenu}>
          {isMenuOpen ? (
            <CloseOutlined className="close-icon" />
          ) : (
            <MenuOutlined className="menu-icon" />
          )}
        </div>
      </div>

      <ul className={`nav-ul ${isMenuOpen ? "open" : ""}`}>
        <li>
          <Link to="/user-list" onClick={() => setIsMenuOpen(false)}>
            <Button type="ghost" className="nav-btn">
              Users List
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <Button type="ghost" className="nav-btn">
              Home
            </Button>
          </Link>
        </li>
        <li>
          <Button
            type="ghost"
            className="nav-btn"
            onClick={() => {
              setIsModalOpen(true);
              setIsMenuOpen(false);
            }}
          >
            Add User
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
