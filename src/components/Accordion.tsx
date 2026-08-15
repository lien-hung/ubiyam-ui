import "../styles/Accordion.css";

type AccordionItem = {
  summary: string;
  details: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details key={item.summary}>
          <summary>
            <h3>{item.summary}</h3>
            <i className="bi bi-plus-lg" />
          </summary>
          <p>{item.details.trim()}</p>
        </details>
      ))}
    </div>
  );
}