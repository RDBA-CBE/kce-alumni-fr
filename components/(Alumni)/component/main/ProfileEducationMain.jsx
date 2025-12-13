import React, { useEffect, useState } from "react";

import MembersLoginCard from "./MembersLoginCard";
import Link from "next/link";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { memberType, registeredMember } from "@/utils/constant.utils";
import Models from "@/imports/models.import";
import {
  objIsEmpty,
  setDropdownData,
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

const ProfileEducationMain = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    skills: "",
    institute: "",
    degree: "",
    location: "",
    start_year: "",
    end_year: null,
    is_currently_pursuing: false,
  });
  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [skills, setSkills] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const [memberSkills, setMemberSkills] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [location, setLocation] = useState([]);

  const [state, setState] = useSetState({
    currenSkillPage: 1,
    hasSkillLoadMore: null,
    currenInstitutionPage: 1,
    hasInstitutionLoadMore: null,
    currenLocationPage: 1,
    hasLocationLoadMore: null,
  });

  useEffect(() => {
    const MemberId = localStorage.getItem("member_id");
    setMemberId(MemberId);
  }, [memberId]);

  // useEffect(() => {
  //   const AlumniEducation = localStorage.getItem("isAlumniEducation");
  //   console.log("✌️AlumniEducation --->", AlumniEducation);

  //   AlumniEducation == true ||
  //     (AlumniEducation == "true" && router.push("/profile-experience"));
  // });

  useEffect(() => {
    if (memberId !== null) {
      getMemberSkills();
    }
  }, [memberId]);

  useEffect(() => {
    GetSkills();
    GetInstitute();
    GetLocation();
  }, []);

  const GetSkills = async () => {
    try {
      const res = await Models.job.skillList();
      const SkillsOption = res?.results?.map((skill) => ({
        value: skill.skill_id,
        label: skill.skill,
      }));
      setSkills(SkillsOption);
      setState({ hasSkillLoadMore: res?.next });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const GetInstitute = async () => {
    try {
      const res = await Models.masters.institutions();
      const dropdown = setDropdownData(res?.results, "title");
      setInstitute(dropdown);
      setState({
        hasInstitutionLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const GetLocation = async () => {
    try {
      const res = await Models.masters.locationList(1);
      const dropdown = setDropdownData(res?.results, "location");
      setLocation(dropdown);
      setState({
        hasLocationLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const getMemberSkills = async () => {
    try {
      const res = await Models.member.member_skills(memberId);
      setMemberSkills(res?.results);
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Set to checked for checkboxes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      skills: {
        required: true,
      },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);
    console.log("formData", formData);

    if (!isValid) return;
    const body = {
      skill_id: formData.skills.value,
      member_id: memberId,
    };

    console.log("body", body);

    try {
      const res = await axios.post(`${BaseURL}/create_member_skill/`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("res :", res);

      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      getMemberSkills();
    } catch (error) {
      if (error.response && error.response.data) {
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
      }
      // console.log("error :", error);
      // messageApi.open({
      //   type: "error",
      //   content: error.response.data.message,
      // });
    }
  };

  const handleEducationSubmit = async (e) => {
    e.preventDefault();
    console?.log("formDdata:", formData);

    handleSubmit(e)

    const validationRules = {
      institute: {
        required: true,
      },
      degree: {
        required: true,
      },
      start_year: {
        required: true,
      },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;
    const body = {
      member: memberId,
      institute: formData.institute.value,
      degree: formData.degree,
      location: formData.location.value,
      start_year: formData.start_year,
      end_year: formData.end_year,
      is_currently_pursuing: formData.is_currently_pursuing,
    };

    try {
      const res = await axios.post(
        `${BaseURL}/create_member_education/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      messageApi.open({
        type: "success",
        content: res.data.message,
      });

      setFormData({
        institute: "",
        degree: "",
        location: "",
        start_year: "",
        end_year: null,
        is_currently_pursuing: false,
      });

      router.push("/profile-experience");
    } catch (error) {
      console.log("error :", error);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  const skillListLoadMore = async () => {
    try {
      if (state.hasSkillLoadMore) {
        const res = await Models.job.skillList(state.currenSkillPage + 1);
        const SkillOption = res?.results?.map((skill) => ({
          value: skill.skill_id,
          label: skill.skill,
        }));

        setSkills([...skills, ...SkillOption]);

        setState({
          currenSkillPage: state.currenSkillPage + 1,
          hasSkillLoadMore: res.next,
        });
      } else {
        setInstitute(institute);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const institutionListLoadMore = async () => {
    try {
      if (state.hasInstitutionLoadMore) {
        const res = await Models.masters.institutions(
          state.currenInstitutionPage + 1
        );

        const InstitutionOption = setDropdownData(res?.results, "title");
        setInstitute([...institute, ...InstitutionOption]);

        setState({
          curreninstitutionPage: state.curreninstitutionPage + 1,
          hasinstitutionLoadMore: res.next,
        });
      } else {
        setInstitute(institute);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const locationListLoadMore = async () => {
    try {
      if (state.hasLocationLoadMore) {
        const res = await Models.job.locationList(state.currenLocationPage + 1);

        const LocationOption = setDropdownData(res?.results, "location");
        console.log("loadmore location res", res);

        setLocation([...location, ...LocationOption]);
        setState({
          currenlocationPage: state.currenlocationPage + 1,
          hasLocationLoadMore: res.next,
        });
      } else {
        setLocation(location);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const stepsData = [
    { label: "Profile Photo", icon: "feather-image", className: "active" },
    { label: "Educational Details", icon: "feather-book", className: "active" },
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
                                    className={`stepper-circle ${step.className ? "active" : ""
                                      }`}
                                  >
                                    <i className={`${step.icon}`}></i>
                                  </div>
                                  {index < stepsData.length - 1 && (
                                    <div
                                      className={`stepper-line ${step.className ? "completed" : ""
                                        }`}
                                    ></div>
                                  )}
                                </div>
                                <div className="stepper-content">
                                  <span
                                    className={`stepper-text ${step.className ? "active" : ""
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
                       <div className="section-title d-flex justify-content-between">
                          <h4 className="rbt-title-style-3 mb-0">
                            Highest Educational Details
                            <div
                              className="text-gray mt-2"
                              style={{ fontSize: "14px" }}
                            >
                              Please add details of your highest level of qualification. If you have already submitted the details earlier, please add second highest educational qualification details. <br /> <br />
                              You may <Link href={"/profile-experience"}>
                              skip this step if not applicable.
                              </Link> 
                            </div>
                          </h4>

                         
                        </div>
                      <div className="form-wrapper">
                        <div className=" contact-form-style-1 max-width-auto py-0 px-3">
                          <form
                            id="contact-form"
                            className="rainbow-dynamic-form max-width-auto"
                            onSubmit={(e) => handleEducationSubmit(e)}
                          >
                            {/* Left Column */}
                            <div className="form-grid">
                              <div className="">
                                <FormField
                                  type="loadMoreSelect"
                                  name="institute"
                                  label="Institute"
                                  onChange={(value) =>
                                    setFormData({
                                      ...formData,
                                      institute: value,
                                    })
                                  }
                                  value={formData.institute}
                                  options={institute}
                                  error={errMsg?.institute}
                                  required
                                  loadMore={() => institutionListLoadMore()}
                                />
                              </div>
                              <div className="">
                                <FormField
                                  type="text"
                                  name="degree"
                                  label="Degree"
                                  // className={"applicant-input"}
                                  onChange={handleChange}
                                  value={formData.degree}
                                  error={errMsg?.degree}
                                  required
                                />
                              </div>

                              <div className="">
                                <FormField
                                  type="text"
                                  name="start_year"
                                  label="Start Year"
                                  // className={"applicant-input"}
                                  onChange={handleChange}
                                  value={formData.start_year}
                                  error={errMsg?.start_year}
                                  required={true}
                                />
                              </div>


                              <div className="w-100 mt--50">
                                <input
                                  type="checkbox"
                                  name="is_currently_pursuing"
                                  onChange={handleChange}
                                  checked={
                                    formData?.is_currently_pursuing || false
                                  }
                                  id="currentlyPursuing"
                                />
                                <label
                                  htmlFor={`currentlyPursuing`}
                                  style={{
                                    marginRight: "5px",
                                    color: "black",
                                    marginTop: "2px",
                                  }}
                                >
                                  Currently Pursuing?
                                </label>
                              </div>




                              {formData?.is_currently_pursuing !== true && (
                                <div className="">
                                  <FormField
                                    type="text"
                                    name="end_year"
                                    label="End Year"
                                    // className={"applicant-input"}
                                    onChange={handleChange}
                                    value={formData.end_year}
                                    error={errMsg?.end_year}
                                  />
                                </div>
                              )}


                              <div className="">
                                <FormField
                                  type="loadMoreSelect"
                                  name="location"
                                  label="Location"
                                  // className={"applicant-input"}
                                  onChange={(value) =>
                                    setFormData({
                                      ...formData,
                                      location: value,
                                    })
                                  }
                                  value={formData.location}
                                  options={location}
                                  error={errMsg?.location}
                                  loadMore={() => locationListLoadMore()}
                                />
                              </div>


                            </div>

                            <div className="mt-4 
                            d-flex justify-content-center align-items-end gap-5 w-100">
                              <div  style={{ width: "100%" }}
                              // style={{ width: "250%" }}
                              >
                                <FormField
                                  label="Skills"
                                  name="skills"
                                  type="loadMoreSelect"
                                  // className="applicant-input"
                                  placeholder="Enter Skills"
                                  onChange={(value) =>
                                    setFormData({
                                      ...formData,
                                      skills: value,
                                    })
                                  }
                                  options={skills}
                                  value={formData.skills}
                                  // isMulti={true}
                                  required
                                  loadMore={() => skillListLoadMore()}
                                />



                              </div>
                              {/* <button
                                type="submit"
                                className="rbt-btn btn-md btn-gradient hover-icon-reverse "
                                style={{ cursor: "pointer", width: "100%" }}
                              >
                                Add Skills
                              </button> */}


                            </div>

                            <div className="jd-tags mt-3 mb-5 ">
                              {memberSkills?.map((item, index) => (

                                <span key={index} className="jd-tag">{item?.skill_name}</span>

                              )

                              )}
                            </div>

                            <div className="form-submit-group d-flex justify-content-between flex-wrap">
                              <div className="d-flex justify-content-between">
                                <Link
                                  name="submit"
                                  type="button"
                                  id="submit"
                                  href="/profile-photograph"
                                  className="rbt-btn btn-md btn-gradient hover-icon-reverse "
                                >
                                  <span className="icon-reverse-wrapper">
                                    <span className="btn-text">Back</span>
                                    <span className="btn-icon">
                                      <i className="feather-arrow-right"></i>
                                    </span>
                                    <span className="btn-icon">
                                      <i className="feather-arrow-left"></i>
                                    </span>
                                  </span>
                                </Link>
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
                                  href="/profile-experience"
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

export default ProfileEducationMain;
