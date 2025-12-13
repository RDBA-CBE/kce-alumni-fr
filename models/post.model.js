import { instance } from "@/utils/axios.utils";


const post = {
  GetAllPostData: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `postpending/published_posts/?page=${page}`;
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

  GetPostData: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `posts/?page=${page}`;
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

  GetSinglePostData: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `post_detail/${id}/`;
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

  CreatePostData: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_post/`;
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
  UpdatePostData: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_post/${id}/`;
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

  FilterPostData: (data,page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `filter_posts/?page=${page}`;
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

  AddComments: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `postcomments/${id}/`;
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
  DeleteComments: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `delete_post_comment/${id}/`;
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

  PostLike: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `post-likes/${id}/`;
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

  UpcommingBirthdays: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `upcoming_birthdays/`;
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

  UpcommingAllBirthdays: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `all_upcoming_birthdays/`;
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

  SendWishes: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `send_birthday_wishes/${id}/`;
      instance()
        .post(url)
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
      let url = `posts/`;
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
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  memoryApprove: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `memories/approve/${id}/`;
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

export default post;
