import React, { useEffect, useState } from "react";
import FormField from "@/commonComponents/FormFields";

import { useParams, useRouter } from "next/navigation";
import { XLFormat } from "@/utils/commonFunction.utils";
import { message, Modal, Tooltip } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Models from "@/imports/models.import";
import { jobTypeOption } from "@/utils/constant.utils";

const ApplicantDetailMain = () => {
  const { id } = useParams();

  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    subject: "",
    status: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [profileDetailsData, setProfileDetailsData] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    if (!Token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if ((id, token)) {
      ViewProfileDetails();
    }
  }, [id, token]);

  useEffect(() => {
    if (profileDetailsData.status) {
      setFormData((prevState) => ({
        ...prevState,
        status: profileDetailsData.status,
      }));
    }
  }, [profileDetailsData]);

  const ViewProfileDetails = () => {
    axios
      .get(`${BaseURL}/detail_view_application/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfileDetailsData(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
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

  // Handle form submission
  const ApplicantsMessageSent = (e) => {
    e.preventDefault();

    const validationRules = {
      message: { required: true },
      subject: { required: true },
    };
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    setIsModalOpen(false);
    const body = {
      message: formData.message,
      subject: formData.subject,
    };
    axios
      .post(`${BaseURL}/applicant_profile/${id}/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        success(response.data.message);
      })
      .catch((error) => {
        errorNotification(error.response?.data?.error || "An error occurred");
      });

    // Reset form
    setFormData({
      message: "",
      subject: "",
      status: profileDetailsData.status,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "select-one") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle status change
  const handleStatusChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  // Handle status update
  const ApplicantStatusUpdate = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${BaseURL}/applicant_profile/${id}/`,
        { status: formData.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        success(response.data.message);
        setIsModalOpen1(false);
        ViewProfileDetails(); // Refresh the profile details
      })
      .catch((error) => {
        errorNotification(error.response?.data?.error || "An error occurred");
      });
  };
  return (
    <div className="rbt-dashboard-area section-pad">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="rbt-dashboard-content  p-0">
                    <div className="content">
                      <div className="section-title d-flex justify-content-between ">
                        <h4 className="rbt-title-style-3">
                          Applicants Profile Details
                        </h4>
                        <div className="d-flex gap-3">
                          <Link
                            className="rbt-btn btn-gradient radius-round sm-btn"
                            href={`/applicants/${profileDetailsData.job_id}`}
                          >
                            Back
                          </Link>
                        </div>
                      </div>

                      <div className="rbt-dashboard-table table-responsive mobile-table-750 ">
                        <table className="rbt-table table ">
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <td>{profileDetailsData.full_name}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{profileDetailsData.email}</td>
                            </tr>
                            <tr>
                              <th>Phone</th>
                              <td>{profileDetailsData.mobile_number}</td>
                            </tr>
                            <tr>
                              <th>Role</th>
                              <td>{profileDetailsData.current_role}</td>
                            </tr>
                            <tr>
                              <th>Industry</th>
                              <td>{profileDetailsData.current_industry}</td>
                            </tr>
                            <tr>
                              <th>Total Experience</th>
                              <td>
                                {profileDetailsData.total_years_of_experience} -
                                Year
                              </td>
                            </tr>
                            <tr>
                              <th>Skills</th>
                              <td>
                                {profileDetailsData.skills
                                  ?.map((skill) => skill)
                                  .join(", ")}
                              </td>
                            </tr>
                            <tr>
                              <th>Resume</th>
                              <td>
                                {profileDetailsData.resume ? (
                                  <a
                                    href={profileDetailsData.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-success"
                                    download
                                  >
                                    Download Resume
                                  </a>
                                ) : (
                                  "Resume Not Available"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>Additional Information</th>
                              <td>{profileDetailsData.notes_to_recruiter}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --------------------table end--------------------- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailMain;
