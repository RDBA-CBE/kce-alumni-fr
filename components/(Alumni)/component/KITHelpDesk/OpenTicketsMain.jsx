"use client";

import FormField from "@/commonComponents/FormFields";
import Models from "@/imports/models.import";
import {
  setDropdownData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import { Priority } from "@/utils/constant.utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { message, Modal } from "antd";
import Pagination from "@/commonComponents/Pagination";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";

const OpenTicketsMain = () => {
  const { confirm } = Modal;
  const router = useRouter();

  const [state, setState] = useSetState({
    total: 0,
    currentPage: 1,
    currenCategoryPage: 1,
    hasCategoryLoadMore: null,
    // currenStatusPage: 1,
    // hasStatusLoadMore: null,
    currenFacultyPage: 1,
    hasFacultyLoadMore: null,
  });

  const [formData, setFormData] = useState({
    role: "",
    description: "",
    // end_year: "",
  });

  const [searchData, setSearchData] = useState({
    category: "",
    status_id: "",
    priority: "",
    due_date: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [departmentDatas, setDepartmentDatas] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [categoryTicket, setCategoryTicket] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [allUserFilterFinalDataList, setAllUserFilterFinalDataList] = useState(
    []
  );

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
      GetFatulty();
      GetStatus();
      GetCategoryList();
    }
  }, [token, isAdmin, isAlumniManager]);

  // const GetRole = () => {
  //   setLoading(true);
  //   axios
  //     .get(`${BaseURL}/retrieve_open_ticket/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setDepartmentDatas(response.data?.results);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("❌error --->", error);
  //       if (error?.response?.data?.code === "token_not_valid") {
  //         localStorage.removeItem("token");
  //         router.push("/login");
  //       }
  //       setLoading(true);
  //     });
  // };

  const GetRole = async (page) => {
    try {
      setLoading(true);
      const res = await Models.helpDesk.retrieve_open_ticket(page);
      setDepartmentDatas(res.results);
      setState({
        currentPage: page,
        next: res?.next,
        prev: res?.previous,
        refresh: false,
        moreLoading: false,
        loading: false,
        total: res?.count,
        pageLoading: false,
      });
      setLoading(false);
    } catch (error) {
      setLoading(true);

      console.log("✌️error --->", error);
    }
  };

  const GetFatulty = async () => {
    try {
      const res = await Models.masters.facultyList();
      const dropdown = setDropdownData(res?.results, "username");

      setFaculty(dropdown);
      setState({
        hasFacultyLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const GetStatus = () => {
    setLoading(true);
    axios
      .get(`${BaseURL}/retrieve_status/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStatusList(response.data?.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const GetCategoryList = async () => {
    try {
      const res = await Models.masters.GetTicketCategoryData();
      const dropdown = setDropdownData(res?.results, "category");
      setCategoryTicket(dropdown);
      setState({
        hasCategoryLoadMore: res?.next,
      });
    } catch (error) {
      console.log("❌error --->", error);
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

  const handleSkillsChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      faculty_ids: value, // Set selected faculty IDs
    }));

    // Clear the error message if at least one faculty is selected
    if (value.length > 0) {
      setErrMsg((prev) => ({
        ...prev,
        faculty_ids: undefined,
      }));
    }
  };

  // Handle form submission
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      faculty_ids: { required: true },
    };
    // Custom validation to ensure at least one faculty_id is selected
    if (formData.faculty_ids.length === 0) {
      setErrMsg((prev) => ({
        ...prev,
        faculty_id: "At least one faculty member must be selected.",
      }));
      return;
    }

    const faculty = formData.faculty_ids.map((faculty) => faculty.value);
    setFormData({ ...formData, faculty_ids: faculty });

    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    axios
      .post(
        `${BaseURL}/assign_ticket/${formData.id}/`,
        {
          faculty_ids: faculty, // Single key for faculty IDs
          message: formData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success(response.data.message);
        setLoading(true);
        GetRole();
        setLoading(false);
      })
      .catch((error) => {
        message.error(error.response.data.errors);
        console.log(error.response.data);
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
        setLoading(false);
      });

    setIsModalOpen(false);
    setFormData({
      id: null,
      faculty_ids: [], // Reset to an empty array
      message: "",
    });
  };

  const handleSearch = () => {
    // Perform search logic here

    // Reset search term
    setSearchTerm("");
  };

  // table pagination
  // Calculate the number of pages
  const totalPages = Math.ceil(departmentDatas.length / itemsPerPage);

  // Slice the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = departmentDatas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (name, value) => {
    // const { name, value } = e.target;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchSubmitSubmit = (e) => {
    e.preventDefault();

    const Body = {
      category: searchData.category,
      status_id: searchData.status_id,
      priority: searchData.priority,
      due_date: searchData.due_date,
    };
    axios
      .post(`${BaseURL}/open_filter_ticket/`, Body)
      .then((response) => {
        setDepartmentDatas(response.data);
        setAllUserFilterFinalDataList(Body);
        // GetRole();
        // setSearchData({
        //   category: "",
        //   status_id: "",
        //   priority: "",
        //   due_date: "",
        // });
      })
      .catch((error) => {
        message.error(error.response?.data?.errors);
        console.log(error.response?.data);
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
        setLoading(false);
      });
  };

  const handleSearchSubmit = async (page = 1, e) => {
    console.log("✌️page --->", page);
    if (e) {
      e.preventDefault();
    }
    try {
      const postData = {
        category: searchData.category.value,
        status_id: searchData.status_id,
        priority: searchData.priority,
        due_date: searchData.due_date,
      };

      const res = await Models.helpDesk.open_filter_ticket(postData, page);

      setState({
        currentPage: page,
        next: res?.next,
        prev: res?.previous,
        refresh: false,
        moreLoading: false,
        loading: false,
        total: res?.count,
        pageLoading: false,
      });

      setDepartmentDatas(res.results);
      setAllUserFilterFinalDataList(searchData);
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const HandleClearFilter = async (page) => {
    try {
      const Body = {
        category: "",
        status_id: "",
        priority: "",
        due_date: "",
      };

      const res = await Models.helpDesk.open_filter_ticket(Body, page);

      setState({
        next: res?.next,
        prev: res?.previous,
        refresh: false,
        moreLoading: false,
        loading: false,
        total: res?.count,
        pageLoading: false,
      });

      setDepartmentDatas(res.results);
      setAllUserFilterFinalDataList(Body);
      setSearchData({
        category: "",
        status_id: "",
        priority: "",
        due_date: "",
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handlePageChange = (number) => {
    const isFilter = bodyData();
    if (isFilter) {
      console.log("✌️if --->");
      handleSearchSubmit(number);
    } else {
      console.log("✌️else --->");
      GetRole(number);
    }
    setState({ currentPage: number });
    return number;
  };

  const bodyData = () => {
    let body = false;
    if (searchData.category) {
      body = true;
    }
    if (searchData.priority) {
      body = true;
    }
    if (searchData.due_date) {
      body = true;
    }
    return body;
  };

  const PriorityOption = Priority.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const CategoryOptions = categoryTicket.map((cou) => ({
    value: cou.id,
    label: cou.category,
  }));

  const FilterStatusName = statusList?.filter(
    (item) => item.id == allUserFilterFinalDataList.status_id
  );

  const FilterPriorityName = Priority?.filter(
    (item) => item.id == allUserFilterFinalDataList.priority
  );

  const FilterCategoryName = categoryTicket?.filter(
    (item) => item.id == allUserFilterFinalDataList.category
  );

  const facultyListLoadMore = async () => {
    try {
      if (state.hasFacultyLoadMore) {
        console.log("faculty load more");

        const res = await Models.masters.facultyList(
          state.currenFacultyPage + 1
        );

        const FacultyOption = setDropdownData(res?.results, "username");

        setFaculty([...faculty, ...FacultyOption]);
        setState({
          currenFacultyPage: state.currenFacultyPage + 1,
          hasFacultyLoadMore: res.next,
        });
      } else {
        setFaculty(faculty);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const categoryListLoadMore = async () => {
    try {
      if (state.hasCategoryLoadMore) {
        const res = await Models.masters.GetTicketCategoryData(
          state.currenCategoryPage + 1
        );

        const CategoryOption = setDropdownData(res?.results, "category");

        setCategoryTicket([...categoryTicket, ...CategoryOption]);
        setState({
          currenCategoryPage: state.currenCategoryPage + 1,
          hasCategoryLoadMore: res.next,
        });
      } else {
        setCategoryTicket(categoryTicket);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box helpdesk">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Open Tickets</h4>
          </div>

          <div className="rbt-dashboard-filter-wrapper">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">Catogory</span>
                  <FormField
                    type="loadMoreSelect"
                    placeholder="Category"
                    className="p-0"
                    value={searchData?.category}
                    name="category"
                    onChange={(e) => {
                      setSearchData({ ...searchData, category: e });
                    }}
                    options={categoryTicket}
                    loadMore={() => categoryListLoadMore()}
                  />
                </div>
              </div>

              <div className="col-lg-3">
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">Priority</span>
                  <Select
                    name="priority"
                    placeholder="Select Priority"
                    className="react-select"
                    classNamePrefix="react-select"
                    onChange={(selectedOption) =>
                      handleSearchChange("priority", selectedOption?.value)
                    }
                    value={PriorityOption.find(
                      (option) => option.value === searchData.priority
                    )}

                    

                    options={PriorityOption}
                  />
                </div>
              </div>
              <div
                className={`${
                  isAdmin === "true" || isAlumniManager === "true"
                    ? "col-lg-3  col-sm-12"
                    : "col-lg-3 col-sm-12"
                }`}
              >
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">Short By date</span>
                  <FormField
                    type="date"
                    name="due_date"
                    placeholder="Due Date"
                    // className="applicant-input"
                    onChange={(e) => {
                      console.log(e.target.value);

                      handleSearchChange("due_date", e.target.value);
                    }}
                    value={searchData.due_date}
                  />
                </div>
              </div>

              <div className="col-lg-12 d-flex justify-content-end gap-4">
                <button
                  className="rbt-btn btn-gradient radius-round sm-btn"
                  href="#"
                  onClick={(e) => handleSearchSubmit(1, e)}
                >
                  Filter
                </button>
                <Link
                  className="rbt-btn btn-border-gradient radius-round sm-btn"
                  href="#"
                  onClick={() => {
                    setState({ currentPage: 1 });
                    HandleClearFilter(1);
                  }}
                >
                  Clear all
                </Link>
              </div>
            </div>
          </div>

          <hr className="mt--30" />

          <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30" style={{scrollbarColor:"transparnt"}}>
            {token && (isAdmin == "true" || isAlumniManager == "true") && (
              <>
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
                      <h6 style={{ marginBottom: "10px" }}>No Tickets Found</h6>
                    </div>
                  </div>
                ) : (
                  // --- TABLE DATA ---
                  <>
                    <table className="rbt-table table table-borderless">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Priority</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((item) => (
                          <tr key={item.ticket_id}>
                            <th>
                              <p className="b3">
                                <Link
                                  href={`/help-desk/ticket-detail/${item.ticket_id}`}
                                  style={{
                                    color: "#212529",
                                    textDecoration: "underline",
                                  }}
                                >
                                  {item.name}
                                </Link>
                              </p>
                            </th>
                            <td>
                              <p className="b3">{item.category}</p>
                            </td>
                            <td>
                              <p className="b3">{item.priority}</p>
                            </td>
                            <td>
                              <p className="b3">{item.status}</p>
                            </td>
                            <td>
                              <div className="rbt-button-group justify-content-end">
                                {/* Assign Faculty */}
                                <a
                                  className="rbt-btn btn-xs bg-primary-opacity radius-round color-danger"
                                  href="#"
                                  title="Assign Faculty"
                                  onClick={() => {
                                    setFormData({
                                      id: item.ticket_id,
                                      faculty_ids: [], // Reset faculty_id for editing
                                      message: "",
                                    });
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <i className="feather-user" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* --- PAGINATION --- */}
                    {departmentDatas?.length > 0 && (
                      <div className="row">
                        <div className="col-lg-12 mt-0">
                          <Pagination
                            activeNumber={handlePageChange}
                            totalPage={state.total}
                            currentPages={state.currentPage}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Assign Faculty Modal --- */}
      <Modal
        title={<div className="custom-modal-header">Assign Faculty</div>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        centered
      >
        <form className="applicants-form" onSubmit={handleDepartmentSubmit}>
          {/* Faculty Selection */}
          <div className="form-group mb-3">
            <FormField
              label="Faculty Name"
              type="loadMoreSelect"
              name="faculty_ids"
              value={formData.faculty_ids}
              onChange={(e) => {
                setFormData({ ...formData, faculty_ids: e });
              }}
              error={errMsg.faculty_id}
              options={faculty}
              required={true}
              loadMore={facultyListLoadMore}
              isMulti
            />
          </div>

          {/* Message */}
          <div className="form-group mb-3">
            <FormField
              type="textarea"
              name="message"
              placeholder="Message"
              onChange={handleChange}
              value={formData.message}
            />
          </div>

          {/* Action */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              Assign Faculty
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OpenTicketsMain;
