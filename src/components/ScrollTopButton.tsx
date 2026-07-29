import { useEffect, useRef } from "react";

import "../styles/ScrollTopButton.css";

export function ScrollTopButton() {
  const scrollBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollBtn.current) return;

      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollBtn.current.style.display = "block";
      } else {
        scrollBtn.current.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <button
      ref={scrollBtn}
      onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
      className="scroll-to-top"
    >
      <i className="bi bi-chevron-up"></i>
    </button>
  )
}