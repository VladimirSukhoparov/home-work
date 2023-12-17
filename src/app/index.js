import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import ProfileRoot from "../containers/profile-root";
import { useState } from "react";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const root = useSelector((state) => state.login.root);
  const [redirect, setRedirect] = useState ()
  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            <ProfileRoot url={redirect} root={!root}>
              <Login setRedirect={setRedirect}/>
            </ProfileRoot>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProfileRoot url={"/login"} root={root}>
              <Profile />
            </ProfileRoot>
          }
        />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
