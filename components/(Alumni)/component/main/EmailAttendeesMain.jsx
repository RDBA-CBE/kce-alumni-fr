"use client";

import React, { useEffect, useRef } from "react";

import { useRouter, useParams } from "next/navigation";
import { Modal, Select } from "antd";
import Link from "next/link";

import {
  ConvertFormData,
  getFormattedDateTime,
  useSetState,
  validateEmail,
} from "@/utils/commonFunction.utils";
import FormField from "@/commonComponents/FormFields";
import {
  eventPublicOptions,
  eventRegistrationOptions,
} from "@/utils/constant.utils";

import Models from "@/imports/models.import";
import dynamic from "next/dynamic";
import EventQuestion from "@/components/(Alumni)/component/KITEvents/EventQuestion";
import * as validation from "@/utils/validation.utils";

const RichTextEditor = dynamic(() => import("@/commonComponents/RichEditor"), {
  ssr: false, // Disable server-side rendering for this component
});

const EmailAttendeesMain = () => {
  const { Option } = Select;
  const { id } = useParams();
  const router = useRouter();

  console.log("id", id);

  const [state, setState] = useSetState({
    activeTab: "All",
    eventData: {},
    description: "",
    userMessage: "",
    name_checkbox: false,
    subject: "",
    errorMsg: "",
    msgLoading: false,
    btnLoading: false,
    memberList: [],
    emailError: "",
  });

  const imgInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      GetEventDetails();
      eventParticpateMember();
    }
  }, [id]);

  useEffect(() => {
    if (state.eventData) {
      if (state.name_checkbox) {
        const html = generateEventHTML(state.eventData);
        setState({ description: html });
      } else {
        const html = withoutNamegenerateEventHTML(state.eventData);
        setState({ description: html });
      }
    }
  }, [state.name_checkbox]);

  function generateEventHTML(event) {
    return `
      <p>Dear {{NAME}},</p>
    <br/>
      <p>Your custom input message goes here...</p>
      <br/>

      <p>Please find the event details below:</p>
      <hr/>
      <p><a href="${event.link}" target="_blank" style="color: purple;">${
      event.title
    }</a></p>
      <p><strong>Date:</strong> ${formatDate(event.start_date)}, ${formatTime(
      event.start_time
    )}</p>
      <p><strong>Venue:</strong> ${event.venue}, ${event.address}</p>
      <hr/>
    `;
  }

  function withoutNamegenerateEventHTML(event) {
    console.log("withoutNamegenerateEventHTML --->", event);
    return `
    <p>Your custom input message goes here...</p>
      <br/>
      <p>Please find the event details below:</p>
      <hr/>
      <p><a href="${event.link}" target="_blank" style="color: purple;">${
      event.title
    }</a></p>
      <p><strong>Date:</strong> ${formatDate(event.start_date)}, ${formatTime(
      event.start_time
    )}</p>
      <p><strong>Venue:</strong> ${event.venue}, ${event.address}</p>
      <hr/>
    `;
  }

  function formatDate(dateStr) {
    console.log("✌️dateStr --->", dateStr);
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  }

  function formatTime(timeStr) {
    console.log("✌️timeStr --->", timeStr);
    if (timeStr) {
      const [hour, minute] = timeStr.split(":");
      return new Date(0, 0, 0, hour, minute).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } else {
      return null;
    }
  }

  const GetEventDetails = async () => {
    try {
      const res = await Models?.event?.GetEditEventsDatas(id);
      console.log("✌️res--->", res);
      if (res) {
        const html = withoutNamegenerateEventHTML(res);
        setState({ description: html, eventData: res, title: res?.title });
      }
    } catch (err) {
      if (err?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.log(err);
    }
  };

  const eventParticpateMember = async () => {
    try {
      const res = await Models?.event?.eventMember(id);
      console.log("✌️res--->", res);
      setState({ memberList: res?.registered_users });
    } catch (err) {
      if (err?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.log(err);
    }
  };

  const handleChange = (eOrValue) => {
    if (eOrValue?.target) {
      // Native input event
      const { name, value, type, checked } = eOrValue.target;
      setState({
        [name]: type === "checkbox" ? checked : value,
      });
    } else if (typeof eOrValue === "object" && eOrValue.name) {
      // Custom input structure
      const { name, value, checked, type } = eOrValue;
      setState({
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setState({ imageFile: file });
  };

  const sendMail = async (e) => {
    try {
      e.preventDefault();
      setState({ msgLoading: true });

      if (state.subject == "") {
        setState({ errorMsg: "Subject is required" });
        setState({ msgLoading: false });
      } else {
        const body = {
          subject: state.subject,
          message: state.userMessage,
          file: state.imageFile,
          name_checkbox: state.name_checkbox,
        };

        const res = await Models?.event?.sendMail(id, body);
        setState({ msgLoading: false });

        router.push(`/event-details/${id}`);
        message.success("Mail sent successfully");
      }
    } catch (err) {
      if (err?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      setState({ msgLoading: false });

      console.log(err);
    }
  };

  const sendTextMsg = async (e) => {
    try {
      e.preventDefault()
      // Validate email first
      if (!state.email) {
        setState({ emailError: "Email is required" });
        return;
      }

      if (!validateEmail(state.email)) {
        setState({ emailError: "Please enter a valid email address" });
        return;
      }

      setState({ btnLoading: true, emailError: "" });

      const body = {
        recipient_email: state.email,
      };

      const res = await Models?.event?.sendTextMsg(id, body);
      console.log("✌️res--->", res);
      setState({
        isModalOpen: false,
        email: "",
        btnLoading: false,
        emailError: "",
      });
      message.success("Message sent successfully");
    } catch (err) {
      if (err?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      setState({ btnLoading: false });
      console.log(err);
    }
  };

  return (
    <>
      <div className={`rbt-contact-address event-form`}>
        <div className="container section-pad">
          <div className="row mb-4 justify-content-center">
            <div className="col-lg-10">
              <div className="d-flex justify-content-between ">
                <h5>Send Message</h5>
                <Link
                  className="rbt-btn btn-gradient radius-round sm-btn"
                  href={`/event-details/${id}`}
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="form-wrapper">
                <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                  <form
                    id="contact-form"
                    className="rainbow-dynamic-form max-width-auto"
                    onSubmit={(e) => sendMail(e)}
                  >
                    <div className="">
                      {/* Left Column */}

                      <div>
                        <FormField
                          label="To"
                          type="text"
                          name="To"
                          //   className={"applicant-input"}
                          // onChange={handleChange}
                          value={
                            state?.memberList?.length > 0
                              ? state?.memberList
                                  ?.filter((item) => item?.full_name !== "")
                                  ?.map((item) => item.full_name)
                                  .join(",")
                              : ""
                          }
                          //   disabled
                        />
                      </div>

                      <div className="mt-4">
                        <FormField
                          type="text"
                          name="Subject"
                          onChange={(e) =>
                            setState({ subject: e.target.value })
                          }
                          value={state.subject}
                          error={state.errorMsg}
                          style={{ width: "100%" }}
                          label="Subject"
                          required
                        />
                      </div>

                      <div className="mt-4">
                        <input
                          type="checkbox"
                          value={state.name_checkbox}
                          checked={state.name_checkbox}
                          onChange={handleChange}
                          name="name_checkbox"
                          id={`nameoption`}
                        />
                        <label
                          htmlFor={`nameoption`}
                          style={{
                            marginRight: "5px",
                            color: "black",
                            marginTop: "2px",
                          }}
                        >
                          {" Personalize message with recipient's name."}
                        </label>

                        <div className="mt-3" style={{ fontSize: "14px" }}>
                          Option would add{" "}
                          <span style={{ color: "red" }}>{"{{NAME}}"}</span> to
                          the mail, it would be replaced with the recipient's
                          name before it is delivered
                        </div>
                      </div>

                      <label className="form-label mt-4 mb-3">Message</label>

                      <div
                        className="event-preview"
                        dangerouslySetInnerHTML={{ __html: state.description }}
                      />

                      <div className="mt-4 w-100 mb--60">
                        <label className="mb-3">Custom Message</label>

                        <RichTextEditor
                          value={state.userMessage}
                          onChange={(value) => {
                            setState({ userMessage: value });
                          }}
                        />
                      </div>

                      <div className="w-100 ">
                        <FormField
                          type="file"
                          name="event_wallpaper"
                          ref={imgInputRef}
                          key={state.fileInputKey}
                          className="formdate pt-3"
                          onChange={(e) => handleFileChange(e)}
                          accept=".xls,.xlsx,.doc,.docx,.ppt,.pptx,.zip,.pdf"
                          label="Attach File"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="form-submit-group">
                      <button
                        name="submit"
                        type="submit"
                        id="submit"
                        className="rbt-btn btn-md btn-gradient hover-icon-reverse me-5"
                      >
                        <span className="icon-reverse-wrapper">
                          <span className="btn-text">Send Message</span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                        </span>
                      </button>

                      <button
                        name="submit"
                        type="button"
                        id="submit"
                        className="rbt-btn btn-md btn-gradient hover-icon-reverse "
                        onClick={() => setState({ isModalOpen: true })}
                      >
                        <span className="icon-reverse-wrapper">
                          <span className="btn-text">Send Test Email</span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={<div className="custom-modal-header">Create User</div>}
       open={state.isModalOpen}
      onCancel={() => setState({ isModalOpen: false,emailError:"",email:"" })}
        footer={false}
        centered
      >
       
        <form className="applicants-form" onSubmit={(e)=>sendTextMsg(e)}>
        
          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
            name="email"
            label="Email Id:"
            value={state.email}
            onChange={(e) => setState({ email: e.target.value })}
          
            required
            error={state.emailError}
            />
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EmailAttendeesMain;
