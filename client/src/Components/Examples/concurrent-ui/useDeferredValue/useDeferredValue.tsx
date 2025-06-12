import { useDeferredValue, useEffect, useState } from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import "./useDeferredValue.css";

export default function useDeferredValuePage() {
  // State that updates immediately on each keystroke
  const [query, setQuery] = useState<string>("");

  // Creates a deferred copy of 'query'. React will update this lower priority
  // so that urgent UI tasks (e.g., responding to typing) are not blocked.
  // Under the hood, this leverages React's concurrent rendering scheduler.
  const deferredQuery = useDeferredValue<string>(query);

  // State to hold results of a heavy computation based on 'deferredQuery'
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Simulate a CPU-intensive task triggered by deferredQuery
    let heavyItems: string[] = [];
    const heavyItems_length = 20000;
    for (let i = 0; i < heavyItems_length; i++) {
      heavyItems.push(deferredQuery);
    }

    setItems(heavyItems);
  }, [deferredQuery]); // We only run this when 'deferredQuery' updates to avoid blocking input.

  return (
    <section id="useDeferredValuePage">
      <h1>useDeferredValue</h1>

      <BackBtn />

      <article id="code">
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </article>

      <article id="text">
        <h3>useDeferredValue</h3>
        <p>
          <code>useDeferredValue</code> returns a deferred version of a state
          value, delaying its update to avoid blocking urgent UI updates. It is
          ideal for heavy computations triggered by a rapidly changing input
          like search text. By offloading expensive filtering or rendering to
          lower-priority updates, it keeps typing and animations smooth.
        </p>
        <p>
          Unlike <code>useTransition</code>, it does not require wrapping state
          updates or managing an isPending flag. It is best when you need to
          defer only a single input-driven value. It reduces boilerplate and
          complexity for simple deferment scenarios.
        </p>
        <p>
          Use <code>useDeferredValue</code> when you want immediate
          responsiveness for core UI actions. Choose <code>useTransition</code>
          instead when you need to defer multiple updates or show loading states
          for complex interactions.
        </p>
      </article>
    </section>
  );
}
