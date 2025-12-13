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

const MyJobListMain = () => {
  const { confirm } = Modal;
  const router = useRouter();
  const [openSubMenuId, setOpenSubMenuId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [normelUserFilter, setNormelUserFilter] = useState([]);
  const [AdminDataLists, setAdminDataLists] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
      getJobsAdmin();
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

  console.log("accessToken", token);
  const getJobsAdmin = () => {
    setState({
      pageLoading: true,
    });
    axios
      .get(`${BaseURL}/my_job_post/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdminDataLists(response.data?.results);
        setFilteredData(response.data?.results);
        console.log("✌️response --->", response);
        setState({
          pageLoading: false,
        });
      })
      .catch((error) => {
        console.log("❌error --->", error);
        setState({
          pageLoading: false,
        });
      });
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

  const handleSubMenuClick = (id) => {
    setOpenSubMenuId(openSubMenuId === id ? null : id);
  };

  const handleEditClick = (id) => {
    router.push(`/edit-a-job/${id}/`);
  };

  // Pagination Logic
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPagesForAdmin = Math.ceil(filteredData.length / itemsPerPage);
  const startIndexForAdmin = (currentPage - 1) * itemsPerPage;
  const currentDataForAdmin = filteredData.slice(
    startIndexForAdmin,
    startIndexForAdmin + itemsPerPage
  );

  const totalPagesForUser = Math.ceil(normelUserFilter.length / itemsPerPage);
  const startIndexForUser = (currentPage - 1) * itemsPerPage;
  const currentDataForUser = normelUserFilter.slice(
    startIndexForUser,
    startIndexForUser + itemsPerPage
  );

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
            getJobsAdmin(); // Refresh the job list
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
    console.log("value", value);

    if (token) {
      if (value) {
        const filtered = AdminDataLists.filter(
          (post) =>
            post?.job_title?.toLowerCase().includes(value) ||
            post?.industry.toLowerCase().includes(value) ||
            post?.role?.toLowerCase().includes(value) ||
            post?.location.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(AdminDataLists); // Reset to original data if input is cleared
      }
    }
    {
      if (value) {
        const filtered = listOfPosts.filter(
          (post) =>
            post?.job_title?.toLowerCase().includes(value) ||
            post?.industry?.toLowerCase().includes(value) ||
            post?.role.toLowerCase().includes(value) ||
            post?.location.toLowerCase().includes(value) ||
            post?.post_type.toLowerCase().includes(value)
        );
        setNormelUserFilter(filtered);
      } else {
        setNormelUserFilter(listOfPosts); // Reset to original data if input is cleared
      }
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

  console.log("currentDataForUser", currentDataForUser);

  console.log("isAdmin", isAdmin);
  console.log("isAlumniManager", isAlumniManager);
  console.log("isAlumni", isAlumni);
  console.log("isFatulty", isFatulty);

  if (state.pageLoading) {
    return <Loader />; // Show loader while checking token
  }

  return (
    <div className="rbt-dashboard-area section-pad">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10">
            <div className="container-fluid">
              
                <div className="row">
                  <div className="col-lg-12">
                    <div className="rbt-elements-area bg-color-extra2 mb-5">
                      <div className="container-fluid">
                        <div className="row p-0">
                          <div className="col-lg-12 p-0">
                            <form action="#" className="rbt-search-style-1">
                              <input
                                type="text"
                                placeholder="Search Job with Job title and Role"
                                // name="search_filter"
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

                    {(isAdmin == "true" ||
                      isAlumniManager == "true" ||
                      isAlumni == "true" ||
                      isFatulty == "true") && (
                      <div className="rbt-dashboard-content  p-0">
                        <div className="content">
                          <div className="section-title d-flex justify-content-between ">
                            <h4 className="rbt-title-style-3">My Job Lists</h4>

                            <Link
                              className="rbt-btn btn-gradient radius-round sm-btn"
                              href="/post-a-job"
                            >
                              Post Job
                            </Link>
                          </div>

                          <div className="rbt-dashboard-table table-responsive mobile-table-750">
                            {AdminDataLists.length > 0 ? (
                              <table className="rbt-table table table-borderless">
                                <thead>
                                  <tr>
                                    <th>Job Title</th>
                                    <th>Industry</th>
                                    <th>Role</th>
                                    <th>N.Of Applicants</th>
                                    <th>Posted Date</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentDataForAdmin.map((item) => (
                                    <tr key={item.id}>
                                      <th>
                                        <span className="b3">
                                          <Link href="#">{item.job_title}</Link>
                                        </span>
                                      </th>
                                      <td>
                                        <span className="b3">
                                          <Link href="#">{item?.industry}</Link>
                                        </span>
                                      </td>
                                      <td>
                                        <span className="b3">
                                          <Link href="#">{item?.role}</Link>
                                        </span>
                                      </td>
                                      <td>
                                        <span className="b3">
                                          <Link href="#">
                                            {item.application_count}
                                          </Link>
                                        </span>
                                      </td>
                                      <td>
                                        <span className="b3">
                                          <Link href="#">
                                            {item?.posted_on}
                                          </Link>
                                        </span>
                                      </td>

                                      <td>
                                        <div className="rbt-button-group justify-content-end gap-2">
                                          {item?.is_active && (
                                            <>
                                              <Link
                                                className={`rbt-btn btn-xs radius-round ${
                                                  item.application_count === 0
                                                    ? "bg-gray"
                                                    : "bg-coral-opacity"
                                                } `}
                                                href={
                                                  item.application_count > 0
                                                    ? `/applicants/${item?.id}`
                                                    : "#"
                                                }
                                                title="View"
                                                // onClick={
                                                //   item.application_count > 0
                                                //     ? () =>
                                                //         router.push(
                                                //           `/applicants/${item?.id}`
                                                //         )
                                                //     : null
                                                // }

                                                style={{
                                                  opacity:
                                                    item.application_count === 0
                                                      ? 0.5
                                                      : 1,
                                                  cursor:
                                                    item.application_count === 0
                                                      ? "not-allowed"
                                                      : "pointer",
                                                }}
                                              >
                                                <i className="feather-eye pl--0"></i>
                                              </Link>

                                              <div
                                                className="rbt-btn btn-xs bg-primary-opacity radius-round color-info"
                                                href={`/edit-a-job/${item?.id}/`}
                                                title="Edit"
                                                onClick={() =>
                                                  handleEditClick(item?.id)
                                                }
                                              >
                                                <i className="feather-edit pl--0"></i>
                                              </div>
                                            </>
                                          )}

                                          <Tooltip
                                            title={
                                              item?.is_active
                                                ? "Active"
                                                : "InActive"
                                            }
                                          >
                                            {item?.is_active ? (
                                              <Link
                                                className="rbt-btn btn-xs bg-color-success-opacity radius-round color-success"
                                                href="#"
                                                title="Active"
                                                onClick={() =>
                                                  showDeleteConfirm(item)
                                                }
                                              >
                                                <i className="feather-check-circle pl--0"></i>
                                              </Link>
                                            ) : (
                                              <Link
                                                className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                                href="#"
                                                title="Inactive"
                                                onClick={() =>
                                                  showDeleteConfirm(item)
                                                }
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
                              <div>No Data</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
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

export default MyJobListMain;
