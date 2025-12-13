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
import Loader from "../../Loader";

const AllTicketsMain = () => {
  const { confirm } = Modal;
  const router = useRouter();
  const { Option } = Select;

  const [state, setState] = useSetState({
    total: 0,
    currentPage: 1,
    currenCategoryPage: 1,
    hasCategoryLoadMore: null,
    currenStatusPage: 1,
    hasStatusLoadMore: null,
    currenFacultyPage: 1,
    hasFacultyLoadMore: null,
  });
  const [formData, setFormData] = useState({
    id: null,
    faculty_ids: [], // Initialize as an array
    message: "",
  });

  const [responseData, setResponseData] = useState({
    responce: "",
  });

  const [replyData, setReplyData] = useState({
    messages: "",
  });

  const [statusData, setStatusData] = useState({
    status_id: "",
    priority: "",
    due_date: "",
  });

  const [searchData, setSearchData] = useState({
    category: "",
    status_id: "",
    priority: "",
    due_date: "",
  });

  console.log("searchData", searchData);

  const [errMsg, setErrMsg] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
  const [replyModal, setReplyModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [departmentDatas, setDepartmentDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [categoryTicket, setCategoryTicket] = useState([]);
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

    const Faculty = localStorage.getItem("isFaculty");
    setIsFatulty(Faculty);

    // if (Admin !== "true" && AlumniManager !== "true" && isFatulty !== "true") {
    //   router.push("/");
    // }
  }, []);

  useEffect(() => {
    if (token && (isAdmin == "true" || isAlumniManager == "true")) {
      GetRole(1);
      GetFatulty(); // Fetch faculty on load
      GetStatus();
      GetCategoryList();
    } else if (token && isFatulty == "true") {
      GetFatultyAssignedTickets(1);
      GetStatus();
      GetCategoryList();
    }
  }, [token, isAdmin, isAlumniManager, isFatulty]);

  const GetRole = async (page) => {
    try {
      setLoading(true);
      const res = await Models.helpDesk.retrieve_ticket(page);
      setDepartmentDatas(res.results);
      setState({
        tocketList: res.results,
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

  console.log("facultyList", faculty);

  const GetStatus = async () => {
    try {
      setLoading(true);
      const res = await Models.masters.status();
      const dropdown = setDropdownData(res?.results, "status");
      setLoading(false);
      setStatusList(dropdown);

      setState({
        hasStatusLoadMore: res?.next,
      });
    } catch (error) {
      setLoading(false);
      console.log("❌error --->", error);
    }
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

  const statusListLoadMore = async () => {
    try {
      if (state.hasStatusLoadMore) {
        const res = await Models.masters.status(state.currenStatusPage + 1);

        const StatusOption = setDropdownData(res?.results, "status");

        setStatusList([...statusList, ...StatusOption]);
        setState({
          currenStatusPage: state.currenStatusPage + 1,
          hasStatusLoadMore: res.next,
        });
      } else {
        setStatusList(statusList);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  console.log("currenFacultyPage", state.currenFacultyPage);

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

  const GetFatultyAssignedTickets = async (page) => {
    try {
      setLoading(true);

      const res = await Models.helpDesk.facultyAssignedTickets(page);
      setDepartmentDatas(res.results);
      setState({
        tocketList: res.results,
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
      setLoading(false);

      console.log("✌️error --->", error);
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("handleStatusChange", statusData);

  const responseModalCancel = () => {
    setResponseModal(false);
    setResponseData({
      responce: "",
    });
  };

  const replyModalCancel = () => {
    setReplyModal(false);
    setReplyData({
      messages: "",
    });
  };

  const statusModalCancel = () => {
    setStatusModal(false);
    setStatusData({
      status_id: "",
      priority: "",
      due_date: "",
    });
  };

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
        GetRole(1);
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

  const openResponseModal = (item) => {
    setResponseModal(true);

    setResponseData({
      id: item.id,
      responce: item.responce,
    });
  };

  const handlereplyClick = (item) => {
    setReplyModal(true);
    setReplyData({
      id: item.ticket_id,
      messages: item.messages,
    });
  };

  const handleStatusClick = (item) => {
    setStatusModal(true);

    console.log("item", item);

    setStatusData({
      id: item.ticket_id,
      status_id: {
        value: item.status_id,
        label: item.status,
      },
      priority: item.priority,
      due_date: item.due_date,
    });
  };

  const handleFatultyResponseSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      responce: { required: true },
    };

    const isValid = validateForm(responseData, validationRules, setErrMsg);
    if (!isValid) return;

    axios
      .post(
        `${BaseURL}/respond_ticket/${responseData.id}/`,
        {
          responce: responseData.responce,
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
        setResponseModal(false);
        GetFatultyAssignedTickets(1);
        setResponseData({
          responce: "",
        });
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
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      messages: { required: true },
    };

    const isValid = validateForm(replyData, validationRules, setErrMsg);
    if (!isValid) return;

    axios
      .post(
        `${BaseURL}/reply_ticket/${replyData.id}/`,
        {
          messages: replyData.messages,
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
        setReplyModal(false);
        setReplyData({
          message: "",
        });
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
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();

    console.log("statusData", statusData);

    if (isAdmin == "true" || isAlumniManager == "true") {
      axios
        .post(
          `${BaseURL}/update_status/${statusData.id}/`,
          {
            status_id: statusData.status_id.value,
            priority: statusData.priority,
            due_date: statusData.due_date,
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
          setStatusModal(false);
          GetRole(1);
          setStatusData({
            status_id: "",
            priority: "",
            due_date: "",
          });
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
    } else if (isFatulty == "true") {
      axios
        .post(
          `${BaseURL}/update_status/${statusData.id}/`,
          {
            status_id: statusData.status_id,
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
          setStatusModal(false);
          GetRole(1);
          GetFatultyAssignedTickets(1);
          setStatusData({
            status_id: "",
          });
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
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchSubmit = async (page = 1, e) => {
   
    if (e) {
      e.preventDefault();
    }
    try {
       setLoading(true);
      const postData = {
        category: searchData.category.value,
        priority: searchData.priority,
        due_date: searchData.due_date,
      };

      if (isAdmin === "true" || isAlumniManager === "true") {
        postData.status_id = searchData.status_id.value;
      }

      const res = await Models.helpDesk.filter_ticket(postData, page);

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
      setStatusModal(false);
      setAllUserFilterFinalDataList(searchData);
       setLoading(false);
    } catch (error) {
      console.log("✌️error --->", error);
       setLoading(false);
    }
  };

  const HandleClearFilter = async (page) => {
    try {
       setLoading(true);
      const Body = {
        category: "",
        priority: "",
        due_date: "",
      };

      const res = await Models.helpDesk.filter_ticket(Body, page);

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
      setStatusModal(false);
      setAllUserFilterFinalDataList(Body);
      setSearchData({
        category: "",
        status_id: "",
        priority: "",
        due_date: "",
      });
       setLoading(false);
    } catch (error) {
      console.log("✌️error --->", error);
       setLoading(false);
    }
  };

  const StatusOption = statusList.map((item) => ({
    label: item.status,
    value: item.id,
  }));

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

  const handlePageChange = (number) => {
    const isFilter = bodyData();
    console.log("✌️isFilter --->", isFilter);
    if (isAdmin == "true" || isAlumniManager == "true") {
      if (isFilter) {
        console.log("✌️if --->");
        handleSearchSubmit(number);
      } else {
        console.log("✌️else --->");
        GetRole(number);
      }
    } else {
      if (isFilter) {
        handleSearchSubmit(number);
      } else {
        HandleClearFilter(number);
      }
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

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box helpdesk">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">All Tickets</h4>
          </div>

          <div className="rbt-dashboard-filter-wrapper">
            <div className="row g-5">
              <div
                className={`${
                  isAdmin === "true" || isAlumniManager === "true"
                    ? "col-lg-3"
                    : " col-lg-6"
                }`}
              >
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
              {(isAdmin == "true" || isAlumniManager == "true") && (
                <div className="col-lg-3">
                  <div className="filter-select rbt-modern-select">
                    <span className="select-label d-block">Status</span>
                    <FormField
                      type="loadMoreSelect"
                      name="status_id"
                      placeholder="Status"
                      className="p-0"
                      onChange={(e) => {
                        setSearchData({ ...searchData, status_id: e });
                      }}
                      value={searchData.status_id}
                      options={statusList}
                      loadMore={() => statusListLoadMore()}
                    />
                  </div>
                </div>
              )}

              <div className="col-lg-3">
                <div className=" rbt-modern-select">
                  <span className="select-label d-block">Priority</span>
                  <FormField
                    type="select"
                    name="priority"
                    placeholder="Priority"
                    className="priority-dd"
                    onChange={(e) => handleSearchChange(e)}
                    value={searchData.priority}
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
                    onChange={(e) => handleSearchChange(e)}
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

          <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
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
                        {departmentDatas.map((item) => (
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

                                {/* Reply */}
                                <a
                                  className="rbt-btn btn-xs bg-primary-opacity radius-round color-danger"
                                  href="#"
                                  title="Reply"
                                  onClick={() => handlereplyClick(item)}
                                >
                                  <i className="feather-message-circle" />
                                </a>

                                {/* Status */}
                                <a
                                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                                  href="#"
                                  title="Status"
                                  onClick={() => handleStatusClick(item)}
                                >
                                  <i className="feather-check-circle" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}

            {token && isFatulty == "true" && (
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
                        {departmentDatas.map((item) => (
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
                                {/* Reply */}

                                {item?.assignment_response ? (
                                  <a
                                    className="rbt-btn btn-xs bg-primary-opacity radius-round color-danger"
                                    href="#"
                                    title="Reply"
                                    style={{
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    <i className="feather-message-circle" />
                                  </a>
                                ) : (
                                  <a
                                    className="rbt-btn btn-xs bg-primary-opacity radius-round color-danger"
                                    href="#"
                                    title="Reply"
                                    onClick={() => {
                                      openResponseModal(item);
                                    }}
                                  >
                                    <i className="feather-message-circle" />
                                  </a>
                                )}

                                {/* Status */}
                                <a
                                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                                  href="#"
                                  title="Status"
                                  onClick={() => handleStatusClick(item)}
                                >
                                  <i className="feather-check-circle" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>
          {/* --- PAGINATION --- */}
          {departmentDatas?.length > 5 && (
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

      {/* --- Faculty Response Modal --- */}
      <Modal
        title={<div className="custom-modal-header">Faculty Response</div>}
        open={responseModal}
        onCancel={responseModalCancel}
        footer={false}
        centered
      >
        <form
          className="applicants-form"
          onSubmit={handleFatultyResponseSubmit}
        >
          {/* Response */}
          <div className="form-group mb-3">
            <FormField
              type="textarea"
              name="responce"
              placeholder="Response"
              onChange={handleResponseChange}
              value={responseData.responce}
              required={true}
              error={errMsg.responce}
            />
          </div>

          {/* Action */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {/* --- Reply Message Modal --- */}
      <Modal
        title={<div className="custom-modal-header">Reply Message</div>}
        open={replyModal}
        onCancel={replyModalCancel}
        footer={false}
        centered
      >
        <form className="applicants-form" onSubmit={handleReplySubmit}>
          {/* Message */}
          <div className="form-group mb-3">
            <FormField
              type="textarea"
              name="messages"
              placeholder="Message"
              onChange={handleReplyChange}
              value={replyData.messages}
              required={true}
              error={errMsg.messages}
            />
          </div>

          {/* Action */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title={<div className="custom-modal-header">Status Update</div>}
        open={statusModal}
        onCancel={statusModalCancel}
        footer={false}
        centered
      >
        {/* 4. Form Wrapper */}
        <form className="applicants-form" onSubmit={handleStatusSubmit}>
          {/* 5. Status Select (Load More) */}
          <div style={{ marginTop: "15px" }}>
            <FormField
              type="loadMoreSelect"
              name="status_id"
              label="Status"
              onChange={(e) => setStatusData({ ...statusData, status_id: e })}
              value={statusData.status_id}
              options={statusList}
              loadMore={() => statusListLoadMore()}
            />
          </div>

          {/* 6. Conditional Fields for Admin / Alumni Manager */}
          {(isAdmin === "true" || isAlumniManager === "true") && (
            <>
              {/* 6.1 Priority Dropdown */}
              <div style={{ marginTop: "15px" }}>
                <FormField
                  type="select"
                  name="priority"
                  label="Priority"
                  onChange={handleStatusChange}
                  value={statusData.priority}
                  options={PriorityOption}
                />
              </div>

              {/* 6.2 Due Date Picker */}
              <div style={{ marginTop: "15px" }}>
                <FormField
                  type="date"
                  name="due_date"
                  label="Due Date"
                  onChange={handleStatusChange}
                  value={statusData.due_date}
                />
              </div>
            </>
          )}

          {/* 7. Submit Button */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AllTicketsMain;
