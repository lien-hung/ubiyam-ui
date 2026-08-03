import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import threePack from "../assets/bundle-save/buy-three.avif";
import twoPack from "../assets/bundle-save/buy-two.avif";
import fiftyRecipe from "../assets/bundle-save/fifty-recipe-ebook.avif";
import freeFrother from "../assets/bundle-save/frother.avif";
import hundredRecipe from "../assets/bundle-save/hundred-recipe-ebook.avif";
import freeKeychain from "../assets/bundle-save/keychain.avif";
import onePack from "../assets/bundle-save/one-pack.avif";
import gutFriendly from "../assets/mascots/gut-support-mascot.avif";
import caffeineFree from "../assets/mascots/no-caffeine-mascot.webp";
import singleOrigin from "../assets/mascots/philipines-flag-mascot.avif";
import ubeArabWoman from "../assets/ube-arab-woman.webp";
import ubeFarm from "../assets/ube-farm.webp";
import { Accordion } from "../components/Accordion";
import { Gallery } from "../components/Gallery";
import {
  comparisonFeatures,
  galleryItems,
  lattePrepItems,
  productAccordionItems,
  ritualVideoItems,
  traceabilityAccordionItems,
  trustedSuperfoodAccordionItems,
} from "../constants";
import {
  FAQSection,
  JoinLoversSection,
  JoinRitualSection,
  OrganicVeganSection,
  SlowReleaseSection,
  TrackedSealedSection
} from "../shared";
import "../styles/ProductPage.css";
import latteBenefits from "../assets/latte-benefits.webp";
import ubiyamWhiteLogo from "../assets/ubiyam-logo-white.png";

export function ProductPage() {
  const [packCount, setPackCount] = useState(1);
  const [purchaseOption, setPurchaseOption] = useState<"subscribe" | "one-time">("subscribe");
  const [playingIndices, setPlayingIndices] = useState<number[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  return (
    <main>
      <section className="product-section">
        <Gallery items={galleryItems} />
        <div className="product-info">
          <div className="product-tags">
            <span className="product-tag" id="usda-tag">USDA Organic</span>
            <span className="product-tag" id="purple-era-tag">Your Purple Era Starts Here</span>
          </div>

          <h2>Organic UBE Powder</h2>
          <div className="rating">
            <span className="stars">{[1, 2, 3, 4, 5].map(() => <i className="bi bi-star-fill" />)}</span>
            <span className="rating-text">Rated 4.9/5</span>
          </div>

          <p>
            100% organic ube, grown in the Philippines 🇵🇭.
            Softly sweet with natural notes of vanilla and hazelnut, zero added sugar.
            Perfect for lattes, smoothies, baking, and desserts.
          </p>

          <div className="emoji-benefits">
            <p>⚡ Clean, sustained energy, no caffeine, no crash</p>
            <p>💜 Antioxidant-rich purple superfood</p>
            <p>🌿 Naturally contains fiber for everyday digestion</p>
            <p>✨ One ingredient. Nothing else.</p>
            <p>☕ 20+ servings per bag, about $1 a cup</p>
          </div>

          <div className="mascot-benefits">
            <div className="mascot-item">
              <img src={caffeineFree} />
              <h3>Caffeine-Free</h3>
            </div>
            <div className="mascot-item">
              <img src={gutFriendly} />
              <h3>Gut-Friendly</h3>
            </div>
            <div className="mascot-item">
              <img src={singleOrigin} />
              <h3>Single-Origin</h3>
            </div>
          </div>

          <div className="bundle-save">
            <div className="bundle-title">Bundle & Save</div>

            <div className="bundle-list">
              <div className={`bundle-item ${packCount === 1 ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="current-bundle"
                  value={1}
                  id="one-pack-bundle"
                  checked={packCount === 1}
                  onChange={(e) => setPackCount(Number(e.target.value))}
                />
                <label htmlFor="one-pack-bundle">
                  <div className="bundle-info">
                    <img src={onePack} width={50} />
                    <div className="bundle-copy">
                      <strong>1 Pack</strong>
                      <span>100g Organic UBE Powder</span>
                    </div>
                    <div className="bundle-price">
                      <strong>$24.99</strong>
                      <span>$29.99</span>
                    </div>
                  </div>
                </label>
              </div>

              <div className={`bundle-item ${packCount === 2 ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="current-bundle"
                  value={2}
                  id="two-pack-bundle"
                  checked={packCount === 2}
                  onChange={(e) => setPackCount(Number(e.target.value))}
                />
                <label htmlFor="two-pack-bundle">
                  <div className="bundle-info">
                    <img src={twoPack} width={50} />
                    <div className="bundle-pill">Most Popular</div>
                    <div className="bundle-copy">
                      <strong>Buy 2 Get 1 FREE</strong>
                      <span>300g Organic UBE Powder</span>
                    </div>
                    <div className="bundle-price">
                      <strong>$49.98</strong>
                      <span>$89.97</span>
                    </div>
                  </div>
                  <div className="bundle-gifts">
                    <div className="bundle-gift">
                      <a href="/products/50-organic-ube-recipes">
                        <img src={fiftyRecipe} height={30} />
                      </a>
                      <span>+ Free 50+ UBE Recipes</span>
                    </div>
                  </div>
                </label>
              </div>

              <div className={`bundle-item ${packCount === 3 ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="current-bundle"
                  value={3}
                  id="three-pack-bundle"
                  checked={packCount === 3}
                  onChange={(e) => setPackCount(Number(e.target.value))}
                />
                <label htmlFor="three-pack-bundle">
                  <div className="bundle-info">
                    <img src={threePack} width={50} />
                    <div className="bundle-pill">Best Value</div>
                    <div className="bundle-copy">
                      <strong>Buy 3 Get 2 FREE</strong>
                      <span>500g Organic UBE Powder</span>
                    </div>
                    <div className="bundle-price">
                      <strong>$74.97</strong>
                      <span>$149.95</span>
                    </div>
                  </div>
                  <div className="bundle-gifts">
                    <div className="bundle-gift">
                      <img src={freeFrother} height={30} />
                      <span>+ Free UBIYAM Frother</span>
                    </div>
                    <div className="bundle-gift">
                      <img src={freeKeychain} height={30} />
                      <span>+ Free UBIYAM Keychain</span>
                    </div>
                    <div className="bundle-gift">
                      <img src={hundredRecipe} height={30} />
                      <span>+ Free 100+ UBE Recipes</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="purchase-options">
              <div className={`purchase-option ${purchaseOption === "subscribe" && "selected"}`} onClick={() => setPurchaseOption("subscribe")}>
                <div className="purchase-option-main">
                  <div className="purchase-option-radio"></div>
                  <div className="purchase-option-content">
                    <strong>Subscribe & Save</strong>
                    <span>Delivery every 30 days</span>
                  </div>
                </div>
                <div className="purchase-option-highlights">
                  <div><i className="bi bi-check2"></i>60-Day Guarantee</div>
                  <div><i className="bi bi-check2"></i>Free Shipping</div>
                  <div><i className="bi bi-check2"></i>Early access to limited drops</div>
                  <div><i className="bi bi-check2"></i>Pause or Cancel Any Time</div>
                </div>
              </div>

              <div className={`purchase-option ${purchaseOption === "one-time" && "selected"}`} onClick={() => setPurchaseOption("one-time")}>
                <div className="purchase-option-main">
                  <div className="purchase-option-radio"></div>
                  <div className="purchase-option-content">
                    <strong>One-time purchase</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="button add-to-cart">
            ADD TO CART
          </button>

          <p className="product-promo"><i className="bi bi-truck"></i>Free Shipping on Orders $35+</p>
          <p className="product-promo"><i className="bi bi-patch-check-fill"></i>60-day Satisfaction Guarantee</p>

          <Accordion items={productAccordionItems} />
        </div>
      </section>

      <OrganicVeganSection />
      <JoinLoversSection />

      <section className="video-section">
        <Swiper
          className="slideshow"
          modules={[Navigation, Pagination]}
          slidesPerView={3}
          spaceBetween={30}
          loop
          navigation
          pagination={{ clickable: true }}
        >
          {ritualVideoItems.map((item, index) => (
            <SwiperSlide className="slide">
              <div className="video-card">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  width="100%"
                  height="auto"
                  preload="metadata"
                  poster={item.thumbnail}
                  playsInline
                  disablePictureInPicture
                  onPlay={() => setPlayingIndices([...playingIndices, index])}
                  onPause={() => setPlayingIndices(playingIndices.filter((i) => i !== index))}
                >
                  <source src={item.src} />
                </video>
                <button
                  className={`video-play-button ${playingIndices.includes(index) ? "hidden" : ""}`}
                  onClick={() => {
                    const video = videoRefs.current[index];
                    if (video && video.paused) {
                      video.play();
                    } else if (video) {
                      video.pause();
                    }
                  }}
                >
                  <i className="bi bi-play-fill" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="full-traceability-section">
        <div className="left-image">
          <img src={ubeFarm} />
        </div>
        <div className="right-content">
          <div className="checkmark">
            <i className="bi bi-patch-check-fill"></i>
            <span>FULL TRACEABILITY</span>
          </div>
          <h2>From one farm to your pouch</h2>
          <p>
            We believe you should know exactly where your food comes from.
            UBIYAM® is grown and harvested in the Philippines, the native home of ube,
            then gently dried, milled and sealed in a GMP-certified facility under strict quality controls.
            One ingredient, fully traceable, every batch lab tested.
          </p>
          <Accordion items={traceabilityAccordionItems} />
        </div>
      </section>

      <section className="trusted-superfood-section">
        <div className="left-image">
          <img src={ubeArabWoman} />
        </div>
        <div className="right-content">
          <div className="checkmark">
            <i className="bi bi-patch-check-fill"></i>
            <span>TRUSTED PURPLE SUPERFOOD</span>
          </div>
          <h2>Steady energy. Real nourishment.</h2>
          <p>UBIYAM® is pure, single-ingredient purple yam, naturally rich in antioxidants, fiber, and complex carbohydrates that fuel your body without caffeine or crashes.</p>
          <p>No additives. No artificial flavor. Just real ube, gently dried to preserve its nutrients and vibrant color.</p>
          <p>From digestion to daily energy, it's a simple ritual that supports how you feel, every single day.</p>
          <Accordion items={trustedSuperfoodAccordionItems} />
          <button className="button">Get Started Today</button>
          <div className="checkmark">
            <i className="bi bi-patch-check-fill"></i>
            <span>60-Day Satisfaction Guarantee</span>
          </div>
        </div>
      </section>

      <section className="latte-prep-section">
        <h2>
          Let's prep' your&nbsp;
          <span className="underline">
            UBE Latte!
            <svg className="squiggle" viewBox="-347 -30.1947 694 96.19" stroke="currentColor" fill="none" role="presentation" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-width="20" pathLength="1" d="M-335,54 C-335,54 -171,-58 -194,-3 C-217,52 -224.1199951171875,73.552001953125 -127,11 C-68,-27 -137,50 -33,42 C31.43899917602539,37.042999267578125 147.14700317382812,-29.308000564575195 335,2"></path>
            </svg>
          </span>
        </h2>
        <div className="prep-video-container">
          {lattePrepItems.map((item) => (
            <div className="slide">
              <video
                src={item.src}
                width="100%"
                height="auto"
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
              />
              <details key={item.summary}>
                <summary>
                  <h3>{item.summary}</h3>
                  <i className="bi bi-plus-lg" />
                </summary>
                <p>{item.details}</p>
              </details>
            </div>
          ))}
        </div>
      </section>

      <SlowReleaseSection />

      <section className="natural-fuel-section">
        <div className="slide natural-fuel-slide">
          <div className="left-image">
            <img src={latteBenefits} />
          </div>
          <div className="right-content">
            <h2>
              Natural fuel for your&nbsp;
              <span className="underline">
                BODY + GUT
                <svg className="squiggle" viewBox="-400 -55 730 60" stroke="currentColor" fill="none" role="presentation" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path stroke-linecap="round" stroke-width="30" pathLength="1" d="m -383.25 -6 c 55.25 -22 130.75 -33.5 293.25 -38 c 54.5 -0.5 195 -2.5 401 15"></path>
                </svg>
              </span>
            </h2>
            <p>
              UBIYAM® Purple Yam Powder is made from carefully selected Philippine Ube,
              gently dried and finely milled to preserve its natural color and nutrients.
              Naturally rich in fiber, complex carbohydrates, and antioxidants,
              it supports gut comfort and steady energy, without caffeine or crashes.
              Clean, nourishing fuel for everyday balance.
            </p>
            <button className="button">Try UBIYAM Today</button>
            <div className="checkmark">
              <i className="bi bi-patch-check"></i>
              <span>60-Day Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-section">
        <table className="comparison-table">
          <thead className="comparison-row comparison-row-header">
            <tr>
              <th className="comparison-cell"></th>
              <th className="comparison-cell comparison-brand-heading"><img src={ubiyamWhiteLogo} width={90} /></th>
              <th className="comparison-cell comparison-other-heading">Others</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((label) => (
              <tr key={label} className="comparison-row">
                <td className="comparison-cell comparison-feature">{label}</td>
                <td className="comparison-cell comparison-brand"><i className="bi bi-check2" /></td>
                <td className="comparison-cell comparison-other"><i className="bi bi-x" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="comparison-content">
          <h2>UBIYAM® vs The Rest</h2>
          <p>See how we stand apart from ube mixes, flavored blends and generic powders.</p>
        </div>
      </section>

      <JoinRitualSection />
      <FAQSection />
      <TrackedSealedSection />
    </main>
  );
}