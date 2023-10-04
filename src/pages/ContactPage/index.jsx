import React from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../../hook/useMutation";
import { subscribesService } from "../../services/subscribesService";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import ContactTitle from "./ContactTitle";
import { PATH } from "../../constant/path";

const ContactPage = () => {
  const navigate = useNavigate();

  // put data API

  const { execute, data, error, loading } = useMutation(
    subscribesService.subscribes
  );

  const handleSubmit = (formData) => {
    const payload = {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      title: formData?.topic || "",
      description: formData?.content || "",
    };
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        navigate(PATH.HOME);
      },
      onFail: (error) => {
        console.log("error", error);
      },
    });
  };
  return (
    <main className="mainwrapper contact --ptop">
      <ContactTitle />
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
