// Copyright (c) 2023 Ecth3li0n
// This file is part of Framwork GPT which is released under MIT License.
// See file LICENCE.txt for full license details.

import React from "react";

import "./PromptAsideScreen.scss";

export default function PromptAsideScreen() {
  return (
    <div className="asideScreen">
      <div className="asideScreen__section">
        <h2>List of saved prompts</h2>
        <ul>
          <li>Prompt 1</li>
          <li>Prompt 2</li>
        </ul>
      </div>
    </div>
  );
}
