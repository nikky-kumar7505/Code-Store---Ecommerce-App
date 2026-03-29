import axios from "axios";
import { store } from "@/redux/store";
import { requestEnded, requestStarted } from "@/redux/slices/loadingSlice";

axios.interceptors.request.use(
  (config) => {
    store.dispatch(requestStarted());
    return config;
  },
  (error) => {
    store.dispatch(requestEnded());
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    store.dispatch(requestEnded());
    return response;
  },
  (error) => {
    store.dispatch(requestEnded());
    return Promise.reject(error);
  }
);
