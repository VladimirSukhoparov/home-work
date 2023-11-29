import React, { Children } from "react";
import PropTypes from "prop-types";
import "./style.css";

function List(props) {
  return (
    <div className="List">
      {Children.map(props.children, (child) => (
        <div className="List-item">{child}</div>
      ))}
    </div>
  );
}

List.propTypes = {
  children: PropTypes.node,
};

List.defaultProps = {
  children: PropTypes.node,
};

export default React.memo(List);
