import React, { useState } from "react";
import Input from "../../components/Input";
import { MODAL_TYPE } from "../../constant/general";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hook/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";

const LoginForm = () => {
  const {
    handleShowModal,
    handleLogin,
    handleCloseModal,
    loading,
    setLoading,
  } = useAuthContext();
  const { form, register, validate } = useForm(
    { email: "", password: "" },
    {
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng"),
      ],
      password: [requireRule("Vui lòng nhập password")],
    }
  );
  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObj = validate();
    if (Object.keys(errorObj).length > 0) {
      console.log("submit fail", errorObj);
    } else {
      console.log("submit success", form);
      setLoading(true);
      handleLogin?.(form, () => {
        // vì thời gian xử lý data trong dự án này rất nhanh nên đặt thơi gian tối thiểu để xử lý
        setTimeout(() => {
          setLoading(false);
          handleCloseModal();
        }, 300);
      });

      // console.log("submit success", form);
    }
  };
  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPE.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form className="form" onSubmit={_onSubmit}>
        <Input
          label={"Email"}
          placeholder={"Email"}
          required
          {...register("email")}
        />
        <Input
          type="password"
          label={"Mật khẩu"}
          placeholder={"Mật khẩu"}
          required
          {...register("password")}
        />
        <Button className="form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
