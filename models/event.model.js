import { instance } from "@/utils/axios.utils";

const event = {
  GetAllEventsAdminData: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_event/?page=${page}`;
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

  filterEvent: (page, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `event_by_category/?page=${page}`;
      if (body.category_id) {
        url += `&category_id=${encodeURIComponent(body.category_id)}`;
      }
      if (body.is_past == "true") {
        url += `&is_past=${encodeURIComponent(body.is_past)}`;
      }
      if (body.is_past == "false") {
        url += `&is_past=${encodeURIComponent(body.is_past)}`;
      }

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

  GetMyEventsAdminData: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `my_event/?page=${page}`;

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

  filterMyEvent: (page, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `my_event/?page=${page}`;
      if (body?.category_id) {
        url += `&event_category_id=${encodeURIComponent(body.category_id)}`;
      }
      if (body?.is_upcoming) {
        url += `&is_upcoming=${encodeURIComponent(body.is_upcoming)}`;
      }

      if (body?.is_completed) {
        url += `&is_completed=${encodeURIComponent(body.is_completed)}`;
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

  GetUpcomingEventsData: (data) => {
    console.log("✌️data --->", data);
    let promise = new Promise((resolve, reject) => {
      let url = `event_by_category/`;
      console.log("✌️data --->", data);

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

  GetPastEventsData: (data) => {
    console.log("✌️data --->", data);
    let promise = new Promise((resolve, reject) => {
      let url = `past_event_by_category/`;
      console.log("✌️data --->", data);

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

  CreateEvent: (data) => {
    console.log("✌️data --->", data);
    let promise = new Promise((resolve, reject) => {
      let url = `create_event/`;
      console.log("✌️data --->", data);

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

  GetEditEventsDatas: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_event/${id}/`;

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

  registered_details: (id,page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `registered_details/${id}/?page=${page}`;

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

  eventMember: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `email_attendees/${id}/`;
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

  sendMail: (id,body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `email_attendees/${id}/`;
      instance()
        .post(url,body,{
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

  sendUserMail: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `email_selected_members/`;
      instance()
        .post(url,body,{
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

  sendTextMsg: (id,body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `test_email/`;
      instance()
        .post(url,body)
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



  UpdateEditEventsDatas: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_event/${id}/`;

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

  InactiveEvents: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `inactive_event/${id}/`;

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

  GetExportEventsDatas: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `export_event/${id}/`;

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

  GetRecomentedQuestions: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `recommended_questions/`;
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

export default event;
