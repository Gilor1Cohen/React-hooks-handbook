import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import "./useLayoutEffect.css";

// Difference from useEffect:
// - useLayoutEffect fires **synchronously** after DOM mutations but **before** the browser paints.
// - useEffect fires **asynchronously** after the browser has painted.
// Use useLayoutEffect when you need to:
//   • Measure DOM nodes (e.g., getBoundingClientRect) without flicker
//   • Apply DOM mutations before paint (e.g., adjust scroll positions)
// Otherwise, stick with useEffect to avoid blocking the UI thread.

export default function useLayoutEffectPage() {
  return (
    <section id="useLayoutEffectPage">
      <h1>useLayoutEffect</h1>

      <BackBtn />

      <article id="code">
        <EffectExample />
        <LayoutEffectExample />
      </article>

      <article id="text">
        <h3>When to Use useLayoutEffect</h3>
        <p>
          <code>useLayoutEffect</code> runs **synchronously** after the DOM has
          been updated but **before the browser paints**. It allows you to read
          layout information (like sizes or positions) and make changes
          immediately, preventing visible flickers or layout jumps.
        </p>
        <p>
          <code>useEffect</code> runs **after the screen is painted**, so it is
          more performant and preferred by default.
        </p>
        <p>
          Use <code>useLayoutEffect</code> only when your code **needs to block
          the paint** to adjust layout or measure DOM elements accurately.
        </p>
      </article>
    </section>
  );
}

// Example that shows useEffect measuring too late
function EffectExample() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>("lightgray");

  useEffect(() => {
    // This code runs AFTER the component is painted on screen
    // So even though we delay the render until color is set,
    // the first render (with null) still happens visibly
    if (boxRef.current) {
      const height = boxRef.current.getBoundingClientRect().height;
      setColor(height > 100 ? "lightcoral" : "lightblue");
    }
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        backgroundColor: color,
        padding: "2rem",
        marginBottom: "2rem",
        minHeight: "150px",
        transition: "all 0.3s",
      }}
    >
      <strong>useEffect Box</strong>
      <p>This box might still flicker because color is set after paint.</p>
    </div>
  );
}

// Example using useLayoutEffect to avoid flicker
function LayoutEffectExample() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>("lightgray");

  useLayoutEffect(() => {
    // This code runs BEFORE the browser paints
    // So color is calculated before the box is rendered
    if (boxRef.current) {
      const height = boxRef.current.getBoundingClientRect().height;
      setColor(height > 100 ? "lightgreen" : "lightblue");
    }
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        backgroundColor: color,
        padding: "2rem",
        marginBottom: "2rem",
        minHeight: "150px",
        transition: "all 0.3s",
      }}
    >
      <strong>useLayoutEffect Box</strong>
      <p>This box never flickers, the color is set before it is shown.</p>
    </div>
  );
}
