import React, { useEffect, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../hook/useMutation";
import { formatCurrency } from "../../utils/format";
import { ROLE } from "../../constant/roles";
import { courseService } from "../../services/courseService";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hook/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import { PATH } from "../../constant/path";
import { message } from "antd";
import { orderService } from "../../services/orderService";

const CourseOrderPage = () => {
  const navigate = useNavigate();

  const {
    profile,
    courseInfo,
    handleGetProfileCourse,
    handleGetProfilePayment,
  } = useAuthContext();

  // lưu trữ thông tin cần xử dụng trong AuthContext
  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};

  // handle Profile form
  const { form, register, validate, setForm } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui lòng nhập tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );
  useEffect(() => {
    setForm({
      name: profileName || "",
      email: profileEmail || "",
      phone: profilePhone || "",
      type: "",
    });
  }, [profileName, profileEmail, profilePhone]);

  // Handle getCourseBySlug when courseSlug param change
  const { courseSlug } = useParams();
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCourseBySlug
  );

  useEffect(() => {
    if (courseSlug) executeCourseDetail?.(courseSlug, {});
  }, [courseSlug]);

  // Modify render data
  const { teams, price, tags } = courseDetailData || {};
  // Child props
  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLE.teacher)) || {},
    price: formatCurrency(price),
  };

  // Handle paymentMethod change
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };

  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );

  //
  const _onOrder = () => {
    const profileError = validate();

    if (Object.keys(profileError).length > 0) {
      console.log("Profile form validate failed", profileError);
    } else {
      if (paymentMethod) {
        // setup payload
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.id,
          type: form.type,
          paymentMethod,
        };
        // call api order
        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATH.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn hình thức thanh toán");
      }
    }
  };

  // handle stop submit course alredy
  const isAlreadyOrder = courseInfo?.some((item) => {
    return item?.course?.slug === courseSlug;
  });

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder
            register={register}
            types={tags}
            disabled={isAlreadyOrder}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrder}
          />

          {/* addclass --processing khi bấm đăng ký */}
          <Button
            onClick={_onOrder}
            disabled={isAlreadyOrder}
            loading={orderLoading}
            style={{ width: "100%" }}
          >
            {isAlreadyOrder ? (
              <span style={{ textDecoration: "line-through" }}>
                Khóa học đã đăng ký
              </span>
            ) : (
              <span>Đăng ký khóa học</span>
            )}

            {/* <span>
              {isAlreadyOrder ? "Khóa học đã đăng ký" : "Chưa đăng ký khóa học"}
            </span> */}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
