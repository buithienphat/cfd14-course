import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PATH } from "../../constant/path";
import HeaderAuthen from "./HeaderAuthen";
import HeaderHamberger from "./HeaderHamberger";
import HeaderLogo from "./HeaderLogo";

const Header = () => {
  const { pathname } = useLocation();

  const isTranparent = [PATH.HOME, PATH.ABOUT].includes(pathname);

  // scroll change bg
  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTranparent) {
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }
    window.addEventListener("scroll", scrollBgHeader);
    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTranparent]);

  return (
    <header
      className={`header --transparent ${!isTranparent ? "--bgwhite" : ""} `}
    >
      <div className="container-fluid">
        <HeaderHamberger />
        <HeaderLogo />
        <HeaderAuthen />
      </div>
    </header>
  );
};

export default Header;
