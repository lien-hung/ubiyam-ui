import "../styles/FAQAccordion.css";

type FaqItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FaqItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <section className="faq-section">
      <h2>FAQ</h2>
      <p>Questions? We got you covered!</p>
      <div className="faq-list">
        {items.map((item) => {
          return (
            <details key={item.question} className="faq-item">
              <summary className="faq-trigger">
                <h3>{item.question}</h3>
                <i className="bi bi-plus-lg" />
              </summary>
              <p>{item.answer}</p>
            </details>
          );
        })}
      </div>
    </section>
  );
}