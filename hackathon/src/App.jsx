import { Routes, Route, Link } from "react-router-dom";

import ReportsPage from "./ReportsPage";
import CardsDeck from "./CardsDeck";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Reports</Link>
        {" | "}
        <Link to="/cards">Cards</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ReportsPage />} />
        <Route path="/cards" element={<CardsDeck />} />
      </Routes>
    </>
  );
}

export default App;
