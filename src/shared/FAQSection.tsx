import { faqItems } from "../constants";
import { Accordion } from "../components/Accordion";

import "../styles/FAQSection.css";

export function FAQSection() {
  return (
    <section className="faq-section">
      <h2>FAQ</h2>
      <p>Questions? We got you covered!</p>
      <Accordion items={faqItems} />
    </section>
  );
}