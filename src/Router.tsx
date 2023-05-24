import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "components/Coin";
import Coins from "components/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":coinId/*" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
