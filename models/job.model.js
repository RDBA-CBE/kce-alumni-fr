import { instance } from "@/utils/axios.utils";

import { modelError } from "@/utils/commonFunction.utils";

const job = {
  jobList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_job_post/?page=${page}`;
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  latestJobList: () => {
    let promise = new Promise((resolve, reject) => {
      let url = `latest_job_post`;
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  

  jobFilter: ( body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `filter_job/`;

      instance()
        .post(url, body)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  myJobList: (page, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `my_job_post/?page=${page}`;
      // if (body?.search) {
      //   url += `&search=${encodeURIComponent(body.search)}`;
      // }
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  createJob: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_job_post/`;
      instance()
        .post(url, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  updateJob: (body, id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `update_job_post/${id}/`;
      instance()
        .post(url, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  applyJob: (body, id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_application/${id}/`;
      instance()
        .post(url, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  applicantList: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `my_job_applications/${id}`;

      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  jobDetails: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `detail_job_post/${id}`;

      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  applicantDetails: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `detail_view_application/${id}`;
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  skillList: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_skills/?page=${page}`;
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  locationList: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_locations/?page=${page}`;
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  roleList: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_role?page=${page}`;
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },

  industryList: (page = 1) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_industries/?page=${page}`;
      instance()
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log('✌️error --->', error);
          reject(error);
        });
    });
    return promise;
  },
};

export default job;
