import desktopBanner from "../assets/ubiyam-banner-desktop.webp";
import mobileBanner from "../assets/ubiyam-banner-mobile.webp";

import "../styles/HomePageBanner.css";

export function HomePageBanner() {
  return (
    <div className="home-banner">
      <div className="home-banner__image mobile-hidden">
        <img src={desktopBanner} />
      </div>
      <div className="home-banner__image desktop-hidden">
        <img src={mobileBanner} />
      </div>
      <div className="home-banner__inner">
        <div className="rating">
          <span className="stars">{[1, 2, 3, 4, 5].map(() => <i className="bi bi-star-fill" />)}</span>
          <span className="rating-text">Rated 4.9/5</span>
        </div>

        <h1 className="headline">
          The purple secret of the
          <div className="underline">
            Philippines
            <svg className="squiggle" viewBox="-320 -70.8161 640.4 59.82" stroke="currentColor" fill="none" role="presentation" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path stroke-linecap="round" stroke-width="0.5rem" pathLength="1" d="M-300,-56 C-50,-72 298,-65 300,-59 C332,-53 -239,-36 -255,-27 C-271,-18 -88,-24 91,-20"></path>
            </svg>
          </div>
        </h1>

        <a href="/products/ube-powder-purple-yam" className="button cta">DISCOVER UBIYAM®</a>
      </div>
    </div>
  )
}