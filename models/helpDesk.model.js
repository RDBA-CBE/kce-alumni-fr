import { instance } from "@/utils/axios.utils";


const helpDesk = {
  facultyAssignedTickets: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `assignments/?page=${page}`;
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

  filter_ticket: (body,page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `filter_ticket/?page=${page}`;
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

  ticketList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = ` retrieve_ticket/?page=${page}`;
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

  retrieve_ticket: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_ticket/?page=${page}`;
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

  retrieve_open_ticket: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `retrieve_open_ticket/?page=${page}`;
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



  openTicketList: (page) => {
    let promise = new Promise((resolve, reject) => {
      let url = ` retrieve_open_ticket/?page=${page}`;
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

  open_filter_ticket: (body,page) => {
    let promise = new Promise((resolve, reject) => {
      let url = `open_filter_ticket/?page=${page}`;
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

  

  
 
  
};

export default helpDesk;
