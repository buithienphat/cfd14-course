import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Khi đổi PATH sẽ tự động scroll Top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setIsShowNavbar(false);
  }, [pathname]);

  const handleShowNavbar = (isShow) => {
    setIsShowNavbar(isShow);
  };

  return (
    <MainContext.Provider value={{ isShowNavbar, handleShowNavbar }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const useMainContext = () => useContext(MainContext);
