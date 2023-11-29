import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAddBasket: () => {
      props.onAddBasket(props.item);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <span className="Item-price">{`${props.item.price.toLocaleString(
          "ru-RU"
        )} ₽`}</span>
        <button onClick={callbacks.onAddBasket}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price:PropTypes.number,
  }).isRequired,
  onAddBasket: PropTypes.func,
};

Item.defaultProps = {
  onAddBasket: () => {},
};

export default React.memo(Item);
