import "../styles/CheckoutSuccessPage.css";

export function CheckoutSuccessPage() {
  return (
    <main className="checkout-success-page">
      <section>
        <h1>Thanks for your order!</h1>
        <p>We appreciate your business! If you have any questions, please email us at info@ubiyam.com.</p>
        <a href="/" className="button">Return to homepage</a>
      </section>
    </main>
  );
}