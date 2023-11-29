import React from "react";
import Head from "../head";
import List from "../list";
import PropTypes from "prop-types";
import BasketItem from "../basket-item";
import "./style.css";

const Basket = (props) => {
  return (
    <div className="Basket">
      <Head titleBasket={"Корзина"} setIsOpen={props.setIsOpen} />
      <List
        children={props.basket.map((item) => (
          <BasketItem item={item} onDeleteBasket={props.onDeleteBasket} />
        ))}
      />
      <div className="Basket-box">
        <div className="Basket-sum">
          <span>Итого</span>
          <span className="Basket-total">{`${props.resultSum} ₽`}</span>
        </div>
      </div>
    </div>
  );
};

Basket.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  setIsOpen: PropTypes.func,
  resultSum: PropTypes.number,
  onDeleteBasket: PropTypes.func,
};

Basket.defaultProps = {
  onDeleteBasket: () => {},
  setIsOpen: () => {},
};
export default React.memo(Basket);
