import { BaseURL } from "@/utils/BaseUrl";
import { formattedDate, validateForm } from "@/utils/commonFunction.utils";
import { message, Modal } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Priority } from "@/utils/constant.utils";
import FormField from "@/commonComponents/FormFields";
import BorderRadius from "@/components/StyleGuide/Sections/BorderRadius";

const ViewTicketDetails = () => {
  const { id } = useParams();
  console.log("✌️id --->", id);

  const [SingleData, setSingleData] = useState({});
  const [token, setToken] = useState("");
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [statusData, setStatusData] = useState({
    status_id: "",
    priority: "",
    due_date: "",
  });

  const [replyData, setReplyData] = useState({
    messages: "",
  });

  const [errMsg, setErrMsg] = useState({});
  const [statusList, setStatusList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketReplies, setTicketReplies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    const Admin = localStorage.getItem("isAdmin");
    setIsAdmin(Admin);

    const AlumniManager = localStorage.getItem("isAlumniManager");
    setIsAlumniManager(AlumniManager);

    const Faculty = localStorage.getItem("isFaculty");
    setIsFatulty(Faculty);
  }, []);

  useEffect(() => {
    if (token) {
      SingleDatas(id);
      GetStatus();
      getTicketReplies(id);
      GetStatusData(id);
    }
  }, [id, token]);

  const SingleDatas = (id) => {
    axios
      .get(`${BaseURL}/detail_ticket/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setSingleData(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const getTicketReplies = (id) => {
    axios
      .get(`${BaseURL}/tickets_replies/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setTicketReplies(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const GetStatusData = (id) => {
    axios
      .get(`${BaseURL}/update_status/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setStatusData(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const GetStatus = () => {
    setLoading(true);
    axios
      .get(`${BaseURL}/retrieve_status/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStatusList(response.data?.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      messages: { required: true },
    };

    const isValid = validateForm(replyData, validationRules, setErrMsg);
    if (!isValid) return;

    axios
      .post(
        `${BaseURL}/reply_ticket/${id}/`,
        {
          messages: replyData.messages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success(response.data.message);
        setLoading(true);
        getTicketReplies(id);
        setReplyData({
          messages: "",
        });
      })
      .catch((error) => {
        message.error(error.response.data.errors);
        console.log(error.response.data);
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
        setLoading(false);
      });
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();

    if (isAdmin == "true" || isAlumniManager == "true") {
      axios
        .post(
          `${BaseURL}/update_status/${statusData.id}/`,
          {
            status_id: statusData.status_id,
            priority: statusData.priority,
            due_date: statusData.due_date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          message.success(response.data.message);
          setLoading(true);
          GetStatusData(id);
          setStatusData({
            status_id: "",
            priority: "",
            due_date: "",
          });
        })
        .catch((error) => {
          message.error(error?.response?.data?.errors);
          console.log(error.response?.data);
          if (error?.response?.data?.code === "token_not_valid") {
            localStorage.removeItem("token");
            router.push("/login");
          }
          setLoading(false);
        });
    } else if (isFatulty == "true") {
      axios
        .post(
          `${BaseURL}/update_status/${statusData.id}/`,
          {
            status_id: statusData.status_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          message.success(response.data.message);
          setLoading(true);

          GetStatusData(id);
          setStatusData({
            status_id: "",
          });
        })
        .catch((error) => {
          message.error(error.response.data.errors);
          console.log(error.response.data);
          if (error?.response?.data?.code === "token_not_valid") {
            localStorage.removeItem("token");
            router.push("/login");
          }
          setLoading(false);
        });
    }
  };

  const StatusOption = statusList.map((item) => ({
    label: item.status,
    value: item.id,
  }));

  const PriorityOption = Priority.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  console.log("ticketReplies --->", ticketReplies);

  return (
    <section className="jd-page container-fluid ">
      {/* <div className="row justify-content-center"> */}
      {/* <div className="col-11 col-xl-10 con-wid"> */}
      <div className="container-fluid">
        <div className="rbt-callto-action rbt-cta-default style-2 mb-4">
          <div className="content-wrapper overflow-hidden pt--30 pb--30 bg-blue">
            <div className="row gy-5 align-items-end justify-content-lg-between">
              <div className="col-lg-7">
                <div className="inner">
                  <div className="content text-left">
                    <h5 className="mb--5">
                      Viewing the ticke #{SingleData?.id}
                    </h5>
                    {/* <p className="b3">Create Announcement</p> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end gap-3">
                 {(isAdmin == "true" || isAlumniManager == "true") && (
                <div className="call-to-btn text-start text-lg-end position-relative">
                  
                  <Link
                    className="rbt-btn btn-gradient radius-round sm-btn"
                    href="/help-desk/open-tickets"
                    style={{ paddingInline: "10px" }}
                  >
                    <span data-text="Add New Announcement">Open tickets</span>
                  </Link>
                </div>
                 )}

                <div className="call-to-btn text-start text-lg-end position-relative">
                  <Link
                    className="rbt-btn btn-gradient radius-round sm-btn"
                    href="/help-desk/all-support-tickets"
                    style={{ paddingInline: "10px" }}
                  >
                    <span data-text="Add New Announcement">All tickets</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-4 mt-5">
          {/* LEFT */}
          <div className="col-lg-8">
            {/* <div className="jd-main-card p-4 "> */}
            {/* Header */}

            {/* Role Overview */}
            <div className="jd-section rbt-shadow-box">
              <h4 className="jd-section-title">Request by</h4>

              <p className="jd-text mb-2">
                <b>Name: </b>
                {SingleData?.name ? (
                  <Link href={`/members/${SingleData?.member_id}`}>
                    {SingleData?.name}
                  </Link>
                ) : (
                  "-"
                )}
              </p>

              {SingleData?.alumni && (
                <p className="jd-text mb-2">
                  <b>Email: </b>
                  {SingleData?.alumni ? SingleData?.alumni : "-"}
                </p>
              )}

              {SingleData?.contact && (
                <p className="jd-text mb-2">
                  <b>Contact: </b>
                  {SingleData?.contact ? SingleData?.contact : "-"}
                </p>
              )}

              {SingleData?.batch && (
                <p className="jd-text mb-2">
                  <b>Batch: </b>
                  {SingleData?.batch ? SingleData?.batch : "-"}
                </p>
              )}

              {SingleData?.course && (
                <p className="jd-text mb-2">
                  <b>Course: </b>
                  {SingleData?.course ? SingleData?.course : "-"}
                </p>
              )}
            </div>

            {/* Responsibilities */}
            {(isAdmin == "true" || isAlumniManager == "true") &&
              SingleData?.assignments?.length > 0 && (
                <div className="jd-section mt-4 rbt-shadow-box">
                  <h4 className="jd-section-title">Response:</h4>
                  {SingleData?.assignments?.map((edu, index) => (
                    <div
                      className="jd-similar-item bus-list  mt-3 mb-3 bg-color-primary-opacity flex-column gap-0"
                      key={index}
                    >
                      <h5 className="mb-2"> {edu?.assigned_to}</h5>
                      <span style={{ fontSize: "14px" }}>
                        Assigned on : {edu?.assigned_on}
                      </span>
                      <span className="mt-4" style={{ color: "black" }}>
                        Message : {edu?.message}
                      </span>
                      <span style={{ color: "black" }}>
                        Reply :{" "}
                        {edu?.response == null ? (
                          <span
                            style={{
                              color: "gray",
                            }}
                          >
                            No Reply
                          </span>
                        ) : (
                          edu?.response
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            <div className="jd-section mt-4 rbt-shadow-box">
              <h4 className="jd-section-title">Alumni Request:</h4>

              <p className="jd-text mb-2 ">{SingleData?.content}</p>

              {(isAdmin == "true" || isAlumniManager == "true") && (
                <>
                  <div className="jd-text mb-2">
                    <b>Post Reply: </b>

                    <form
                      className="rainbow-dynamic-form max-width-auto"
                      onSubmit={handleReplySubmit}
                    >
                      <div style={{ marginTop: "15px" }}>
                        <FormField
                          type="textarea"
                          name="messages"
                          onChange={handleReplyChange}
                          value={replyData.messages}
                          required={true}
                          error={errMsg.messages}
                        />
                      </div>

                      <div className="form-submit-group">
                        <button
                          name="submit"
                          type="submit"
                          id="submit"
                          className="rbt-btn btn-gradient radius-round sm-btn"
                          // style={{
                          //   cursor: state?.btnLoading
                          //     ? "not-allowed"
                          //     : "pointer",
                          // }}
                          // disabled={state.btnLoading}
                        >
                          {/* {state?.btnLoading ? (
                            <span className="btn-loader"></span>
                          ) : ( */}
                          <span className="icon-reverse-wrapper">
                            <span className="btn-text">Submit</span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                          </span>
                          {/* )} */}
                        </button>
                      </div>
                    </form>
                  </div>
                  <p className="jd-text mb-2 mt-5">
                    <b>Replies: </b>
                    {ticketReplies?.map((ticket) => {
                      return (
                        <div
                          className="jd-similar-item bus-list  mt-3 mb-3 bg-color-primary-opacity flex-column gap-0"
                          key={ticket?.id}
                        >
                          <span style={{ color: "black" }}>
                            {ticket?.message}
                          </span>
                          <span style={{ fontSize: "14px" }}>
                            Posted by: {ticket?.posted_by} on{" "}
                            {ticket?.posted_on}
                          </span>
                        </div>
                      );
                    })}
                  </p>
                </>
              )}

              {/* {SingleData?.contact_email && (
                <p className="jd-text mb-2">
                  <b>Email: </b>
                  <Link href={`mailto:${SingleData?.contact_email}`}>
                    {SingleData?.contact_email}
                  </Link>
                </p>
              )}

              {SingleData?.contact_number && (
                <p className="jd-text">
                  <b>Contact Number: </b>
                  <Link href={`tellto:${SingleData?.contact_link}`}>
                    {SingleData?.contact_number}
                  </Link>
                </p>
              )} */}
            </div>

            {/* </div> */}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4  mt-lg-0 ">
            <div className="jd-side-card rbt-shadow-box">
              <div className="jd-side-title d-flex justify-content-between mb-4">
                <span>Update the Ticket</span>
              </div>

              <div>
                {/* <div className="fw-bold">
                      
                    </div>
                    <div className="jd-side-small text-muted d-flex align-items-center">
                      {"item "}
                      
                    </div> */}

                <form className="event-form" onSubmit={handleStatusSubmit}>
                  <div style={{ marginTop: "15px" }}>
                    <FormField
                      type="text"
                      label="Category"
                      value={SingleData?.category}
                      // disabled={true}

                      className="disabled pointer-events-none"
                    />
                  </div>

                  <div style={{ marginTop: "15px" }}>
                    <FormField
                      type="select"
                      name="status_id"
                      label="Status"
                      onChange={handleStatusChange}
                      value={statusData.status_id}
                      options={StatusOption}
                    />
                  </div>
                  {(isAdmin == "true" || isAlumniManager == "true") && (
                    <>
                      <div style={{ marginTop: "15px" }}>
                        <FormField
                          type="select"
                          name="priority"
                          label="Priority"
                          onChange={handleStatusChange}
                          value={statusData.priority}
                          options={PriorityOption}
                        />
                      </div>

                      <div style={{ marginTop: "15px" }}>
                        <FormField
                          type="date"
                          name="due_date"
                          label="Due Date"
                          onChange={handleStatusChange}
                          value={statusData.due_date}
                        />
                      </div>
                    </>
                  )}

                  <button
                    className="rbt-btn btn-gradient radius-round sm-btn mt-5 w-100"
                    type="submit"
                  >
                    {" "}
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </section>
  );
};

export default ViewTicketDetails;
