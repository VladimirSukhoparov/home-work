import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import useLocale from "../../store/use-locale";

function BasketTotal({ sum }) {
  const cn = bem("BasketTotal");
  const translation = useLocale();
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{translation("totalPrice")}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
