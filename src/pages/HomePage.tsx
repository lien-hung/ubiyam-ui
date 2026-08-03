import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import matchaPowder from "../assets/flavors/matcha-powder.webp";
import organicPowder from "../assets/flavors/organic-powder.webp";
import strawberryPowder from "../assets/flavors/strawberry-powder.webp";
import girlBanner from "../assets/ubiyam-girl-banner.webp";
import { HomePageBanner } from "../components/HomePageBanner";
import { Marquee } from "../components/Marquee";
import { discoverItems } from "../constants";
import {
  FAQSection,
  JoinLoversSection,
  JoinRitualSection,
  OrganicVeganSection,
  SlowReleaseSection,
  TrackedSealedSection
} from "../shared";
import "../styles/HomePage.css";

export function HomePage() {
  return (
    <main>
      <HomePageBanner />

      <Marquee gap="8rem">
        <span><i className="bi bi-patch-check-fill" />60-Day Satisfaction Guarantee</span>
        <span><i className="bi bi-heart" />+12,000 UBE Lovers</span>
        <span><i className="bi bi-globe-americas" />Sourced from the Philippines</span>
        <span><i className="bi bi-1-circle" />One ingredient, that's it</span>
        <span aria-hidden><i className="bi bi-patch-check-fill" />60-Day Satisfaction Guarantee</span>
        <span aria-hidden><i className="bi bi-heart" />+12,000 UBE Lovers</span>
        <span aria-hidden><i className="bi bi-globe-americas" />Sourced from the Philippines</span>
        <span aria-hidden><i className="bi bi-1-circle" />One ingredient, that's it</span>
      </Marquee>

      <SlowReleaseSection />

      <section className="flavors-section">
        <div className="text">
          <h2>Find Your Flavor. Elevate Your Ritual.</h2>
          <span>
            Pure Filipino Ube in its classic form, or elevated with bold, vibrant blends.
            Crafted for taste, color, and clean everyday energy.
          </span>
        </div>
        <Swiper className="slideshow" slidesPerView={3} spaceBetween={30}>
          <SwiperSlide className="slide">
            <img src={organicPowder} />
            <div className="text">
              <h3>Organic UBE Powder</h3>
              <div className="rating">
                <span className="stars">{[1, 2, 3, 4, 5].map(() => <i className="bi bi-star-fill" />)}</span>
                <span className="rating-text">4.9/5</span>
              </div>
            </div>
            <a href="/products/ube-powder-purple-yam" className="button shop-cta">Shop Now</a>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img src={strawberryPowder} />
            <div className="text">
              <h3>UBE & Strawberry Powder</h3>
            </div>
            <a className="button shop-cta disabled">Coming Soon...</a>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img src={matchaPowder} />
            <div className="text">
              <h3>UBE & Matcha Powder</h3>
            </div>
            <a className="button shop-cta disabled">Coming Soon...</a>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="discover-section">
        <div className="text">
          <h2>More Than Just a Powder</h2>
          <span>
            From creamy lattes to vibrant smoothies and baked treats,
            UBIYAM® transforms your everyday rituals into something extraordinary.
          </span>
        </div>
        <Swiper className="slideshow" slidesPerView={3} spaceBetween={30}>
          {discoverItems.map((item) => (
            <SwiperSlide className="slide">
              <img src={item.img} />
              <div className="text">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <a href="/products/ube-powder-purple-yam" className="button">Discover UBIYAM®</a>
      </section>

      <section className="pure-origins-section">
        <p className="subtitle">Pure origins. Honest craft.</p>
        <h2>
          From&nbsp;
          <span className="underline">
            Philippine
            <svg className="squiggle" viewBox="-400 -55 730 60" stroke="currentColor" fill="none" role="presentation" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path stroke-linecap="round" stroke-width="30" pathLength="1" d="m -383.25 -6 c 55.25 -22 130.75 -33.5 293.25 -38 c 54.5 -0.5 195 -2.5 401 15"></path>
            </svg>
          </span>
          &nbsp;Soil to Your Spoon
        </h2>
        <p>
          Rooted in the fertile lands of the <em>Philippines</em>, UBIYAM® was born to bring authentic Ube back to its true form.
          Our purple yams are grown by local farmers who respect the soil, the seasons, and generations of tradition.
        </p>
        <p>We keep it simple: <em>100% pure Ube powder. No additives. No fillers. Nothing artificial.</em></p>
        <p>
          <em>From farm to spoon</em>, every batch reflects our commitment to quality, sustainability, and cultural heritage,
          a vibrant superfood made to nourish you and honor where it comes from.
        </p>
      </section>

      <OrganicVeganSection />

      <a href="/products/ube-powder-purple-yam" className="home-banner girl-banner">
        <div className="home-banner__image"><img src={girlBanner} /></div>
        <div className="home-banner__inner">
          <h1>Pure taste. Steady energy. Real balance.</h1>
        </div>
      </a>

      <Marquee className="girl-marquee" gap="8rem">
        <span>100% PURE UBE</span>
        <span>ANTIOXIDANT-RICH</span>
        <span>GUT-LOVING FIBER</span>
        <span>STEADY NATURAL ENERGY</span>
        <span>NO CRASH</span>
        <span>NO CAFFEINE SPIKES</span>
        <span aria-hidden>100% PURE UBE</span>
        <span aria-hidden>ANTIOXIDANT-RICH</span>
        <span aria-hidden>GUT-LOVING FIBER</span>
        <span aria-hidden>STEADY NATURAL ENERGY</span>
        <span aria-hidden>NO CRASH</span>
        <span aria-hidden>NO CAFFEINE SPIKES</span>
      </Marquee>

      <JoinLoversSection />
      <JoinRitualSection />
      <FAQSection />
      <TrackedSealedSection />
    </main>
  );
}