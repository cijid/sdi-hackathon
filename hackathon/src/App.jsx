import { Routes, Route, Link } from "react-router-dom";

import ReportsPage from "./ReportsPage";
import CardsDeck from "./CardsDeck";
import ButtonChase from "./ButtonChase";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Reports</Link>
        {" | "}
        <Link to="/cards">Cards</Link>
        {" | "}
        <Link to="/buttonchase">Button Chase</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ReportsPage />} />
        <Route path="/cards" element={<CardsDeck />} />
        <Route path="/buttonchase" element={<ButtonChase />} />
      </Routes>
    </>
  );
}

export default App;
