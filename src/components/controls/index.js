import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function Controls(props) {
 

  return (
    <div className="Controls">
      <span>{props.title}</span>
      <span className="Controls-basket">
        {props.counter > 0
          ? `${props.counter} ${plural(props.counter, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${props.resultSum} ₽`
          : "пусто"}
      </span>
      <button onClick={() => props.setIsOpen(true)}>{props.caption}</button>
    </div>
  );
}

Controls.propTypes = {
  title: PropTypes.string,
  counter:PropTypes.number,
  resultSum:PropTypes.number,
  setIsOpen: PropTypes.func,
};

Controls.defaultProps = {
  setIsOpen: () => {},
};

export default Controls;
