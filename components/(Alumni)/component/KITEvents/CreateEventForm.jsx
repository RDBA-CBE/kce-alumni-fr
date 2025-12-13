"use client";

import React, { useEffect, useState, useRef } from "react";
import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useRouter, useParams } from "next/navigation";
import { message, Select } from "antd";
import Link from "next/link";
import { BaseURL } from "@/utils/BaseUrl";
import {
  ConvertFormData,
  getFormattedDateTime,
  setDropdownData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import FormField from "@/commonComponents/FormFields";
import {
  eventPublicOptions,
  eventRegistrationOptions,
  jobTypeOption,
  YearOfExperience,
} from "@/utils/constant.utils";
import axios from "axios";
import Models from "@/imports/models.import";
import dynamic from "next/dynamic";
import EventQuestion from "@/components/(Alumni)/component/KITEvents/EventQuestion";
 import * as validation from "@/utils/validation.utils"

const RichTextEditor = dynamic(() => import("@/commonComponents/RichEditor"), {
  ssr: false, // Disable server-side rendering for this component
});

const CreateEventForm = () => {
  

  const [state, setState] = useSetState({
    activeTab: 1,
    question: [],
    imageFile: null,
    attachmentFile: null,
    is_public: "",
    name: "",
    category: "",
    start_date: null,
    venue: "",
    address: "",
    link: "",
    need_registration: "",
    registration_close_date: null,
    description: null,
    event_wallpaper: null,
    instructions: "",
    address: "",
    eventCatOptions: [],
    defaultQuestions: [],
    error: {},
    btnLoading: false,
  });

  const fileInputRef = useRef(null);
  const imgInputRef = useRef(null);

  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  useEffect(() => {
    GetEventCategory();
    GetRecomentedQuestion();
  }, []);

  const GetEventCategory = async () => {
    try {
      const res = await Models.masters.GetEventCategoryData(1);
      const EventOptions = res?.results?.map((eve) => ({
        value: eve.category_id,
        label: eve.title,
      }));
      setState({ eventCatOptions: EventOptions });
    } catch (error) {
      console.log("error: ", error);
      if (error?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  const GetRecomentedQuestion = async () => {
    try {
      const res = await Models.event.GetRecomentedQuestions();
      setState({ defaultQuestions: res });
    } catch (error) {
      console.log("error: ", error);
      if (error?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") {
      setState({ imageFile: file });
    } else if (type === "event_wallpaper") {
      setState({ event_wallpaper: file });
      setState({ imageFile: file });
    }
    e.target.value = null;
  };

  const removeFile = (type) => {
    if (type === "image") {
      setState({ imageFile: null });
    } else if (type === "event_wallpaper") {
      setState({ event_wallpaper: null });
      setState({ imageFile: null });
    }
  };

  const handleChange = (name, e) => {
    const { value, type } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const createEvent = async (e) => {
    try {
        e.preventDefault();
      setState({ btnLoading: true });
      const body = {
        title: state.title,
        category: state.category,
        start_date: state.start_date
          ? new Date(state.start_date).toISOString().split("T")[0]
          : "",
        start_time: new Date(state.start_date)
          .toISOString()
          .split("T")[1]
          .split(".")[0],
        venue: state.venue,
        address: state.address,
        link: state.link,
        is_public: state.is_public,
        need_registration: state.need_registration,
        registration_close_date: state.registration_close_date,
        description: state.description,
        event_wallpaper: state.event_wallpaper,
        instructions: state.instructions,
        event_question: state.question,
      };

      await validation.createEvent.validate(body, { abortEarly: false });

      const formData = ConvertFormData(body);

      const res = await Models.event.CreateEvent(formData);
      console.log("Response from server:", res);
      router?.push(`/events`);
      success(res?.message);

      setState({ verificationError: null, btnLoading: false });
    } catch (error) {
      const formattedErrors = {};
      const questionErrors = [];

      error.inner.forEach((err) => {
        if (err.path?.startsWith("event_question[")) {
          const match = err.path.match(/event_question\[(\d+)\]\.question/);
          if (match) {
            const index = parseInt(match[1], 10);
            questionErrors[index] = err.message;
          }
        } else if (err.path) {
          formattedErrors[err.path] = err.message;
        }
      });

      if (questionErrors.length > 0) {
        formattedErrors.questionErrors = questionErrors;
      }
      console.log("✌️formattedErrors --->", formattedErrors);

      setState({ verificationError: formattedErrors, btnLoading: false });
    }
  };

  const success = (success) => {
    messageApi.open({
      type: "success",
      content: success || "Event Created",
    });
  };

  return (
    <div className={`rbt-contact-address event-form`}>
      <div className="container section-pad">
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex justify-content-between ">
              <h5>Create Event</h5>
              <Link
                className="rbt-btn btn-gradient radius-round sm-btn"
                href="/events"
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
                  onSubmit={(e) => createEvent(e)}
                >
                  <div className="form-grid">
                    {/* Left Column */}
                    <div className="">
                      <FormField
                        type="text"
                        name="title"
                        //   className={"applicant-input"}
                        onChange={(e) => handleChange("title", e)}
                        value={state.title}
                        required
                        error={state.verificationError?.title}
                        style={{ width: "100%" }}
                        label="Title"
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="">
                      <FormField
                        label="Category"
                        type="select"
                        name="category"
                        onChange={(e) => handleChange("category", e)}
                        value={state.category}
                        required
                        style={{ width: "100%" }}
                        options={state?.eventCatOptions}
                        placeholder={"Category"}
                        error={state.verificationError?.category}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="">
                      <FormField
                        type="datetime"
                        name="start_date"
                        className={"formdate"}
                        onChange={(e) => handleChange("start_date", e)}
                        value={state.start_date}
                        required
                        error={
                          state.verificationError?.start_date ||
                          state.error?.start_time
                        }
                        style={{ width: "100%" }}
                        label="Start Date"
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="">
                      <FormField
                        type="text"
                        name="venue"
                        //   className={"applicant-input"}
                        onChange={(e) => handleChange("venue", e)}
                        value={state.venue}
                        style={{ width: "100%" }}
                        label="Venue"
                        required="true"
                        error={state.verificationError?.venue}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="">
                      <FormField
                        type="text"
                        name="address"
                        //   className={"applicant-input"}
                        onChange={(e) => handleChange("address", e)}
                        value={state.address}
                        required
                        error={state.verificationError?.address}
                        style={{ width: "100%" }}
                        label="Address"
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="">
                      <FormField
                        type="text"
                        name="link"
                        //   className={"applicant-input"}
                        onChange={(e) => handleChange("link", e)}
                        value={state.link}
                        required
                        style={{ width: "100%" }}
                        label="Link"
                        error={state?.verificationError?.link}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="">
                      <FormField
                        type="select"
                        name={"is_public"}
                        onChange={(e) => handleChange("is_public", e)}
                        value={state.is_public}
                        required
                        style={{ width: "100%" }}
                        options={eventPublicOptions}
                        placeholder={"Visibility"}
                        label="Visibility"
                        error={state?.verificationError?.is_public}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="">
                      <FormField
                        type="select"
                        name="need_registration"
                        onChange={(e) => handleChange("need_registration", e)}
                        value={state.need_registration}
                        required
                        style={{ width: "100%" }}
                        options={eventRegistrationOptions}
                        placeholder={"Registration"}
                        label="Need Registrations?"
                        error={state?.verificationError?.need_registration}
                      />
                      <span className="focus-border"></span>
                    </div>
                    <div className=" ">
                      <FormField
                        type="date"
                        name="registration_close_date"
                        //   className={"applicant-input"}
                        onChange={(e) =>
                          handleChange("registration_close_date", e)
                        }
                        value={state.registration_close_date}
                        label="Registrations Close Date"
                        error={
                          state?.verificationError?.registration_close_date
                        }
                        required={true}
                      />
                    </div>

                    <div className=" d-flex gap-2">
                      <FormField
                        type="file"
                        name="event_wallpaper"
                        ref={imgInputRef}
                        key={state.fileInputKey}
                        className="formdate pt-3"
                        onChange={(e) => handleFileChange(e, "event_wallpaper")}
                        accept=".jpg,.jpeg,.png,.webp"
                        label="Event Image"
                        error={state?.error?.event_wallpaper}
                        required={true}
                      />
                      <div style={{ position: "relative", top: "35px" }}>
                        {state.event_wallpaper ? (
                          <img
                            src={state.event_wallpaper}
                            alt="Event Wallpaper"
                            style={{
                              width: "100px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        ) : state.imageFile ? (
                          <img
                            src={URL.createObjectURL(state.imageFile)}
                            alt="Uploaded Image"
                            style={{
                              width: "100px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        ) : null}
                        {(state.event_wallpaper || state.imageFile) && (
                          <button
                            style={{
                              background: "white",
                              color: "red",
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              cursor: "pointer",
                              borderRadius: "3px",
                              padding: "0px 3px",
                              border: "none",
                              fontSize: "12px",
                            }}
                            onClick={() => removeFile("image")}
                          >
                            <i className="feather-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 w-100">
                    <label
                      className="mb-3"
                    
                    >
                      Description <span className="text-danger">*</span>
                    </label>

                    <RichTextEditor
                      value={state.description}
                      onChange={(value) => {
                        const body = {
                          target: {
                            value: value,
                          },
                        };
                        handleChange("description", body);
                      }}
                    />
                  </div>

                  <div className="mt--70 w-100">
                    <label

                    // className="form-label"
                    >
                      Custom Questions <span style={{ color: "red" }}>*</span>
                    </label>

                    <div className="form-input mt-3">
                      <p>
                        You can add up to 5 custom questions to the event
                        registration form to collect additional
                        information/preferences from the alumni. Click on the
                        button below to add a question:
                      </p>
                      <div>
                        <div>
                          <EventQuestion
                            defaultQuestions={state?.defaultQuestions}
                            questions={state.question || []}
                            addQuestions={(value) => {
                              const arr = [...state.question];
                              arr.push(value);
                              setState({
                                question: arr,
                              });
                            }}
                            updateInputChange={(arr) => {
                              setState({
                                question: arr,
                              });
                            }}
                            questionErrors={
                              state.verificationError?.questionErrors
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 w-100">
                    <FormField
                      type="textarea"
                      name="instructions"
                      value={state.instructions}
                      // className="form-input"
                      style={{ height: "150px" }}
                      onChange={(e) => handleChange("instructions", e)}
                      label="Event Instructions"
                    />
                  </div>

                  {/* Submit */}
                  <div className="form-submit-group">
                    <button
                      name="submit"
                      type="submit"
                      id="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Submit</span>
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
  );
};

export default CreateEventForm;
