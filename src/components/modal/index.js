import React from "react";
import "./style.css";
import PropTypes from "prop-types";

const Modal = ({children}) => {
  
  return (
    <div className="Modal">
      <div className="Modal-container">
       {children}
      </div>
    </div>
  );
};

Modal.PropTypes={
  children:PropTypes.node
}
export default React.memo(Modal);
