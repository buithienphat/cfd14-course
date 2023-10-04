const COURSE_PATH = "/course";
const PROFILE_PATH = "/profile";
const BLOG_PATH = "/blog";

export const PATH = {
  HOME: "/",
  COURSE: {
    INDEX: COURSE_PATH,
    DETAIL: COURSE_PATH + "/:courseSlug",
    ORDER: "/course-order/:courseSlug",
  },
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:blogSlug",
  },
  PROFILE: {
    INDEX: PROFILE_PATH,
    MY_COURSE: PROFILE_PATH + "/my-course",
    MY_PAYMENT: PROFILE_PATH + "/my-payment",
  },

  PAYMENT_METHOD: "/payment-method",
  CONTACT: "/contact",
  ABOUT: "/about",
  PRIVACY: "/privacy",
};
