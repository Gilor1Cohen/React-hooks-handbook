import { useState, useTransition, type FormEvent } from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import "./useTransition.css";

export default function useTransitionPage() {
  const [query, setQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  // Initialize the transition hook:
  // - isPending: true while deferred updates are running
  // - startTransition: function to wrap low-priority updates
  const [isPending, startTransition] = useTransition();

  const items: string[] = Array.from(
    { length: 30000 },
    (_, i) => `Item ${i + 1}`
  );

  //// Synchronous version (all updates are high-priority and block the UI):
  // function handleChange(e: FormEvent<HTMLInputElement>): void {

  //// High-priority update: setQuery(value) triggers an immediate render,
  //// which can conflict with heavier work and make typing feel sluggish.
  //   const value = e.currentTarget.value;
  //   setQuery(value);

  //// Blocking work: filtering a large array synchronously ties up the main thread,
  //// causing visible freezes or “lag” during user input.
  //   const result: string[] = items.filter((item) =>
  //     item.toLowerCase().includes(value.toLowerCase())
  //   );

  //// Another high-priority update: setFilteredItems(result) fires a second render
  //// without deferring, doubling render passes and further harming responsiveness.
  //   setFilteredItems(result);

  //// useTransition avoids these issues by deferring the expensive setFilteredItems call
  //// as a low-priority “transition,” keeping the UI snappy while background work runs.
  // }

  function handleChange(e: FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    setQuery(value);

    // startTransition takes a callback containing the "low-priority" updates
    // and returns immediately, so React can keep the UI responsive.
    // Signature: startTransition(callback: () => void): void

    startTransition(() => {
      // Inside this callback you put the work you want deferred:
      setFilteredItems(
        items.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      );
    });
  }

  return (
    <section id="useTransitionPage">
      <h1>useTransition</h1>

      <BackBtn />

      <article id="code">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Type to filter..."
        />

        {/*
          Show a loading indicator while the transition is pending,
          keeping the UI responsive during heavy work.
        */}
        {isPending ? (
          <div id="Loading">Loading...</div>
        ) : (
          <ul>
            {filteredItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </article>

      <article id="text">
        <h3>useTransition</h3>
        <p>
          In React, every state update is treated as high priority, causing an
          immediate render that can block the JS event loop. When performing
          heavy computations or filtering large data sets, these updates can
          introduce lags and UI freezes.
        </p>

        <p>
          <code>useTransition</code> lets you mark certain updates as low
          priority and defer them until critical updates have completed. This
          preserves smooth responsiveness for actions like typing, while heavy
          computations run in the background.
        </p>

        <p>
          <strong>Important to remember:</strong> because it splits state
          updates into parts, it can double the number of renders.
        </p>
        <p>
          It's commonly used for real-time search, filtering large lists, and
          loading resource-intensive components. By doing so,
          <code>useTransition</code>
          ensures a seamless user experience without complex asynchronous
          handling.
        </p>
      </article>
    </section>
  );
}
