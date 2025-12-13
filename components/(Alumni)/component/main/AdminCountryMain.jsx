import FormField from "@/commonComponents/FormFields";
import Pagination from "@/commonComponents/Pagination";
import Models from "@/imports/models.import";
import { BaseURL } from "@/utils/BaseUrl";
import { useSetState, validateForm } from "@/utils/commonFunction.utils";
import { message, Modal, Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminCountryMain = () => {
    const { confirm } = Modal;
  const router = useRouter();

  const [formData, setFormData] = useState({
    country_name: "",
    country_code: "",
    // website: "",
    // end_year: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);

  const [state, setState] = useSetState({
    currentPage: 1,
    countryList: [],
  });

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    if (!Token) {
      router.push("/login");
    }

    const Admin = localStorage.getItem("isAdmin");
    setIsAdmin(Admin);

    const AlumniManager = localStorage.getItem("isAlumniManager");
    setIsAlumniManager(AlumniManager);

    if (Admin !== "true" && AlumniManager !== "true") {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (token && (isAdmin || isAlumniManager)) {
      GetCountry(1);
    }
  }, [token, isAdmin, isAlumniManager]);

  const GetCountry = async (page) => {
    try {
      setLoading(true);
      const res = await Models.masters.GetCountryList(page);
      setState({
        countryList: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
      });
      setLoading(false);
    } catch (error) {
      if (error?.data?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Success = (successMsg) => {
    messageApi.open({
      type: "success",
      content: successMsg || "Success!.",
    });
  };

  const ErrorNotification = (error) => {
    messageApi.open({
      type: "error",
      content: error || "An error occurred. Please try again.",
    });
  };

  // Handle form submission
  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      country_name: { required: true },
      country_code: { required: true },
    };
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    try {
      if (isEditing) {
        const res = await Models?.masters?.UpdateCountry(formData.id, formData);
        Success(res.message);
        setLoading(true);
        GetCountry(state.currentPage);
      } else {
        const res = await Models?.masters?.CreateCountry(formData);
        Success(res.message);
        GetCountry(1);
        setLoading(false);
      }
    } catch (error) {
      console.log("❌error --->", error);
      ErrorNotification(error.response?.data.error);
      setLoading(false);
    }

    setIsModalOpen(false);
    // Reset form
    setFormData({
      country_name: "",
      country_code: "",
    });
    setIsEditing(false); // Reset to create mode
  };

  // Open modal with department data for editing
  const editDepartment = (department) => () => {
    console.log("✌️department --->", department);
    setFormData({
      id: department.id,
      country_name: department.country_name,
      country_code: department.country_code,
      //   website: department.website,
      // end_year: department.end_year,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  
  const showModal = () => {
    setFormData({
      country_name: "",
      country_code: "",
      //   website: "",
      // end_year: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handlePageChange = (number) => {
    GetCountry(number);
    setState({ currentPage: number });
    window.scrollTo({ top: 0, behavior: "smooth" });
    return number;
  };

  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        {contextHolder}
        <div className="content">
          <div className="d-flex justify-content-between py-4 mb-4 ">
            <div className="section-title">
              <h4 className="mb-0 font-20 text-dark">Country </h4>
            </div>
            <div className="rbt-button-group justify-content-end">
              <div
                className="rbt-btn btn-xs bg-secondary-opacity radius-round"
                title="Create Department"
                onClick={showModal}
              >
                <i className="feather-plus pl--0" onClick={showModal} />
              </div>
            </div>
          </div>

          <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
            {loading ? (
              <div
                className="text-center pt-10 d-flex justify-content-center align-items-center"
                style={{
                  height: "500px",
                  maxWidth: "100%",
                }}
              >
                <Spin size="large" />
              </div>
            ) : state.countryList?.length > 0 ? (
              <>
                <table className="rbt-table table table-borderless">
                  <thead>
                    <tr>
                      <th>Country Name</th>
                      <th>Country Code</th>
                    
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.countryList?.map((item, index) => (
                      <tr key={index}>
                        <th>
                          <p className="b3 mb--5">{item.country_name}</p>
                        </th>
                        <th>
                          <p className="b3 mb--5">{item.country_code}</p>
                        </th>

                        

                        <td className="ms-0">
                          <div className="rbt-button-group gap-3 ">
                            <div
                              className="rbt-btn btn-xs bg-primary-opacity radius-round"
                              href="#"
                              title="Edit"
                              onClick={editDepartment(item)}
                            >
                              <i className="feather-edit pl--0"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {state.countryList?.length > 9 && (
                  <div>
                    <div
                      className="mb-20 "
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Pagination
                        activeNumber={handlePageChange}
                        totalPage={state.total}
                        currentPages={state.currentPage}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                className="text-center pt-10 d-flex justify-content-center align-items-center"
                style={{
                  height: "500px",
                  maxWidth: "100%",
                }}
              >
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title={isEditing ? "Edit Country" : "Create Country"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <form onSubmit={handleDepartmentSubmit} className="applicants-form">
          <div className="mt-3">
            <FormField
             type="text"
              name="country_name"
              label="Country Name"
            
              onChange={handleChange}
              value={formData.country_name}
              error={errMsg.country_name}
              required={true}
            />
          </div>

          <div className="mt-3">
            <FormField
             type="text"
                name="country_code"
                label="Country Code"
               
                onChange={handleChange}
                value={formData.country_code}
                error={errMsg.country_code}
                required={true}
            />
          </div>

         

          <div className="d-flex justify-content-end mt-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdminCountryMain;
