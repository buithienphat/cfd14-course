import Cookies from "js-cookie";
import { STORAGE } from "../constant/storage";

// client-side localstorage
export const localToken = {
  get: () => JSON.parse(localStorage.getItem(STORAGE.token)),
  set: (token) => localStorage.setItem(STORAGE.token, JSON.stringify(token)),
  remove: () => localStorage.removeItem(STORAGE.token),
};

// client-side cookies
export const cookieToken = {
  get: () =>
    JSON.parse(
      Cookies.get(STORAGE.token) !== undefined
        ? Cookies.get(STORAGE.token)
        : null
    ),
  set: (token) => Cookies.set(STORAGE.token, JSON.stringify(token)),
  remove: () => Cookies.remove(STORAGE.token),
};

// Hàm sử dụng cookies or localStorage(hiện tại sử dụng cookies)
const tokenMethod = {
  get: () => {
    // return localToken.get()
    return cookieToken.get();
  },
  set: (token) => {
    // localToken.set(token)
    cookieToken.set(token);
  },
  remove: () => {
    // localToken.remove();
    cookieToken.remove();
  },
};

export default tokenMethod;
