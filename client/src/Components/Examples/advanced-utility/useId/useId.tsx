import { useId } from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import "./useIdPage.css";

export default function useIdPage() {
  // useId generates a unique ID for each render of this component.
  // It's useful when you need to associate labels with form fields using 'id' and 'htmlFor',
  // especially when the same component is used multiple times on a page.
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  return (
    <section id="useIdPage">
      <h1>useId</h1>

      <BackBtn />

      <article id="code">
        <form>
          {/* This label is linked to the input using the same id (nameId) */}
          <div>
            <label htmlFor={nameId}>Name:</label>
            <input type="text" id={nameId} />
          </div>
          {/* Same idea here: the email input is linked to its label */}
          <div>
            <label htmlFor={emailId}>Email:</label>
            <input type="email" id={emailId} />
          </div>
          {/* Linking a textarea to its label with a unique id */}
          <div>
            <label htmlFor={messageId}>Message:</label>
            <textarea id={messageId}></textarea>
          </div>
        </form>
      </article>

      <article id="text">
        <h3>useId</h3>
        <p>
          <code>useId</code> is a React Hook that generates a unique and stable
          ID for the lifetime of the component.
        </p>
        <p>
          It's ideal for linking <code>&lt;label&gt;</code> elements to form
          inputs, preventing ID collisions when the same component is rendered
          multiple times on a page.
        </p>
      </article>
    </section>
  );
}
