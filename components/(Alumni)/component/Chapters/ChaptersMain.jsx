import React, { useEffect, useRef, useState } from "react";
import FormField from "@/commonComponents/FormFields";
import { Filter } from "react-feather";
import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import {
  objectToFormData,
  setDropdownData,
  useSetState,
} from "@/utils/commonFunction.utils";
import { message, Modal, Tooltip } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Models from "@/imports/models.import";
import Image from "next/image";
import Loader from "../../Loader";
import * as yup from "yup";
import { chapterValidate, userValidate } from "@/utils/validation.utils";
import chapter from "@/models/chapter.model";
import useDebounce from "@/commonComponents/useDebounce";
import Pagination from "@/commonComponents/Pagination";

const ChaptersMain = () => {
  const { confirm } = Modal;
  const router = useRouter();
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const fileInputRef = useRef(null);
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
    business_name: "",
    industry: "",
    location: "",
  });

  const [departmentList, setDepartmentList] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [myBusinessDirCount, setMyBusinessDirCount] = useState([]);
  const [allUserFilterFinalDataList, setAllUserFilterFinalDataList] = useState(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [faculty, setFaculty] = useState([]);
  const [createChapterModal, setcreateChapterModal] = useState(false);
  const [country, setCountry] = useState([]);
  const [location, setLocation] = useState([]);

  const pathname = usePathname();

  const [state, setState] = useSetState({
    currenIndustryPage: 1,
    hasIndustryLoadMore: null,
    pageLoading: false,
    chapter_name: "",
    chapter_type: null,
    city: null,
    state: null,
    country: null,
    users: null,
    chapter_image: null,
    country_code: [],
    errors: null,
    chapterList: [],
    currenLocationPage: 1,
    hasLocationLoadMore: null,
    currenUserPage: null,
    hasUserLoadMore: null,
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

    const Faculty = localStorage.getItem("isFaculty");
    setIsFatulty(Faculty);
  }, []);

  useEffect(() => {
    if (token) {
      // getJobsAdmin();
      GetDepartmentList();
      MyBusinessDirectory();
      countryList();
      chapterList();
      locationList();
      userList(1);
    }
  }, [token]);

  const debouncesearch = useDebounce(state.filter_search);

  useEffect(() => {
    if (token) {
      chapterList();
    }
  }, [state.filter_country, state.filter_location, debouncesearch]);

  useEffect(() => {
    if (token && (isAdmin == "true" || isAlumniManager == "true")) {
      GetFatulty();
    }
  }, [token, isAdmin, isAlumniManager, isFatulty]);

  const MyBusinessDirectory = () => {
    axios
      .get(`${BaseURL}/my_business_directory/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyBusinessDirCount(response.data.results);
      })
      .catch((error) => {
        console.log("❌error --->", error);
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const countryList = async () => {
    try {
      const res = await Models.masters.GetCountryList(1);

      const countryOptions = res?.results?.map((cou) => ({
        value: cou.id,
        label: cou.country_name,
      }));
      setCountry(countryOptions);
      setState({
        hasCountryLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const CountryListLoadMore = async () => {
    try {
      if (state.hasCountryLoadMore) {
        const res = await Models.masters.GetCountryList(
          state.currenCountryPage + 1
        );

        const countryOptions = res?.results?.map((cou) => ({
          value: cou.id,
          label: cou.country_name,
        }));

        setCountry([...country, ...countryOptions]);
        setState({
          currenCountryPage: state.currenCountryPage + 1,
          hasCountryLoadMore: res.next,
        });
      } else {
        setCountry(country);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const userList = async (page = 1) => {
    try {
      setState({ ...state, loading: true });

      const res = await Models.member.users(page);
      const dropdown = setDropdownData(res?.results, "username");

      setState({
        ...state,
        userList: dropdown,
        currentUserPage: page,
        hasUserLoadMore: !!res.next,
        total: res?.count,
        loading: false,
      });
    } catch (error) {
      setState({ ...state, loading: false });
      console.log("✌️error --->", error);
    }
  };

  const userListLoadMore = async () => {
    try {
      if (state.hasUserLoadMore) {
        const res = await Models.member.users(state.currentUserPage + 1);
        const UserOption = setDropdownData(res?.results, "username");

        setState({
          ...state,
          userList: [...state.userList, ...UserOption],
          currentUserPage: state.currentUserPage + 1,
          hasUserLoadMore: !!res.next,
        });
      } else {
        // no more results
        setState({ ...state });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const locationList = async () => {
    try {
      setState({ loading: true });
      const res = await Models.job.locationList();
      const dropdown = setDropdownData(res?.results, "location");

      setLocation(dropdown);

      setState({ loading: false, hasLocationLoadMore: res?.next });
    } catch (error) {
      setState({ loading: false });
      console.log("✌️error --->", error);
    }
  };

  const locationListLoadMore = async () => {
    try {
      if (state.hasLocationLoadMore) {
        const res = await Models.job.locationList(state.currenLocationPage + 1);

        const LocationOption = setDropdownData(res?.results, "location");

        setLocation([...location, ...LocationOption]);
        setState({
          currenLocationPage: state.currenLocationPage + 1,
          hasLocationLoadMore: res.next,
        });
      } else {
        setLocation(location);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const GetDepartmentList = async () => {
    try {
      const res = await Models.job.industryList();

      const dropdown = setDropdownData(res?.results, "title");

      setDepartmentList(dropdown);
      setState({
        hasIndustryLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleEditClick = (item) => {
    setcreateChapterModal(true);
    setState({
      chapter_name: item?.name,
      country_id: {
        value: item?.country?.id,
        label: item?.country?.country_name,
      },
      location_id: {
        value: item?.location?.id,
        label: item?.location?.location,
      },
      description: item?.description,
      chapter_id: item.id,
      preview: item?.image,
    });
  };

  const startIndexForAdmin = (currentPage - 1) * itemsPerPage;
  const currentDataForAdmin = filteredData.slice(
    startIndexForAdmin,
    startIndexForAdmin + itemsPerPage
  );

  const bodyData = () => {
    const body = {};
    if (state.filter_search) {
      body.name = state.filter_search;
    }
    if (state.filter_location) {
      body.location = state.filter_location.value;
    }
    if (state.filter_country) {
      body.country = state.filter_country?.value;
    }

    return body;
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

  const chapterList = async (page = 1) => {
    try {
      setState({
        pageLoading: true,
      });

      const body = bodyData();
      const res = await Models.chapter.list(page, body);
      console.log("✌️res --->", res);

      setState({
        chapterList: res?.results,
        pageLoading: false,
        total: res?.count,
        currentPage: page,
      });
      setFilteredData(res?.results);
    } catch (error) {
      console.log("✌️error --->", error);
      setState({
        pageLoading: false,
      });
    }
  };

  const createchapter = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: state.chapter_name,
        description: state.description,
        country_id: state.country_id.value,
        location_id: state.location_id.value,
        image: state.image,
      };
      const formdata = objectToFormData(body);

      await chapterValidate.validate(body, {
        abortEarly: false,
      });
      if (state.chapter_id) {
        if (state.image && typeof state.image !== "string") {
          delete body.image;
        } else {
          body.image = state.image;
        }
        const res = await Models.chapter.update(state.chapter_id, formdata);
        setcreateChapterModal(false);
        message.success("Chapter updated successfully");
      } else {
        const res = await Models.chapter.create(formdata);
        message.success("Chapter created successfully");
        setcreateChapterModal(false);
      }
      chapterList();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });

        setState({ errors: validationErrors });
        console.log("errors", validationErrors);
        return message.error("Please fill the required fields");
      } else {
        console.log("error: ", error);
        setcreateChapterModal(false);
      }
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        users: state.users?.map((item) => item?.value),
        chapter_id: state.chapter_id,
      };

      const validateBody = {
        users: state.users,
      };

      await userValidate.validate(validateBody, {
        abortEarly: false,
      });

      await Models.chapter.adduser(body);

      message.success("Users added successfully");
      setIsModalOpen(false);
      setState({ users: [] });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};

        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });

        setState({ ...state, errors: validationErrors });

        return message.error("Please fill the required fields");
      }

      // Server or unknown error
      message.error("Something went wrong. Try again.");
    }
  };

  const joinUser = async (item) => {
    try {
      const res = localStorage.getItem("user_id");

      const body = {
        users: [res],
        chapter_id: item?.id,
      };
      const response = await Models.chapter.adduser(body);
      message.success("Users added successfully");
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleChange = (e) => {
    setState({ image: e.target.files[0], preview: null });
  };

  const handleDeleteImage = () => {
    setState({
      preview: null,
      image: null,
    });
  };

  const handlePageChange = (number) => {
    setState({ currentPage: number });
    chapterList(number);

    return number;
  };

  if (state.pageLoading) {
    return <Loader />; // Show loader while checking token
  }

  return (
    <>
      <div className="rbt-dashboard-area section-pad">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-11 col-xl-10 con-wid">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="d-flex justify-content-between ">
                          <h5>
                            Filter
                            <Filter
                              style={{
                                marginLeft: "4px",
                                color: "#192335",
                                height: "18px",
                                width: "18px",
                              }}
                            />
                          </h5>
                          {(isAdmin === "true" ||
                            isAlumniManager === "true") && (
                            <Link
                              className="rbt-btn btn-gradient radius-round sm-btn"
                              href="#"
                              onClick={() => {
                                setcreateChapterModal(true);
                                setState({
                                  chapter_name: "",
                                  country_id: "",
                                  location_id: "",
                                  description: "",
                                  chapter_id: "",
                                  preview: "",
                                });
                              }}
                            >
                              Add a Chapter
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row g-5">
                      {/* --------------------sidebar start--------------------- */}

                      <div className="col-lg-3 d-sidebar">
                        <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
                          <div className="inner">
                            <div className="content-item-content">
                              <div className="rbt-default-sidebar-wrapper">
                                <nav className="mainmenu-nav">
                                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    <li
                                      className="nav-item"
                                      role="presentation"
                                    >
                                      <a
                                        className={`w-100 ${
                                          pathname === "#" ? "active" : ""
                                        }`}
                                        href="#"
                                      >
                                        <FormField
                                          type="loadMoreSelect"
                                          name="country"
                                          value={state.filter_country}
                                          onChange={(e) => {
                                            setState({
                                              filter_country: e,
                                            });
                                          }}
                                          className="member-dd"
                                          placeholder={"Country"}
                                          options={country}
                                          required={true}
                                          loadMore={CountryListLoadMore}
                                        />
                                      </a>
                                    </li>

                                    <li
                                      className="nav-item"
                                      role="presentation"
                                    >
                                      <a
                                        className={`w-100 ${
                                          pathname === "#" ? "active" : ""
                                        }`}
                                        href="#"
                                      >
                                        <FormField
                                          type="loadMoreSelect"
                                          name="location"
                                          value={state.filter_location}
                                          onChange={(e) => {
                                            setState({
                                              filter_location: e,
                                            });
                                          }}
                                          className="member-dd"
                                          placeholder={"Location"}
                                          options={location}
                                          required={true}
                                          loadMore={locationListLoadMore}
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </nav>

                                {/* <div
                                  className=" d-flex flex-wrap mt-5"
                                  style={{ columnGap: "10px", rowGap: "8px" }}
                                >
                                  <Link
                                    className="rbt-btn btn-gradient radius-round sm-btn"
                                    href="#"
                                    onClick={handleFiltersSubmit}
                                  >
                                    Filter
                                  </Link>
                                  <Link
                                    className="rbt-btn btn-border-gradient radius-round sm-btn"
                                    href="#"
                                    onClick={handleClearFilter}
                                  >
                                    Clear all
                                  </Link>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------------------sidebar end--------------------- */}

                      {/* --------------------table start--------------------- */}

                      <div className="col-lg-9">
                        {state.pageLoading ? (
                          <Loader />
                        ) : (
                          <>
                            <div className="rbt-elements-area bg-color-extra2 mb-5">
                              <div className="container-fluid">
                                <div className="row p-0">
                                  <div className="col-lg-12 p-0">
                                    <div
                                      action="#"
                                      className="rbt-search-style-1"
                                    >
                                      <input
                                        type="text"
                                        placeholder="Search Chapters with Chapter title"
                                        // name="search_filter"
                                        value={state.filter_search}
                                        onChange={(e) =>
                                          setState({
                                            filter_search: e.target.value,
                                          })
                                        }
                                      />
                                      <button className="search-btn">
                                        <i className="feather-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className="rbt-callto-action rbt-cta-default style-2">
                              <div className="content-wrapper overflow-hidden bg-blue">
                                <div className="row gy-5 align-items-end">
                                  <div className="col-lg-8">
                                    <div className="inner">
                                      <div className="content text-left">
                                        <h5 className="mb--5">
                                          {AdminDataLists.length} Business Found
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                                    <div className="call-to-btn text-start text-lg-end position-relative">
                                      <Link
                                        className="rbt-btn btn-gradient radius-round sm-btn"
                                        href="/my-business-directory"
                                      >
                                        <span data-text="Add New Announcement">
                                          My Business Directory
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}

                            <div className="rbt-dashboard-content p-0 mt-5 mb-2">
                              {!currentDataForAdmin.length > 0 ? (
                                <div className=" album-none">
                                  <h5>No Data Found</h5>
                                </div>
                              ) : (
                                <div className="content">
                                  <div className="section-title">
                                    <h4 className="rbt-title-style-3 mb-2">
                                      Chapters List
                                    </h4>
                                  </div>

                                  <div className="rbt-dashboard-table table-responsive mobile-table-750">
                                    <div className="row g-5 m-0">
                                      {currentDataForAdmin.map(
                                        (item, index) => (
                                          <div
                                            className="col-lg-6 col-12"
                                            key={index}
                                          >
                                            <div
                                              className="rbt-card card-list-2 event-list-card variation-01 rbt-hover relative"
                                              style={{ position: "relative" }}
                                            >
                                              {/* Edit Icon in Top Right */}
                                              {isAdmin == "true" ||
                                              isAlumniManager == "true" ? (
                                                <div
                                                  className="rbt-button-group"
                                                  style={{
                                                    position: "absolute",
                                                    top: "15px",
                                                    right: "15px",
                                                    zIndex: 10,
                                                  }}
                                                >
                                                  <button
                                                    className="rbt-btn btn-xs bg-primary-opacity radius-round"
                                                    title="Edit"
                                                    onClick={() =>
                                                      handleEditClick(item)
                                                    }
                                                  >
                                                    <i className="feather-edit pl--0" />
                                                  </button>

                                                  <button
                                                    className="rbt-btn btn-xs bg-primary-opacity radius-round"
                                                    title="Add Users"
                                                    onClick={() => {
                                                      setIsModalOpen(true);
                                                      setState({
                                                        ...state,
                                                        chapter_id: item.id,
                                                      });
                                                    }}
                                                  >
                                                    <i className="feather-plus-circle pl--3" />
                                                  </button>
                                                </div>
                                              ) : isFatulty ==
                                                "true" ? null : (
                                                <div
                                                  style={{
                                                    position: "absolute",
                                                    top: "15px",
                                                    right: "15px",
                                                    zIndex: 10,
                                                  }}
                                                >
                                                  <div
                                                    className="rbt-btn btn-xs btn-gradient radius-round"
                                                    onClick={() =>
                                                      joinUser(item)
                                                    }
                                                  >
                                                    Join
                                                  </div>
                                                </div>
                                              )}

                                              <div className="rbt-card-img">
                                                <Link
                                                  href={`/chapter-detail/${item.id}`}
                                                >
                                                  <img
                                                    src={
                                                      item?.image ??
                                                      "/images/event/grid-type-01.jpg"
                                                    }
                                                    width={355}
                                                    height={240}
                                                    
                                                    alt="Card image"
                                                    style={{
                                                      objectFit: "contain",
                                                      overflow: "hidden",
                                                      height: "100px",
                                                      width: "240px",
                                                    }}
                                                  />
                                                </Link>
                                              </div>

                                              <div className="rbt-card-body">
                                                <ul className="rbt-meta">
                                                  <li>
                                                    <i className="feather-map-pin"></i>
                                                    {item?.location?.location}
                                                  </li>
                                                </ul>
                                                <h4 className="rbt-card-title">
                                                  <Link
                                                    href={`chapter-detail/${item.id}`}
                                                  >
                                                    {item?.name}
                                                  </Link>
                                                </h4>
                                                <p
                                                  className="text-gray mt--dec-40"
                                                  style={{ fontSize: "16px" }}
                                                >
                                                  {" "}
                                                  Chapter Type -{" "}
                                                  {item?.chapter_type}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* --------------------table end--------------------- */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {state?.chapterList.length > 9 && ( */}
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
        {/* )} */}
      </div>

      <Modal
        title={<div className="custom-modal-header">Add Users</div>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        centered
      >
        <form className="applicants-form" onSubmit={handleUserSubmit}>
          {/* Faculty Selection */}
          <div className="form-group mb-3">
            <FormField
              label="Add User"
              type="loadMoreSelect"
              name="users"
              value={state.users}
              onChange={(e) => setState({ ...state, users: e })}
              error={errMsg.users}
              options={state.userList}
              loadMore={userListLoadMore}
              required={true}
              isMulti
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
        title={<div className="custom-modal-header">Create Chapter</div>}
        open={createChapterModal}
        onCancel={() => setcreateChapterModal(false)}
        footer={false}
        centered
      >
        <form className="applicants-form" onSubmit={(e) => createchapter(e)}>
          {/* Faculty Selection */}
          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
              name="chapter_name"
              label="Chapter Name"
              required
              value={state.chapter_name}
              onChange={(e) => {
                setState({ ...state, chapter_name: e.target.value });
              }}
              className={"mb-3"}
              style={{ width: "100%" }}
              error={state.errors?.name}
            />
          </div>

          <FormField
            label="Country"
            type="loadMoreSelect"
            name="country_code"
            value={state.country_id}
            onChange={(e) => {
              setState({ ...state, country_id: e });
            }}
            error={state.errors?.country_id}
            className={"mb-3"}
            options={country}
            required={true}
            loadMore={CountryListLoadMore}
          />

          <FormField
            label="Location"
            type="loadMoreSelect"
            name="location"
            value={state.location_id}
            onChange={(e) => {
              setState({ ...state, location_id: e });
            }}
            error={state.errors?.location_id}
            className={"mb-3"}
            options={location}
            required={true}
            loadMore={locationListLoadMore}
          />

          <div className="form-group">
            <FormField
              label="image"
              placeholder="image"
              type="file"
              name="image"
              ref={fileInputRef}
              key={fileInputKey}
              error={errMsg.logo}
              onChange={(e) => handleChange(e)}
              accept="image/*,application/pdf"
              required={true}
              className="file-input"
            />
            <span className="focus-border"></span>
            {state.preview && (
              <div
                style={{
                  marginLeft: "10px",
                  width: "100px",
                  height: "80px",
                  position: "relative",
                }}
              >
                {state.preview && (
                  <div
                    style={{
                      marginLeft: "10px",
                      width: "100px",
                      height: "80px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={state.preview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        fontSize: "20px",
                      }}
                    >
                      {/* <DeleteOutlined /> */}
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                    fontSize: "20px",
                  }}
                >
                  <DeleteOutlined />
                </button>
              </div>
            )}
          </div>

          <FormField
            label="Description"
            type="textarea"
            name="description"
            value={state.description}
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
            }}
            error={state?.errors?.description}
            required={true}
          />

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
    </>
  );
};

export default ChaptersMain;
