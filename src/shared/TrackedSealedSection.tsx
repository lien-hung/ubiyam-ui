import "../styles/TrackedSealedSection.css";

export function TrackedSealedSection() {
  return (
    <section className="tracked-sealed-section">
      <div className="text tracked-sealed-item">
        <i className="bi bi-truck" />
        <h3>Tracked & Sealed</h3>
        <p>Carefully sealed and shipped with tracking, delivered fresh and ready to enjoy.</p>
      </div>
      <div className="text tracked-sealed-item">
        <i className="bi bi-heart" />
        <h3>Pure Philippine Purple Yam Powder</h3>
        <p>No sugar. No fillers. No additives. Just real ube.</p>
      </div>
      <div className="text tracked-sealed-item">
        <i className="bi bi-stars" />
        <h3>Steady, Plant-Based Fuel</h3>
        <p>Rich in natural antioxidants and fiber to support gut health and balanced energy.</p>
      </div>
    </section>
  );
}