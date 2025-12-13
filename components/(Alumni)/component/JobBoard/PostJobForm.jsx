"use client";

import React, { useEffect, useState, useRef } from "react";
import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Select } from "antd";
import Link from "next/link";
import { BaseURL } from "@/utils/BaseUrl";
import {
  setDropdownData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import FormField from "@/commonComponents/FormFields";
import { jobTypeOption, YearOfExperience } from "@/utils/constant.utils";
import axios from "axios";
import Models from "@/imports/models.import";
import Loader from "@/components/(Alumni)/Loader";

const PostJobForm = () => {
  const router = useRouter();
  const { Option } = Select;

  const [formData, setFormData] = useState({
    job_title: "",
    industry: "",
    contact_email: "",
    contact_link: "",
    role: "",
    experience_level_from: "",
    experience_level_to: "",
    location: "",
    skills: [],
    salary_package: "",
    dead_line: "",
    file: null,
    job_description: "",
    post_type: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [industry, setIndustry] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [location, setLocation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const [preview, setPreview] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const fileInputRef = useRef(null);
  const [token, setToken] = useState("");

  const [state, setState] = useSetState({
    currenBatchPage: 1,
    hasBatchLoadMore: null,
    currenCoursePage: 1,
    hasCourseLoadMore: null,
    currenRolePage: 1,
    hasRoleLoadMore: null,
    currenDepartmentPage: 1,
    hasDepartmentLoadMore: null,
    currenSkillPage: 1,
    hasSkillLoadMore: null,
    currenIndustryPage: 1,
    hasIndustryLoadMore: null,
    currenInstitutionPage: 1,
    hasInstitutionLoadMore: null,
    currenLocationPage: 1,
    hasLocationLoadMore: null,
    btnloading:false
  });

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    if (!Token) {
      router.push("/login");
    }
  }, []);

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const UserId = localStorage.getItem("user_id");
    setUserId(UserId);
  }, []);

  useEffect(() => {
    if (token) {
      GetDepartmentList();
      GetRoleList();
      GetLocationList();
      GetSkills();
    }
  }, [token]);

  const GetDepartmentList = async () => {
    try {
      const res = await Models.job.industryList();
      const dropdown = setDropdownData(res?.results, "title");
      setIndustry(dropdown);
      setState({
        hasIndustryLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const GetRoleList = async () => {
    try {
      const res = await Models.job.roleList();
      const dropdown = setDropdownData(res?.results, "role");
      setRoleList(dropdown);
      setState({
        hasRoleLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const GetLocationList = async () => {
    try {
      const res = await Models.job.locationList();
      const dropdown = setDropdownData(res?.results, "location");
      setLocation(dropdown);
      setState({
        hasLocationLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const GetSkills = async () => {
    try {
      const res = await Models.job.skillList();
      const dropdown = res?.results?.map((item) => ({
        value: item.skill_id,
        label: item.skill,
      }));
      setSkills(dropdown);
      setState({
        hasSkillLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setPreview(file.name);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSkillsChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: value,
    }));
    if (value.length === 0) {
      setErrMsg((prev) => ({
        ...prev,
        skills: "At least one skill must be selected",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        skills: undefined,
      }));
    }
  };

  const handleDeleteImage = () => {
    setPreview(null);
    setFormData((prevState) => ({
      ...prevState,
      file: null,
    }));
    setFileInputKey(Date.now());
  };

  const handleSubmit = async (e) => {

    setState({btnloading:true})
    e.preventDefault();

    const validationRules = {
      job_title: { required: true },
      industry: { required: true },
      contact_email: { required: true },
      // contact_link: { required: true },
      role: { required: true },
      skills: { required: true },
      experience_level_from: { required: true },
      experience_level_to: { required: true },
      location: { required: true },
      salary_package: { required: true },
      dead_line: { required: true },
      file: { required: true },
      job_description: { required: true },
      post_type: { required: true },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);

    if (!isValid) {
      console.log("Validation errors:", errMsg); // Log any validation errors
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "skills") {
        formData.skills.forEach(
          (skill) => formDataToSend.append("skills", skill.value) // Append each skill ID
        );
      }else if (key === "experience_level_from") {
        formDataToSend.append("experience_level_from", formData.experience_level_from.value);
      } else if (key === "industry") {
        formDataToSend.append("industry", formData.industry.value);
      } else if (key === "role") {
        formDataToSend.append("role", formData.role.value);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    axios
      .post(`${BaseURL}/create_job_post/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        router.push("/job-board/");
        setFormData({
          job_title: "",
          industry: "",
          contact_email: "",
          contact_link: "",
          role: "",
          skills: [],
          experience_level_from: "",
          experience_level_to: "",
          location: "",
          salary_package: "",
          dead_line: "",
          file: null,
          job_description: "",
          post_type: "",
        });
        setErrMsg({});
        setPreview(null);
        setFileInputKey(Date.now());
        setState({btnLoading:false})
      })
      .catch((error) => {
        console.log("❌error --->", error);
        setState({btnLoading:false})
      });
  };

  const JobOption = jobTypeOption.map((job) => ({
    value: job.value,
    label: job.label,
  }));

  const industryListLoadMore = async () => {
    try {
      if (state.hasIndustryLoadMore) {
        const res = await Models.job.industryList(state.currenIndustryPage + 1);

        const IndustryOption = setDropdownData(res?.results, "title");

        setIndustry([...industry, ...IndustryOption]);
        setState({
          currenIndustryPage: state.currenIndustryPage + 1,
          hasIndustryLoadMore: res.next,
        });
      } else {
        setIndustry(industry);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const roleListLoadMore = async () => {
    try {
      if (state.hasRoleLoadMore) {
        const res = await Models.job.roleList(state.currenRolePage + 1);
        const RoleOption = setDropdownData(res?.results, "role");

        setRoleList([...roleList, ...RoleOption]);
        setState({
          currenRolePage: state.currenRolePage + 1,
          hasRoleLoadMore: res.next,
        });
      } else {
        setRoleList(roleList);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const skillListLoadMore = async () => {
    try {
      if (state.hasSkillLoadMore) {
        const res = await Models.job.skillList(state.currenSkillPage + 1);
        const SkillOption = res?.results?.map((item) => ({
          value: item.skill_id,
          label: item.skill,
        }));
        setSkills([...skills, ...SkillOption]);
        setState({
          currenSkillPage: state.currenSkillPage + 1,
          hasSkillLoadMore: res.next,
        });
      } else {
        setSkills(skills);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  

  const experienceList = async () => {
    try {
      if (state.hasSkillLoadMore) {
        const res = await Models.job.skillList(state.currenSkillPage + 1);
        const SkillOption = res?.results?.map((item) => ({
          value: item.skill_id,
          label: item.skill,
        }));
        setSkills([...skills, ...SkillOption]);
        setState({
          currenSkillPage: state.currenSkillPage + 1,
          hasSkillLoadMore: res.next,
        });
      } else {
        setSkills(skills);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className={`rbt-contact-address `}>
      <div className="container section-pad">
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex justify-content-between ">
              <h5>Post a Job</h5>
              <Link
                className="rbt-btn btn-gradient radius-round sm-btn"
                href="/job-board"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="row justify-content-center job-form">
          <div className="col-lg-10">
            <div className="form-wrapper">
              <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                <form
                  id="contact-form"
                  method="POST"
                  action="mail.php"
                  className="rainbow-dynamic-form max-width-auto"
                  onSubmit={handleSubmit}
                >
                  <div className="form-grid">
                    {/* Left Column */}
                    <div className="form-group">
                      <FormField
                        placeholder="Job Title"
                        type="text"
                        name="job_title"
                        value={formData.job_title}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.job_title}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Contact Email"
                        type="email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.contact_email}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Apply Link"
                        type="text"
                        name="contact_link"
                        value={formData.contact_link}
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Industry"
                        type="loadMoreSelect"
                        className="form-dd"
                        name="industry"
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e })
                        }
                        error={errMsg.industry}
                        options={industry}
                        required={true}
                        loadMore={() => industryListLoadMore()}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Role"
                        type="loadMoreSelect"
                        className="form-dd"
                        name="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e })}
                        error={errMsg.role}
                        options={roleList}
                        required={true}
                        loadMore={() => roleListLoadMore()}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Skills"
                        type="loadMoreSelect"
                        className="form-dd"
                        name="skills"
                        value={formData.skills}
                        onChange={(e) => {
                          setFormData({ ...formData, skills: e });
                          console.log("skill after select", e);
                        }}
                        error={errMsg.skills}
                        options={skills}
                        required={true}
                        loadMore={() => skillListLoadMore()}
                        isMulti
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Experience From"
                        type="loadMoreSelect"
                        className="form-dd"
                        name="experience_level_from"
                        value={formData.experience_level_from}
                         onChange={(e) => {
                          setFormData({ ...formData, experience_level_from: e });
                          console.log("experience_level_from select", e);
                        }}
                        // onChange={(e) => handleChange(e)}
                        error={errMsg.experience_level_from}
                        required={true}
                        options={YearOfExperience}
                        
                        
                        
                      />
                      {/* <FormField
                        placeholder="Experience From"
                        type="select"
                        name="experience_level_from"
                        value={formData.experience_level_from}
                        onChange={(e) => handleChange(e)}
                        options={YearOfExperience}
                        error={errMsg.experience_level_from}
                        required={true}
                      /> */}
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Experience To"
                        type="select"
                        name="experience_level_to"
                        value={formData.experience_level_to}
                        onChange={(e) => handleChange(e)}
                        options={YearOfExperience}
                        error={errMsg.experience_level_to}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Salary"
                        type="text"
                        name="salary_package"
                        value={formData.salary_package}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.salary_package}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Location"
                        type="text"
                        className="form-dd"
                        name="location"
                        value={formData.location}
                        onChange={(e) => handleChange(e)}
                        // onChange={(e) => {
                        //   setFormData({ ...formData, location: e });
                        // }}
                        options={location}
                        required={true}
                        error={errMsg.location}
                        // loadMore={() => locationListLoadMore()}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="date"> Closed Date </label>
                      <FormField
                        id="date"
                        // placeholder="Closed Date"
                        type="date"
                        name="dead_line"
                        className="formdate pt-3"
                        value={formData.dead_line}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.dead_line}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="date"> Attached file </label>
                      <FormField
                        // placeholder="Attach File"
                        type="file"
                        name="file"
                        ref={fileInputRef}
                        key={fileInputKey}
                        error={errMsg.file}
                        className="formdate pt-3"
                        onChange={(e) => handleChange(e)}
                        accept="application/pdf"
                        required={true}
                      />
                      <span className="focus-border"></span>
                      {preview && (
                        <div
                          style={{
                            marginLeft: "10px",
                            width: "100px",
                            height: "80px",
                            position: "relative",
                          }}
                        >
                          {preview.endsWith(".pdf") ? (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ddd",
                              }}
                            >
                              <Link href={preview} target="_blank">
                                <FilePdfOutlined style={{ fontSize: "50px" }} />
                              </Link>
                            </div>
                          ) : (
                            <img
                              src={preview}
                              alt="preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <button
                            type="button"
                            onClick={handleDeleteImage}
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: "red",
                              fontSize: "20px",
                            }}
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Job Type"
                        type="select"
                        name="post_type"
                        value={formData.post_type}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.post_type}
                        options={JobOption}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>

                  <div className="form-group w-100">
                    <FormField
                      placeholder="Job Description"
                      type="textarea"
                      className="file-input"
                      name="job_description"
                      value={formData.job_description}
                      onChange={(e) => handleChange(e)}
                      error={errMsg.job_description}
                      required={true}
                    />
                  </div>

                  {/* Submit */}
                  <div className="form-submit-group">
                    <button
                      name="submit"
                      type="submit"
                      id="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                      style={{ cursor: state?.btnLoading ? "not-allowed" : "pointer" }}
                      disabled={state.btnLoading}
                    >
                      {state?.btnLoading ? (
                        <span className="btn-loader"></span>
                      ) : (
                        <span className="icon-reverse-wrapper">
                          <span className="btn-text">Submit</span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                        </span>
                      )}
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

export default PostJobForm;
