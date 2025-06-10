import { useState, useMemo } from "react";
import "./useMemo.css";
import BackBtn from "../../../../ui/BackBtn/BackBtn";

/// Structure of useMemo:
/// const VariableName = useMemo(() => { /* callback */ }, [/* dependencies */]);
///
/// ───────────────────────────── Explanation ─────────────────────────────
/// • Callback (first argument)
///   - Place any heavy or derived computation here.
///   - Must return the value you want React to cache (memoize).
///
/// • Dependency array (second argument)
///   - List every reactive value the callback relies on.
///   - React re-runs the callback only when one of these values changes.
///   - [] → run once on mount;  omitting the array → run on every render.
///
/// • Returned value
///   - React stores (memoizes) the result.
///   - On subsequent renders, the cached value is reused as long as the
///     dependencies are unchanged, preventing unnecessary recalculations.

/// useMemo is for **calculating** and caching a value during render, whereas useEffect runs **after** render for side-effects;

export default function useMemoPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  /// function ExpensiveCalculation(): number {
  ///    console.log("Calculating expensive result...");
  ///   let result: number = 0;
  ///  for (let i = 0; i < 1000000000; i++) {
  ///   result += 1;
  ///  }
  ///  return result + count;
  //}
  ///   // Runs on every render because it sits directly in the component body.
  ///   // Any state change like updating text- forces a re-render,
  ///   // so this billion-iteration loop executes again even  though text has no relation to the result.
  ///   // The repeated work blocks the main thread and makes the UI feel frozen.
  ///   // Wrapping the same logic in:
  ///   //   const value = useMemo(() => { ... }, [count]);
  ///   // tells React: “Recalculate only when count changes.”  For renders triggered by text,
  ///   // useMemo sees count is unchanged and instantly returns the cached value, avoiding
  ///   // the heavy loop.

  const ExpensiveCalculation = useMemo(() => {
    console.log("Calculating expensive result...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += 1;
    }
    return result + count; // ← value React will cache
  }, [count]); // ← single dependency

  // Goal: run the heavy loop *only* when count changes.
  // 1. React calls the arrow-function on the first render.
  // 2. The **same** cached value is reused on every subsequent render
  //    until count changes, sparing the app from repeating the loop.

  return (
    <section id="useMemoPage">
      <h1>useMemo</h1>

      <BackBtn />

      <article id="code">
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>

        <p>Text: {text}</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />

        {/* Displays the memoized number.
            Will update only after you press "Increment Count". */}
        <p>Expensive Calculation Result: {ExpensiveCalculation}</p>
      </article>
      <article id="text">
        <h3>useMemo</h3>
        <p>
          <code>useMemo</code> is a React Hook designed to optimize performance
          by memoizing expensive calculations. It prevents redundant
          computations on every re-render of a component by storing the result
          of a function. The calculation will only re-execute if its
          dependencies (specified in an array) change. This effectively skips
          unnecessary work, leading to a smoother user experience, especially in
          components with complex logic or large data sets. It's a key tool for
          improving the efficiency of your React applications.
        </p>
      </article>
    </section>
  );
}
