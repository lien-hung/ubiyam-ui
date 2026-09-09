import siteLogo from "../assets/beyond-the-roots-logo.jfif";
import "../styles/Footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <img src={siteLogo} alt="Beyond the Roots logo" />
          <h3>beyond the roots</h3>
        </div>
        <div className="footer-links">
          <a href="/products">Shop</a>
          <a href="#story">Our Roots</a>
          <a href="/pages/about-us">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Beyond the Roots. All rights reserved.</span>
        <span>Rooted in Quality.</span>
      </div>
    </footer>
  );
}