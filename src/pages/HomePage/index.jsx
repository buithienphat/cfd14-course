import React from "react";
import useQuery from "../../hook/useQuery";
import { courseService } from "../../services/courseService";
import { galleryService } from "../../services/galleryService";
import { questionService } from "../../services/questionService";
import { teamService } from "../../services/teamsService";
import CallRegisterSection from "./CallregisterSection";
import CourseComingSection from "./CourseComingSection";
import CoursesSection from "./CoursesSection";
import FaqSection from "./FAQSection";
import FeaturedSection from "./FeaturedSection";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import TeacherSection from "./TeacherSection";
import TestimonialSection from "./TestimonialSection";

const HomePage = () => {
  // - Tạo state chứa API
  // const [courses, setCourses] = useState([]);
  // //- Tạo state loading để check loading
  // const [courseLoading, setCourseLoading] = useState(false);
  // console.log("courses", courses);

  // // Tạo 1 function asyn để xét loading = true
  // const fetchCourses = async () => {
  //   setCourseLoading(true);
  //   try {
  //     const res = await axios.get(
  //       "https://cfdcourses.cfdcircle.vn/api/v1/courses"
  //     );
  //     if (res?.data) {
  //       setCourses(res.data);
  //       console.log("res", res);
  //       console.log("res.data", res.data);
  //     }
  //   } catch (error) {
  //     // catch error nếu lỗi thì sẽ log ra xem lỗi gì
  //     console.log("error", error);
  //   }
  // };

  // // Tạo use effect chạy 1 lần để gọi API
  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  //use query question

  // const {
  //   data: courses,
  //   error: courseError,
  //   loading: courseLoading,
  //   refect,
  // } = useQuery(courseService.getCourses);

  // Course API
  // get API khóa học
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourses
  );
  // lưu API vào biến
  const courses = coursesData?.courses || [];
  // lọc các khóa học có ngày > ngày hôm nay
  const comingCourse = courses.filter((course) => {
    return course?.startDate && new Date(course.startDate) > new Date();
  });

  // // questionAPI
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );
  const questions = questionsData?.questions || [];

  // //team API
  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );
  const teams = teamsData?.teams || [];

  // gallery API
  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );
  const galleries = galleriesData?.galleries?.[0]?.images || [];

  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection loading={coursesLoading} courses={comingCourse} />
      <CoursesSection loading={coursesLoading} courses={courses} />
      <TeacherSection loading={teamsLoading} teachers={teams} />
      <FeaturedSection />
      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimonialSection />
      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={questionsLoading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
