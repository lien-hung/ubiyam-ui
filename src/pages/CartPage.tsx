import { useAppDispatch, useAppSelector } from "../hooks";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import "../styles/CartPage.css";

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items) ?? [];

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  if (!items || items.length === 0) {
    return (
      <main className="cart-page-empty">
        <h2>Your cart is empty</h2>
        <a href="/products/ube-powder-purple-yam" className="button shopping-button">Continue shopping</a>
        <h3>Have an account?</h3>
        <p><a>Log in</a> to check out faster.</p>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-page-header">
        <h1>Your cart</h1>
        <a href="/products/ube-powder-purple-yam">Continue shopping</a>
      </div>
      <div className="cart-items">
        {items.filter(i => !i.isGift).map((item) => {
          return (
            <div key={item.key} className="cart-item">
              <div className="cart-item-left">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-title">{item.title}</div>
              </div>
              <div className="cart-item-right">
                <div className="quantity-controls">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => dispatch(updateQuantity({ key: item.key, quantity: item.quantity - 1 }))}
                  >
                    -
                  </button>
                  <input
                    min={1}
                    value={item.quantity}
                    type="number"
                    onChange={(e) => dispatch(updateQuantity({ key: item.key, quantity: parseInt(e.target.value || "1") }))}
                  />
                  <button
                    onClick={() => dispatch(updateQuantity({ key: item.key, quantity: item.quantity + 1 }))}
                  >
                    +
                  </button>
                </div>
                <div className="line-total">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove" onClick={() => dispatch(removeFromCart(item.key))}><i className="bi bi-trash" /></button>
              </div>
            </div>
          );
        })}
      </div>

      {items.length > 0 && (
        <aside className="cart-footer">
          <div className="cart-summary">
            <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)} USD</strong></div>
            <button className="button checkout">Check out</button>
          </div>
        </aside>
      )}
    </main>
  );
}