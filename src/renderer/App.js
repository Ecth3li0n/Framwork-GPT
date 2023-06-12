// Copyright (c) 2023 Ecth3li0n
// This file is part of Framwork GPT which is released under MIT License.
// See file LICENCE.txt for full license details.

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import HomeScreen from "./views/HomeScreen";
import PromptGenScreen from "./views/PromptGenScreen";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/promptgen" element={<PromptGenScreen />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("App"));
