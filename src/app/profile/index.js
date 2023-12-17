import React, { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import User from "../../components/user";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";

const Profile = () => {
  const store = useStore();
 

  const { t } = useTranslate();
  const select = useSelector((state) => ({
    userName: state.profile.userName,
    userPhone: state.profile.userPhone,
    userMail: state.profile.userMail,
    waiting: state.profile.waiting,
    token:state.login.token,
  }));

  useInit(() => {
    store.actions.profile.getProfile();
  },
  [select.token],
  true) 


  return (
    <PageLayout>
      <Header />
      <Navigation />
      <Spinner active={select.waiting}>
        <User
          title={t("userTitle")}
          name={t("userName")}
          phone={t("userPhone")}
          mail={t("userMail")}
          userName={select.userName}
          userPhone={select.userPhone}
          userMail={select.userMail}
        />
      </Spinner>
      
    </PageLayout>
  );
};

export default memo(Profile);
