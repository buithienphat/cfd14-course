import React from "react";
import OverLay from "../../components/OverLay";
import PageLoading from "../../components/PageLoading";
import NavBar from "../../components/Navbar";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/AuthContext";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <PageLoading />
        <Header />
        <NavBar />
        <OverLay />

        {/* Main */}
        <Outlet />

        {/* Footer */}
        <Footer />
        {/* Modal Đăng Nhập / Đăng Ký */}
        <Modal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
