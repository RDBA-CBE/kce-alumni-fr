import React, { useEffect, useState } from "react";

import MembersLoginCard from "./MembersLoginCard";
import Link from "next/link";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { memberType, registeredMember } from "@/utils/constant.utils";
import Models from "@/imports/models.import";
import {
  objIsEmpty,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import useDebounce from "@/commonComponents/useDebounce";
import { usePathname } from "next/navigation";
import FormField from "@/commonComponents/FormFields";
import { TeamData } from "@/utils/constant.utils";
import Image from "next/image";
import Pagination from "@/commonComponents/Pagination";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";

const ProfilePhotographMain = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ profile_picture: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [memberId, setMemberId] = useState(null);
  const [token, setToken] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
  }, []);

  useEffect(() => {
    const MemberId = localStorage.getItem("member_id");
    setMemberId(MemberId);
  }, [memberId]);

  // useEffect(() => {
  //   const AlumniPhotograph = localStorage.getItem("isAlumniProfile");
  //   console.log("✌️AlumniPhotograph --->", AlumniPhotograph);

  //   (AlumniPhotograph == true || AlumniPhotograph == "true") &&
  //     router.push("/profile-education");
  // }, []);

  useEffect(() => {
    if (token && memberId !== null) {
      ProfileImageGet();
    }
  }, [memberId, token]);

  console.log("memberId :", memberId);

  const ProfileImageGet = async () => {
    try {
      const res = await axios?.get(`${BaseURL}/profile_picture/${memberId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("res :", res);
      setFormData({
        profile_picture: res?.data?.profile_picture,
      });
      setPreviewImage(res?.data?.profile_picture);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (files[0]) {
      const file = files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB

      if (!allowedTypes.includes(file.type)) {
        message.error("Only PNG, JPEG, JPG files are allowed.");
        e.target.value = ""; // Clear input
        return;
      } else if (fileSizeInMB > 2) {
        message.error("Max file size of 2MB is allowed.");
        e.target.value = ""; // Clear input
        return;
      }

      // Create a preview URL for the uploaded image
      setPreviewImage(URL.createObjectURL(file));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      profile_picture: { required: true },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("profile_picture", formData.profile_picture);

    try {
      const response = await axios.post(
        `${BaseURL}/profile_picture/${memberId}/`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response :", response);

      messageApi.open({
        type: "success",
        content: "Profile picture uploaded successfully!",
      });
      ProfileImageGet();

      // Clear form data
      setFormData({ profile_picture: null });
      setPreviewImage(null);
      router.push("/profile-education");
      // setTimeout(() => {
      //   router.push("/next-step"); // Redirect after successful upload
      // }, 1000);
    } catch (error) {
      messageApi.open({
        type: "error",
        content:
          error.response?.data?.error || "An error occurred. Please try again.",
      });
    }
  };

  const stepsData = [
    { label: "Profile Photo", icon: "feather-image", className: "active" },
    { label: "Educational Details", icon: "feather-book" },
    { label: "Experience", icon: "feather-briefcase " },
    { label: "Contact", icon: "feather-phone-forwarded" },
    { label: "Milestone", icon: "feather-star" },
  ];

  return (
    <div className="rbt-dashboard-area section-pad">
      {contextHolder}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10">
            <div className="row g-5">
              <div className="col-lg-3 d-sidebar">
                <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
                  <div className="inner">
                    <div className="content-item-content">
                      <div className="rbt-default-sidebar-wrapper">
                        <div className="custom-stepper container">
                          <ul className="stepper-list list-unstyled">
                            {stepsData.map((step, index) => (
                              <li key={index} className="stepper-item d-flex">
                                <div className="stepper-left">
                                  <div
                                    className={`stepper-circle ${
                                      step.className ? "active" : ""
                                    }`}
                                  >
                                    <i className={`${step.icon}`}></i>
                                  </div>
                                  {index < stepsData.length - 1 && (
                                    <div
                                      className={`stepper-line ${
                                       step.className
                                          ? "completed"
                                          : ""
                                      }`}
                                    ></div>
                                  )}
                                </div>
                                <div className="stepper-content">
                                  <span
                                    className={`stepper-text ${
                                       step.className ? "active" : ""
                                    }`}
                                  >
                                    {step.label}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box">
                  <div className="container">
                    <div className="row row--15 gy-5">
                      <div className="form-wrapper">
                        <div className=" contact-form-style-1 max-width-auto py-0 px-3">
                          <form
                            id="contact-form"
                            className="rainbow-dynamic-form max-width-auto"
                            onSubmit={(e) => handleSubmit(e)}
                          >
                            {/* Left Column */}
                            <div
                              className={`${
                                previewImage ? "d-flex gap-5" : ""
                              }`}
                            >
                              {previewImage ? (
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={previewImage}
                                    alt="Profile Preview"
                                    style={{
                                      width: "190px",
                                      height: "150px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                  />
                                  {/* <button
                                    onClick={handleDelete}
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
                                  >
                                    <i className="feather-trash"></i>
                                  </button> */}
                                </div>
                              ) : (
                                <img
                                  src="assets/images/profile/dummy-profile.png"
                                  alt=""
                                />
                              )}

                              <div className="">
                                <FormField
                                  label="Profile Picture"
                                  type="file"
                                  name="profile_picture"
                                  onChange={handleChange}
                                  error={errMsg.profile_picture}
                                  className="formdate pt-3"
                                  required={true}
                                  allowedTypes="image/*"
                                />
                                <p
                                  className=" mt-3"
                                  style={{ fontSize: "12px" }}
                                >
                                  Only PNG, JPEG, JPG allowed.
                                  <br />
                                  Max file size of 2MB.
                                </p>
                              </div>
                            </div>

                            <div className="form-submit-group d-flex justify-content-between flex-wrap">
                              <div >
                                

                                <button
                                  name="submit"
                                  type="submit"
                                  id="submit"
                                  className="rbt-btn btn-md btn-gradient hover-icon-reverse ms-2"
                                >
                                  <span className="icon-reverse-wrapper">
                                    <span className="btn-text">
                                      Save and Continue
                                    </span>
                                    <span className="btn-icon">
                                      <i className="feather-arrow-right"></i>
                                    </span>
                                    <span className="btn-icon">
                                      <i className="feather-arrow-right"></i>
                                    </span>
                                  </span>
                                </button>
                              </div>

                              <div className="rbt-card-bottom">
                                <a
                                  className="rbt-btn-link color-primary"
                                  href="/profile-education"
                                >
                                  {" "}
                                  Skip & Go to Next Step
                                  <i className="feather-arrow-right"></i>
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotographMain;
