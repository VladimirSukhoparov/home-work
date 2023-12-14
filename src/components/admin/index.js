import React, { memo } from "react";
import { Link } from "react-router-dom";

import "style.css";
import Spinner from "../spinner";
import PropTypes from "prop-types";

const Admin = (props) => {
  return (
    <div className="Head-login">
      {props.root ? (
        <Spinner active={props.waiting}>
          <Link to={props.url} className="Head-user">
            {props.userName}
          </Link>
          <button onClick={() => props.logOut(props.token)}>
            {props.exit}
          </button>
        </Spinner>
      ) : (
        <Link to={props.urlLogin}>
          <button>{props.login}</button>
        </Link>
      )}
    </div>
  );
};

Admin.propTypes = {
  userName: PropTypes.string,
  waiting: PropTypes.bool,
  url: PropTypes.string,
  exit: PropTypes.string,
  urlLogin: PropTypes.string,
  login: PropTypes.string,
  logOut: PropTypes.func,
};

Admin.defaultProps = {
  logOut: () => {},
};

export default memo(Admin);
