import { useState } from "react";
import { FloatingInput } from "./FloatingInput";

import "../styles/Newsletter.css";

export function Newsletter() {
  const [inputEmail, setInputEmail] = useState("");

  return (
    <div className="newsletter">
      <h2>UBIYAM® CLUB</h2>
      <p>Join us and receive surprises</p>
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