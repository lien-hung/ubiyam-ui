import { useAppDispatch, useAppSelector } from "../hooks";
import ubeFarm from "../assets/ube-farm.webp";
import "../styles/ProductListPage.css";
import { useEffect } from "react";
import { getAllProducts } from "../store/productSlice";
import type { Product } from "../types/product";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router";

export function ProductListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.product.products);
  
  useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product }));
    navigate("/cart");
  };

  return (
    <main className="product-list-page">
      <section className="product-list">
        <div className="product-list-header">
          <h2>Products</h2>
          <img src={ubeFarm} />
        </div>
        <div className="product-cards">
          {products.map((product) => (
            <div className="product-card">
              <img src={product.image} />
              <div className="product-card-info">
                <a href={`/products/${product.handle}`}><h3>{product.title}</h3></a>
                <div className="product-card-prices">
                  <span className="bold purple">${product.price}</span>
                  {product.compareAtPrice && (<span className="line-through small">${product.compareAtPrice}</span>)}
                </div>
                <button className="button" onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}