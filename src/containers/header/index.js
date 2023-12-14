import React, { memo, useCallback } from "react";
import Head from "../../components/head";
import LocaleSelect from "../locale-select";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Admin from "../../components/admin";
import useInit from "../../hooks/use-init";

const Header = (props) => {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    root: state.login.root,
    userName: state.profile.userName,
    waiting: state.profile.waiting,
    root:state.profile.root,
  }));


  const callbacks = {
    logOut: useCallback((token) => {
      store.actions.login.logOut(token);
      store.actions.profile.logOut();
    }),
  };

  return (
    <>
      <Admin
        login={t("login")}
        exit={t("exit")}
        urlLogin={"/login"}
        url={"/profile"}
        logOut={callbacks.logOut}
        userName={select.userName}
        root={select.root}
        waiting={select.waiting}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
    </>
  );
};

export default memo(Header);
