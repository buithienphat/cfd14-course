import React from "react";
import { useMainContext } from "../../context/MainContext";

const OverLay = () => {
  const { handleShowNavbar } = useMainContext();

  return <div onClick={() => handleShowNavbar(false)} className="overlay" />;
};

export default OverLay;
