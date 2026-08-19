import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import "../styles/AdminProductsPage.css";
import type { Product, ProductRequest } from "../types/product";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../store/productSlice";

type ProductStatus = "active" | "draft";

function createEmptyProduct(): ProductRequest {
  return {
    title: "",
    handle: "",
    price: 0,
    compareAtPrice: 0,
    status: "draft",
    tags: "",
    image: "",
    description: "",
  };
}

export function AdminProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const isLoading = useAppSelector((state) => state.product.isLoading);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formState, setFormState] = useState<ProductRequest>(createEmptyProduct());

  useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedId) || null,
    [products, selectedId],
  );

  useEffect(() => {
    if (selectedProduct) {
      setFormState(selectedProduct);
    }
  }, [selectedProduct]);

  function updateForm<Field extends keyof Product>(field: Field, value: Product[Field]) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function handleSelectProduct(product: Product) {
    setSelectedId(product.id);
  }

  function handleNewProduct() {
    setSelectedId(null);
    setFormState(createEmptyProduct());
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized: ProductRequest = {
      ...formState,
      price: Number(formState.price),
      compareAtPrice: formState.compareAtPrice !== 0 ? Number(formState.compareAtPrice) : undefined,
      title: formState.title.trim(),
      handle: formState.handle.trim(),
      tags: formState.tags.trim(),
      description: formState.description.trim(),
    };

    if (!normalized.title || !normalized.handle) {
      return;
    }
    
    if (selectedId) {
      await dispatch(updateProduct({ id: selectedId, data: normalized }));
    } else {
      await dispatch(createProduct(normalized));
    }
    handleNewProduct();
  }

  async function handleDelete() {
    if (!selectedId) {
      return;
    }
    if (window.confirm("Delete this product? This action cannot be undone.")) {
      await dispatch(deleteProduct(selectedId));
      handleNewProduct();
    }
  }

  if (isLoading) {
    return (
      <main className="admin-page">
        <section className="admin-hero">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1>Loading...</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Manage Products</h1>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel admin-list-panel">
          <div className="panel-header">
            <div>
              <h2>Product catalog</h2>
              <p>{products.length} products</p>
            </div>
            <button type="button" className="button secondary" onClick={handleNewProduct}>
              Add product
            </button>
          </div>

          <div className="product-table-wrap">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Handle</th>
                  <th>Price</th>
                  <th>Compare-at price</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={product.id === selectedId ? "selected-row" : ""}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <td>{product.title}</td>
                    <td>{product.handle}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.compareAtPrice ? `$${product.compareAtPrice.toFixed(2)}` : "N/A"}</td>
                    <td>{product.status}</td>
                    <td>
                      <button type="button" className="table-action" onClick={(event) => { event.stopPropagation(); handleSelectProduct(product); }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel admin-form-panel">
          <div className="panel-header">
            <div>
              <h2>{selectedId ? "Edit product" : "Create product"}</h2>
              <p>{selectedId ? "Update the selected product details." : "Add a new product to the catalog."}</p>
            </div>
          </div>

          <form className="product-form" onSubmit={handleSubmit}>
            <label>
              Product title
              <input
                value={formState.title}
                onChange={(event) => updateForm("title", event.target.value)}
                placeholder="Organic UBE Powder"
              />
            </label>

            <label>
              Product handle
              <input
                value={formState.handle}
                onChange={(event) => updateForm("handle", event.target.value)}
                placeholder="ube-powder-purple-yam"
              />
            </label>

            <label>
              Price
              <input
                type="number"
                step="0.01"
                value={formState.price}
                onChange={(event) => updateForm("price", Number(event.target.value))}
                placeholder="24.99"
              />
            </label>

            <label>
              Compare-at price
              <input
                type="number"
                step="0.01"
                value={formState.compareAtPrice}
                onChange={(event) => updateForm("compareAtPrice", Number(event.target.value))}
                placeholder="Higher than sale price"
              />
            </label>

            <label>
              Status
              <select value={formState.status} onChange={(event) => updateForm("status", event.target.value as ProductStatus)}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </label>

            <label>
              Tags
              <input
                value={formState.tags}
                onChange={(event) => updateForm("tags", event.target.value)}
                placeholder="organic,ube,superfood"
              />
            </label>

            <label>
              Image URL
              <input
                value={formState.image}
                onChange={(event) => updateForm("image", event.target.value)}
                placeholder="https://..."
              />
            </label>

            <label>
              Description
              <textarea
                value={formState.description}
                onChange={(event) => updateForm("description", event.target.value)}
                placeholder="Enter the product description here."
                rows={6}
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="button">
                Save
              </button>
              {selectedId && (
                <button type="button" className="button secondary" onClick={handleDelete}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
