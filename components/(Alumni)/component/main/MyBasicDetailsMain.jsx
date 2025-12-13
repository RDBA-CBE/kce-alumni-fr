import Link from "next/link";
import React, { useEffect, useState } from "react";
import AccountInfo from "../../../../data/myAccount.json";
import MyAccount from "../../../My-Account/MyAccount";
import FormField from "@/commonComponents/FormFields";
import { useRouter } from "next/navigation";
import { useSetState, validateForm } from "@/utils/commonFunction.utils";
import { message } from "antd";
import { BloodGroupChooice } from "@/utils/constant.utils";
import Models from "@/imports/models.import";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Loader from "../../Loader";

const MyBasicDetailsMain = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(4);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  const [isOpen, setOpen] = useState(false);
  const [isActive, setIsActive] = useState({
    status: false,
    key: 1,
  });
  const [formData, setFormData] = useState({
    salutation: "",
    dob: "",
    gender: "",
    blood_group: "",
    mobile_no: "",
    batch: "",
    course: "",
    about_me: "",
  });
  const [memberId, setMemberId] = useState("");
  const [course, setCourse] = useState([]);
  const [salutation, setSalutation] = useState([]);
  const [batch, setBatch] = useState([]);

  const [state, setState] = useSetState({
    currenBatchPage: 1,
    hasBatchLoadMore: null,
    currenCoursePage: 1,
    hasCourseLoadMore: null,
    pageLoading: false,
    btnLoading:false,
  });

  useEffect(() => {
    getCourse();
    getSalutation();
    getBatch();
  }, []);

  useEffect(() => {
    const MEMBERID = localStorage.getItem("member_id");
    setMemberId(MEMBERID);

    const Admin = localStorage.getItem("isAdmin");
    console.log("✌️Admin --->", Admin);
    Admin == true || (Admin == "true" && router.push("/users"));
  }, []);

  useEffect(() => {
    if (memberId) {
      GetMemberData();
    }
  }, [memberId]);

  const getSalutation = async () => {
    setState({ pageLoading: true });
    try {
      const res = await Models.masters.salutation();
      const SalutationOption = res?.results?.map((sal) => ({
        value: sal.salutation_id,
        label: sal.salutation_name,
      }));
      setState({ pageLoading: false });
      setSalutation(SalutationOption);
    } catch (error) {
      console.log("✌️error --->", error);
      setState({ pageLoading: false });
    }
  };

  const getCourse = async () => {
    setState({ pageLoading: true });
    try {
      const res = await Models.masters.course();
      const CourseOption = res?.results?.map((cou) => ({
        value: cou.course_id,
        label: cou.title,
      }));
      setCourse(CourseOption);
      setState({ hasCourseLoadMore: res?.next, pageLoading: false });
    } catch (error) {
      console.log("✌️error --->", error);
      setState({ pageLoading: false });
    }
  };

  const getBatch = async () => {
    setState({ pageLoading: true });
    try {
      const res = await Models.masters.batch();
      const BatchOption = res?.results?.map((bat) => ({
        value: bat.batch_id,
        label: bat.title,
      }));
      setBatch(BatchOption);
      setState({ hasBatchLoadMore: res?.next, pageLoading: false });
    } catch (error) {
      console.log("✌️error --->", error);
      setState({ pageLoading: false });
    }
  };

  const GetMemberData = async () => {
    setState({ pageLoading: true });
    try {
      const response = await Models.member.memberData(memberId);
      const res = response?.member_data;
      setFormData({
        salutation: res.salutation || "",
        dob: res.dob || "",
        gender: res.gender || "",
        blood_group: res.blood_group || "",
        mobile_no: res.mobile_no || "",
        batch:
          { value: res.batch_detail.id, label: res.batch_detail.title } || "",
        course:
          { value: res.course_detail.id, label: res.course_detail.title } || "",
        about_me: res.about_me || "",
      });
      setState({ pageLoading: false });
    } catch (error) {
      console.log("✌️error --->", error);
      setState({ pageLoading: false });
    }
  };

  console.log("formdata", formData);

  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  //

  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const success = (success) => {
    messageApi.open({
      type: "success",
      content: success || "Successfully Registered",
    });
  };
  const errorNotification = (error) => {
    messageApi.open({
      type: "error",
      content: error || "An error occurred. Please try again.",
    });
  };
  const handleSubmit = (e) => {
    
    e.preventDefault();
    

    const validationRules = {
      salutation: { required: true },
      dob: { required: false },
      gender: { required: true },
      blood_group: { required: false },
      mobile_no: { required: false },
      batch: { required: false },
      course: { required: false },
      about_me: { required: false },
    };
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    const body = {
      salutation: formData.salutation,
      dob: formData.dob,
      gender: formData.gender,
      blood_group: formData.blood_group,
      mobile_no: formData.mobile_no,
      batch: formData.batch.value,
      course: formData.course.value,
      about_me: formData.about_me,
    };
    console.log("body:", body);

    setState({btnLoading:true})

    axios
      .post(`${BaseURL}/member_data/${memberId}/`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        success(res?.data?.message);
        console.log("response:", res.data);
        setFormData({
          salutation: "",
          dob: "",
          gender: "",
          blood_group: "",
          mobile_no: "",
          batch: "",
          course: "",
          about_me: "",
        });
        setState({btnLoading:false})
      })
      .catch((error) => {
        errorNotification(error?.response?.data?.error);
        console.log("error:", error?.response?.data?.error);
        setState({btnLoading:false})
      });
  };

  const BloodGroupOption = BloodGroupChooice.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const batchListLoadMore = async () => {
    try {
      if (state.hasBatchLoadMore) {
        const res = await Models.masters.batch(state.currenBatchPage + 1);
        const BatchOption = res?.results?.map((bat) => ({
          value: bat.batch_id,
          label: bat.title,
        }));
        setBatch([...batch, ...BatchOption]);
        setState({
          currenBatchPage: state.currenBatchPage + 1,
          hasBatchLoadMore: res.next,
        });
      } else {
        setBatch(batch);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const courseListLoadMore = async () => {
    try {
      if (state.hasCourseLoadMore) {
        const res = await Models.masters.course(state.currenCoursePage + 1);
        const CourseOption = res?.results?.map((cou) => ({
          value: cou.course_id,
          label: cou.title,
        }));
        setCourse([...course, ...CourseOption]);
        setState({
          currenCoursePage: state.currenCoursePage + 1,
          hasCourseLoadMore: res.next,
        });
      } else {
        setCourse(course);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="my-account-section bg-color-white section-pad">
      {state.pageLoading ? (
        <Loader /> // 👈 show loader
      ) : (
        <>
          {contextHolder}

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row g-5">
                  <div className="col-lg-3 col-12">
                    <div
                      className="rbt-my-account-tab-button nav"
                      role="tablist"
                    >
                      <Link href="edit-basic-profile" className="active">
                        Basic Details
                      </Link>
                      <Link href="edit-profile-picture">Profile Picture</Link>
                      <Link href="edit-profile-education">Education</Link>
                      <Link href="edit-profile-skills">Skills</Link>

                      <Link href="edit-profile-experience">Experience</Link>
                      <Link href="edit-profile-contact">Contact</Link>
                      <Link href="edit-milestone">Milestone</Link>
                    </div>
                  </div>
                  <div className="col-lg-9 col-12">
                    <div className="rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box">
                      <div className="container">
                        <div className="row row--15 gy-5">
                          <div className="section-title">
                            <h4 className="rbt-title-style-3 mb-0">
                              Basic Details
                              <div
                                className="text-gray mt-2"
                                style={{ fontSize: "14px" }}
                              >
                                Please update profile details here
                              </div>
                            </h4>
                          </div>
                          <div className="form-wrapper">
                            <div className=" contact-form-style-1 max-width-auto py-0 px-3">
                              <form
                                id="contact-form"
                                className="rainbow-dynamic-form max-width-auto"
                                onSubmit={(e) => handleSubmit(e)}
                              >
                                <div className="form-grid">
                                  {/* Left Column */}
                                  <div className="">
                                    <FormField
                                      label="Salutation"
                                      type="select"
                                      name="salutation"
                                      value={formData.salutation}
                                      onChange={handleChange}
                                      error={errMsg.salutation}
                                      // className="applicant-input"
                                      options={salutation}
                                      required={true}
                                    />
                                    <span className="focus-border"></span>
                                  </div>

                                  <div className="">
                                    <FormField
                                      label="Date of Birth"
                                      type="date"
                                      name="dob"
                                      value={formData.dob}
                                      onChange={handleChange}
                                      error={errMsg.dob}
                                      // className="applicant-input"
                                      required={false}
                                    />
                                    <span className="focus-border"></span>
                                  </div>

                                  <div className="">
                                    <FormField
                                      label="Blood Group"
                                      type="select"
                                      name="blood_group"
                                      value={formData.blood_group}
                                      onChange={handleChange}
                                      error={errMsg.blood_group}
                                      // className="applicant-input"
                                      required={false}
                                      options={BloodGroupOption}
                                    />
                                    <span className="focus-border"></span>
                                  </div>

                                  <div className="">
                                    <FormField
                                      label="Mobile Number"
                                      type="tel"
                                      name="mobile_no"
                                      value={formData.mobile_no}
                                      onChange={handleChange}
                                      error={errMsg.mobile_no}
                                      // className="applicant-input"
                                      required={false}
                                    />
                                    <span className="focus-border"></span>
                                  </div>

                                  <div className="">
                                    <FormField
                                      label="Batch"
                                      type="loadMoreSelect"
                                      name="batch"
                                      value={formData.batch}
                                      onChange={(value) =>
                                        setFormData({
                                          ...formData,
                                          batch: value,
                                        })
                                      }
                                      error={errMsg.batch}
                                      // className="applicant-input"
                                      options={batch}
                                      required={false}
                                      loadMore={() => batchListLoadMore()}
                                    />
                                    <span className="focus-border"></span>
                                  </div>

                                  <div className="">
                                    <FormField
                                      label="Course"
                                      type="loadMoreSelect"
                                      name="course"
                                      value={formData.course}
                                      onChange={(value) =>
                                        setFormData({
                                          ...formData,
                                          course: value,
                                        })
                                      }
                                      error={errMsg.course}
                                      options={course}
                                      required={false}
                                      loadMore={() => courseListLoadMore()}
                                    />
                                    <span className="focus-border"></span>
                                  </div>

                                  {/* Submit */}
                                </div>

                                <div className="w-100 mt-4">
                                  <FormField
                                    label="Gender"
                                    type="radio"
                                    name="gender" // Changed from "department" to "gender" to match the label
                                    value={formData.gender} // Assuming you have a gender field in your formData
                                    onChange={handleChange}
                                    error={errMsg.gender} // Assuming you have a gender field in your errMsg
                                    options={[
                                      // Add this options prop
                                      { value: "M", label: "Male" },
                                      { value: "F", label: "Female" },
                                      { value: "O", label: "Others" },
                                    ]}
                                    required={true}
                                  />
                                  <span className="focus-border"></span>
                                </div>

                                <div className="w-100 mt-4">
                                  <FormField
                                    label="About Me"
                                    type="textarea"
                                    name="about_me"
                                    value={formData.about_me}
                                    onChange={handleChange}
                                    error={errMsg.about_me}
                                    // className="applicant-input"
                                    required={false}
                                    style={{
                                      height: "150px",
                                    }}

                                    // options={roleOption}
                                  />
                                  <span className="focus-border"></span>
                                </div>

                                <div className="form-submit-group">
                                  <button
                                    name="submit"
                                    type="submit"
                                    id="submit"
                                    disabled={state.btnLoading}
                                    className={`rbt-btn btn-md btn-gradient hover-icon-reverse w-100 ${
                                      state.btnLoading ? "loading" : ""
                                    }`}
                                  >
                                    {state.btnLoading ? (
                                      <span className="btn-loader"></span>
                                    ) : (
                                      <span className="icon-reverse-wrapper">
                                        <span className="btn-text">
                                          Update Profile
                                        </span>
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBasicDetailsMain;
