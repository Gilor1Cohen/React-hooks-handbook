import { Link } from "react-router-dom";
import "./BackBtn.css";

export default function BackBtn() {
  return (
    <Link id="BackBtnLink" to={"/"}>
      <button id="BackBtn">BackBtn</button>
    </Link>
  );
}
