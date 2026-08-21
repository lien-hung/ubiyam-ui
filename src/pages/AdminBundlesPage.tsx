import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import "../styles/AdminBundlesPage.css";
import type { Bundle, BundleRequest, BundleGiftRequest } from "../types/bundle";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createBundle, deleteBundle, getAllBundles, updateBundle } from "../store/bundleSlice";
import { addGift, deleteGift } from "../store/bundleGiftSlice";
import { getAllProducts } from "../store/productSlice";
import { toast } from "react-toastify";

interface BundleFormState extends BundleRequest {
  image: string;
}

function createEmptyBundle(): BundleFormState {
  return {
    title: "",
    subtitle: "",
    badgeText: "",
    imageUrl: "",
    image: "",
    productId: 0,
    buyQuantity: 1,
    getQuantity: 1,
  };
}

function createEmptyGift(): Omit<BundleGiftRequest, "bundleId"> {
  return {
    productId: 0,
    giftType: "free",
    text: "",
    quantity: 1,
    showPrice: false,
  };
}

export function AdminBundlesPage() {
  const dispatch = useAppDispatch();
  const bundles = useAppSelector((state) => state.bundle.bundles);
  const bundleLoading = useAppSelector((state) => state.bundle.isLoading);
  const products = useAppSelector((state) => state.product.products);
  const productLoading = useAppSelector((state) => state.product.isLoading);
  const bundleGifts = useAppSelector((state) => state.bundleGift.gifts);

  const [selectedBundleId, setSelectedBundleId] = useState<number | null>(null);
  const [formState, setFormState] = useState<BundleFormState>(createEmptyBundle());
  const [giftFormState, setGiftFormState] = useState<Omit<BundleGiftRequest, "bundleId">>(createEmptyGift());
  const [showGiftForm, setShowGiftForm] = useState(false);

  useEffect(() => {
    dispatch(getAllBundles());
    dispatch(getAllProducts());
  }, [dispatch]);

  const selectedBundle = useMemo(
    () => bundles.find((bundle) => bundle.id === selectedBundleId) || null,
    [bundles, selectedBundleId],
  );

  const bundleGiftsList = useMemo(
    () => selectedBundle?.freeGifts || bundleGifts.filter((gift) => gift.id && selectedBundleId),
    [selectedBundle, bundleGifts, selectedBundleId],
  );

  useEffect(() => {
    if (selectedBundle) {
      setFormState({ ...selectedBundle, image: selectedBundle.imageUrl });
    }
  }, [selectedBundle]);

  function updateForm<Field extends keyof BundleFormState>(field: Field, value: BundleFormState[Field]) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function updateGiftForm<Field extends keyof Omit<BundleGiftRequest, "bundleId">>(
    field: Field,
    value: Omit<BundleGiftRequest, "bundleId">[Field],
  ) {
    setGiftFormState((current) => ({ ...current, [field]: value }));
  }

  function handleSelectBundle(bundle: Bundle) {
    setSelectedBundleId(bundle.id);
    setShowGiftForm(false);
  }

  function handleNewBundle() {
    setSelectedBundleId(null);
    setFormState(createEmptyBundle());
    setShowGiftForm(false);
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized: BundleRequest = {
      title: formState.title.trim(),
      subtitle: formState.subtitle.trim(),
      badgeText: formState.badgeText.trim(),
      imageUrl: formState.image.trim(),
      productId: formState.productId,
      buyQuantity: Number(formState.buyQuantity),
      getQuantity: Number(formState.getQuantity),
    };

    if (!normalized.title || !normalized.productId) {
      alert("Please fill in all required fields (Title and Product)");
      return;
    }

    try {
      if (selectedBundleId) {
        await dispatch(updateBundle({ id: selectedBundleId, data: normalized }));
        toast("Bundle updated successfully");
      } else {
        await dispatch(createBundle(normalized));
        toast("Bundle created successfully");
      }
    } catch (error) {
      toast(`An error occurred: ${error}`);
      console.error(error);
    } finally {
      handleNewBundle();
    }
  }

  async function handleDeleteBundle() {
    if (!selectedBundleId) {
      return;
    }
    if (window.confirm("Delete this bundle? This action cannot be undone.")) {
      try {
        await dispatch(deleteBundle(selectedBundleId));
        toast("Bundle deleted successfully");
      } catch (error) {
        toast(`An error occurred: ${error}`);
        console.error(error);
      } finally {
        handleNewBundle();
      }
    }
  }

  async function handleAddGift(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedBundleId) {
      alert("Please select or create a bundle first");
      return;
    }

    if (!giftFormState.productId || !giftFormState.text) {
      alert("Please fill in all required fields (Product and Text)");
      return;
    }

    const giftPayload: BundleGiftRequest = {
      bundleId: selectedBundleId,
      productId: giftFormState.productId,
      giftType: giftFormState.giftType,
      text: giftFormState.text.trim(),
      quantity: Number(giftFormState.quantity),
      showPrice: giftFormState.showPrice,
    };

    await dispatch(addGift(giftPayload));
    setGiftFormState(createEmptyGift());
    setShowGiftForm(false);
  }

  async function handleDeleteGift(giftId: number) {
    if (window.confirm("Remove this gift from the bundle?")) {
      await dispatch(deleteGift(giftId));
    }
  }

  const isLoading = bundleLoading || productLoading;

  if (isLoading && bundles.length === 0) {
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
          <h1>Manage Bundles</h1>
        </div>
      </section>

      <section className="admin-grid admin-bundle-grid">
        <div className="admin-panel admin-list-panel">
          <div className="panel-header">
            <div>
              <h2>Bundle catalog</h2>
              <p>{bundles.length} bundles</p>
            </div>
            <button type="button" className="button secondary" onClick={handleNewBundle}>
              Add bundle
            </button>
          </div>

          <div className="bundle-table-wrap">
            <table className="bundle-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Product</th>
                  <th>Buy/Get</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bundles.map((bundle) => (
                  <tr
                    key={bundle.id}
                    className={bundle.id === selectedBundleId ? "selected-row" : ""}
                    onClick={() => handleSelectBundle(bundle)}
                  >
                    <td>{bundle.title}</td>
                    <td>{products.find((p) => p.id === bundle.productId)?.title || "—"}</td>
                    <td>{bundle.buyQuantity}/{bundle.getQuantity}</td>
                    <td>
                      <button
                        type="button"
                        className="table-action"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSelectBundle(bundle);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel-column">
          <div className="admin-panel admin-form-panel">
            <div className="panel-header">
              <div>
                <h2>{selectedBundleId ? "Edit bundle" : "Create bundle"}</h2>
                <p>{selectedBundleId ? "Update the selected bundle details." : "Add a new bundle to the catalog."}</p>
              </div>
            </div>

            <form className="bundle-form" onSubmit={handleSubmit}>
              <label>
                Bundle title *
                <input
                  value={formState.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  placeholder="Buy 3, Get 1 Free"
                />
              </label>

              <label>
                Subtitle
                <input
                  value={formState.subtitle}
                  onChange={(event) => updateForm("subtitle", event.target.value)}
                  placeholder="Limited time offer"
                />
              </label>

              <label>
                Badge text
                <input
                  value={formState.badgeText}
                  onChange={(event) => updateForm("badgeText", event.target.value)}
                  placeholder="Save 25%"
                />
              </label>

              <label>
                Product *
                <select
                  value={formState.productId}
                  onChange={(event) => updateForm("productId", Number(event.target.value))}
                >
                  <option value="">Select a product...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.title}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-row">
                <label>
                  Buy quantity
                  <input
                    type="number"
                    min="1"
                    value={formState.buyQuantity}
                    onChange={(event) => updateForm("buyQuantity", Number(event.target.value))}
                  />
                </label>

                <label>
                  Get quantity
                  <input
                    type="number"
                    value={formState.getQuantity}
                    onChange={(event) => updateForm("getQuantity", Number(event.target.value))}
                  />
                </label>
              </div>

              <label>
                Image URL
                <input
                  value={formState.image}
                  onChange={(event) => updateForm("image", event.target.value)}
                  placeholder="https://..."
                />
              </label>

              <div className="form-actions">
                <button type="submit" className="button">
                  Save bundle
                </button>
                {selectedBundleId ? (
                  <button type="button" className="button secondary" onClick={handleDeleteBundle}>
                    Delete bundle
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          {selectedBundleId && (
            <div className="admin-panel admin-gifts-panel">
              <div className="panel-header">
                <div>
                  <h2>Free gifts</h2>
                  <p>{bundleGiftsList.length} gifts included</p>
                </div>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setShowGiftForm(!showGiftForm)}
                >
                  {showGiftForm ? "Cancel" : "Add gift"}
                </button>
              </div>

              {showGiftForm && (
                <form className="gift-form" onSubmit={handleAddGift}>
                  <label>
                    Product *
                    <select
                      value={giftFormState.productId}
                      onChange={(event) => updateGiftForm("productId", Number(event.target.value))}
                    >
                      <option value={0}>Select a product...</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.title} (${Number(product.price).toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Gift description *
                    <input
                      value={giftFormState.text}
                      onChange={(event) => updateGiftForm("text", event.target.value)}
                      placeholder="e.g., Free UBE Powder pouch"
                    />
                  </label>

                  <label>
                    Gift type
                    <select
                      value={giftFormState.giftType}
                      onChange={(event) => updateGiftForm("giftType", event.target.value)}
                    >
                      <option value="free">Free Gift</option>
                      <option value="bonus">Bonus Item</option>
                      <option value="exclusive">Exclusive Item</option>
                    </select>
                  </label>

                  <label>
                    Quantity
                    <input
                      type="number"
                      min="1"
                      value={giftFormState.quantity}
                      onChange={(event) => updateGiftForm("quantity", Number(event.target.value))}
                    />
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={giftFormState.showPrice}
                      onChange={(event) => updateGiftForm("showPrice", event.target.checked)}
                    />
                    Show price in gift display
                  </label>

                  <div className="form-actions gift-form-actions">
                    <button type="submit" className="button">
                      Add gift
                    </button>
                  </div>
                </form>
              )}

              <div className="gifts-list">
                {bundleGiftsList.length === 0 ? (
                  <p className="empty-state">No gifts added yet. Click "Add gift" to include free items with this bundle.</p>
                ) : (
                  bundleGiftsList.map((gift) => {
                    const productGift = products.find((p) => p.id === gift.productId);

                    return (
                      <div key={gift.id} className="gift-item">
                        <div className="gift-info">
                          <div className="gift-type-badge">{gift.giftType}</div>
                          <div>
                            <p className="gift-text">{gift.text}</p>
                            <p className="gift-meta">
                              Qty: {gift.quantity}
                              {gift.showPrice && productGift ? ` • $${Number(productGift.price).toFixed(2)}` : ""}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="delete-gift-btn"
                          onClick={() => handleDeleteGift(gift.id)}
                          title="Remove gift"
                        >
                          ✕
                        </button>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
