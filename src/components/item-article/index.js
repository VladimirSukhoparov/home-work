import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";
import useLocale from "../../store/use-locale";

const ItemArticle = (props) => {
  const cn = bem("ItemArticle");
  const translation = useLocale();
  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  };
  return (
    <div className={cn()}>
      {Object.keys(props.item).length && (
        <>
          <p className={cn("text")}>{` ${props.item.description}`}</p>
          <p className={cn("text")}>
            {translation("country")}
            <span
              className={cn("subText")}
            >{` ${props.item.madeIn.title}`}</span>
          </p>
          <p className={cn("text")}>
            {translation("category")}
            <span
              className={cn("subText")}
            >{` ${props.item.category.title}`}</span>
          </p>
          <p className={cn("text")}>
            {translation("dateCreate")}
            <span className={cn("subText")}>
              {` ${new Date(props.item.dateCreate).getFullYear()}`}
            </span>
          </p>
          <p className={cn("price")}>
            {`${translation("price")} ${numberFormat(props.item.price)} ₽`}{" "}
          </p>
          <button onClick={callbacks.onAdd}>{translation("addTo")}</button>
        </>
      )}
    </div>
  );
};

ItemArticle.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    dateCreate: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    price: PropTypes.number,
  }),
};

ItemArticle.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemArticle);
