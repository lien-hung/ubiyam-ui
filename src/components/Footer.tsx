import siteLogo from "../assets/beyond-the-roots-logo.jfif";
import "../styles/Footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-links">
          <img src={siteLogo} />
          <div className="footer-right">
            <div className="footer-section">
              <h2>SHOP</h2>
              <ul>
                <li><a href="/pages/about-ubiyam">About Us</a></li>
                <li><a href="/">Home</a></li>
                <li><a href="/products/ube-powder-purple-yam">Organic Ube Powder</a></li>
                <li><a href="/products/ubiyam-gift-card">Gift Cards</a></li>
                <li><a href="/a/parcelpanel">Track Your Order</a></li>
                <li><a href="/collections/the-ube-recipe-library">The Ube Recipe Library</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h2>POLICIES</h2>
              <ul>
                <li><a href="/policies/terms-of-service">Terms of Service</a></li>
                <li><a href="/policies/privacy-policy">Privacy Policy</a></li>
                <li><a href="/policies/refund-policy">Refund Policy</a></li>
                <li><a href="/policies/shipping-policy">Shipping Policy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h2>HELP</h2>
              <ul>
                <li><a href="/pages/frequently-asked-question">FAQ</a></li>
                <li><a href="/">My Account</a></li>
                <li><a href="/">Subscription management</a></li>
                <li><a href="mailto:info@ubiyam.com">info@ubiyam.com</a></li>
                <li><a href="/pages/contact">Contact Us</a></li>
                <li><a href="/blogs/news">Blogs</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h2>CONTACT</h2>
              <p>Questions or feedback? We're here to help.</p>
              <p>Email us at info@ubiyam.com or call us at +1 (307) 317-4207.</p>
              <p>Address: 30 N Gould St, Ste N1, Sheridan, WY 82801, USA.</p>
            </div>
          </div>
        </div>
        <h5 className="footer-disclaimer">
          *These statements have not been evaluated by the Food and Drug Administration.
          This product is not intended to diagnose, treat, cure, or prevent any disease.
        </h5>
        <div className="footer-social">
          <button className="follow-button">
            <i className="bi bi-heart"></i>
            <span>Follow on shop</span>
          </button>
          <ul className="social-links">
            <li><a href="https://facebook.com/ubiyam"><i className="bi bi-facebook"></i></a></li>
            <li><a href="https://instagram.com/ubiyam"><i className="bi bi-instagram"></i></a></li>
            <li><a href="https://www.tiktok.com/@ubiyam"><i className="bi bi-tiktok"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <ul>
          <li>© 2026, <a href="/">UBIYAM®</a> All Rights Reserved.</li>
          <li><a href="/policies/privacy-policy">Privacy policy</a></li>
          <li><a href="/policies/refund-policy">Refund policy</a></li>
          <li><a href="/policies/term-of-service">Terms of service</a></li>
          <li><a href="/policies/shipping-policy">Shipping policy</a></li>
          <li><a href="/policies/contact-information">Contact information</a></li>
        </ul>
      </div>
    </footer>
  );
}