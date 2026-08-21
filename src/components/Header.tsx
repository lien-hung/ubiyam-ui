import { useEffect, useState } from "react";
import siteLogo from "../assets/beyond-the-roots-logo.jfif";
import { useAppDispatch, useAppSelector, useScrollDirection } from "../hooks";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import "../styles/Header.css";

export function Header() {
  const isScrolledDown = !useScrollDirection();
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const isDrawerOpen = isMenuDrawerOpen || isCartDrawerOpen;

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const compareAtTotal = cartItems.reduce((sum, item) => sum + (item.compareAtPrice ?? item.price) * item.quantity, 0);
  const savings = compareAtTotal - subtotal;

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isCartDrawerOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    }
  }, [isCartDrawerOpen]);

  return (
    <>
      <header className={`header-bar ${isScrolledDown && "hidden"}`}>
        <span className="hamburger" onClick={() => setIsMenuDrawerOpen(true)}>
          <i className="bi bi-list"></i>
        </span>
        <a href="/">
          <img src={siteLogo} />
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
          <img src={siteLogo} height={36} />
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
        <div className={`drawer-header ${cartItems.length === 0 && "hidden"}`}>
          {cartItems.length > 0 && (<h2>Your cart <span>•</span> {itemCount} Product{itemCount === 1 ? "" : "s"}</h2>)}
          <button className="drawer-close" onClick={() => setIsCartDrawerOpen(false)}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="drawer-body cart-drawer-inner">
            <div className="cart-reservation">
              Cart reserved for 08:20 more minutes!
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-product-row" key={item.key}>
                  <div className="cart-product-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="cart-product-copy">
                    <h3>{item.title}</h3>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => dispatch(removeFromCart(item.key))}
                      aria-label={`Remove ${item.title}`}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>

                  <div className="cart-product-pricing">
                    {item.compareAtPrice && (<span className="compare-price">${Number(item.compareAtPrice).toFixed(2)}</span>)}
                    <span className="current-price">${Number(item.price).toFixed(2)}</span>
                  </div>

                  <div className="cart-product-qty">
                    <div className="cart-product-qty-btn">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              key: item.key,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              key: item.key,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Savings</span>
                <strong>-${savings.toFixed(2)}</strong>
              </div>

              <div className="summary-row total-row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
            </div>

            <button type="button" className="button checkout-button">
              Check out <i className="bi bi-lock"></i>
            </button>

            <div className="cart-trust">
              <span><i className="bi bi-shield-check" /> Rated 4.9/5</span>
              <span><i className="bi bi-check2-circle" /> 60-Days Satisfaction Guarantee</span>
            </div>
          </div>
        ) : (
          <div className="drawer-body">
            <h2>Your cart is empty</h2>
            <a href="/products/ube-powder-purple-yam" className="button shopping-button">Continue shopping</a>
            <h3>Have an account?</h3>
            <p><a href="/">Log in</a> to check out faster.</p>
          </div>
        )}
      </div>
    </>
  );
}