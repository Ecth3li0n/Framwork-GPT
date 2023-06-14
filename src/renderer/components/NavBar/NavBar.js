// NavBar.js

// Copyright (c) 2023 Ecth3li0n
// This file is part of Framwork GPT which is released under MIT License.
// See file LICENCE.txt for full license details.

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFileLines } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.scss";

/**
 * NavBar function component renders the navigation bar with links to different pages.
 *
 * @return {React.Element} Returns the NavBar component as a React Element.
 */
export default function NavBar() {
  const location = useLocation();

  /**
   * isActiveFunc is a function that determines if the link should be active.
   *
   * @param {string} path The path of the NavLink.
   * @param {object} location The current location object.
   * @return {boolean} Returns true if the link should be active, otherwise false.
   */
  const isActiveFunc = (path, location) => {
    // Here we add logic to handle the special case of the home route ("/")
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    // Other routes are checked for being exactly equal to the path
    return location.pathname.includes(path);
  };

  return (
    <nav className="navBar">
      <ul>
        <NavLink to="/" aria-label="Home" activeclassname="selected">
          <li>
            <FontAwesomeIcon icon={faHouse} />
          </li>
        </NavLink>
        <NavLink
          to="/promptGen"
          aria-label="Prompts"
          activeclassname="selected"
        >
          <li>
            <FontAwesomeIcon icon={faFileLines} />
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
