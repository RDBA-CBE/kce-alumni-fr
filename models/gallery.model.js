import { instance } from "@/utils/axios.utils";


const gallery = {
  albumList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `albums/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  memoriesList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `memories/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  albumDetails: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `albums/${id}/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  memoriesDetails: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `memories/${id}/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  deletePhoto: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `delete/photos/${id}/`;
      instance()
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  photoList: (id, page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `photos/${id}/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  deleteAlbum: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `delete/albums/${id}/`;
      instance()
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  deleteMemories: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `deletememories/${id}/`;
      instance()
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  createAlbum: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `createalbum/`;
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

  updateAlbum: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `updatealbum/${id}/`;
      instance()
        .patch(url, body, {
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

  addPhoto: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `uploadalbum/${id}/`;
      instance()
        .put(url, body, {
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

  addMemories: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `creatememories/`;
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

  updateMemories: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `updatememories/${id}/`;
      instance()
        .patch(url, body, {
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

  type: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_industries/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  userDetails: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `userdetails/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  approvePhoto: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `album/photos/${id}/approve/`;
      instance()
        .post(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
};

export default gallery;
