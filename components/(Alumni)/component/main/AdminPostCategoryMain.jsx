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

const AdminPostCategoryMain = () => {
  const { confirm } = Modal;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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
    postCategoryList: [],
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
      GetPostCategory(1);
    }
  }, [token, isAdmin, isAlumniManager]);

  const GetPostCategory = async (page) => {
    try {
      setLoading(true);
      const res = await Models.masters.GetPostCategoryList(page);
      setState({
        postCategoryList: res?.results,
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

  // const errorNotification = (error) => {
  //   messageApi.open({
  //     type: "error",
  //     content: error || "An error occurred. Please try again.",
  //   });
  // };

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

    // Define validation rules
    const validationRules = {
      name: { required: true },
    };

    // Validate form data
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    try {
      // Handle the submission based on whether the form is in editing mode or not
      if (isEditing) {
        console.log("Updating Batch:", formData);

        // Attempt to update the category
        const res = await Models?.masters?.UpdatePostCategory(
          formData.id,
          formData
        );
        Success(res.message);
        GetPostCategory(state.currentPage);
        setLoading(false);
      } else {
        console.log("Creating Post Category:", formData);

        // Attempt to create the category
        const res = await Models?.masters?.CreatePostCategory(formData);
        console.log("✌️res --->", res);
        Success(res.message);
        GetPostCategory(1);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      ErrorNotification(error?.response?.data?.error);
      setLoading(false);
    }

    // Close modal and reset form
    setIsModalOpen(false);
    setFormData({ name: "" });
    setIsEditing(false); // Reset to create mode
  };

  // Open modal with department data for editing
  const editDepartment = (department) => () => {
    console.log("✌️department --->", department);
    setFormData({
      id: department.id,
      name: department.name,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const showModal = () => {
    setFormData({
      name: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handlePageChange = (number) => {
    GetPostCategory(number);
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
              <h4 className="mb-0 font-20 text-dark"> Post Category </h4>
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
            ) : state.postCategoryList?.length > 0 ? (
              <>
                <table className="rbt-table table table-borderless">
                  <thead>
                    <tr>
                      <th>Post Category Name</th>
                      
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.postCategoryList?.map((item, index) => (
                      <tr key={index}>
                        <th>
                          <p className="b3 mb--5">{item.name}</p>
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
                {state.postCategoryList?.length > 9 && (
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
        title={isEditing ? "Edit Post Category" : "Create Post Category"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <form onSubmit={handleDepartmentSubmit} className="applicants-form">
          <div className="mt-3">
            <FormField
              type="text"
              name="name"
              label="Post Category Name"
              
              onChange={handleChange}
              value={formData.name}
              error={errMsg.name}
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

export default AdminPostCategoryMain;
