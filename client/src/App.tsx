import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import { Hooks } from "./Helpers/Arrays/HooksArr";
import type { HooksArr } from "./Helpers/models/Hooks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {Hooks.map((hook: HooksArr) => (
          <Route
            key={hook.Name}
            path={`/${hook.Name}`}
            element={<hook.Component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
