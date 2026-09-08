import { useState } from "react";
import { FloatingInput } from "./FloatingInput";

import "../styles/Newsletter.css";

export function Newsletter() {
  const [inputEmail, setInputEmail] = useState("");

  return (
    <div className="newsletter">
      <h2>Stay close to the source.</h2>
      <p>Get new product news and farm updates — no spam, unsubscribe anytime.</p>
      <FloatingInput
        id="newsletter-email"
        type="email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        label="Email"
      />
    </div>
  );
}