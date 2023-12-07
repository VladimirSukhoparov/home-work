import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import useLocale from "../../store/use-locale";

function Controls({ onAdd }) {
  const translation = useLocale();
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{translation("addTo")}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
