import { instance } from "@/utils/axios.utils";

const chapter = {
  list: (page = 1, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapters?page=${page}`;
      if (body?.name) {
        url += `&name=${encodeURIComponent(body?.name)}`;
      }
      if (body?.country) {
        url += `&country=${encodeURIComponent(body?.country)}`;
      }
      if (body?.location) {
        url += `&location=${encodeURIComponent(body?.location)}`;
      }
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

  create: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapters/`;
      instance()
        .post(url, data, {
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

  update: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapters/${id}/`;
      instance()
        .patch(url, data, {
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

  detail: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapters/${id}/`;
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


  delete: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapters/${id}/`;
      instance()
        .delete(url)
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

  adduser: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapter-memberships/`;
      instance()
        .post(url, data)
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

  getUserByChapterId: (page=1,id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapter-memberships?chapter=${id}&page=${page}`;
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

  deleteUser: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `chapter-memberships/${id}/`;
      instance()
        .delete(url)
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

export default chapter;
