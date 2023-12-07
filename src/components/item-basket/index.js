import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import useLocale from "../../store/use-locale";

function ItemBasket(props) {
  const translation = useLocale();
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link
          to={props.id ? `${props.url}${props.id}`: props.url}
          className={cn("link")}
          onClick={props.onClose}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {translation("pcs")}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{translation("delete")}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
