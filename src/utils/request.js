/*
  ! @Author: Muddusar Zulfiqar
  ! @Last Modified by: Muddusar Zulfiqar
  * Description: This file contains the request file for the application.
*/
import axios from "axios";
import NProgress from "nprogress";
import {config} from "../constants";
import {toast} from "react-hot-toast";

const request = axios.create({
    baseURL: config.API_URL,
    timeout: config.API_TIMEOUT,
});

request.interceptors.request.use(
    (config) => {
        config.headers.Authorization = localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : "";
        NProgress?.start();
        return config;
    },
    (error) => {
        NProgress?.done();
        // check if error is section timeout
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        NProgress?.done();
        return response.data;
    },
    (error) => {
        NProgress?.done();

        if (error.code === "ECONNABORTED") {
            toast.error("Your internet is not stable to perform this action. Please check your internet connection.");
        }

        if (!error.config.url.includes('login') && error?.response?.status === 401) {
            toast.error("Session expired, please login again");
            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/auth/login";
            }, 2000);
        }

        return Promise.reject(error);
    }
);

export default request;

// ? Path: src/utils/request.js
