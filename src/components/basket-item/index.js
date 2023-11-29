import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function BasketItem(props) {
  const callbacks = {
    onDeleteBasket: () => {
      props.onDeleteBasket(props.item);
    },
  };

  return (
    <div className={"BasketItem"}>
      <div className="BasketItem-code">{props.item.code}</div>
      <div className="BasketItem-title">{props.item.title}</div>
      <div className="BasketItem-actions">
        <span className="BasketItem-price">{`${props.item.price.toLocaleString(
          "ru-RU"
        )} ₽`}</span>
            <span className="BasketItem-count">{`${props.item.count} шт`}</span>
            <button onClick={callbacks.onDeleteBasket}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDeleteBasket: PropTypes.func,
};

BasketItem.defaultProps = {
  onDeleteBasket: () => {},
};

export default React.memo(BasketItem);
