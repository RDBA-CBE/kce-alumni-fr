import React, { useEffect, useRef, useState } from "react";
import FormField from "@/commonComponents/FormFields";

import { useRouter, usePathname } from "next/navigation";
import {
  Dropdown,
  setDropdownData,
  TrimText,
  TruncatedContent,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import { message, Modal, Tooltip } from "antd";

import Link from "next/link";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Models from "@/imports/models.import";
import { jobTypeOption, VisibilityPosts } from "@/utils/constant.utils";
import Loader from "../../Loader";
import DashboardListCom from "./DashboardListCom";

const PublishPostMain = () => {
  const { confirm } = Modal;
  const router = useRouter();

  const [departmentDatas, setDepartmentDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

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

    const Faculty = localStorage.getItem("isFaculty");
    setIsFatulty(Faculty);
  }, []);

  useEffect(() => {
    if (token && (isAdmin === "true" || isAlumniManager === "true")) {
      GetPendingMembers();
    }
  }, [token, isAdmin, isAlumniManager]);

  const GetPendingMembers = () => {
    setLoading(true);
    axios
      .get(`${BaseURL}/postpending/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartmentDatas(response.data?.results);
        setLoading(false);
      })
      .catch((error) => {
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
        setLoading(false);
      });
  };

  console.log("departmentDatas", departmentDatas);


  const showDeleteConfirm = (approval) => {
    confirm({
      title: "Are you sure you want this approval?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        axios
          .put(
            `${BaseURL}/postpending/${approval.id}/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            message.success(response.data.message || "Operation successful!");
            GetPendingMembers(); // Refresh the department list
          })
          .catch((error) => {
            message.error(
              error.response?.data?.error ||
              "An error occurred. Please try again."
            );
          });
      },
      onCancel() { },
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(departmentDatas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = departmentDatas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="container section-pad">
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between ">
              <h5>Publish Post</h5>
              <Link
                className="rbt-btn btn-gradient radius-round sm-btn"
                href="/dashboard"

              >
                Back
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          {token &&
            (isAdmin === "true" || isAlumniManager === "true") && (
              <div className="rbt-dashboard-table table-responsive mobile-table-750 ">
                {departmentDatas?.length === 0 ? (
                  // --- EMPTY STATE ---
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "end",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        width: "400px",
                        fontSize: "16px",
                      }}
                    >
                      <h6 style={{ marginBottom: "10px" }}>No Data Found</h6>
                    </div>
                  </div>
                ) : (
                  // --- TABLE DATA ---
                  <>
                    <table className="rbt-table table table-borderless">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Post Category</th>
                          <th>Content</th>
                          <th>Posted Date</th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((item) => (
                          <tr key={item.id}>
                            <th>
                              <p className="b3">{item.title}</p>
                            </th>
                            <td>
                              <p className="b3">{item.post_category?.name}</p>
                            </td>
                            <td>
                              <p className="b3">
                                {TruncatedContent(item.content, 50)}
                              </p>
                            </td>
                            <td>
                              <p className="b3">{item.posted_on}</p>
                            </td>
                            <td>
                              <div className="rbt-button-group justify-content-end">
                                {/* Assign Faculty */}
                                <div
                                  className="rbt-btn btn-xs bg-primary-opacity radius-round color-danger "
                                  // href={`/help-desk/ticket-detail/${item.ticket_id}`}
                                  onClick={() => showDeleteConfirm(item)}
                                  title="Approve"
                                >
                                  <i className="feather-check-circle" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* --- PAGINATION --- */}
                    {/* {departmentDatas?.length > 0 && (
                  <div className="row">
                    <div className="col-lg-12 mt-0">
                      <Pagination
                        activeNumber={handlePageChange}
                        totalPage={state.total}
                        currentPages={state.currentPage}
                      />
                    </div>
                  </div>
                )} */}
                  </>
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default PublishPostMain;
