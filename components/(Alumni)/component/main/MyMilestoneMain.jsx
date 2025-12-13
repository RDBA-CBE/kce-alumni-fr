import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AccountInfo from "../../../../data/myAccount.json";
import MyAccount from "../../../My-Account/MyAccount";
import FormField from "@/commonComponents/FormFields";
import { useRouter } from "next/navigation";
import {
  setDropdownData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import { message, Modal } from "antd";
import { BloodGroupChooice } from "@/utils/constant.utils";
import Models from "@/imports/models.import";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Loader from '../../Loader';

const MyMilestoneMain = () => {
  const { confirm } = Modal;
  const [activeIndex, setActiveIndex] = useState(4);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState({
    status: false,
    key: 1,
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
  });
  const [memberId, setMemberId] = useState("");
  const [getMemberEducation, setMemberEducation] = useState([]);
  const [state, setState] = useSetState({
      pageLoading: false,
      btnLoading: false,
  });

  const router = useRouter();

  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const MEMBERID = localStorage.getItem("member_id");
    setMemberId(MEMBERID);

    const Admin = localStorage.getItem("isAdmin");
    console.log("Admin --->", Admin);
    Admin == true || (Admin == "true" && router.push("/users"));
  }, []);

  useEffect(() => {
    if (memberId) {
      GetMemberEducation();
    }
  }, [memberId]);
  

  const GetMemberEducation = async () => {
    setState({
      pageLoading: true,
    });
    try {
      const res = await Models.masters.milestone(memberId);
      setMemberEducation(res?.results);
      setState({
      pageLoading: false,
    });
    } catch (error) {
      console.log("✌️error --->", error);
      setState({
      pageLoading: false,
    });
    }
  };

  const UpdateMemberGetEducation = (department) => {
    axios
      .get(`${BaseURL}/milestones/${department?.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("response:", response.data);
        // setFormData(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  //

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Set to checked for checkboxes
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
  const handleEducationSubmit = async (e) => {
    e.preventDefault();
    console?.log("formDdata:", formData);

    const validationRules = {
      title: {
        required: true,
      },
      // description: {
      //     required: true
      // },
      year: {
        required: true,
      },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    const body = {
      member: memberId,
      title: formData.title,
      description: formData.description,
      year: formData.year,
    };

    // Conditionally add end_year if not currently pursuing
    // if (!formData.is_currently_pursuing) {
    //     body.end_year = formData.end_year;
    // }

    if (isEditing) {
      try {
        setState({ btnLoading: true });
        const res = await axios.patch(
          `${BaseURL}/milestones/${formData.id}/`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setState({ btnLoading: false });

        messageApi.open({
          type: "success",
          content: "Milestone updated successfully",
          // content: res.data.message,
        });

        setIsModalOpen(false);

        GetMemberEducation();

        setFormData({
          title: "",
          description: "",
          year: "",
        });

        // router.push("/profile-photograph");
      } catch (error) {
        console.log("error :", error);
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
        setState({ btnLoading: false });
      }
    } else {
      try {
        const res = await axios.post(`${BaseURL}/milestones/`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        messageApi.open({
          type: "success",
          content: "milestone created successfully",

          // content: res.data.message,
        });

        setIsModalOpen(false);

        GetMemberEducation();

        setFormData({
          title: "",
          description: "",
          year: "",
        });

        // router.push("/profile-photograph");
      } catch (error) {
        console.log("error :", error);
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({
      title: "",
      description: "",
      year: "",
    });
  };

  const showModal = () => {
    setFormData({
      title: "",
      description: "",
      year: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const editDepartment = (department) => () => {
    setIsEditing(true);
    setIsModalOpen(true);
    if (memberId) {
      UpdateMemberGetEducation(department);
    }
  };

  const showDeleteConfirm = (department) => {
    console.log("✌️department --->", department);

    confirm({
      title: "delete this Milestone?",
      content: "Are you sure you want to delete this Milestone?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        axios
          .delete(`${BaseURL}/milestones/${department.id}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log("✌️response --->", response);
            message.success(
              response.data.message || "Successfully Deleted Milestone"
            );
            GetMemberEducation();
          })
          .catch((error) => {
            console.log("❌error --->", error);
            message.error(
              error.response?.data?.error ||
                "An error occurred. Please try again."
            );
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return state.pageLoading ? (
    <Loader /> // 👈 show loader
  ) : (
    <>
      {contextHolder}

      <div className="my-account-section bg-color-white section-pad">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row g-5">
                <div className="col-lg-3 col-12">
                  <div className="rbt-my-account-tab-button nav" role="tablist">
                    <Link href="edit-basic-profile">Basic Details</Link>
                    <Link href="edit-profile-picture">Profile Picture</Link>
                    <Link href="edit-profile-education">Education</Link>
                    <Link href="edit-profile-skills">Skills</Link>

                    <Link href="edit-profile-experience">Experience</Link>
                    <Link href="edit-profile-contact">Contact</Link>
                    <Link href="edit-milestone" className="active">
                      Milestone
                    </Link>
                  </div>
                </div>
                <div className="col-lg-9 col-12">
                  <div className="rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box">
                    <div className="container">
                      <div className="row row--15 gy-5">
                        <div className="section-title d-flex justify-content-between">
                          <h4 className="rbt-title-style-3 mb-0">
                            Milestone
                            <div
                              className="text-gray mt-2"
                              style={{ fontSize: "14px" }}
                            >
                              Please update milestone details here
                            </div>
                          </h4>

                          <div className="rbt-button-group align-items-start">
                            <div
                              className="rbt-btn btn-xs  radius-round"
                              title="Add Skill"
                              onClick={showModal}
                            >
                              <i className="feather-plus pl--0"></i>
                            </div>
                          </div>
                        </div>

                        <div className="form-wrapper">
                          <div className=" contact-form-style-1 max-width-auto py-0 px-3">
                            <div
                              id="contact-form"
                              className="rainbow-dynamic-form max-width-auto"
                              onSubmit={(e) => handleSubmit(e)}
                            >
                              {getMemberEducation?.length > 0 ? (
                                <div className=" ">
                                  <div className="sidebar-widget category-widget">
                                    <div className="widget-content">
                                      {getMemberEducation?.map((edu, index) => (
                                        <div
                                          className="py-3 px-5 bg-liblue mb-3  rounded-3"
                                          key={index}
                                          style={{ position: "relative" }}
                                        >
                                          <h6 className="mb-2">
                                            <Link
                                              href="#"
                                              style={{
                                                textTransform: "capitalize",
                                               color: '#000',
                                              }}
                                            >
                                              {edu?.title}
                                            </Link>
                                          </h6>

                                          {edu?.year && (
                                            <div
                                              style={{
                                               color: '#000',
                                                fontSize: "14px",
                                              }}
                                            >
                                              {edu?.year}
                                            </div>
                                          )}

                                          {edu?.description && (
                                            <div
                                              style={{
                                               color: '#000',
                                                fontSize: "14px",
                                              }}
                                            >
                                              {edu?.description}
                                            </div>
                                          )}

                                          <div
                                            className="rbt-button-group"
                                            style={{
                                              position: "absolute",
                                              top: "8px",
                                              right: "15px",
                                              zIndex: "10",
                                            }}
                                          >
                                            <button
                                              className="rbt-btn bg-white btn-xs  radius-round eve-edit"
                                              onClick={editDepartment(edu)}
                                              title="Edit"
                                            >
                                              <i
                                                className="feather-edit pl--0 text-white "
                                                style={{ fontSize: "14px" }}
                                              ></i>
                                            </button>
                                            <button
                                              className="rbt-btn bg-white btn-xs  radius-round "
                                              onClick={() =>
                                                showDeleteConfirm(edu)
                                              }
                                              title="Active"
                                            >
                                              <i
                                                className="feather-trash pl--0 text-white "
                                                style={{ fontSize: "14px" }}
                                              ></i>
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div
                                    className="text-gray mt-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    No Milestones added
                                  </div>
                                </>
                              )}
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
      </div>

      <Modal
        title={
          <div className="custom-modal-header">
            {isEditing ? "Edit Profile Milestone" : "Create Profile Milestone"}
          </div>
        }
        open={isModalOpen}
        onCancel={() => handleCancel()}
        footer={false}
        centered
      >
        {/* 4. Form Wrapper */}
        <form className="applicants-form" onSubmit={handleEducationSubmit}>
         

          <div style={{ marginTop: "15px" }}>
            <FormField
             type="text"
                name="title"
                label="Title"
                // className={"applicant-input"}
                onChange={handleChange}
                value={formData.title}
                error={errMsg?.title}
                required
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
             type="text"
                 name="description"
                label="Description"
                // className={"applicant-input"}
                 onChange={handleChange}
                value={formData.description}
                // error={errMsg?.title}
                // required
            />
          </div>

         

           <div style={{ marginTop: "15px" }}>
            <FormField
             type="text"
                name="year"
                label="Year"
                // className={"applicant-input"}
                onChange={handleChange}
                value={formData.year}
                error={errMsg?.year}
                required={true}
            />
          </div>

         
          {/* 7. Submit Button */}
          <div className="d-flex justify-content-end mt-5 gap-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="button"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>

            <button
              className={`rbt-btn btn-gradient radius-round sm-btn  ${state.btnLoading ? 'loading' : ''}`}
              type="submit"
              disabled={state.btnLoading}
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MyMilestoneMain;
