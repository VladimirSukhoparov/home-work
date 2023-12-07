import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const ItemNav = (props) => {
  const cn = bem("ItemNav");

  return (
    <div className={cn()} >
      <Link to={props.url} onClick={()=>props.switchPage(1)}>{props.title}</Link>
    </div>
  );
};

ItemNav.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  switchPage:PropTypes.func,
};

ItemNav.defaultProps = {
    switchPage: () => {},
  };

export default memo(ItemNav);
