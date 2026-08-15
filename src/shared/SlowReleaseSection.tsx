import { mascotSection } from "../constants";

import "../styles/SlowReleaseSection.css";

export function SlowReleaseSection() {
  return (
    <section className="slow-release-section">
      <div className="text">
        <span>Slow-release carbs for balanced, crash-free energy.</span>
        <h2>Pure Ingredients. Functional Benefits. No Compromises.</h2>
      </div>
      <div className="mascots">
        {mascotSection.map((section, index) => (
          <div key={`mascot-section-${index}`} className="mascot-section">
            <img src={section.img} width={70} />
            <h3>{section.text}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}