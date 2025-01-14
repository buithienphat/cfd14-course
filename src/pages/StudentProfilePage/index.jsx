import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { PATH } from "../../constant/path";

const StudentProfilePage = () => {
  const { profile, handleGetProfileCourse, handleGetProfilePayment } =
    useAuthContext();
  const { firstName, profileImage, email, phone, introduce, website } =
    profile || {};

  useEffect(() => {
    handleGetProfileCourse();
    handleGetProfilePayment();
  }, []);

  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img
                      src={
                        profileImage || "/img/cfd-share-thumbnail-facebook.png"
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
                <h3 className="title --t3">{firstName || ""}</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">{introduce || ""}</p>
              <ul>
                <li>
                  <img src="/img/icon-mail-outline.svg" alt="icon" />
                  <span>{email || ""}</span>
                </li>
                <li>
                  <img src="/img/icon-phone-outline.svg" alt="icon" />
                  <span>{phone || ""}</span>
                </li>
                <li>
                  <img src="/img/icon-link.svg" alt="icon" />
                  <a href="#" target="_blank">
                    {website || ""}
                  </a>
                </li>
              </ul>
              <div className="social">
                <a href="#">
                  <img src="/img/icon-fb-footer.svg" alt="CFD img" />
                </a>
                <a href="#">
                  <img src="/img/icon-linkedin-ft.svg" al="CFD img" />
                </a>
                <a href="#">
                  <img src="/img/icon-ytb-ft.svg" alt="CFD img" />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink to={PATH.PROFILE.INDEX} end>
                  Thông tin cá nhân
                </NavLink>
                <NavLink to={PATH.PROFILE.MY_COURSE}>Khóa học của tôi</NavLink>
                <NavLink to={PATH.PROFILE.MY_PAYMENT}>
                  Lịch sử thanh toán
                </NavLink>
              </div>
              <div className="tab__content">
                <Outlet />
                {/* Thông tin cá nhân */}
                {/* <MyInfo /> */}
                {/* Khoá học của tôi */}
                {/* <MyCourse /> */}
                {/* Lịch sử thanh thánh */}
                {/* <MyPayment /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentProfilePage;
