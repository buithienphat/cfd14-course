import React from "react";
import Button from "../../components/Button";
import { PATH } from "../../constant/path";

const CallRegisterSection = () => {
  return (
    <section className="callregister">
      <div className="container">
        <div className="callregister__content">
          <h3 className="title --t2">
            <span className="color--primary">trở thành một phần</span> của CFD
            Circle
          </h3>
          <p>
            Chúng tôi rất vui khi bạn quyết định trở thành một phần của CFD
            Circle để cùng nhau học hỏi, lan toả và chia sẻ những kinh nghiệm
            quý giá cho cộng đồng.
          </p>

          <Button link={PATH.COURSE.INDEX}>Tham gia Khoá học</Button>
          <Button link={PATH.CONTACT} variant="border">
            Liên hệ tư vấn
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallRegisterSection;
