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

const AdminDepartmentMain = () => {
  const { confirm } = Modal;

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    short_name: "",
    full_name: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);

  const [state, setState] = useSetState({
    currentPage: 1,
    deparmentList: [],
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
      GetDepartment(1);
    }
  }, [token, isAdmin, isAlumniManager]);

  const GetDepartment = async (page) => {
    try {
      setLoading(true);

      const res = await Models.masters.departmentList(page);
      setState({
        deparmentList: res?.results,
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
      short_name: { required: true },
      full_name: { required: true },
    };
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    if (isEditing) {
      console.log("Updating department:", formData);
      // Perform update logic here

      axios
        .post(`${BaseURL}/update_department/${formData.id}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("✌️response --->", response);
          success(response.data.message);
          setLoading(true);
          GetDepartment(state.currentPage);
          setLoading(false);
        })
        .catch((error) => {
          console.log("❌error --->", error);
          errorNotification(error.response.data.error);
          setLoading(false);
        });
    } else {
      console.log("Creating department:", formData);
      // Perform create logic here

      axios
        .post(`${BaseURL}/create_department/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("✌️response --->", response);
          success(response.data.message);
          setLoading(true);
          GetDepartment(1);
          setLoading(false);
        })
        .catch((error) => {
          console.log("❌error --->", error);
          errorNotification(error.response.data.error);
          setLoading(false);
        });
    }

    setIsModalOpen(false);

    // Reset form
    setFormData({
      short_name: "",
      full_name: "",
    });
    setIsEditing(false); // Reset to create mode
  };

  // Open modal with department data for editing
  const editDepartment = (department) => () => {
    console.log("✌️department --->", department);
    setFormData({
      id: department.department_id,
      short_name: department.short_name,
      full_name: department.full_name,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const showDeleteConfirm = (department) => {
    confirm({
      title: department.is_active
        ? "Are you sure you want to InActive this department?"
        : "Are you sure you want to Active this department?",

      okText: department.is_active ? "InActive" : "Active",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        axios
          .put(
            `${BaseURL}/decativate_department/${department.department_id}/`,
            {
              is_active: !department.is_active,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("✌️response --->", response);
            message.success(response.data.message || "Operation successful!");
            setLoading(true);
            GetDepartment(state.currentPage); // Refresh the department list
            setLoading(false);
          })
          .catch((error) => {
            console.log("❌error --->", error);
            message.error(
              error.response?.data?.error ||
                "An error occurred. Please try again."
            );
            setLoading(false);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });

    console.log("Deleting department:", department);
  };

  const showModal = () => {
    setFormData({
      short_name: "",
      full_name: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handlePageChange = (number) => {
    GetDepartment(number);
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
              <h4 className="mb-0 font-20 text-dark">Department </h4>
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
            ) : state.deparmentList?.length > 0 ? (
              <>
                <table className="rbt-table table table-borderless">
                  <thead>
                    <tr>
                      <th>Department Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.deparmentList?.map((item, index) => (
                      <tr
                        key={index}
                        style={{ opacity: item?.is_active ? 1 : 0.5 }}
                      >
                        <th>
                          <p className="b3 mb--5">
                            {item.full_name} ({item.short_name})
                          </p>
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
                            {item?.is_active ? (
                              <div
                                className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                href="#"
                                title="Active"
                                onClick={() => showDeleteConfirm(item)}
                              >
                                <i className="feather-check-circle pl--0"></i>
                              </div>
                            ) : (
                              <div
                                className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                href="#"
                                title="InActive"
                                onClick={() => showDeleteConfirm(item)}
                              >
                                <i className="feather-x-circle pl--0"></i>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {state.deparmentList?.length > 9 && (
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
        title={isEditing ? "Edit Department" : "Create Department"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <form onSubmit={handleDepartmentSubmit} className="applicants-form">
          <div className="mt-3">
            <FormField
              type="text"
              name="short_name"
              label="Department Short Name"
              onChange={handleChange}
              value={formData.short_name}
              error={errMsg.short_name}
              required={true}
            />
          </div>

          <div className="mt-3">
            <FormField
              type="text"
              name="full_name"
              label="Department Full Name"
              onChange={handleChange}
              value={formData.full_name}
              error={errMsg.full_name}
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

export default AdminDepartmentMain;
