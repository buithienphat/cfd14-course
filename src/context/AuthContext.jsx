import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import tokenMethod from "../utils/token";
import { useNavigate } from "react-router-dom";
import { PATH } from "../constant/path";
import { orderService } from "../services/orderService";
import { MODAL_TYPE } from "../constant/general";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = !!tokenMethod.get()?.accessToken;
    if (accessToken) {
      handleGetProfile();
    }
  }, []);

  const handleShowModal = (modalType) => {
    setShowedModal(modalType || "");
  };

  const handleCloseModal = (e) => {
    if (loading) return;
    e?.stopPropagation();
    setShowedModal("");
  };

  const handleLogin = async (loginData, callback) => {
    const payload = { ...loginData };
    try {
      const res = await authService.login(payload);
      console.log("res", res);
      if (res?.data?.data) {
        // Tạo biến riêng thể hiện thông tin token
        const { token: accessToken, refreshToken } = res.data.data || {};

        // lưu token vào cookie
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // Lấy thông tin profile
        handleGetProfile();

        handleCloseModal();
        message.success("Đăng nhập thành công");
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.log("error", error);
      message.error("Tài khoản này chưa được đăng ký");
    } finally {
      callback?.();
    }
  };

  // mỗi khi truy cập vào website, check token để gọi handleGetProfileCourse & handleGetProfilePayment (tương tự handleGetProfile)
  useEffect(() => {
    if (tokenMethod.get()) {
      // call api get profile
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  const handleRegister = async (registerData, callback) => {
    const payload = {
      firstName: registerData.name,
      lastName: "",
      email: registerData.email,
      password: registerData.password,
    };
    console.log("payload", payload);

    // call API resgister
    try {
      const res = await authService.register(payload);
      if (res?.data?.data?.id) {
        // thành công
        message.success("đăng ký thành công");
        handleLogin({
          email: registerData.email,
          password: registerData.password,
        });
      } else {
        message.error("Đăng ký thất bại");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      callback?.();
    }
  };

  // handle logout : -> cần xóa token + điều hướng về trang chủ
  const handleLogout = () => {
    tokenMethod.remove();
    navigate(PATH.HOME);
    message.success("Tài khoản đã đăng xuát");
  };

  // lấy profile từ token
  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("getCourseHistories error", error);
    }
  };

  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const {
        firstName,
        email,
        password,
        facebookURL,
        introduce,
        phone,
        website,
      } = profileData;

      const payload = {
        firstName,
        lastName: "",
        facebookURL,
        website,
        phone,
        introduce,
      };

      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhập thông tin thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        loading,
        profile,
        courseInfo,
        paymentInfo,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        setLoading,
        handleGetProfileCourse,
        handleGetProfilePayment,
        handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
