import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Empty } from "antd";
import CourseItem from "../../components/CourseItem";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {!!!courseInfo.length && (
          <Empty
            description="không tìm thấy dữ liệu"
            style={{ margin: "0 auto" }}
          />
        )}

        {!!courseInfo.length > 0 &&
          courseInfo.map((item, index) => (
            <CourseItem key={item?.id || index} {...item?.course} />
          ))}
      </div>
    </div>
  );
};

export default MyCourse;
