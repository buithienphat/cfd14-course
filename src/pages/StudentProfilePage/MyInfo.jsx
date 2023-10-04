import React, { useEffect } from "react";
import useForm from "../../hook/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import Input from "../../components/Input";
import { useAuthContext } from "../../context/AuthContext";
import TextArea from "../../components/TextArea";

const MyInfo = () => {
  const { profile, handleUpdateProfile, courseInfo, paymentInfo } =
    useAuthContext();

  const { form, validate, register, setForm } = useForm(
    {
      firstName: "",
      email: "",
      phone: "",
      password: "**********",
      facebookURL: "",
      website: "",
      introduce: "",
    },
    {
      firstName: [requireRule("Vui lòng nhập họ tên")],
      phone: [
        requireRule("Vui lòng số điện thoại"),
        regrexRule("phone", "Vui lòng đúng định dạng số sdt"),
      ],
    }
  );

  const _onSubmit = (e) => {
    e.preventDefault();

    const errorObj = validate();
    if (Object.keys(errorObj).length > 0) {
      console.log("submit fail", errorObj);
    } else {
      handleUpdateProfile(form);
    }
  };

  useEffect(() => {
    if (profile) {
      setForm({ ...form, ...profile });
    }
  }, [profile]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <Input label="HỌ VÀ TÊN" required {...register("firstName")} />
          <Input label="SỐ ĐIỆN THOẠI" required {...register("phone")} />
        </div>
        <div className="form-container">
          <Input label={"EMAIL"} disabled required {...register("email")} />
          <Input
            label="MẬT KHẨU"
            disabled
            required
            {...register("password")}
            type="password"
          />
        </div>
        <Input label="FACEBOOK URL" {...register("facebookURL")} />
        <Input label="Website" {...register("website")} />
        <Input
          label={"Giới thiệu bản thân"}
          {...register("introduce")}
          renderInput={(inputProps) => <TextArea {...inputProps} />}
        />
        {/* <p className="noti">Cập nhận thông tin thành công</p> */}
        <div className="form-group">
          <div className="btnsubmit">
            <button className="btn btn--primary" onClick={_onSubmit}>
              Lưu lại
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
