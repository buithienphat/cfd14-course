import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MODAL_TYPE } from "../../constant/general";
import { PATH } from "../../constant/path";
import { useAuthContext } from "../../context/AuthContext";
import tokenMethod from "../../utils/token";

const HeaderAuthen = () => {
  const { handleShowModal, handleLogout, profile } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  // console.log("profile", profile);
  const { firstName, profileImage } = profile || {};

  const _onShowDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const _onCloseDropdown = (e) => {
    e?.stopPropagation();
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      _onCloseDropdown(e);
    });

    return () => {
      document.removeEventListener("click", (e) => {
        _onCloseDropdown(e);
      });
    };
  }, []);
  // CHECK nếu trong localstorage có token thì render authen
  if (!!tokenMethod.get()) {
    return (
      <div className="header__logged">
        <div className="userlogged">
          <div
            className="userlogged__avatar user"
            data-dropdown="userlogged__dropdown"
            onClick={_onShowDropdown}
          >
            <div className="userlogged__avatar-img user__img">
              <img
                src={profileImage || "/img/cfd-share-thumbnail-facebook.png"}
                alt="Avatar teacher"
              />
            </div>
            <i className="userlogged__avatar-icon">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div
            className={`userlogged__dropdown dropdown ${
              showDropdown ? "active" : ""
            } `}
          >
            <div className="userlogged__dropdown-info">
              <div className="user__img">
                <img
                  src={profileImage || "/img/cfd-share-thumbnail-facebook.png"}
                  alt="Avatar teacher"
                />
              </div>
              <Link to={PATH.PROFILE.INDEX} className="user__info">
                <p className="title --t4">
                  <strong>{firstName || ""}</strong>
                </p>
                <span className="email">Thông tin tài khoản</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <Link to={PATH.PROFILE.MY_COURSE}>Khóa học của tôi</Link>
              <Link to="/profile/my-payment">Lịch sử thanh toán</Link>
              <Link to="/contact">Hỗ trợ</Link>
              <a
                onClick={(e) => {
                  e.preventDefault;
                  handleLogout();
                }}
              >
                Đăng xuất{" "}
                <i>
                  <img src="/img/iconlogout.svg" alt="CFD img" />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="header__auth">
        <a className="btn btn--transparent btnmodal" data-modal="mdlogin">
          <span
            onClick={(e) => {
              e.stopPropagation;
              handleShowModal(MODAL_TYPE.register);
            }}
          >
            Đăng ký /&nbsp;
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation;
              handleShowModal(MODAL_TYPE.login);
            }}
          >
            Đăng nhập
          </span>
        </a>
      </div>
    </>
  );
};

export default HeaderAuthen;
