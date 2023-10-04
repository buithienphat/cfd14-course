import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MODAL_TYPE } from "../../constant/general";
import { PATH } from "../../constant/path";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hook/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import Input from "../Input";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const rules = {
    name: [requireRule("vui lòng nhập tên")],
    email: [
      requireRule("vui lòng nhập email"),
      regrexRule("email", "vui lòng nhập đúng định dạng"),
    ],
    password: [requireRule("vui lòng nhập password")],
    comfirmPassword: [
      requireRule("vui lòng xác nhận password"),
      (value, values) => {
        if (values.password && value !== values.password) {
          return "Xác nhận password sai";
        }
        return false;
      },
    ],
  };
  const { form, register, validate } = useForm(
    {
      name: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
    rules
  );

  const _handleSubmit = (e) => {
    e.preventDefault();
    const errorObj = validate();
    if (Object.keys(errorObj).length > 0) {
      console.log("submit fail", errorObj);
    } else {
      console.log("submit success", form);
      setLoading(true);

      handleRegister?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  };

  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPE.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form onSubmit={_handleSubmit} className="form">
        <Input
          placeholder={"Họ và tên"}
          label={"Họ và tên"}
          required
          {...register("name")}
        />
        <Input
          placeholder={"Email"}
          label={"Email"}
          required
          {...register("email")}
        />
        <Input
          placeholder={"Password"}
          label={"Password"}
          required
          type="password"
          {...register("password")}
        />
        <Input
          placeholder={"Xác nhận mật khẩu"}
          label={"Xác nhận mật khẩu"}
          required
          type="password"
          {...register("comfirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <Link
            onClick={handleCloseModal}
            className="color--primary"
            to={PATH.PRIVACY}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
