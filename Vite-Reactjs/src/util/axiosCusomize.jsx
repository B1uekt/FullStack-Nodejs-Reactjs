import axios from "axios"
import { store } from "../redux/store";
import NProgress from 'nProgress';
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// let pendingRequests = 0
// Alter defaults after instance has been created

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // if (pendingRequests === 0) {
    //     NProgress.start() // Bắt đầu thanh tiến trình
    // }
    // pendingRequests += 1;
    NProgress.start()
    const access_token = store?.getState()?.user?.account?.access_token
    config.headers["Authorization"] = "Bearer " + access_token;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // pendingRequests -= 1; // Giảm số lượng yêu cầu đang chờ
    // if (pendingRequests === 0) {
    //     NProgress.done(); // Chỉ hoàn tất khi không còn yêu cầu nào
    // }
    NProgress.done()
    return response && response.data ? response.data : response;
}, function (error) {
    // pendingRequests -= 1

    // if (pendingRequests === 0) {
    //     NProgress.done() // Chỉ hoàn tất khi không còn yêu cầu nào
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done()
    console.log(">>>>check error", error.response.status)
    if (error.response.status === 401) {

    }
    return error && error.response && error.response.data
        ? error.response.data : Promise.reject(error);
});

export default instance