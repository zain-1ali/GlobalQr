import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

let Home = lazy(() => import("./Pages/Home"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
