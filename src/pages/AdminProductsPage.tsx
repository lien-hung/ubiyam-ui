import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import "../styles/AdminProductsPage.css";

type ProductStatus = "active" | "draft";

type Product = {
  id: string;
  title: string;
  handle: string;
  price: number;
  inventory: number;
  status: ProductStatus;
  tags: string;
  image: string;
  description: string;
};

const storageKey = "ubiyam-admin-products";

const defaultProducts: Product[] = [
  {
    id: "prod-1",
    title: "Organic UBE Powder",
    handle: "ube-powder-purple-yam",
    price: 24.99,
    inventory: 120,
    status: "active",
    tags: "organic,ube,superfood,philippines",
    image: "",
    description: "100% organic ube powder grown in the Philippines. Perfect for lattes, smoothies, and baking.",
  },
  {
    id: "prod-2",
    title: "UBE & Strawberry Powder",
    handle: "ube-strawberry-powder",
    price: 29.99,
    inventory: 0,
    status: "draft",
    tags: "ube,strawberry,limited",
    image: "",
    description: "A vibrant strawberry-infused ube blend for colorful drinks and desserts.",
  },
  {
    id: "prod-3",
    title: "UBE & Matcha Powder",
    handle: "ube-matcha-powder",
    price: 29.99,
    inventory: 0,
    status: "draft",
    tags: "ube,matcha,wellness",
    image: "",
    description: "A smooth, earthy matcha blend with our signature ube powder.",
  },
];

function createEmptyProduct(): Product {
  return {
    id: "",
    title: "",
    handle: "",
    price: 0,
    inventory: 0,
    status: "draft",
    tags: "",
    image: "",
    description: "",
  };
}

export function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Product>(createEmptyProduct());

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setProducts(JSON.parse(saved) as Product[]);
        return;
      } catch {
        // ignore parse errors and load defaults
      }
    }
    setProducts(defaultProducts);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(products));
  }, [products]);

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

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized: Product = {
      ...formState,
      price: Number(formState.price),
      inventory: Number(formState.inventory),
      title: formState.title.trim(),
      handle: formState.handle.trim(),
      tags: formState.tags.trim(),
      description: formState.description.trim(),
    };

    if (!normalized.title || !normalized.handle) {
      return;
    }

    if (selectedId) {
      setProducts((current) =>
        current.map((product) => (product.id === selectedId ? { ...product, ...normalized } : product)),
      );
    } else {
      const id = crypto.randomUUID?.() ?? `prod-${Date.now()}`;
      setProducts((current) => [{ ...normalized, id }, ...current]);
      setSelectedId(id);
    }
  }

  function handleDelete() {
    if (!selectedId) {
      return;
    }
    if (window.confirm("Delete this product? This action cannot be undone.")) {
      setProducts((current) => current.filter((product) => product.id !== selectedId));
      handleNewProduct();
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Manage Products</h1>
          <p>
            Create, update, and remove product entries with the same visual rhythm as the storefront.
            Product data is stored locally for now and can be wired to a backend later.
          </p>
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
                  <th>Inventory</th>
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
                    <td>{product.inventory}</td>
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
              Inventory quantity
              <input
                type="number"
                value={formState.inventory}
                onChange={(event) => updateForm("inventory", Number(event.target.value))}
                placeholder="120"
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
                Save product
              </button>
              {selectedId ? (
                <button type="button" className="button secondary" onClick={handleDelete}>
                  Delete product
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
