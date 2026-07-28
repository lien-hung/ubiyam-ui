import { useState } from "react";

import UbiyamLogo from "../assets/ubiyam-logo.jpg";
import UbiyamDrawerLogo from "../assets/ubiyam-logo-drawer.png";

import "../styles/Header.css";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="header-bar">
        <span className="hamburger" onClick={() => setIsDrawerOpen(true)}>
          <i className="bi bi-list"></i>
        </span>
        <a href="/">
          <img src={UbiyamLogo} />
        </a>
        <span className="header-account">
          <i className="bi bi-person"></i>
          <i className="bi bi-cart"></i>
        </span>
      </header>

      <div
        className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden={!isDrawerOpen}
      />

      <nav
        className={`side-drawer ${isDrawerOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Main menu"
      >
        <div className="drawer-header">
          <img src={UbiyamDrawerLogo} height={36} />
          <h2>UBIYAM®'s MENU</h2>
          <button className="drawer-close" onClick={() => setIsDrawerOpen(false)}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-list">
            <li>
              <a href="/pages/about-ubiyam">About Us</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="/">Home</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="/products/ube-powder-purple-yam">Organic Ube Powder</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="/products/ubiyam-gift-card">Gift Cards</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="/a/parcelpanel">Track Your Order</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="/collections/the-ube-recipe-library">The Ube Recipe Library</a>
              <div className="drawer-list-separator" />
            </li>
          </ul>

          <ul className="drawer-list">
            <li>
              <a href="/pages/frequently-asked-questions">FAQ</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="">My Account</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="">Subscription management</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="mailto:info@ubiyam.com">info@ubiyam.com</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="/pages/contact">Contact Us</a>
              <div className="drawer-list-separator" />
            </li>
            <li>
              <a href="/blogs/news">Blogs</a>
              <div className="drawer-list-separator" />
            </li>
          </ul>

          <a href="/" className="drawer-footer">
            <i className="bi bi-person"></i>
            <span>Log in</span>
          </a>
        </div>
      </nav>
    </>
  );
}