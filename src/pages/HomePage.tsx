import { useEffect } from "react";
import ubeArabWoman from "../assets/ube-arab-woman.webp";
import ubeFarm from "../assets/ube-farm.webp";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../store/cartSlice";
import { getAllProducts } from "../store/productSlice";
import "../styles/HomePage.css";

export function HomePage() {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.product);

  useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);

  const featuredProducts = products.slice(0, 3);

  return (
    <main className="reference-home">
      <section className="reference-hero">
        <div className="reference-wrap">
          <span className="reference-eyebrow">Rooted in quality</span>
          <h1>Simple ingredients, grown with care.</h1>
          <p>Beyond the Roots brings honest, single-ingredient goods to your table — starting with ube and coffee, with more roots to come.</p>
          <a href="/products" className="reference-button">Shop our products</a>
        </div>
      </section>

      <section className="reference-products" id="products">
        <div className="reference-wrap">
          <div className="reference-section-title">
            <span className="reference-eyebrow">The collection</span>
            <h2>From the root, simply made.</h2>
          </div>
          <div className="reference-product-grid">
            {isLoading ? (
              Array(3).fill(null).map((_, index) => (
                <article className="reference-card skeleton-card" key={`skeleton-${index}`}>
                  <div className="reference-card-shot skeleton-image"></div>
                  <div className="reference-card-body">
                    <div className="skeleton-text skeleton-eyebrow"></div>
                    <div className="skeleton-text skeleton-title"></div>
                    <div className="skeleton-text skeleton-description"></div>
                    <div className="reference-card-row">
                      <div className="skeleton-text skeleton-price"></div>
                      <div className="skeleton-button"></div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <>
                {featuredProducts.map((product) => (
                  <article className="reference-card" key={product.id}>
                    <a className="reference-card-shot" href={`/products/${product.handle}`}>
                      <img src={product.image} alt={product.title} />
                    </a>
                    <div className="reference-card-body">
                      <span className="reference-origin">From the Philippines</span>
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <div className="reference-card-row">
                        <span className="reference-price">${Number(product.price).toFixed(2)}</span>
                        <button type="button" className="reference-add" onClick={() => dispatch(addToCart({ product }))} aria-label={`Add ${product.title} to cart`}>+</button>
                      </div>
                    </div>
                  </article>
                ))}
                <article className="reference-card reference-next-card">
                  <div className="reference-card-shot"><span className="reference-mark">+</span></div>
                  <div className="reference-card-body">
                    <span className="reference-origin">Coming soon</span>
                    <h3>More roots to come</h3>
                    <p>We are growing the collection with the same care and simplicity.</p>
                  </div>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="reference-story" id="story">
        <div className="reference-wrap reference-story-inner">
          <div className="reference-story-copy">
            <span className="reference-eyebrow">Our roots</span>
            <h2>One promise, wherever the root grows.</h2>
            <p>Beyond the Roots works directly with small farms — ube growers in Vietnam and the Philippines, coffee and cashew growers in Vietnam — to bring you ingredients as close to their source as possible.</p>
            <p>The name is a promise: we don't stop at one crop. Every new product has to earn its place next to the ones before it.</p>
            <div className="reference-origins">
              <div>
                <strong>2</strong>
                <span>Countries of origin</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Natural, no additives</span>
              </div>
              <div>
                <strong>0</strong>
                <span>Preservatives added</span>
              </div>
            </div>
          </div>
          <div className="reference-story-photos">
            <img src={ubeFarm} alt="Ube growing in the Philippines" />
            <img src={ubeArabWoman} alt="Preparing a purple yam drink" />
          </div>
        </div>
      </section>
    </main>
  );
}