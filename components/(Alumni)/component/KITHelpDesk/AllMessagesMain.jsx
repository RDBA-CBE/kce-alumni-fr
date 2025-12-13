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

const AllMessagesMain = () => {
  const { confirm } = Modal;
  const router = useRouter();

  const [searchData, setSearchData] = useState({
    category: "",
    // status_id: "",
    priority: "",
    due_date: "",
  });
  const [departmentDatas, setDepartmentDatas] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [categoryTicket, setCategoryTicket] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [allUserFilterFinalDataList, setAllUserFilterFinalDataList] = useState(
    []
  );
  const [state, setState] = useSetState({
    currenCategoryPage: 1,
    hasCategoryLoadMore: null,
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
      GetRole();
      GetCategoryList();
    }
  }, [token, isAdmin, isAlumniManager]);

  const GetRole = () => {
    setLoading(true);
    axios
      .get(`${BaseURL}/responced_ticket/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setDepartmentDatas(response.data?.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log("❌error --->", error);
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
        setLoading(true);
      });
  };

  const GetCategoryList = async () => {
    setLoading(true);

    try {
      const res = await Models.masters.GetTicketCategoryData(1);
      const CategoryOptions = res?.results.map((cou) => ({
        value: cou.id,
        label: cou.category,
      }));
      setCategoryTicket(CategoryOptions);
      setState({
        hasCategoryLoadMore: res?.next,
      });
      setLoading(false);
    } catch (error) {
      console.log("✌️error --->", error);
    }
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

  // table pagination
  // Calculate the number of pages
  const totalPages = Math.ceil(departmentDatas.length / itemsPerPage);

  // Slice the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = departmentDatas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (name, value) => {
    // const { name, value } = e.target;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchSubmitSubmit = (e) => {
    e.preventDefault();
    console.log("searchData", searchData);
    const Body = {
      category: searchData.category.value,
      // status_id: searchData.status_id,
      priority: searchData.priority,
      due_date: searchData.due_date,
    };
    axios
      .post(`${BaseURL}/replied_filter_ticket/`, Body)
      .then((response) => {
        setDepartmentDatas(response.data?.results);
        setAllUserFilterFinalDataList(searchData);
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

  const HandleClearFilter = () => {
    const Body = {
      category: "",
      priority: "",
      due_date: "",
    };
    axios
      .post(`${BaseURL}/replied_filter_ticket/`, Body)
      .then((response) => {
        setDepartmentDatas(response.data?.results);
        setAllUserFilterFinalDataList(Body);
        // GetRole();
        setSearchData({
          category: "",
          // status_id: "",
          priority: "",
          due_date: "",
        });
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

  const PriorityOption = Priority.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  // const FilterStatusName = statusList?.filter(
  //   (item) => item.id == allUserFilterFinalDataList.status_id
  // );

  const FilterPriorityName = Priority?.filter(
    (item) => item.id == allUserFilterFinalDataList.priority
  );

  const FilterCategoryName = categoryTicket?.filter(
    (item) => item.id == allUserFilterFinalDataList.category
  );

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
            <h4 className="rbt-title-style-3">All Messages</h4>
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
              <div className="col-lg-3  col-sm-12">
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
                  onClick={(e) => handleSearchSubmitSubmit(e)}
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
                          <p className="b3">{item.category}</p>
                        </th>
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
                              href={`/help-desk/ticket-detail/${item.ticket_id}`}
                              title="View"
                            >
                              <i className="feather-eye" />
                            </a>
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
        </div>
      </div>
    </>
  );
};

export default AllMessagesMain;
