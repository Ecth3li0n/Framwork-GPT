// Copyright (c) 2023 Ecth3li0n
// This file is part of Framwork GPT which is released under MIT License.
// See file LICENCE.txt for full license details.

import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav className="navBar">
      <ul>
        <Link to={{ pathname: "/" }}>
          <li>
            <p>Home</p>
          </li>
        </Link>
        <Link to={{ pathname: "/promptGen" }}>
          <li>
            <p>Prompt Generator</p>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
