"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { message, Select } from "antd";
import Link from "next/link";
import {
  Dropdown,
  setDropdownData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import FormField from "@/commonComponents/FormFields";
import { BloodGroupChooice } from "@/utils/constant.utils";
import Models from "@/imports/models.import";

const CreateMemberForm = () => {
  const router = useRouter();

  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    batch: "",
    mobile_no: "",
    department: "",
    course: "",
    blood_group: "",
    gender: "",
    dob: "",
    email: "",
    name: "",
    register: "",
    salutation: "",
    member_type: "alumni",
    file: "",
  });
  const [errMsg, setErrMsg] = useState({});

  const [roleList, setRoleList] = useState([]);

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
    salutationList: [],
    departmentList: [],
    batchList: [],
    step: false,
  });

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    if (!Token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (token) {
      GetRoleList();
      getSalutation();
      getDepartments();
      getBatch();
    }
  }, [token]);

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

  const getDepartments = async () => {
    try {
      const res = await Models.masters.department();

      const DepartmentOption = res?.results?.map((cou) => ({
        value: cou.department_id,
        label: cou.full_name,
      }));

      setState({
        hasDepartmentLoadMore: res?.next,
        departmentList: DepartmentOption,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const getBatch = async () => {
    try {
      const res = await Models.masters.batch(1);
      const BatchOption = res?.results?.map((bat) => ({
        value: bat.batch_id,
        label: bat.title,
      }));
      setState({ hasBatchLoadMore: res?.next, batchList: BatchOption });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const getSalutation = async () => {
    try {
      const res = await Models.masters.salutation();
      const SalutationOption = res?.results?.map((sal) => ({
        value: sal.salutation_id,
        label: sal.salutation_name,
      }));
      setState({ salutationList: SalutationOption });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const departmentListLoadMore = async () => {
    try {
      if (state.hasDepartmentLoadMore) {
        const res = await Models.masters.department(
          state.currenDepartmentPage + 1
        );
        const DepartmentOption = res?.results?.map((bat) => ({
          value: bat.department_id,
          label: bat.full_name,
        }));
        setState({
          currenDepartmentPage: state.currenDepartmentPage + 1,
          hasDepartmentLoadMore: res.next,
          departmentList: [...state.departmentList, ...DepartmentOption],
        });
      } else {
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.step) {
      if (formData?.member_type == "faculty") {
        createFaculty();
      } else {
        createMember();
        console.log("hello");
      }
    } else {
      createMultipleMember();
    }
  };

  const createFaculty = async () => {
    try {
      let validationRules = {
        salutation: { required: true },
        name: { required: true },
        gender: { required: true },
        blood_group: { required: true },
        mobile_no: { required: true },
        email: { required: true },
        department: { required: true },
        dob: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) {
        return;
      }
      let body = {
        group_name: formData.member_type,
        salutation_id: formData.salutation,
        gender: formData.gender,
        dob: formData.dob,
        blood_group: formData.blood_group,
        mobile_no: formData.mobile_no,
        email: formData.email,
        name: formData.name,
        department_id: formData.department?.value,
      };

      const res = await Models.member.create_single_member(body);
      router.push("/users");
      message.success(res?.message);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const createMember = async () => {
    console.log("hello from createMember");
    try {
      let validationRules = {
        salutation: { required: true },
        name: { required: true },
        gender: { required: true },
        blood_group: { required: true },
        mobile_no: { required: true },
        email: { required: true },
        course: { required: true },
        batch: { required: true },
        register: { required: true },
        dob: { required: true },
      };

      const isValid = validateForm(formData, validationRules, setErrMsg);
      console.log("isValid result:", isValid);

      if (isValid) {
        console.log("form validation failed ❌");
        return;
      }

      let body = {
        group_name: formData.member_type,
        salutation_id: formData.salutation,
        gender: formData.gender,
        dob: formData.dob,
        blood_group: formData.blood_group,
        mobile_no: formData.mobile_no,
        email: formData.email,
        course_id: formData.course?.value,
        batch_id: formData.batch?.value,
        register_no: formData.register,
      };

      console.log("request body ✅:", body);

      const res = await Models.member.create_single_member(body);

      router.push("/users");
      message.success(res?.message);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const createMultipleMember = async () => {
    try {
      const validationRules = {
        file: { required: true },
        member_type: { required: true },
      };

      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) {
        return;
      }
      const formDatas = new FormData();
      formDatas.append("file", formData.file);
      formDatas.append("group_name", formData.member_type);

      const res = await Models.member.create_multiple_member(formDatas);
      if (res?.errors?.length > 0) {
        message.error(res?.errors[0]?.error);
      } else {
        router.push("/users");
        message.success(res?.message);
      }
    } catch (error) {
      console.log("✌️error --->", error);
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

  const batchListLoadMore = async () => {
    try {
      if (state.hasBatchLoadMore) {
        const res = await Models.masters.batch(state.currenBatchPage + 1);
        const BatchOption = res?.results?.map((bat) => ({
          value: bat.batch_id,
          label: bat.title,
        }));
        setState({
          currenBatchPage: state.currenBatchPage + 1,
          hasBatchLoadMore: res.next,
          batchList: [...state.batchList, ...BatchOption],
        });
      } else {
        setState({ batchList: state.batchList });
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
              <h5>Create {!state.step ? "Single" : "Multiple"} Member</h5>
              <div className="d-flex gap-4">
                <button
                  className="rbt-btn btn-gradient radius-round sm-btn"
                  onClick={() => setState({ step: !state.step })}
                >
                  Create {state.step ? "Single" : "Multiple"} Member
                </button>
                <Link
                  className="rbt-btn btn-gradient radius-round sm-btn"
                  href="/users"
                >
                  Back
                </Link>
              </div>
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
                  {!state.step ? (
                    <div className="form-grid">
                      <div className="form-group">
                        <FormField
                          placeholder="Member Type"
                          type="select"
                          name="member_type"
                          value={formData.member_type}
                          onChange={(e) => handleChange(e)}
                          options={[
                            {
                              label: "Faculty",
                              value: "faculty",
                            },
                            {
                              label: "Alumni",
                              value: "alumni",
                            },
                          ]}
                          error={errMsg.member_type}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>

                      <div className="form-group">
                        <FormField
                          placeholder="Salutation"
                          type="select"
                          name="salutation"
                          value={formData.salutation}
                          onChange={(e) => handleChange(e)}
                          options={state.salutationList}
                          error={errMsg.salutation}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>
                      {formData?.member_type == "alumni" ? (
                        <div className="form-group">
                          <FormField
                            placeholder="Register Number"
                            type="text"
                            name="register"
                            value={formData.register}
                            onChange={(e) => handleChange(e)}
                            error={errMsg.register}
                            required={true}
                          />
                          <span className="focus-border"></span>
                        </div>
                      ) : (
                        <div className="form-group">
                          <FormField
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            error={errMsg.name}
                            required={true}
                          />
                          <span className="focus-border"></span>
                        </div>
                      )}
                      <div className="form-group">
                        <FormField
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleChange(e)}
                          error={errMsg.email}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>
                      <div className="form-group">
                        <FormField
                          placeholder="DOB"
                          type="date"
                          name="dob"
                          className="file-input"
                          value={formData.dob}
                          onChange={(e) => handleChange(e)}
                          error={errMsg.dob}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>

                      <div className="form-group">
                        <FormField
                          placeholder="Gender"
                          type="select"
                          name="gender"
                          value={formData.gender}
                          onChange={(e) => handleChange(e)}
                          options={[
                            { value: "M", label: "Male" },
                            { value: "F", label: "Female" },
                            { value: "O", label: "Others" },
                          ]}
                          error={errMsg.gender}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>

                      <div className="form-group">
                        <FormField
                          placeholder="Blood Group"
                          type="select"
                          name="blood_group"
                          value={formData.blood_group}
                          onChange={(e) => handleChange(e)}
                          options={Dropdown(BloodGroupChooice, "name")}
                          error={errMsg.blood_group}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>
                      {formData?.member_type == "alumni" ? (
                        <div className="form-group">
                          <FormField
                            placeholder="Course"
                            type="loadMoreSelect"
                            className="form-dd"
                            name="course"
                            value={formData.course}
                            onChange={(e) =>
                              setFormData({ ...formData, course: e })
                            }
                            error={errMsg.course}
                            options={roleList}
                            required={true}
                            loadMore={() => roleListLoadMore()}
                          />
                          <span className="focus-border"></span>
                        </div>
                      ) : (
                        <div className="form-group">
                          <FormField
                            placeholder="Department"
                            type="loadMoreSelect"
                            className="form-dd"
                            name="department"
                            value={formData.department}
                            onChange={(e) =>
                              setFormData({ ...formData, department: e })
                            }
                            error={errMsg.department}
                            options={state.departmentList}
                            required={true}
                            loadMore={() => departmentListLoadMore()}
                          />

                          <span className="focus-border"></span>
                        </div>
                      )}
                      <div className="form-group">
                        <FormField
                          placeholder="Mobile Number"
                          type="number"
                          name="mobile_no"
                          value={formData.mobile_no}
                          onChange={(e) => handleChange(e)}
                          error={errMsg.mobile_no}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>
                      {formData?.member_type == "alumni" && (
                        <div className="form-group">
                          <FormField
                            placeholder="Batch"
                            type="loadMoreSelect"
                            className="form-dd"
                            name="batch"
                            value={formData.batch}
                            onChange={(e) =>
                              setFormData({ ...formData, batch: e })
                            }
                            error={errMsg.batch}
                            options={state.batchList}
                            required={true}
                            loadMore={() => batchListLoadMore()}
                          />
                          <span className="focus-border"></span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="form-grid">
                      <div className="form-group">
                        <FormField
                          placeholder="Member Type"
                          type="select"
                          name="member_type"
                          value={formData.member_type}
                          onChange={(e) => handleChange(e)}
                          options={[
                            {
                              label: "Faculty",
                              value: "faculty",
                            },
                            {
                              label: "Alumni",
                              value: "alumni",
                            },
                          ]}
                          error={errMsg.member_type}
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>
                      <div className="form-group">
                        <FormField
                          // placeholder="Attach File"
                          type="file"
                          name="file"
                          ref={fileInputRef}
                          key={fileInputKey}
                          error={errMsg.file}
                          className="file-input"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              file: e.target.files[0],
                            })
                          }
                          accept=".xls,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          required={true}
                        />
                        <span className="focus-border"></span>
                      </div>
                    </div>
                  )}
                  <div className="form-submit-group d-flex justify-content-end">
                    <button
                      name="submit"
                      type="submit"
                      id="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse "
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

export default CreateMemberForm;
