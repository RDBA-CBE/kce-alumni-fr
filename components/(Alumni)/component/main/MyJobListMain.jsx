import React, { useEffect, useState } from "react";
import FormField from "@/commonComponents/FormFields";

import { useRouter } from "next/navigation";
import {
  setDropdownData,
  TrimText,
  useSetState,
} from "@/utils/commonFunction.utils";
import { message, Modal, Tooltip } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Models from "@/imports/models.import";
import { jobTypeOption } from "@/utils/constant.utils";
import Loader from "../../Loader";
import Pagination from "@/commonComponents/Pagination";

const MyJobListMain = () => {
  const { confirm } = Modal;
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [AdminDataLists, setAdminDataLists] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [formData, setFormData] = useState({
    job_title: "",
    industry: "",
    role: "",
    location: "",
    post_type: "",
  });

  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);

  const [state, setState] = useSetState({
    pageLoading: false,
    total: 0,
    next: null,
    currentPage: 1,
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

    const Alumni = localStorage.getItem("isAlumni");
    setIsAlumni(Alumni);

    const Faculty = localStorage.getItem("isFatulty");
    setIsFatulty(Faculty);

    // if (Admin !== "true" && AlumniManager !== "true") {
    //   router.push("/");
    // }
  }, []);

  //   useEffect(() => {
  //     if (token && (isAlumni == "true" || isFatulty == "true")) {
  //       GetJobs();
  //     }
  //   }, [token, isAlumni, isFatulty]);

  useEffect(() => {
    if (
      token &&
      (isAdmin == "true" ||
        isAlumniManager == "true" ||
        isAlumni == "true" ||
        isFatulty == "true")
    ) {
      getJobsAdmin(1);
      GetDepartmentList();
      GetRoleList();
      getLocation();
    }
  }, [token, isAdmin, isAlumniManager, isAlumni, isFatulty]);
  console.log("token", token);

  //   const GetJobs = () => {
  //     axios
  //       .get(`${BaseURL}/retrieve_job_post/`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("✌️response --->", response);
  //         setListOfPosts(response.data);
  //         setNormelUserFilter(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("❌error --->", error);
  //       });
  //   };

  const getJobsAdmin = async (page = 1) => {
    setState({ pageLoading: true });
    try {
      const res = await Models.job.myJobList(page);
      setAdminDataLists(res?.results);
      setFilteredList(res?.results);
      setState({
        pageLoading: false,
        total: res?.count,
        next: res?.next,
        currentPage: page,
      });
    } catch (error) {
      console.log("❌error --->", error);
      setState({ pageLoading: false });
    }
  };

  const GetDepartmentList = () => {
    axios
      .get(`${BaseURL}/retrieve_industries/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartmentList(response.data?.results);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const GetRoleList = () => {
    axios
      .get(`${BaseURL}/retrieve_role/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRoleList(response.data?.results);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const getLocation = () => {
    axios
      .get(`${BaseURL}/retrieve_locations/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setLocationList(response.data?.results);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const handleEditClick = (id) => {
    router.push(`/edit-a-job/${id}/`);
  };

  const handleApprovalFilter = (value) => {
    setApprovalFilter(value);
    if (value === "all") {
      setFilteredList(AdminDataLists);
    } else if (value === "approved") {
      setFilteredList(AdminDataLists.filter((item) => item.is_approved === true || item.is_approved === "true"));
    } else {
      setFilteredList(AdminDataLists.filter((item) => item.is_approved === false || item.is_approved === "false" || !item.is_approved));
    }
  };

  const handlePageChange = (pageNumber) => {
    getJobsAdmin(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentDataForAdmin = AdminDataLists;

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

  const showDeleteConfirm = (post) => {
    confirm({
      title: post.is_active
        ? "Are you sure you want to InActive this Post?"
        : "Are you sure you want to Active this Post?",
      okText: post.is_active ? "InActive" : "Active",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setLoading(true);
        axios
          .put(
            `${BaseURL}/deactivate_job_post/${post.id}/`,
            {
              is_active: !post.is_active,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            success(response.data.message || "Operation successful!");
            getJobsAdmin(state.currentPage); // Refresh the job list
            setLoading(false);
          })
          .catch((error) => {
            errorNotification(
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
  };

  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const base = approvalFilter === "all"
      ? AdminDataLists
      : AdminDataLists.filter((item) =>
          approvalFilter === "approved"
            ? item.is_approved === true || item.is_approved === "true"
            : item.is_approved === false || item.is_approved === "false" || !item.is_approved
        );
    if (value) {
      setFilteredList(
        base.filter(
          (post) =>
            post?.job_title?.toLowerCase().includes(value) ||
            (post?.other_industry || post?.industry)?.toLowerCase().includes(value) ||
            (post?.other_role || post?.role)?.toLowerCase().includes(value) ||
            (post?.other_location || post?.location)?.toLowerCase().includes(value)
        )
      );
    } else {
      setFilteredList(base);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFiltersSubmit = (e) => {
    e.preventDefault();
    console.log("handleFiltersSubmit", formData);

    axios
      .post(`${BaseURL}/filter_job/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setAdminDataLists(response.data);
        setFilteredData(response.data);

        setFormData({
          job_title: "",
          industry: "",
          role: "",
          location: "",
          post_type: "",
        });
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  console.log("isAdmin", isAdmin);
  console.log("isAlumniManager", isAlumniManager);
  console.log("isAlumni", isAlumni);
  console.log("isFatulty", isFatulty);

  if (state.pageLoading) {
    return <Loader />; // Show loader while checking token
  }

  return (
    <div className="rbt-dashboard-area section-pad">
      {contextHolder}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">

                  {/* Search bar */}
                  <div className="rbt-elements-area bg-color-extra2 mb-4">
                    <div className="container-fluid">
                      <div className="row p-0">
                        <div className="col-lg-12 p-0">
                          <form action="#" className="rbt-search-style-1">
                            <input
                              type="text"
                              placeholder="Search by job title, role or industry"
                              onChange={handleSearchFilter}
                            />
                            <button className="search-btn">
                              <i className="feather-search"></i>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(isAdmin == "true" || isAlumniManager == "true" || isAlumni == "true" || isFatulty == "true") && (
                    <div className="rbt-dashboard-content p-0">
                      <div className="content">

                        {/* Header + filter */}
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                          <h4 className="rbt-title-style-3 mb--0">My Job Lists</h4>
                          <div className="d-flex flex-wrap align-items-center gap-3">
                            {/* Approval filter buttons */}
                            <div className="d-flex gap-2">
                              {[
                                { label: "All", value: "all" },
                                { label: "Approved", value: "approved" },
                                { label: "Pending", value: "pending" },
                              ].map((btn) => (
                                <button
                                  key={btn.value}
                                  type="button"
                                  onClick={() => handleApprovalFilter(btn.value)}
                                  className={`rbt-btn btn-xs radius-round ${
                                    approvalFilter === btn.value
                                      ? "btn-gradient"
                                      : "btn-border-gradient"
                                  }`}
                                >
                                  {btn.label}
                                </button>
                              ))}
                            </div>
                            <Link
                              className="rbt-btn btn-gradient radius-round sm-btn"
                              href="/post-a-job"
                            >
                              Post Job
                            </Link>
                          </div>
                        </div>

                        <div className="rbt-dashboard-table table-responsive mobile-table-750">
                          {filteredList.length > 0 ? (
                            <table className="rbt-table table table-borderless">
                              <thead>
                                <tr>
                                  <th>Job Title</th>
                                  <th>Industry</th>
                                  <th>Role</th>
                                  <th>Location</th>
                                  <th>Applicants</th>
                                  <th>Posted Date</th>
                                  <th>Status</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredList.map((item) => (
                                  <tr key={item.id}>
                                    <th>
                                      <span className="b3">
                                        <Link href={`/job-details/${item.id}`}>{item.job_title}</Link>
                                      </span>
                                    </th>
                                    <td>
                                      <span className="b3">
                                        {item?.other_industry ? item.other_industry : item?.industry}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="b3">
                                        {item?.other_role ? item.other_role : item?.role}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="b3">
                                        {item?.other_location ? item.other_location : item?.location}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="b3">{item.application_count}</span>
                                    </td>
                                    <td>
                                      <span className="b3">{item?.posted_on}</span>
                                    </td>
                                    <td>
                                      <span
                                        className={` ${
                                          item.is_approved === true || item.is_approved === "true"
                                            ? "bg-color-success-opacity color-success"
                                            : "bg-color-danger-opacity color-danger"
                                        }`}
                                      >
                                        {item.is_approved === true || item.is_approved === "true"
                                          ? "Approved"
                                          : "Pending"}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="rbt-button-group justify-content-end gap-2">
                                        {item?.is_active && (
                                          <>
                                            <Link
                                              className={`rbt-btn btn-xs radius-round ${
                                                item.application_count === 0 ? "bg-gray" : "bg-coral-opacity"
                                              }`}
                                              href={item.application_count > 0 ? `/applicants/${item?.id}` : "#"}
                                              title={item.application_count === 0 ? "No applicants" : "View Applicants"}
                                              style={{
                                                opacity: item.application_count === 0 ? 0.5 : 1,
                                                cursor: item.application_count === 0 ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              <i className="feather-eye pl--0"></i>
                                            </Link>
                                            <div
                                              className="rbt-btn btn-xs bg-primary-opacity radius-round color-info"
                                              title="Edit"
                                              onClick={() => handleEditClick(item?.id)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              <i className="feather-edit pl--0"></i>
                                            </div>
                                          </>
                                        )}
                                        <Tooltip title={item?.is_active ? "Active" : "InActive"}>
                                          {item?.is_active ? (
                                            <Link
                                              className="rbt-btn btn-xs bg-color-success-opacity radius-round color-success"
                                              href="#"
                                              onClick={() => showDeleteConfirm(item)}
                                            >
                                              <i className="feather-check-circle pl--0"></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                              href="#"
                                              onClick={() => showDeleteConfirm(item)}
                                            >
                                              <i className="feather-x-circle pl--0"></i>
                                            </Link>
                                          )}
                                        </Tooltip>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-center py-4">No jobs found</div>
                          )}
                        </div>

                        {Number(state.total) > 0 && (
                          <div className="d-flex justify-content-center mt-4">
                            <Pagination
                              activeNumber={handlePageChange}
                              totalPage={state.total}
                              currentPages={state.currentPage}
                              next={state.next}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJobListMain;
