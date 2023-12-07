import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import useLocale from "../../store/use-locale";
import "./style.css";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  const translation = useLocale();

  return (
    <div className={cn()}>
      <span className={cn("label")}>{translation("inBasket")}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              ...translation("pluralVariants")
            )} / ${numberFormat(sum)} ₽`
          : `${translation("empty")}`}
      </span>
      <button onClick={onOpen}>{translation("goTo")}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
