import { useEffect, useState } from "react";
import { FloatingInput } from "./FloatingInput";

import UbiyamEbook from "../assets/ubiyam-ebook.png";
import "../styles/FreeEbookButton.css";

export function FreeEbookButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ebookEmail, setEbookEmail] = useState("");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isDialogOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    }
  }, [isDialogOpen]);

  return (
    <>
      <button
        className={`free-ebook-button ${isDialogOpen ? "hidden" : ""}`}
        onClick={() => setIsDialogOpen(true)}
        aria-label="Open free ebook dialog"
      >
        GET THE FREE EBOOK
      </button>

      <div className={`free-ebook-dialog-overlay ${isDialogOpen ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className={`free-ebook-dialog ${isDialogOpen ? "show" : ""}`}>
          <button
            className="free-ebook-dialog-close"
            onClick={() => setIsDialogOpen(false)}
            aria-label="Close dialog"
          >
            <i className="bi bi-x" />
          </button>

          <div className="free-ebook-dialog-body">
            <h2>Free Ube Recipe Ebook 💜</h2>
            <p>Discover <strong>10 beautiful ways</strong> to enjoy ube at home, from creamy lattes and smoothies to pancakes and desserts.</p>
            <FloatingInput
              id="ebook-email"
              type="email"
              value={ebookEmail}
              onChange={(e) => setEbookEmail(e.target.value)}
              label="Email"
            />
            <button className="free-ebook-dialog-cta">I Want the Ebook</button>
          </div>

          <div className="free-ebook-dialog-image">
            <img src={UbiyamEbook} />
          </div>
        </div>
      </div>
    </>
  )
}