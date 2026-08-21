import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import latteBenefits from "../assets/latte-benefits.webp";
import gutFriendly from "../assets/mascots/gut-support-mascot.avif";
import caffeineFree from "../assets/mascots/no-caffeine-mascot.webp";
import singleOrigin from "../assets/mascots/philipines-flag-mascot.avif";
import ubeArabWoman from "../assets/ube-arab-woman.webp";
import ubeFarm from "../assets/ube-farm.webp";
import ubiyamWhiteLogo from "../assets/ubiyam-logo-white.png";
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
import { useAppDispatch, useAppSelector, useMediaQuery } from "../hooks";
import {
  FAQSection,
  JoinLoversSection,
  JoinRitualSection,
  OrganicVeganSection,
  SlowReleaseSection,
  TrackedSealedSection
} from "../shared";
import { addToCart } from "../store/cartSlice";
import { getProductByHandle } from "../store/productSlice";
import "../styles/ProductPage.css";
import type { Bundle } from "../types/bundle";

export function ProductPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product = useAppSelector((state) => state.product.products[0]);
  const [selectedBundle, setSelectedBundle] = useState<Bundle>();
  const [playingIndices, setPlayingIndices] = useState<number[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const totalPrice = (product?.price ?? 0) * (selectedBundle?.buyQuantity ?? 0);

  useEffect(() => { dispatch(getProductByHandle(slug ?? "")); }, [dispatch, slug]);

  const handleAddToCart = () => {
    if (!product || !selectedBundle) return;
    dispatch(addToCart({ product, bundle: selectedBundle }));
    navigate("/cart");
  }

  if (!product) return;

  return (
    <main className="product-page">
      <section className="product-section">
        <Gallery items={galleryItems} />
        <div className="product-info">
          {product.tags && (
            <div className="product-tags">
              {product.tags.split(",").map((tag, index) => <span key={`tag${index}-${tag}`}>{tag}</span>)}
            </div>
          )}

          <h2>{product.title}</h2>
          <div className="rating">
            <span className="stars">{[1, 2, 3, 4, 5].map((num) => <i key={`star-${num}`} className="bi bi-star-fill" />)}</span>
            <span className="rating-text">Rated 4.9/5</span>
          </div>

          <p className="product-description">{product.description}</p>

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
              {product.bundles.toSorted((a, b) => a.buyQuantity - b.buyQuantity).map((bundle) => (
                <label key={`bundle-${bundle.id}`} className={`bundle-item ${selectedBundle?.id === bundle.id && "selected"}`}>
                  <input
                    type="radio"
                    name="current-bundle"
                    value={bundle.id}
                    checked={selectedBundle?.id === bundle.id}
                    onChange={() => setSelectedBundle(bundle)}
                  />
                  <div className="bundle-info">
                    <img src={`${bundle.imageUrl}?height=50`} width={50} />
                    {bundle.badgeText && <div className="bundle-pill">{bundle.badgeText}</div>}
                    <div className="bundle-copy">
                      <strong>{bundle.title}</strong>
                      <span>{bundle.subtitle}</span>
                    </div>
                    <div className="bundle-price">
                      <strong>${(product.price * bundle.buyQuantity).toFixed(2)}</strong>
                      {product.compareAtPrice && (<span>${(product.compareAtPrice * bundle.buyQuantity).toFixed(2)}</span>)}
                    </div>
                  </div>
                  {bundle.freeGifts.length > 0 && (
                    <div className="bundle-gifts">
                      {bundle.freeGifts.map((gift) => (
                        <div key={`bundle-gift-${gift.id}`} className="bundle-gift">
                          <a href={`/products/${gift.product.handle}`}>
                            <img src={`${gift.product.image}?height=30`} height={30} />
                          </a>
                          <span>{gift.text}</span>
                          {gift.showPrice && (
                            <span className="bundle-gift-price">${Number(gift.product.price).toFixed(2)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedBundle}
            className={`button add-to-cart ${!selectedBundle && "disabled"}`}
            onClick={handleAddToCart}
          >
            {totalPrice !== 0 && `$${totalPrice.toFixed(2)} • `}ADD TO CART
          </button>

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
          slidesPerView={isMobile ? 1 : 3}
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
              <path strokeLinecap="round" strokeWidth="20" pathLength="1" d="M-335,54 C-335,54 -171,-58 -194,-3 C-217,52 -224.1199951171875,73.552001953125 -127,11 C-68,-27 -137,50 -33,42 C31.43899917602539,37.042999267578125 147.14700317382812,-29.308000564575195 335,2"></path>
            </svg>
          </span>
        </h2>
        <div className="prep-video-container">
          {lattePrepItems.map((item, index) => (
            <div key={`prep-item-${index}`} className="slide">
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
                  <path strokeLinecap="round" strokeWidth="30" pathLength="1" d="m -383.25 -6 c 55.25 -22 130.75 -33.5 293.25 -38 c 54.5 -0.5 195 -2.5 401 15"></path>
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