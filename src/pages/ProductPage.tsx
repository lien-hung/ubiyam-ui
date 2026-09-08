import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Accordion } from "../components/Accordion";
import { Gallery } from "../components/Gallery";
import { productAccordionItems } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../store/cartSlice";
import { getProductByHandle } from "../store/productSlice";
import "../styles/ProductPage.css";
import type { ProductVariant } from "../types/product";

export function ProductPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product = useAppSelector((state) => state.product.products[0]);
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const variants = product ? product.variants : [];
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  
  const selectedVariantPrice = selectedVariant?.price ?? product?.price ?? 0;
  const totalPrice = selectedVariantPrice * 1;

  useEffect(() => { dispatch(getProductByHandle(slug ?? "")); }, [dispatch, slug]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    dispatch(addToCart({ product, variant: selectedVariant }));
    navigate("/cart");
  }

  if (isLoading) return;

  if (!product) {
    return (
      <main className="product-page">
        <section className="not-found">
          <p>404</p>
          <h2>Page not found</h2>
          <a className="button" href="/">Continue shopping</a>
        </section>
      </main>
    )
  }

  return (
    <main className="product-page">
      <section className="product-section">
        <Gallery items={[{ src: product.image }]} />
        <div className="product-info">
          {product.tags && (
            <div className="product-tags">
              {product.tags.split(",").map((tag, index) => <span key={`tag${index}-${tag}`}>{tag}</span>)}
            </div>
          )}

          <h2>{product.title}</h2>

          <p className="product-description">{product.description}</p>

          <div className="product-variants">
            <div className="variant-title">Choose your size</div>
            <div className="variant-list">
              {variants.map((variant) => (
                <button
                  key={`variant-${variant.id}`}
                  type="button"
                  className={`variant-option ${selectedVariant?.id === variant.id ? "selected" : ""}`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <span>{variant.label}</span>
                  <small>${Number(variant.price).toFixed(2)}</small>
                </button>
              ))}
            </div>
          </div>

          <button disabled={!selectedVariant} className="button add-to-cart" onClick={handleAddToCart}>
            {totalPrice !== 0 && `$${totalPrice.toFixed(2)} • `}ADD TO CART
          </button>

          <p className="product-promo"><i className="bi bi-patch-check-fill"></i>60-day Satisfaction Guarantee</p>

          <Accordion items={productAccordionItems} />
        </div>
      </section>
    </main>
  );
}