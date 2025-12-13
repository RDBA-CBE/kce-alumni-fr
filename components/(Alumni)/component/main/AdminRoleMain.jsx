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

const AdminRoleMain = () => {
  const { confirm } = Modal;
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "",
    description: "",
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
    roleList: [],
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
      GetRole(1);
    }
  }, [token, isAdmin, isAlumniManager]);

  const GetRole = async (page) => {
    try {
      setLoading(true);
      const res = await Models.masters.roleList(page);
      setState({
        roleList: res?.results,
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
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      role: { required: true },
      description: { required: true },
      // end_year: { required: true },
    };
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    if (isEditing) {
      console.log("Updating Role:", formData);
      // Perform update logic here

      axios
        .post(`${BaseURL}/update_role/${formData.id}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("✌️response --->", response);
          success(response.data.message);
          setLoading(true);
          GetRole(state.currentPage);
          setLoading(false);
        })
        .catch((error) => {
          console.log("❌error --->", error);
          errorNotification(error.response.data.error);
          if (error?.response?.data?.code === "token_not_valid") {
            localStorage.removeItem("token");
            router.push("/login");
          }
          setLoading(false);
        });
    } else {
      console.log("Creating Role:", formData);
      // Perform create logic here

      axios
        .post(`${BaseURL}/create_role/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("✌️response --->", response);
          success(response.data.message);
          setLoading(true);
          GetRole(1);
          setLoading(false);
        })
        .catch((error) => {
          console.log("❌error --->", error);
          errorNotification(error.response.data.error);
          if (error?.response?.data?.code === "token_not_valid") {
            localStorage.removeItem("token");
            router.push("/login");
          }
          setLoading(false);
        });
    }

    setIsModalOpen(false);

    // Reset form
    setFormData({
      role: "",
      description: "",
      // end_year: "",
    });
    setIsEditing(false); // Reset to create mode
  };

  // Open modal with department data for editing
  const editDepartment = (department) => () => {
    console.log("✌️department --->", department);
    setFormData({
      id: department.id,
      role: department.role,
      description: department.description,
      // end_year: department.end_year,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const showModal = () => {
    setFormData({
      role: "",
      description: "",
      // end_year: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handlePageChange = (number) => {
    GetRole(number);
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
              <h4 className="mb-0 font-20 text-dark">Role </h4>
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
            ) : state.roleList?.length > 0 ? (
              <>
                <table className="rbt-table table table-borderless">
                  <thead>
                    <tr>
                      <th>Role Name</th>
                      <th>Description</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.roleList?.map((item, index) => (
                      <tr key={index}>
                        <th>
                          <p className="b3 mb--5">{item.role}</p>
                        </th>
                        <th>
                          <p className="b3 mb--5">{item.description}</p>
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
                {state.roleList?.length > 9 && (
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
        title={isEditing ? "Edit Role" : "Create Role"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <form onSubmit={handleDepartmentSubmit} className="applicants-form">
          <div className="mt-3">
            <FormField
              type="text"
              name="role"
              label="Role Name"
              onChange={handleChange}
              value={formData.role}
              error={errMsg.role}
              required={true}
            />
          </div>

          <div className="mt-3">
            <FormField
              type="textarea"
              name="description"
              label="Description"
              onChange={handleChange}
              value={formData.description}
              error={errMsg.description}
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

export default AdminRoleMain;
