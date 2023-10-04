import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { formatCurrency, formatDate } from "../../utils/format";
import { Empty } from "antd";
import { PAYMENT_METHOD } from "../../constant/general";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();

  console.log("paymentInfo", paymentInfo);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {!!!paymentInfo.length && (
        <Empty
          description="không tìm thấy dữ liệu"
          style={{ margin: "0 auto" }}
        />
      )}
      {!!paymentInfo.length > 0 &&
        paymentInfo.map((item, index) => (
          <div key={item.course.id || index} className="itemhistory">
            <div className="name">{item.course.name}</div>
            <div className="payment">{PAYMENT_METHOD[item.paymentMethod]}</div>
            <div className="date">{formatDate(item.course.createdAt)}</div>
            <div className="money">{formatCurrency(item.course.price)} VND</div>
          </div>
        ))}
    </div>
  );
};

export default MyPayment;
