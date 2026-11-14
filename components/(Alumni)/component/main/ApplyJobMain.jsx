import FormField from "@/commonComponents/FormFields";
import Models from "@/imports/models.import";
import { BaseURL } from "@/utils/BaseUrl";
import {
  setDropdownData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import { YearOfExperience } from "@/utils/constant.utils";
import { message, Select } from "antd";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const hasOthersOption = (selection) =>
  (Array.isArray(selection) ? selection : [selection]).some(
    (option) => option?.label?.trim().toLowerCase() === "others"
  );

const ApplyJobMain = () => {
  const { id } = useParams();
  const router = useRouter();
  const { Option } = Select;

  const [SingleData, setSingleData] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [industry, setIndustry] = useState([]);
  const [errMsg, setErrMsg] = useState({});
  const [token, setToken] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    SingleDatas(id);
  }, [id]);

  const [state, setState] = useSetState({
    currenRolePage: 1,
    hasRoleLoadMore: null,
    currenIndustryPage: 1,
    hasIndustryLoadMore: null,
    currenSkillPage: 1,
    hasSkillLoadMore: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      GetDepartmentList();
      GetRoleList();
      GetSkills();
    }
  }, [token]);
  const SingleDatas = (id) => {
    axios
      .get(`${BaseURL}/detail_job_post/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const [formData, setFormData] = useState({
    full_name: "",
    total_years_of_experience: "",
    email: "",
    mobile_number: "",
    current_industry: "",
    other_industry: "",
    current_role: "",
    other_role: "",
    resume: null,
    notes_to_recruiter: "",
    skills: [],
    other_skill: "",
  });

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

  const GetSkills = async () => {
    try {
      const res = await Models.job.skillList();
      const dropdown = res?.results?.map((item) => ({
        value: item?.skill_id,
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
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

  const success = (successMsg) => {
    messageApi.open({
      type: "success",
      content:
        successMsg || "Success! Check your email for further instructions.",
    });
  };

  const errorNotification = (error) => {
    messageApi.open({
      type: "error",
      content: error || "An error occurred. Please try again.",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      full_name: { required: true },
      total_years_of_experience: { required: true },
      email: { required: true, email: true },
      mobile_number: { required: true },
      current_industry: { required: true },
      current_role: { required: true },
      resume: { required: true },
      notes_to_recruiter: { required: true },
      skills: { required: true },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);

    if (!isValid) return;
    const otherFieldErrors = {};
    if (
      hasOthersOption(formData.current_industry) &&
      !formData.other_industry.trim()
    ) {
      otherFieldErrors.other_industry = "Enter This Field";
    }
    if (hasOthersOption(formData.current_role) && !formData.other_role.trim()) {
      otherFieldErrors.other_role = "Enter This Field";
    }
    if (hasOthersOption(formData.skills) && !formData.other_skill.trim()) {
      otherFieldErrors.other_skill = "Enter This Field";
    }
    if (Object.keys(otherFieldErrors).length) {
      setErrMsg((prev) => ({ ...prev, ...otherFieldErrors }));
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("full_name", formData.full_name);
    formDataToSubmit.append(
      "total_years_of_experience",
      formData.total_years_of_experience
    );
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("mobile_number", formData.mobile_number);
    formDataToSubmit.append(
      "current_industry",
      formData.current_industry.value
    );
    formDataToSubmit.append("current_role", formData.current_role.value);
    if (hasOthersOption(formData.current_industry)) {
      formDataToSubmit.append("other_industry", formData.other_industry);
    }
    if (hasOthersOption(formData.current_role)) {
      formDataToSubmit.append("other_role", formData.other_role);
    }
    formDataToSubmit.append("resume", formData.resume); // File is appended here
    formDataToSubmit.append("notes_to_recruiter", formData.notes_to_recruiter);
    formData.skills.forEach((skillId) => {
      formDataToSubmit.append("skills", skillId.value); // Using 'skills[]' to indicate an array
    });
    if (hasOthersOption(formData.skills)) {
      formDataToSubmit.append("other_skill", formData.other_skill);
    }
    formDataToSubmit.append("job_post", id);

    console.log("formDataToSubmit", formDataToSubmit);

    axios
      .post(`${BaseURL}/create_application/${id}/`, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        success(res?.data?.message);
        localStorage.setItem(
          "email_verification_code",
          res.data.verification_code
        );
        setTimeout(() => {
          router.push("/job-board");
        }, 500);

        console.log("✅response --->", res);
        setFormData({
          full_name: "",
          total_years_of_experience: "",
          email: "",
          mobile_number: "",
          current_industry: "",
          other_industry: "",
          current_role: "",
          other_role: "",
          resume: null,
          notes_to_recruiter: "",
          skills: [],
          other_skill: "",
        });
        setErrMsg({});
      })
      .catch((error) => {
        console.log("❌error --->", error);
        errorNotification(error.response.data.error);
      });

    console.log("Form submitted:", formData);
  };

  const roleListLoadMore = async () => {
    try {
      if (state.hasRoleLoadMore) {
        const res = await Models.job.roleList(state.currenRolePage + 1);
        // const IndustryOption = res?.results?.map((item) => ({
        //   value: item.skill_id,
        //   label: item.skill,
        // }));
        const RoleOption = setDropdownData(res?.results, "role");

        console.log("roleList", roleList);

        console.log("RoleOption", RoleOption);

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
        // const SkillOption = setDropdownData(res?.results, "skill");

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

  return (
    <div className={`rbt-contact-address `}>
      {contextHolder}
      <div className="container section-pad">
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex justify-content-between ">
              <h5>Job Application</h5>

              <Link
                className="rbt-btn btn-gradient radius-round sm-btn"
                href={`/job-details/${id}`}
              >
                Back
              </Link>
            </div>
            <div>
              <p>
                You Are now applying to{" "}
                <b
                  style={{
                   
                    textTransform: "capitalize",
                  }}
                >
                  {SingleData.job_title}
                </b>{" "}
                Job
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
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
                        placeholder="Full Name"
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.full_name}
                        // className="applicant-input"
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.email}
                        // className="applicant-input"
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Phone"
                        type="tel"
                        name="mobile_number"
                        pattern="\d{10}" // Only allows exactly 10 digits
                        maxLength="10" // Limits input to 10 characters
                        value={formData.mobile_number}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.mobile_number}
                        // className="applicant-input"
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Total Years Of Experience"
                        type="select"
                        name="total_years_of_experience"
                        value={formData.total_years_of_experience}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.total_years_of_experience}
                        // className="applicant-input"
                        options={YearOfExperience}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Current Industry"
                        type="loadMoreSelect"
                        className="form-dd"
                        name="current_industry"
                        value={formData.current_industry}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            current_industry: e,
                            other_industry: hasOthersOption(e)
                              ? prev.other_industry
                              : "",
                          }));
                        }}
                        error={errMsg.current_industry}
                        othersValue={formData.other_industry}
                        onOthersChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            other_industry: value,
                          }));
                          if (value)
                            setErrMsg((prev) => ({
                              ...prev,
                              other_industry: "",
                            }));
                        }}
                        othersError={errMsg.other_industry}
                        options={industry}
                        loadMore={() => industryListLoadMore()}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Current Role"
                        type="loadMoreSelect"
                        name="current_role"
                        value={formData.current_role}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            current_role: e,
                            other_role: hasOthersOption(e) ? prev.other_role : "",
                          }));
                        }}
                        error={errMsg.current_role}
                        othersValue={formData.other_role}
                        onOthersChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            other_role: value,
                          }));
                          if (value)
                            setErrMsg((prev) => ({ ...prev, other_role: "" }));
                        }}
                        othersError={errMsg.other_role}
                        className="form-dd"
                        options={roleList}
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
                          setFormData((prev) => ({
                            ...prev,
                            skills: e,
                            other_skill: hasOthersOption(e) ? prev.other_skill : "",
                          }));
                          console.log("skill after select", e);
                        }}
                        error={errMsg.skills}
                        othersValue={formData.other_skill}
                        onOthersChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            other_skill: value,
                          }));
                          if (value)
                            setErrMsg((prev) => ({ ...prev, other_skill: "" }));
                        }}
                        othersError={errMsg.other_skill}
                        options={skills}
                        required={true}
                        loadMore={() => skillListLoadMore()}
                        isMulti
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Resume"
                        type="file"
                        className="file-input"
                        name="resume"
                        onChange={(e) => handleChange(e)}
                        error={errMsg.resume}
                        accept=".pdf,.docx" // Restrict file types
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <FormField
                      placeholder="Notes to Recruiter"
                      type="textarea"
                      name="notes_to_recruiter"
                      value={formData.notes_to_recruiter}
                      onChange={(e) => handleChange(e)}
                      error={errMsg.notes_to_recruiter}
                    />

                    <span className="focus-border"></span>
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

export default ApplyJobMain;
