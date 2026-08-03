import { ritualItems } from "../constants";

import "../styles/JoinRitualSection.css";

export function JoinRitualSection() {
  return (
    <section className="join-ritual-section">
      <div className="ritual-left">
        {ritualItems.filter((item) => item.side === "left").map((item) => <a href="https://instagram.com/ubiyam"><img src={item.img} /></a>)}
      </div>
      <div className="ritual-center">
        <div>
          <h2>JOIN THE RITUAL</h2>
          <p>@ubiyam · 12,000+ UBE Lovers</p>
        </div>
        <div className="ritual-links">
          <a className="button" href="https://instagram.com/ubiyam"><i className="bi bi-instagram"></i></a>
          <a className="button" href="https://www.tiktok.com/@ubiyam"><i className="bi bi-tiktok"></i></a>
          <a className="button" href="https://facebook.com/ubiyam"><i className="bi bi-facebook"></i></a>
        </div>
      </div>
      <div className="ritual-right">
        {ritualItems.filter((item) => item.side === "right").map((item) => <a href="https://instagram.com/ubiyam"><img src={item.img} /></a>)}
      </div>
    </section>
  );
}