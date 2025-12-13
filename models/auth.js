import { instance } from "@/utils/axios.utils";

const auth = {
  login: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `login/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  register: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `register_user/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  newMemberProof: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `own_member/`;
      instance()
        .post(url, body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  verifyOtp: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `verify_otp/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  roleList: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `groups/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
};

export default auth;
