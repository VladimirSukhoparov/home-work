import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import useLocale from "../../store/use-locale";
import "./style.css";
import ItemNav from "../item-nav";
import BasketTool from "../basket-tool";

const NavBar = ({ sum, amount, onOpen, switchPage }) => {
  const cn = bem("NavBar");
  const translation = useLocale();
  return (
    <div className={cn()}>
      <ItemNav url={"/"} title={translation("homePage")} switchPage={switchPage}/>
      <BasketTool sum={sum} amount={amount} onOpen={onOpen} />
    </div>
  );
};

export default memo(NavBar);
