import React, { memo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

const Authorization = (props) => {
  const cn = bem("Authorization");
  const { t } = useTranslate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onChangeLogin = (event) => {
    setLogin(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>{t("login")}</div>
      <p className={cn("text")}>{props.loginText}</p>
      <input onChange={onChangeLogin} required />
      <p className={cn("text")}>{props.pass}</p>
      <input onChange={onChangePassword} type={"password"} required />
      <span className={cn("error")}>{props.error}</span>
      <button
        className={cn("btn")}
        onClick={() => props.signIn(login, password)}
      >
        {props.sign}
      </button>
    </div>
  );
};

Authorization.propTypes = {
  loginText: PropTypes.string,
  pass: PropTypes.string,
  error: PropTypes.node,
  sign: PropTypes.string,
  signIn: PropTypes.func,
};

Authorization.defaultProps = {
  signIn: () => {},
};
export default memo(Authorization);
