// components/PrivateRoute

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import tokenMethod from "../utils/token";
import { MODAL_TYPE } from "../constant/general";
import { useEffect } from "react";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { handleShowModal } = useAuthContext();

  useEffect(() => {
    if (!!!tokenMethod.get()) {
      handleShowModal(MODAL_TYPE.login);
    }
  }, [handleShowModal]);

  if (!!!tokenMethod.get()) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
