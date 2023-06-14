// Copyright (c) 2023 Ecth3li0n
// This file is part of Framwork GPT which is released under MIT License.
// See file LICENCE.txt for full license details.

import React from "react";
import { useLocation } from "react-router-dom";
import PromptAsideScreen from "../PromptAsideScreen/PromptAsideScreen";

import "./Aside.scss";

export default function Aside() {
  const location = useLocation();

  let content;

  switch (location.pathname) {
    case "/promptGen":
      content = <PromptAsideScreen />;
      break;
    default:
      content = <div>Here, there will be content</div>;
  }

  return <aside className="aside">{content}</aside>;
}
