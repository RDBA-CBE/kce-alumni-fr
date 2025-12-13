import { instance } from "@/utils/axios.utils";

import { modelError } from "@/utils/commonFunction.utils";

const member = {
  list: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `all_members/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  memberData: (memberId) => {
    let promise = new Promise((resolve, reject) => {
      let url = `member_data/${memberId}/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  updateMemberData: (memberId, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `member_data/${memberId}/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  pendingMember: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `pending_members/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  approveMember: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `approve_member/${id}/`;
      instance()
        .post(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  updateUserStatus: (id, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `deactivate_user/${id}/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  updateUserRole: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `assign_group/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  create_user: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `create_user/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  create_single_member: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `single_import_users/`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  create_multiple_member: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `bulk_import_users/`;
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
          reject(modelError(error));
        });
    });
    return promise;
  },

  users: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `users/?page=${page}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  createUser: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `creating_user/`;
      instance()
        .post(url,body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  filter: (page, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `filter_by/?page=${page}`;
      instance()
        .post(url, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  member_contact: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_alumni/${id}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  member_experience: (memberId) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_member_experience/${memberId}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  member_skills: (memberId) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_member_skills/${memberId}/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },

  member_education: (memberId) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_member_education/${memberId}/`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(modelError(error));
        });
    });
    return promise;
  },
};

export default member;
