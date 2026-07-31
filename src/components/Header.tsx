import { useEffect, useState } from "react";

import ubiyamLogo from "../assets/ubiyam-logo.jpg";
import ubiyamDrawerLogo from "../assets/ubiyam-logo-drawer.png";

import "../styles/Header.css";

export function Header() {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const isDrawerOpen = isMenuDrawerOpen || isCartDrawerOpen;

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isCartDrawerOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    }
  }, [isCartDrawerOpen]);

  return (
    <>
      <header className="header-bar">
        <span className="hamburger" onClick={() => setIsMenuDrawerOpen(true)}>
          <i className="bi bi-list"></i>
        </span>
        <a href="/">
          <img src={ubiyamLogo} />
        </a>
        <span className="header-account">
          <i className="bi bi-person"></i>
          <a href="/cart" onClick={(e) => { e.preventDefault(); setIsCartDrawerOpen(true); }}>
            <i className="bi bi-cart"></i>
          </a>
        </span>
      </header>

      <div
        className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`}
        onClick={() => {
          if (isMenuDrawerOpen) setIsMenuDrawerOpen(false);
          else setIsCartDrawerOpen(false);
        }}
        aria-hidden={!isDrawerOpen}
      />

      <nav
        className={`menu-drawer ${isMenuDrawerOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Main menu"
      >
        <div className="drawer-header">
          <img src={ubiyamDrawerLogo} height={36} />
          <h2>UBIYAM®'s MENU</h2>
          <button className="drawer-close" onClick={() => setIsMenuDrawerOpen(false)}>
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

      <div
        className={`cart-drawer ${isCartDrawerOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Customer cart"
      >
        <button className="drawer-close" onClick={() => setIsCartDrawerOpen(false)}>
          <i className="bi bi-x"></i>
        </button>

        <div className="drawer-body">
          <h2>Your cart is empty</h2>
          <a href="/products/ube-powder-purple-yam" className="shopping-button">Continue shopping</a>
          <h3>Have an account?</h3>
          <p><a>Log in</a> to check out faster.</p>
        </div>
      </div>
    </>
  );
}