import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head(props) {
  return (
    <div className={"Head" + (props.title ? "" : " Head-basket")}>
      {props.title ? (
        <h1>{props.title}</h1>
      ) : (
        <>
          <h1>{props.titleBasket}</h1>
          <button onClick={() => props.setIsOpen(false)}>Закрыть</button>
        </>
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  titleBasket: PropTypes.node,
  setIsOpen: PropTypes.func,
};

export default React.memo(Head);
