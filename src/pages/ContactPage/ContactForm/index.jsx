import React, { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import validate, { regrexRule, requireRule } from "../../../utils/validate";
import useForm from "../../../hook/useForm";
import Button from "../../../components/Button";

const ContactForm = ({ handleSubmit }) => {
  const rules = {
    name: [requireRule("Vui lòng nhập tên")],
    email: [
      requireRule("Vui lòng nhập email"),
      regrexRule("email", "Vui lòng nhập đúng định dạng"),
    ],
    phone: [
      requireRule("Vui lòng nhập số diện thoại"),
      regrexRule("phone", "Vui lòng nhập đúng định dạng"),
    ],
    topic: [requireRule("Vui lòng nhập chủ đề cần hỗ trợ")],
    content: [requireRule("Vui lòng nhập nội dung hỗ trợ")],
  };

  const { form, register, validate } = useForm(
    {
      email: "",
      name: "",
      phone: "",
      topic: "",
      content: "",
    },
    rules
  );

  // submit khi bấm nào button hoặc submit ở thẻ form (ở đây dùng thẻ div) - Khi bấm submit sẽ xảy ra : 1. kiểm tra điểu kiện của form 2. nếu chuẩn hết thì sẽ gọi API hoặc làm gì đó
  const _onSubmit = () => {
    const errorObj = validate();
    if (Object.keys(errorObj).length > 0) {
      console.log("submit fail", errorObj);
    } else {
      handleSubmit?.(form);
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        label={"Họ và Tên"}
        required
        placeholder={"Họ và tên"}
        {...register("name")}
      />
      <Input
        label={"Email"}
        placeholder={"Email"}
        required
        {...register("email")}
      />
      <Input
        label={"Số điện thoại"}
        required
        placeholder={"+84 123 456 789"}
        {...register("phone")}
      />

      <Input
        label={"Chủ đề cần hỗ trợ"}
        required
        // Thêm một props renderInput để phân biệt thẻ input và thẻ option
        {...register("topic")}
        renderInput={(inputProps) => (
          <Select
            options={[
              { value: "", label: "--" },
              { value: "react", label: "React" },
              { value: "webresponsive", label: "Web Responsive" },
            ]}
            {...inputProps}
          />
        )}
      />

      <Input
        label={"Nội Dung"}
        required
        {...register("content")}
        renderInput={(inputProps) => <TextArea {...inputProps} />}
      />

      <div className="btncontrol">
        <Button onClick={_onSubmit}>Gửi</Button>
      </div>
    </div>
  );
};

export default ContactForm;
