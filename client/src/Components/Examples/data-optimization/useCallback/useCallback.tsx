import { useState, useCallback } from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import "./useCallBack.css";

// Structure of useCallback:
// const memoizedCallback = useCallback(
//   () => {
//     // The function you want to memoize
//     doSomething(a, b);
//   },
//   [a, b] // Dependency array
// );

export default function useCallbackPage() {
  return (
    <section id="useCallbackPage">
      <h1>useCallback</h1>

      <BackBtn />

      <article id="code">
        <ParentComponent />
      </article>
      <article id="text">
        <p>
          <code>useCallback</code> is a React Hook designed for performance
          optimization by memoizing functions. In React, functions defined
          within a component are recreated on every re-render, which can lead to
          performance issues. <code>useCallback</code> prevents this by
          returning a memoized version of the callback function, ensuring it
          remains the same across renders unless its dependencies change.
        </p>
      </article>
    </section>
  );
}

function ParentComponent() {
  const [count, setCount] = useState<number>(0);

  // useCallback memoizes the handleClick function.
  // The function identity is guaranteed to remain stable across re-renders
  // as long as the dependency array ([] here) does not change.
  // This is useful when passing callbacks to child components, to prevent unnecessary re-renders.
  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Count: {count}</p>

      <button onClick={handleClick}>Increment Count (Parent)</button>

      {/* Passing the memoized handleClick function to the child component.
          If handleClick was not memoized, a new function reference would be
          created on every render, potentially causing unnecessary re-renders
          of the ChildComponent. */}
      <ChildComponent onButtonClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onButtonClick }: { onButtonClick: () => void }) {
  console.log("ChildComponent rendered");
  return (
    <div>
      <h3>Child Component</h3>

      <button onClick={onButtonClick}>Click Me (Child)</button>
    </div>
  );
}
