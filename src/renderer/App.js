// Copyright (c) 2023 Ecth3li0n
// This file is part of Framwork GPT which is released under MIT License.
// See file LICENCE.txt for full license details.

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import HomeScreen from "./views/HomeScreen/HomeScreen";
import PromptGenScreen from "./views/PromptGenScreen/PromptGenScreen";
import NavBar from "./components/NavBar/NavBar";
import Aside from "./components/AsideScreens/Aside/Aside";

function App() {
  return (
    <Router>
      <div className="main-layout">
        <NavBar />
        <Aside />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/promptgen" element={<PromptGenScreen />} />
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

createRoot(document.getElementById("App")).render(<App />);
