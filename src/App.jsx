import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseOrderPage from "./pages/CourseOrderPage";
import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import Page404 from "./pages/Page404";
import PrivacyPage from "./pages/PrivacyPage";
import MyCourse from "./pages/StudentProfilePage/MyCourse";
import MyInfo from "./pages/StudentProfilePage/MyInfo";
import MyPayment from "./pages/StudentProfilePage/MyPayment";
import { PATH } from "./constant/path";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path={PATH.COURSE.INDEX} element={<CoursePage />}></Route>
          <Route
            path={PATH.COURSE.DETAIL}
            element={<CourseDetailPage />}
          ></Route>
          <Route path={PATH.BLOG.INDEX} element={<BlogPage />} />
          <Route path={PATH.BLOG.DETAIL} element={<BlogDetailPage />} />

          <Route element={<PrivateRoute redirectPath={PATH.HOME} />}>
            <Route
              path={PATH.COURSE.ORDER}
              element={<CourseOrderPage />}
            ></Route>
            <Route path={PATH.PROFILE.INDEX} element={<StudentProfilePage />}>
              <Route index element={<MyInfo />} />
              <Route path={PATH.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATH.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>

          <Route path={PATH.PAYMENT_METHOD} element={<PaymentMethodPage />} />
          <Route path={PATH.CONTACT} element={<ContactPage />} />
          <Route path={PATH.ABOUT} element={<AboutPage />} />
          <Route path={PATH.PRIVACY} element={<PrivacyPage />} />

          <Route path={"*"} element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
