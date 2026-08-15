import { organicItems } from "../constants";

import "../styles/OrganicVeganSection.css";

export function OrganicVeganSection() {
  return (
    <section className="organic-vegan-section">
      {organicItems.map((item, index) => (
        <div key={`organic-item-${index}`} className="organic-item">
          <img src={item.img} width={70} />
          <h3>{item.text}</h3>
        </div>
      ))}
    </section>
  );
}