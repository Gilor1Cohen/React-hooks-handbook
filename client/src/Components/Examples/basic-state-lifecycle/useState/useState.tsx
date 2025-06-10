import { useState } from "react";
import "./useState.css";
import BackBtn from "../../../../ui/BackBtn/BackBtn";

export default function UseStatePage() {
  /**
   * useState initializes a state variable within the component.
   * - 'number' is the current state value (initialized to 0).
   * - 'setNumber' is a function to update 'number'.
   * The generic <number> enforces that the state value must be a number.
   */
  const [number, setNumber] = useState<number>(0);

  // useState hook structure:
  // const [value, setValue] = useState<Type>(initialValue);
  // 1. 'value' is the current state.
  // 2. 'setValue' is the function to update the state (triggers re-render).
  // 3. 'Type' (optional) enforces the state’s type.
  // 4. 'initialValue' sets the starting value.

  return (
    <section id="useStatePage">
      <h1>useState</h1>

      <BackBtn />

      <article id="code">
        {/* Decrement button: decreases 'number' by 1 */}
        <button
          onClick={() => {
            {
              /*
          setNumber can accept a function to update state based on the previous value.
          Here, prevNum represents the previous state.
          Decrement: subtract 1 from prevNum and set that as the new state.
        */
            }
            setNumber((prevNum) => prevNum - 1);
          }}
        >
          -
        </button>

        {/* Display the current value of 'number' */}
        <p>{number}</p>

        {/* Increment button: increases 'number' by 1 */}
        <button
          onClick={() => {
            {
              /*
          Increment: take prevNum, add 1, and set as new state.
          Using the updater function form ensures we always use the latest state,
          which is important when updates happen in quick succession.
        */
            }
            setNumber((prevNum) => prevNum + 1);
          }}
        >
          +
        </button>
      </article>
      <article id="text">
        <h3>useState Hook</h3>
        <p>
          useState allows functional components to store and update values over
          time. It's essential when dealing with data that changes during app
          usage, triggering the component to re-render based on the new value
          like in forms, button clicks, or counters.
        </p>
      </article>
    </section>
  );
}
