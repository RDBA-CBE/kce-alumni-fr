import axios from "axios";

let api = null;
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const instance = () => {
  if (api) return api;

  api = axios.create({
    baseURL: "http://88.222.213.249/",
  });

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.data?.code === "token_not_valid" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                resolve(api(originalRequest));
              },
              reject: (err) => reject(err),
            });
          });
        }

        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const response = await axios.post(
             `https://alumnib.decodeschool.com/login/refresh/`,
              {
                refresh: refreshToken,
              }
            );

            const { access, refresh } = response.data;
            localStorage.setItem("token", access);
            localStorage.setItem("refreshToken", refresh);

            api.defaults.headers.common["Authorization"] = "Bearer " + access;
            originalRequest.headers["Authorization"] = "Bearer " + access;

            processQueue(null, access);
            resolve(api(originalRequest));
          } catch (err) {
            processQueue(err, null);
            localStorage.clear();
            window.location.href = "/login";
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default instance;
