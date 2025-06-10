import { useEffect, useRef, useState } from "react";
import "./useRef.css";
import BackBtn from "../../../../ui/BackBtn/BackBtn";

/// useState =  Re-renders the component when the state value changes

/// useRef =  Does not cause re-renders when its value changes.
//              1. Accessing/Interacting with DOM elements
//              2. Handling Focus, Animations, and Transitions
//              3. Managing Timers and Intervals

export default function useRefPage() {
  return (
    <section id="useRefPage">
      <h1>useRef</h1>

      <BackBtn />

      <article id="code">
        <h3>Example 1: Accessing DOM element</h3>
        <ExampleDomAccess />

        <h3>Example 2: Tracking value without causing re-render</h3>
        <ExampleRenderComparison />

        <h3>Example 3: Managing Timer</h3>
        <ExampleTimer />
      </article>
      <article id="text">
        <h3>useRef Hook</h3>
        <p>
          useRef is a React Hook that lets you hold a mutable value that doesn't
          cause a re-render when it changes. It's often used for accessing and
          interacting with DOM elements or storing persistent data across
          renders.
        </p>
      </article>
    </section>
  );
}

// Example 1: using useRef to focus an input field
function ExampleDomAccess() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus the input on mount
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      {/* inputRef is assigned to this input DOM element */}
      <input ref={inputRef} placeholder="I'm focused on load!" />
    </div>
  );
}

// Example 2: using useRef to store a value that does not cause re-render
function ExampleRenderComparison() {
  const [stateCount, setStateCount] = useState(0); // state: causes re-render
  const refCount = useRef(0); // ref: does not cause re-render

  console.log("Component rendered");

  const renderCount = useRef(1); // Tracks how many times component re-renders

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <p>State count: {stateCount}</p>
      <p>Ref count (won't update visually): {refCount.current}</p>{" "}
      <p>Render count: {renderCount.current}</p>
      <button
        onClick={() => {
          setStateCount((prev) => prev + 1);
        }}
      >
        Increment State
      </button>
      <button
        onClick={() => {
          refCount.current += 1;
          ~console.log("Ref updated to", refCount.current);
        }}
      >
        Increment Ref
      </button>
    </div>
  );
}

function ExampleTimer() {
  const [message, setMessage] = useState("Waiting...");

  // useRef is used here to store the timeout ID returned by setTimeout.
  // We use it because we want to:
  // 1. Preserve the value between renders.
  // 2. Avoid causing re-renders when updating this value.
  // 3. Cancel the timeout later using clearTimeout.
  const timeoutRef = useRef<number | null>(null);

  const startTimer = () => {
    setMessage("Timer started...");

    // Save the timer ID in the ref so we can access it later.
    // If we used useState here, it would cause an unnecessary re-render.
    timeoutRef.current = window.setTimeout(() => {
      setMessage("Time's up!");
    }, 3000);
  };

  const cancelTimer = () => {
    // Access the timer ID from the ref to cancel the timeout.
    // Again, since we’re not using useState, this does not trigger a re-render.
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      setMessage("Timer cancelled.");
      timeoutRef.current = null; // Optional cleanup
    }
  };

  return (
    <div>
      <p>{message}</p>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={cancelTimer}>Cancel Timer</button>
    </div>
  );
}
