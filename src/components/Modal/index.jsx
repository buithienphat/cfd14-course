import React from "react";
import { MODAL_TYPE } from "../../constant/general";
import { useAuthContext } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ReactDOM from "react-dom";

const Modal = () => {
  const { showedModal, handleCloseModal } = useAuthContext();
  return ReactDOM.createPortal(
    <div className={`modal modallogin ${!!showedModal ? "open" : ""}`}>
      <div className="modal__wrapper">
        <div onClick={handleCloseModal} className="modal__wrapper-close">
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>

        {/* {modal login} */}
        {showedModal === MODAL_TYPE.login && <LoginForm />}
        {/* {modal register} */}
        {showedModal === MODAL_TYPE.register && <RegisterForm />}

        {/* <div className="modal__wrapper-content mdconsult">
          <h3 className="title --t3">Đăng ký tư vấn</h3>
          <form action="#" className="form">
            <div className="form-group">
              <input
                defaultValue
                type="text"
                className="form__input formerror"
                placeholder="Họ và tên"
              />
              <p className="error">Họ và tên không được để trống</p>
            </div>
            <div className="form-group">
              <input
                defaultValue
                type="text"
                className="form__input"
                placeholder="Số điện thoại"
              />
            </div>
            <div className="form-group">
              <input
                defaultValue
                type="email"
                className="form__input"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <textarea
                name
                id
                cols={30}
                rows={4}
                className="form__input"
                placeholder="Nội dung cần tư vấn"
                defaultValue={""}
              />
            </div>
            <button
              className="btn btn--primary form__btn-register"
              type="submit"
            >
              Gửi thông tin
            </button>
          </form>
        </div>
        <div className="modal__wrapper-content mdchangepass">
          <h3 className="title --t3">Đổi mật khẩu</h3>
          <form action="#" className="form">
            <div className="form-group">
              <input
                defaultValue
                type="password"
                className="form__input formerror"
                placeholder="Mật khẩu cũ"
              />
              <p className="error">Mật khẩu không được để trống</p>
            </div>
            <button
              className="btn btn--primary form__btn-register"
              type="submit"
            >
              Gửi thông tin
            </button>
          </form>
        </div> */}
      </div>
      <div onClick={handleCloseModal} className="modal__overlay" />
    </div>,
    document.body
  );
};

export default Modal;
