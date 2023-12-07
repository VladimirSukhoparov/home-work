import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { useLocale } from "../../store/use-locale";
import { Link, useLocation } from "react-router-dom";

const LocaleSwitcher = ({ changeLang, lang }) => {
  const cn = bem("LocaleSwitcher");

  return (
    <div className={cn()}>
      <span
        className={lang === "ru" ? cn("select") : ""}
        onClick={(e) => {
          changeLang(e.target.textContent);
        }}
      >
        {"ru"}
      </span>
      {"/"}
      <span
        className={lang == "en" ? cn("select") : ""}
        onClick={(e) => {
          changeLang(e.target.textContent);
        }}
      >
        {"en"}
      </span>
    </div>
  );
};

export default memo(LocaleSwitcher);
