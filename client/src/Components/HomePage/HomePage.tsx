import { Categories, Hooks } from "../../Helpers/Arrays/HooksArr";
import { Link } from "react-router-dom";
import type { HooksArr } from "../../Helpers/models/Hooks";
import "./HomePage.css";

export default function HomePage() {
  return (
    <section id="HomePage">
      <h1>React Hooks Handbook</h1>

      <article>
        {Categories.map((Category: string) => (
          <div key={Category}>
            <h1>{Category}</h1>

            {Hooks.filter((Hook: HooksArr) => Hook.Category === Category).map(
              (hook: HooksArr) => (
                <Link className="link" key={hook.Name} to={`/${hook.Name}`}>
                  <li>
                    <p>{hook.Name}</p>
                  </li>
                </Link>
              )
            )}
          </div>
        ))}
      </article>
    </section>
  );
}
