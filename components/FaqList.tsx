export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <i className="bi bi-chevron-down" aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
