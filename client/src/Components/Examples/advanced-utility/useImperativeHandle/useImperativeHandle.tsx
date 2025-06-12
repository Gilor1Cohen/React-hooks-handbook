import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ForwardedRef,
} from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import "./useImperativeHandlePage.css";

// Define an interface for the methods exposed to the parent
type CounterHandle = {
  increment(): void;
};

// Child component that exposes an imperative API via ref
const ChildCounter = forwardRef<CounterHandle>(function ChildCounter(
  _props,
  ref: ForwardedRef<CounterHandle> // ref passed from parent
) {
  const [count, setCount] = useState<number>(0);

  /**
   * useImperativeHandle lets us decide exactly what the parent can access via ref.
   * Here, we expose only the `increment` function.
   *
   * - The first argument is the ref that comes from the parent.
   * - The second argument is a function that returns the object
   *   which will be accessible via `counterRef.current` in the parent.
   *
   * This way, we hide the internal state (like `count`)
   * and only allow controlled interaction (e.g., `increment()`).
   */
  useImperativeHandle(ref, () => ({
    increment() {
      // Increment internal count state when parent calls increment()
      setCount((prev) => prev + 1);
    },
  }));

  return <p>Current Count: {count}</p>;
});

// Parent page component demonstrating useImperativeHandle
export default function useImperativeHandlePage() {
  // Create a ref that will point to CounterHandle methods on the child
  const counterRef = useRef<CounterHandle>(null);

  return (
    <section id="useImperativeHandlePage">
      <h1>useImperativeHandle</h1>

      <BackBtn />

      <article id="code">
        {/* Render child and attach ref so we can call its exposed methods */}
        <ChildCounter ref={counterRef} />

        {/* Call the child’s increment method through the ref */}
        <button
          onClick={() => counterRef.current?.increment()}
          className="increment-btn"
        >
          Increment from Parent
        </button>
      </article>

      <article id="text">
        <h3>useImperativeHandle</h3>
        <p>
          In React, when you use <code>useImperativeHandle</code> together with
          forwardRef, the child component can explicitly define which functions
          are exposed to the parent via the ref.
        </p>
        <p>
          Without <code>useImperativeHandle</code>, the ref simply points to the
          DOM node (or doesn't work at all in a functional component), so you
          can't expose just specific methods.
        </p>
        <p>
          Using <code>useImperativeHandle</code> lets you create a clean,
          protected API where the parent only calls the functions the child
          chose to expose, without revealing the entire internal implementation.
        </p>
      </article>
    </section>
  );
}
