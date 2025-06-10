import { useReducer } from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import "./useReducer.css";

export default function useReducerPage() {
  // useReducer returns an array: [state, dispatch]
  // - state: current state value (like from useState)
  // - dispatch: function to send actions that describe state changes
  // useReducer(reducerFunction, initialState)
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  //  When to use useState vs useReducer:
  // Use useState when the state is simple (like a number, string, boolean, or a single object)
  // and updates are straightforward (e.g., setValue(newValue)).
  // Use useReducer when the state is complex (e.g., nested objects, multiple related values)
  // or when many different actions update the same state,
  // or when state updates depend on the previous state.

  return (
    <section id="useReducerPage">
      <article id="code">
        <h1>useReducer</h1>

        <BackBtn />

        <div>
          <p>Count: {state.count}</p>

          {/* In useState you'd do: setCount(count - 1)
          In useReducer you send an action: */}
          <button onClick={() => dispatch({ type: "decrement" })}>-</button>

          <button onClick={() => dispatch({ type: "increment" })}>+</button>
        </div>
      </article>
      <article id="text">
        <h3>useReducer</h3>
        <p>
          <code>useReducer</code> is a React hook for managing state in a
          centralized and clear manner using a reducer function. It's suitable
          when state management becomes too complex for <code>useState</code>,
          such as when there are multiple states or updates that depend on
          previous state values. It's particularly recommended for complex
          forms, applications with many state actions, or when tracking state
          changes becomes difficult using simple state management.
        </p>
      </article>
    </section>
  );
}

// Define the shape of the state
type State = {
  count: number;
};

// Define all possible action types
type Action = { type: "increment" } | { type: "decrement" };

// The reducer function with typed state and action
// Instead of setting state manually (as in useState), we describe what we *want* to do via actions.
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Unhandled action type");
  }
}
