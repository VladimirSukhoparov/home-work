import React from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

const User = (props) => {
  const cn = bem("User");

  return (
    <div className={cn()}>
      <p className={cn("title")}>{props.title}</p>
      <p className={cn("normal")}>
        {`${props.name}: `}
        <span className={cn("bold")}>{props.userName}</span>
      </p>
      <p className={cn("normal")}>
        {`${props.phone}: `}
        <span className={cn("bold")}>{props.userPhone}</span>
      </p>
      <p className={cn("normal")}>
        {`${props.mail}: `}
        <span className={cn("bold")}>{props.userMail}</span>
      </p>
    </div>
  );
};
User.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  mail: PropTypes.string,
  userName: PropTypes.node,
  userPhone: PropTypes.node,
  userMail: PropTypes.node,
};

export default User;
