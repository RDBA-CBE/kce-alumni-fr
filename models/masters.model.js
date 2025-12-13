import { instance } from "@/utils/axios.utils";

const masters = {
  // Country Start
  GetCountryList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_countries/?page=${page}`;
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

  groupList: () => {
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
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  courseList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_course/?page=${page}`;
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

  create_course: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_course/`;
      instance()
        .post(url, body)
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

  update_course: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_course/${id}/`;
      instance()
        .post(url, body)
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

  deactivate_course: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `decativate_course/${id}/`;
      instance()
        .put(url, body)
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

  batchList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_batch/?page=${page}`;
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

  create_batch: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_batch/`;
      instance()
        .post(url, body)
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

  update_batch: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_batch/${id}/`;
      instance()
        .post(url, body)
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

  departmentList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_department/?page=${page}`;
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

  institutionList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_industries/?page=${page}`;
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

  skillList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_skills/?page=${page}`;
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

  roleList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_role/?page=${page}`;
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

  bussinessTypeList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_industry_type/?page=${page}`;
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

  locationList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_locations/?page=${page}`;
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

  industryList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_industries/?page=${page}`;
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

  CreateCountry: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_country/`;
      instance()
        .post(url, data)
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

  UpdateCountry: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_country/${id}/`;
      instance()
        .post(url, data)
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

  // Country End

  // Ticket Category Start
  GetTicketCategoryData: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_ticket_category/?page=${page}`;
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

  CreateCategoryTicket: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_ticket_category/`;
      instance()
        .post(url, data)
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

  UpdateCategoryTicket: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_ticket_category/${id}/`;
      instance()
        .post(url, data)
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
  // Ticket Category End

  // Post Category Start
  GetPostCategoryData: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `postcategory/?page=${page}&for_create=True`;
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

  GetPostCategoryList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `postcategory/?page=${page}`;
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

  CreatePostCategory: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `postcategory/`;
      instance()
        .post(url, data)
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

  UpdatePostCategory: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `postcategory/${id}/`;
      instance()
        .put(url, data)
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

  //   Post Category End

  // Event Category Start
  GetEventCategoryData: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_event_category/?page=${page}`;
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

  CreateEventCategory: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_event_category/`;
      instance()
        .post(url, data)
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

  UpdateEventCategory: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_event_category/${id}/`;
      instance()
        .post(url, data)
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

  salutation: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_salutation/`;
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

  create_salutation: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_salutation/`;
      instance()
        .post(url, body)
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

  update_salutation: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_salutation/${id}/`;
      instance()
        .post(url, body)
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

  batch: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_batch/?page=${page}`;
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

  course: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `active_course/?page=${page}`;
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

  department: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `active_department/?page=${page}`;
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

  institutions: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_institutions/?page=${page}`;
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

  milestone: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `milestones/?member=${id}`;
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

  status: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_status/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  facultyList: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `faculty_users/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  register_event: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `register_event/${id}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  post_register_event: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `register_event/${id}/`;
      instance()
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  //   Event Category End
};

export default masters;
