import React from "react";
import { Navigate } from "react-router-dom";


const ProfileRoot = ({ children, url, root }) => {
  return <>{root ? children : <Navigate to={url} />}</>;
};

export default ProfileRoot;
