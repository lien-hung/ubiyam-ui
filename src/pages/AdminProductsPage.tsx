import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../store/productSlice";
import { addVariant, deleteVariant } from "../store/productVariantSlice";
import "../styles/AdminProductsPage.css";
import type { Product, ProductRequest, ProductVariant, ProductVariantRequest } from "../types/product";

type ProductStatus = "active" | "draft";

function createEmptyVariant(productId = 0): ProductVariantRequest {
  return { label: "", price: 0, productId };
}

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

  const [selectedProductId, setSelectedId] = useState<number>();
  const [formState, setFormState] = useState<ProductRequest>(createEmptyProduct());
  const [selectedVariantId, setSelectedVariantId] = useState<number>();
  const [variantFormState, setVariantFormState] = useState<ProductVariantRequest>(createEmptyVariant());
  const [showVariantForm, setShowVariantForm] = useState(false);

  useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId),
    [products, selectedProductId]
  );

  const variantsList = useMemo(
    () => selectedProduct?.variants ?? [],
    [selectedProduct?.variants]
  );

  function updateForm<Field extends keyof ProductRequest>(field: Field, value: ProductRequest[Field]) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function updateVariantForm<Field extends keyof ProductVariant>(field: Field, value: ProductVariant[Field]) {
    setVariantFormState((current) => ({ ...current, [field]: value }));
  }

  function handleSelectVariant(variant: ProductVariant) {
    setSelectedVariantId(variant.id);
    setVariantFormState({ ...variant, productId: selectedProductId ?? variant.productId });
    setShowVariantForm(true);
  }

  function handleNewVariant() {
    setSelectedVariantId(undefined);
    setVariantFormState(createEmptyVariant(selectedProductId));
    setShowVariantForm(true);
  }

  function handleSelectProduct(product: Product) {
    setSelectedId(product.id);
    setFormState(product);
    setSelectedVariantId(undefined);
    setVariantFormState(createEmptyVariant(product.id));
    setShowVariantForm(false);
  }

  function handleNewProduct() {
    setSelectedId(undefined);
    setSelectedVariantId(undefined);
    setVariantFormState(createEmptyVariant());
    setShowVariantForm(false);
    setFormState(createEmptyProduct());
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized: ProductRequest = {
      ...formState,
      price: Number(formState.price),
      ...(formState.compareAtPrice && { compareAtPrice: Number(formState.compareAtPrice) }),
      title: formState.title.trim(),
      handle: formState.handle.trim(),
      tags: formState.tags?.trim(),
      description: formState.description.trim(),
    };

    if (!normalized.title || !normalized.handle) {
      return;
    }

    try {
      if (selectedProductId) {
        await dispatch(updateProduct({ id: selectedProductId, data: normalized }));
      } else {
        await dispatch(createProduct(normalized));
      }
      toast(`Product ${selectedProductId ? "updated" : "created"} successfully`);
    } catch (error) {
      toast(`An error occurred: ${error}`);
    } finally {
      handleNewProduct();
    }
  }

  async function handleDelete() {
    if (!selectedProductId) {
      return;
    }
    if (window.confirm("Delete this product? This action cannot be undone.")) {
      try {
        await dispatch(deleteProduct(selectedProductId));
        toast("Product deleted successfully");
      } catch (error) {
        toast(`An error occurred: ${error}`);
      } finally {
        handleNewProduct();
      }
    }
  }

  async function handleAddVariant(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedProductId) {
      toast("Please select or create a product first");
      return;
    }

    const label = variantFormState.label.trim();
    if (!label) {
      toast("Please fill in the variant label");
      return;
    }

    const variantPayload = { ...variantFormState, label, productId: selectedProductId };

    try {
      await dispatch(addVariant(variantPayload));
      toast("Variant added successfully");
    } catch (error) {
      toast(`An error occurred: ${error}`);
      console.error(error);
    } finally {
      handleNewVariant();
    }
  }

  async function handleDeleteVariant(variantId: number) {
    if (window.confirm("Delete this variant? This action cannot be undone.")) {
      try {
        await dispatch(deleteVariant(variantId));
        toast("Variant deleted successfully");
      } catch (error) {
        toast(`An error occurred: ${error}`);
      } finally {
        if (selectedVariantId === variantId) {
          handleNewVariant();
        }
      }
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
                    className={product.id === selectedProductId ? "selected-row" : ""}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <td>{product.title}</td>
                    <td>{product.handle}</td>
                    <td>${Number(product.price).toFixed(2)}</td>
                    <td>{product.compareAtPrice ? `$${Number(product.compareAtPrice).toFixed(2)}` : "N/A"}</td>
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

        <div className="admin-panel">
          <div className="panel-header">
            <div>
              <h2>{selectedProductId ? "Edit product" : "Create product"}</h2>
              <p>{selectedProductId ? "Update the selected product details." : "Add a new product to the catalog."}</p>
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
                value={formState.compareAtPrice ?? 0}
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
              {selectedProductId && (
                <button type="button" className="button secondary" onClick={handleDelete}>
                  Delete
                </button>
              )}
            </div>
          </form>

          {selectedProduct && (
            <div className="variant-manager">
              <div className="variant-manager-header">
                <strong>Product variants</strong>
                <button type="button" className="button secondary" onClick={handleNewVariant}>Add variant</button>
              </div>

              {showVariantForm && (
                <form className="variant-form" onSubmit={handleAddVariant}>
                  <label>
                    Variant label
                    <input
                      value={variantFormState.label}
                      onChange={(event) => updateVariantForm("label", event.target.value)}
                      placeholder="250g"
                    />
                  </label>

                  <label>
                    Variant price
                    <input
                      type="number"
                      step="0.01"
                      value={variantFormState.price}
                      onChange={(event) => updateVariantForm("price", Number(event.target.value))}
                      placeholder="19.99"
                    />
                  </label>

                  <label>
                    Compare-at price
                    <input
                      type="number"
                      step="0.01"
                      value={variantFormState.compareAtPrice ?? 0}
                      onChange={(event) => updateVariantForm("compareAtPrice", Number(event.target.value))}
                      placeholder="Higher than sale price"
                    />
                  </label>

                  <div className="form-actions gift-form-actions">
                    <button type="submit" className="button">Save variant</button>
                  </div>
                </form>
              )}

              <div className="variant-list">
                {variantsList.length === 0 ? (
                  <p className="empty-state">No variants added yet. Click "Add variant" to define the available sizes or bundle options.</p>
                ) : (
                  variantsList.map((variant) => (
                    <div key={`variant-${variant.id}`} className="variant-item">
                      <div className="variant-info" onClick={() => handleSelectVariant(variant)}>
                        <div>
                          <p className="variant-text">{variant.label}</p>
                          <p className="variant-meta">
                            ${Number(variant.price).toFixed(2)}
                            {variant.compareAtPrice ? ` • Compare: $${Number(variant.compareAtPrice).toFixed(2)}` : ""}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="delete-variant-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteVariant(variant.id);
                        }}
                        title="Remove variant"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
