"use client";

import Link from "next/link";
import Courses from "../../../../data/dashboard/instructor/instructor.json";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GalleryData from "../../../../data/elements/gallery.json";
import { useRouter } from "next/navigation";
import {
  capitalizeFLetter,
  ConvertFormData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import { message, Modal, Select, Spin, Tooltip } from "antd";
import {
  PoweroffOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FormField from "@/commonComponents/FormFields";
import Pagination from "@/commonComponents/Pagination";

const PAGE_SIZE = 12;

const fetchAllPages = async (fetchPage) => {
  const results = [];
  let response = await fetchPage(1);
  let total = Number(response?.count ?? 0);
  let pageCount = 0;

  while (response) {
    results.push(...(response.results || []));
    pageCount += 1;

    if (!response.next) break;

    response = await fetchPage(pageCount + 1);
  }

  return { results, total, maxPage: pageCount };
};

const MyGalleryLoginMain = () => {
  const [discountPercentage, setDiscountPercentage] = useState({});
  const [totalReviews, setTotalReviews] = useState({});
  const [rating, setRating] = useState({});
  const [activeTab, setActiveTab] = useState("album");
  const [albumSubTab, setAlbumSubTab] = useState("active");
  const [memoriesSubTab, setMemoriesSubTab] = useState("active");
  const [approvedFilter, setApprovedFilter] = useState("true");
  const [pageLoading, setPageLoading] = useState(false);
  const [counts, setCounts] = useState({
    activeAlbum: 0,
    archiveAlbum: 0,
    activeMemories: 0,
    archiveMemories: 0,
  });

  // Calculate discount, reviews, ratings for each course
  useEffect(() => {
    const discountObj = {};
    const reviewsObj = {};
    const ratingObj = {};

    Courses.forEach((course) => {
      // discount
      let discount = course.coursePrice * ((100 - course.offerPrice) / 100);
      discountObj[course.id] = discount.toFixed(0);

      // reviews
      let reviews =
        course.reviews.oneStar +
        course.reviews.twoStar +
        course.reviews.threeStar +
        course.reviews.fourStar +
        course.reviews.fiveStar;
      reviewsObj[course.id] = reviews;

      // rating
      ratingObj[course.id] = course.rating.average.toFixed(0);
    });

    setDiscountPercentage(discountObj);
    setTotalReviews(reviewsObj);
    setRating(ratingObj);
  }, [Courses]);

  // -----------------------------------------

  const router = useRouter();

  const fileInputRef = useRef(null);

  const [state, setState] = useSetState({
    isOpen: false,
    name: "",
    description: "",
    location: "",
    date: "",
    whoCanView: null,
    error: {},
    public_view: "Public",
    currentPage: 1,
    activeTab: 0,
    memoriesList: [],
    memoriescurrentPage: 1,
    memoriesnext: undefined,
    memoriesprevious: null,
    memoriestotal: null,
    isMemoriesOpen: false,
    uploadedImages: [],
  });



  const fetchCounts = async (tab = activeTab, approved = approvedFilter) => {
    try {
      const isAdmin =
        typeof window !== "undefined" &&
        (String(localStorage.getItem("isAdmin")).toLowerCase() === "true" ||
          localStorage.getItem("isAdmin") === true);

      const isApprovedBool = approved === "true" || approved === true;

      if (tab === "album") {
        const baseParams = {
          is_approved: isApprovedBool,
        };
        if (!isAdmin) {
          baseParams.is_owner = true;
        }

        const [activeRes, archiveRes] = await Promise.all([
          Models.gallery.albumList(1, { ...baseParams, is_active: true }),
          Models.gallery.albumList(1, { ...baseParams, is_active: false }),
        ]);
        setCounts((prev) => ({
          ...prev,
          activeAlbum: Number(activeRes?.count ?? activeRes?.results?.length ?? 0),
          archiveAlbum: Number(archiveRes?.count ?? archiveRes?.results?.length ?? 0),
        }));
      } else {
        const baseParams = {
          approved: isApprovedBool,
          is_approved: isApprovedBool,
        };
        if (!isAdmin) {
          baseParams.is_owner = true;
        }

        const [activeRes, archiveRes] = await Promise.all([
          Models.gallery.memoriesList(1, { ...baseParams, is_active: true }),
          Models.gallery.memoriesList(1, { ...baseParams, is_active: false }),
        ]);
        setCounts((prev) => ({
          ...prev,
          activeMemories: Number(activeRes?.count ?? activeRes?.results?.length ?? 0),
          archiveMemories: Number(archiveRes?.count ?? archiveRes?.results?.length ?? 0),
        }));
      }
    } catch (err) {
      console.log("Error fetching tab counts:", err);
    }
  };

  useEffect(() => {
    const tabs = localStorage.getItem("memoriesBack");
    if (tabs) {
      setActiveTab("memories");
      localStorage.removeItem("memoriesBack");
      memoriesList(1, "active", "true");
      fetchCounts("memories", "true");
    } else {
      albumList(1, "active", "true");
      fetchCounts("album", "true");
    }
  }, []);

  const albumList = async (
    page = 1,
    subTab = albumSubTab,
    approved = approvedFilter
  ) => {
    try {
      setPageLoading(true);
      const isAdmin =
        typeof window !== "undefined" &&
        (String(localStorage.getItem("isAdmin")).toLowerCase() === "true" ||
          localStorage.getItem("isAdmin") === true);

      const params = {
        is_active: subTab === "active",
        is_approved: approved === "true" || approved === true,
      };

      if (!isAdmin) {
        params.is_owner = true;
      }

      const { results, total, maxPage } = await fetchAllPages((pageNumber) =>
        Models.gallery.albumList(pageNumber, params)
      );
      setState({
        albumList: results,
        currentPage: page,
        next: undefined,
        total: results?.length ?? total,
        maxPage: Math.ceil((results?.length || 0) / PAGE_SIZE) || maxPage,
      });
      setCounts((prev) => ({
        ...prev,
        [subTab === "active" ? "activeAlbum" : "archiveAlbum"]: Number(
          results?.length ?? total ?? 0
        ),
      }));
    } catch (error) {
      if (error?.data?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.log("error: ", error);
    } finally {
      setPageLoading(false);
    }
  };

  const memoriesList = async (
    page = 1,
    subTab = memoriesSubTab,
    approved = approvedFilter
  ) => {
    try {
      setPageLoading(true);
      const isAdmin =
        typeof window !== "undefined" &&
        (String(localStorage.getItem("isAdmin")).toLowerCase() === "true" ||
          localStorage.getItem("isAdmin") === true);

      const params = {
        is_active: subTab === "active",
        approved: approved === "true" || approved === true,
        is_approved: approved === "true" || approved === true,
      };

      if (!isAdmin) {
        params.is_owner = true;
      }

      const { results, total, maxPage } = await fetchAllPages((pageNumber) =>
        Models.gallery.memoriesList(pageNumber, params)
      );
      setState({
        memoriesList: results,
        memoriescurrentPage: page,
        memoriesnext: undefined,
        memoriestotal: results?.length ?? total,
        memoriesMaxPage: Math.ceil((results?.length || 0) / PAGE_SIZE) || maxPage,
      });
      setCounts((prev) => ({
        ...prev,
        [subTab === "active" ? "activeMemories" : "archiveMemories"]: Number(
          results?.length ?? total ?? 0
        ),
      }));
    } catch (error) {
      if (error?.data?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.log("error: ", error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleAlbumSubTabChange = (sub) => {
    setAlbumSubTab(sub);
    setState({ currentPage: 1 });
    albumList(1, sub, approvedFilter);
    fetchCounts("album", approvedFilter);
  };

  const handleMemoriesSubTabChange = (sub) => {
    setMemoriesSubTab(sub);
    setState({ memoriescurrentPage: 1 });
    memoriesList(1, sub, approvedFilter);
    fetchCounts("memories", approvedFilter);
  };

  const handleApprovedFilterChange = (value) => {
    setApprovedFilter(value);
    if (activeTab === "album") {
      setState({ currentPage: 1 });
      albumList(1, albumSubTab, value);
      fetchCounts("album", value);
    } else {
      setState({ memoriescurrentPage: 1 });
      memoriesList(1, memoriesSubTab, value);
      fetchCounts("memories", value);
    }
  };

  const handleMainTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "album") {
      albumList(1, albumSubTab, approvedFilter);
      fetchCounts("album", approvedFilter);
    } else if (tab === "memories") {
      memoriesList(1, memoriesSubTab, approvedFilter);
      fetchCounts("memories", approvedFilter);
    }
  };

  const { confirm } = Modal;

  const isItemActive = (item, subTab) => {
    if (item?.is_active !== undefined && item?.is_active !== null) {
      return item.is_active === true || item.is_active === "true" || item.is_active === 1;
    }
    return subTab === "active";
  };

  const isItemApproved = (item, filter) => {
    const val = item?.is_approved ?? item?.approved;
    if (val !== undefined && val !== null) {
      return val === true || val === "true" || val === 1;
    }
    return filter === "true";
  };

  const isAdminUser = (item) => {
    return (
      item?.is_admin === true ||
      item?.is_admin === "true" ||
      item?.is_admin === 1 ||
      (typeof window !== "undefined" &&
        (String(localStorage.getItem("isAdmin")).toLowerCase() === "true" ||
          localStorage.getItem("isAdmin") === true))
    );
  };

  const handleToggleAlbumActive = (data) => {
    const currentActive = isItemActive(data, albumSubTab);
    const nextActive = !currentActive;
    confirm({
      title: currentActive
        ? "Are you sure you want to Inactivate this Album?"
        : "Are you sure you want to Activate this Album?",
      okText: currentActive ? "InActive" : "Active",
      okType: currentActive ? "danger" : "primary",
      okButtonProps: currentActive
        ? {
          style: {
            borderRadius: "8px",
          },
        }
        : {
          className: "gallery-confirm-btn",
          style: {
            background: "linear-gradient(90deg, #cc7539, #d76239)",
            borderColor: "transparent",
            color: "#ffffff",
            borderRadius: "8px",
          },
        },
      cancelButtonProps: {
        className: "gallery-cancel-btn",
        style: {
          borderRadius: "8px",
        },
      },
      async onOk() {
        try {
          const formData = new FormData();
          formData.append("is_active", nextActive);
          await Models.gallery.updateAlbum(data.id, formData);
          message.success(
            `Album ${nextActive ? "activated" : "inactivated"} successfully`
          );
          await albumList(state.currentPage, albumSubTab, approvedFilter);
          fetchCounts("album", approvedFilter);
        } catch (error) {
          console.log("error: ", error);
          message.error("Failed to update album status");
        }
      },
    });
  };

  const handleToggleAlbumApproval = (data) => {
    const currentApproved = isItemApproved(data, approvedFilter);
    const nextApproved = !currentApproved;
    confirm({
      title: currentApproved
        ? "Are you sure you want to Unapprove this Album?"
        : "Are you sure you want to Approve this Album?",
      okText: currentApproved ? "Unapprove" : "Approve",
      okType: currentApproved ? "danger" : "primary",
      okButtonProps: currentApproved
        ? {
          style: {
            borderRadius: "8px",
          },
        }
        : {
          className: "gallery-confirm-btn",
          style: {
            background: "linear-gradient(90deg, #cc7539, #d76239)",
            borderColor: "transparent",
            color: "#ffffff",
            borderRadius: "8px",
          },
        },
      cancelButtonProps: {
        className: "gallery-cancel-btn",
        style: {
          borderRadius: "8px",
        },
      },
      async onOk() {
        try {
          const formData = new FormData();
          formData.append("is_approved", nextApproved);
          await Models.gallery.updateAlbum(data.id, formData);
          message.success(
            `Album ${nextApproved ? "approved" : "unapproved"} successfully`
          );
          await albumList(state.currentPage, albumSubTab, approvedFilter);
          fetchCounts("album", approvedFilter);
        } catch (error) {
          console.log("error: ", error);
          message.error("Failed to update album approval status");
        }
      },
    });
  };

  const handleToggleMemoriesActive = (data) => {
    const currentActive = isItemActive(data, memoriesSubTab);
    const nextActive = !currentActive;
    confirm({
      title: currentActive
        ? "Are you sure you want to Inactivate this Memory?"
        : "Are you sure you want to Activate this Memory?",
      okText: currentActive ? "InActive" : "Active",
      okType: currentActive ? "danger" : "primary",
      okButtonProps: currentActive
        ? {
          style: {
            borderRadius: "8px",
          },
        }
        : {
          className: "gallery-confirm-btn",
          style: {
            background: "linear-gradient(90deg, #cc7539, #d76239)",
            borderColor: "transparent",
            color: "#ffffff",
            borderRadius: "8px",
          },
        },
      cancelButtonProps: {
        className: "gallery-cancel-btn",
        style: {
          borderRadius: "8px",
        },
      },
      async onOk() {
        try {
          const formData = new FormData();
          formData.append("is_active", nextActive);
          await Models.gallery.updateMemories(data.id, formData);
          message.success(
            `Memory ${nextActive ? "activated" : "inactivated"} successfully`
          );
          await memoriesList(
            state.memoriescurrentPage,
            memoriesSubTab,
            approvedFilter
          );
          fetchCounts("memories", approvedFilter);
        } catch (error) {
          console.log("error: ", error);
          message.error("Failed to update memory status");
        }
      },
    });
  };

  const handleToggleMemoriesApproval = (data) => {
    const currentApproved = isItemApproved(data, approvedFilter);
    const nextApproved = !currentApproved;
    confirm({
      title: currentApproved
        ? "Are you sure you want to Unapprove this Memory?"
        : "Are you sure you want to Approve this Memory?",
      okText: currentApproved ? "Unapprove" : "Approve",
      okType: currentApproved ? "danger" : "primary",
      okButtonProps: currentApproved
        ? {
          style: {
            borderRadius: "8px",
          },
        }
        : {
          className: "gallery-confirm-btn",
          style: {
            background: "linear-gradient(90deg, #cc7539, #d76239)",
            borderColor: "transparent",
            color: "#ffffff",
            borderRadius: "8px",
          },
        },
      cancelButtonProps: {
        className: "gallery-cancel-btn",
        style: {
          borderRadius: "8px",
        },
      },
      async onOk() {
        try {
          const formData = new FormData();
          formData.append("is_approved", nextApproved);
          await Models.gallery.updateMemories(data.id, formData);
          message.success(
            `Memory ${nextApproved ? "approved" : "unapproved"} successfully`
          );
          await memoriesList(
            state.memoriescurrentPage,
            memoriesSubTab,
            approvedFilter
          );
          fetchCounts("memories", approvedFilter);
        } catch (error) {
          console.log("error: ", error);
          message.error("Failed to update memory approval status");
        }
      },
    });
  };

  const handleCancel = () => {
    setState({
      album_name: "",
      description: "",
      album_location: "",
      album_date: "",
      public_view: "Public",
      error: {},
      isOpen: false,
      isMemoriesOpen: false,
      uploadedImages: [],
    });
  };

  const createAlbum = async (e) => {
    e.preventDefault();
    try {
      setState({ btnLoadng: true });
      const isAdmin =
        typeof window !== "undefined" &&
        (String(localStorage.getItem("isAdmin")).toLowerCase() === "true" ||
          localStorage.getItem("isAdmin") === true);

      const body = {
        album_name: state.album_name,
        description: state.description,
        album_location: state.album_location,
        album_date: state.album_date ? state.album_date : "",
        public_view: state.public_view == "Public" ? "True" : "False",
        is_approved: isAdmin ? true : false,
        is_active: true
      };
      console.log("✌️body --->", body);

      const validationRules = {
        album_name: { required: true },
        public_view: { required: true },
        album_date: { required: true },
      };
      const isValid = validateForm(body, validationRules, errorFun);
      console.log("✌️isValid --->", isValid);
      if (isValid) {
        const formData = ConvertFormData(body);
        const res = await Models.gallery.createAlbum(formData);
        console.log("✌️res --->", res);
        message.success("Album Created Successfully");
        await albumList(1, albumSubTab, approvedFilter);
        fetchCounts("album", approvedFilter);
        setState({
          album_name: "",
          description: "",
          album_location: "",
          album_date: "",
          public_view: "Public",
          error: {},
        });

        setState({ btnLoadng: false, isOpen: false });
      } else {
        setState({ btnLoadng: false });
      }
      if (!isValid) return;
      console.log("body: ", body);
    } catch (error) {
      if (error?.data?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      setState({ btnLoadng: false });

      console.log("error: ", error);
    }
  };

  const errorFun = (errors) => {
    setState({ error: errors });
  };

  const handlePageChange = (number) => {
    setState({ currentPage: number });
    window.scrollTo({ top: 0, behavior: "smooth" });

    return number;
  };

  const handleMPageChange = (number) => {
    setState({ memoriescurrentPage: number });
    window.scrollTo({ top: 0, behavior: "smooth" });

    return number;
  };

  const tabs = [
    {
      value: "album",
      label: "album",
    },
    {
      value: "memories",
      label: "memories",
    },
  ];

  const handleFileChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files);
    const newImages = imageArray.filter((image) => {
      return !state.uploadedImages.some(
        (uploadedImage) =>
          uploadedImage.name === image.name &&
          uploadedImage.lastModified === image.lastModified
      );
    });
    setState({ uploadedImages: [...state.uploadedImages, ...newImages] });
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    const updatedImages = state.uploadedImages.filter((_, i) => i !== index);
    setState({ uploadedImages: updatedImages });
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const years = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => {
    const year = 1900 + i;
    return { value: year.toString(), label: year.toString() };
  });

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("default", { month: "long" });
    return { value: (i + 1).toString(), label: month };
  });

  const createMemories = async (e) => {
    e.preventDefault()
    if (!state.uploadedImages || state.uploadedImages.length === 0) {
      setState({ error: { ...state.error, uploadedImages: "Please upload at least one image" } });
      return;
    }
    setState({ error: { ...state.error, uploadedImages: "" } });
    try {
      const isAdmin =
        typeof window !== "undefined" &&
        (String(localStorage.getItem("isAdmin")).toLowerCase() === "true" ||
          localStorage.getItem("isAdmin") === true);

      for (const image of state.uploadedImages) {
        const formData = new FormData();
        formData.append("photos", image);
        formData.append("year", state.year);
        formData.append("month", state.month);
        formData.append("tags", state.tags);
        formData.append("is_approved", isAdmin ? true : false);
        formData.append("is_active", true);
        await Models.gallery.addMemories(formData);
      }
      message.success("Memories Created Successfully");
      await memoriesList(1, memoriesSubTab, approvedFilter);
      fetchCounts("memories", approvedFilter);
      setState({
        uploadedImages: [],
        year: "",
        month: "",
        tags: "",
        isMemoriesOpen: false,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  return (
    <>
      <div className="rbt-dashboard-area rbt-section-gapBottom section-pad gal-log">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-11 col-xl-10">
              <div className="rbt-dashboard-content ">
                <div className="content">
                  {/* --- TAB BUTTONS & ACTIONS --- */}
                  <div className="advance-tab-button mb--20 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <ul
                      className="nav nav-tabs tab-button-style-2 justify-content-start"
                      id="myTab-4"
                      role="tablist"
                    >
                      <li role="presentation">
                        <Link
                          href="#"
                          className={`tab-button ${activeTab === "album" ? "active" : ""
                            }`}
                          id="home-tab-4"
                          role="tab"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMainTabChange("album");
                          }}
                        >
                          <span className="title">Album</span>
                        </Link>
                      </li>
                      <li role="presentation">
                        <Link
                          href="#"
                          className={`tab-button ${activeTab === "memories" ? "active" : ""
                            }`}
                          id="profile-tab-4"
                          role="tab"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMainTabChange("memories");
                          }}
                        >
                          <span className="title">Memories</span>
                        </Link>
                      </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                      <Select
                        value={approvedFilter}
                        onChange={handleApprovedFilterChange}
                        style={{ minWidth: 140, height: 40 }}
                        options={[
                          { value: "true", label: "Approved" },
                          { value: "false", label: "Unapproved" },
                        ]}
                      />

                      <span>
                        <button
                          type="button"
                          className="rbt-btn btn-gradient radius-round sm-btn"
                          onClick={() => {
                           router.push("gallery")
                          }}
                        >
                          <span className="title">
                           
                              All Gallery
                             
                          </span>
                        </button>
                      </span>

                      <span>
                        <button
                          type="button"
                          className="rbt-btn btn-gradient radius-round sm-btn"
                          onClick={() => {
                            if (activeTab === "album") {
                              setState({ isOpen: true });
                            } else {
                              setState({ isMemoriesOpen: true });
                            }
                          }}
                        >
                          <span className="title">
                            {activeTab === "album"
                              ? "Create Album"
                              : "Create Memories"}
                          </span>
                        </button>
                      </span>
                    </div>
                  </div>

                  {/* --- SUB TAB BUTTONS --- */}
                  <div className="advance-tab-button mb--30 d-flex justify-content-start align-items-center">
                    <ul
                      className="nav nav-tabs tab-button-style-2 justify-content-start"
                      style={{
                        minWidth: "auto",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                      role="tablist"
                    >
                      {activeTab === "album" ? (
                        <>
                          <li role="presentation">
                            <Link
                              href="#"
                              className={`tab-button ${albumSubTab === "active" ? "active" : ""
                                }`}
                              style={{ padding: "8px 24px", fontSize: "15px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAlbumSubTabChange("active");
                              }}
                            >
                              <span className="title">
                                Active Album ({counts.activeAlbum ?? 0})
                              </span>
                            </Link>
                          </li>
                          <li role="presentation">
                            <Link
                              href="#"
                              className={`tab-button ${albumSubTab === "archive" ? "active" : ""
                                }`}
                              style={{ padding: "8px 24px", fontSize: "15px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAlbumSubTabChange("archive");
                              }}
                            >
                              <span className="title">
                                Archive Album ({counts.archiveAlbum ?? 0})
                              </span>
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li role="presentation">
                            <Link
                              href="#"
                              className={`tab-button ${memoriesSubTab === "active" ? "active" : ""
                                }`}
                              style={{ padding: "8px 24px", fontSize: "15px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleMemoriesSubTabChange("active");
                              }}
                            >
                              <span className="title">
                                Active Memories ({counts.activeMemories ?? 0})
                              </span>
                            </Link>
                          </li>
                          <li role="presentation">
                            <Link
                              href="#"
                              className={`tab-button ${memoriesSubTab === "archive" ? "active" : ""
                                }`}
                              style={{ padding: "8px 24px", fontSize: "15px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleMemoriesSubTabChange("archive");
                              }}
                            >
                              <span className="title">
                                Archive Memories ({counts.archiveMemories ?? 0})
                              </span>
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* --- TAB CONTENT --- */}
                  <div className="tab-content">
                    {pageLoading ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: "300px", width: "100%" }}
                      >
                        <Spin size="large" />
                      </div>
                    ) : (
                      <>
                        {/* ENROLLED / ALBUM */}
                        <div
                          className={`tab-pane fade ${activeTab === "album" ? "active show" : ""
                            }`}
                          id="home-4"
                          role="tabpanel"
                        >
                          <div className="row g-3 parent-gallery-container">
                            {state.albumList
                              ?.slice(
                                (state.currentPage - 1) * PAGE_SIZE,
                                state.currentPage * PAGE_SIZE
                              )
                              .map((data, index) => (
                                <div
                                  className="col-lg-3 col-md-4 col-sm-6 col-6"
                                  key={`gallery-enrolled-${index}`}
                                >
                                  <div className="instagram-grid position-relative">
                                    {/* Action Icons in the top-right corner on hover */}
                                    {isAdminUser(data) && (
                                      <div
                                        className="gallery-card-actions"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                        }}
                                      >
                                        <Tooltip
                                          title={
                                            isItemActive(data, albumSubTab)
                                              ? "Active (Click to Inactivate)"
                                              : "Inactive (Click to Activate)"
                                          }
                                        >
                                          <button
                                            type="button"
                                            className="btn-action-icon"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleToggleAlbumActive(data);
                                            }}
                                          >
                                            <PoweroffOutlined
                                              style={{
                                                fontSize: "15px",
                                                color: isItemActive(
                                                  data,
                                                  albumSubTab
                                                )
                                                  ? "#28a745"
                                                  : "#dc3545",
                                              }}
                                            />
                                          </button>
                                        </Tooltip>

                                        <Tooltip
                                          title={
                                            isItemApproved(data, approvedFilter)
                                              ? "Approved (Click to Unapprove)"
                                              : "Unapproved (Click to Approve)"
                                          }
                                        >
                                          <button
                                            type="button"
                                            className="btn-action-icon"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleToggleAlbumApproval(data);
                                            }}
                                          >
                                            {isItemApproved(
                                              data,
                                              approvedFilter
                                            ) ? (
                                              <CheckCircleOutlined
                                                style={{
                                                  fontSize: "16px",
                                                  color: "#28a745",
                                                }}
                                              />
                                            ) : (
                                              <CloseCircleOutlined
                                                style={{
                                                  fontSize: "16px",
                                                  color: "#dc3545",
                                                }}
                                              />
                                            )}
                                          </button>
                                        </Tooltip>
                                      </div>
                                    )}

                                    <Link
                                      className="child-gallery-single"
                                      href={`/album/${data.id}`}
                                      data-gall="gallery01"
                                    >
                                      <div className="rbt-gallery rounded">
                                        <img
                                          className="w-100 rounded cover"
                                          src={
                                            data?.photos?.length > 0
                                              ? data?.photos[0]?.photo
                                              : "/images/gallery/gallery-thumb-04.jpg"
                                          }
                                          width={253}
                                          height={274}
                                          alt="Gallery Images"
                                        />
                                      </div>
                                      <span className="user-info">
                                        <span className="icon">
                                          <i className="icon-instagram"></i>
                                        </span>
                                        <span className="user-name">
                                          {data?.album_name}
                                        </span>
                                        <div className="gallery-dec">
                                          {data?.photos?.length} Photos
                                        </div>
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                          </div>
                          {(!state.albumList || state.albumList.length === 0) && (
                            <div className="album-none">
                              <h5>No Albums Found</h5>
                            </div>
                          )}
                          {/* ALBUM PAGINATION */}
                          {Number(state.total) > 0 && (
                            <div className="d-flex justify-content-center mt-4">
                              <Pagination
                                activeNumber={handlePageChange}
                                totalPage={state.total}
                                currentPages={state.currentPage}
                                next={state.next}
                                maxPage={state.maxPage}
                                pageSize={PAGE_SIZE}
                              />
                            </div>
                          )}
                        </div>

                        {/* ACTIVE / MEMORIES */}
                        <div
                          className={`tab-pane fade ${activeTab === "memories" ? "active show" : ""
                            }`}
                          id="profile-4"
                          role="tabpanel"
                        >
                          <div className="row g-3 parent-gallery-container">
                            {state.memoriesList
                              ?.slice(
                                (state.memoriescurrentPage - 1) * PAGE_SIZE,
                                state.memoriescurrentPage * PAGE_SIZE
                              )
                              .map((data, index) => (
                                <div
                                  className="col-lg-3 col-md-4 col-sm-6 col-6"
                                  key={`gallery-active-${index}`}
                                >
                                  <div className="instagram-grid position-relative">
                                    {/* Action Icons in the top-right corner on hover */}
                                    {isAdminUser(data) && (
                                      <div
                                        className="gallery-card-actions"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                        }}
                                      >
                                        <Tooltip
                                          title={
                                            isItemActive(data, memoriesSubTab)
                                              ? "Active (Click to Inactivate)"
                                              : "Inactive (Click to Activate)"
                                          }
                                        >
                                          <button
                                            type="button"
                                            className="btn-action-icon"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleToggleMemoriesActive(data);
                                            }}
                                          >
                                            <PoweroffOutlined
                                              style={{
                                                fontSize: "15px",
                                                color: isItemActive(
                                                  data,
                                                  memoriesSubTab
                                                )
                                                  ? "#28a745"
                                                  : "#dc3545",
                                              }}
                                            />
                                          </button>
                                        </Tooltip>

                                        <Tooltip
                                          title={
                                            isItemApproved(data, approvedFilter)
                                              ? "Approved (Click to Unapprove)"
                                              : "Unapproved (Click to Approve)"
                                          }
                                        >
                                          <button
                                            type="button"
                                            className="btn-action-icon"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleToggleMemoriesApproval(data);
                                            }}
                                          >
                                            {isItemApproved(
                                              data,
                                              approvedFilter
                                            ) ? (
                                              <CheckCircleOutlined
                                                style={{
                                                  fontSize: "16px",
                                                  color: "#28a745",
                                                }}
                                              />
                                            ) : (
                                              <CloseCircleOutlined
                                                style={{
                                                  fontSize: "16px",
                                                  color: "#dc3545",
                                                }}
                                              />
                                            )}
                                          </button>
                                        </Tooltip>
                                      </div>
                                    )}

                                    <Link
                                      className="child-gallery-single"
                                      href={`/memories/${data.id}`}
                                      data-gall="gallery02"
                                    >
                                      <div className="rbt-gallery rounded">
                                        <img
                                          className="w-100 rounded cover"
                                          src={
                                            data.photos?.length > 0
                                              ? data.photos?.[0]
                                              : "/images/gallery/gallery-thumb-04.jpg"
                                          }
                                          width={253}
                                          height={274}
                                          alt="Gallery Images"
                                        />
                                      </div>
                                      <span className="user-info">
                                        <span className="icon">
                                          <i className="icon-instagram"></i>
                                        </span>
                                        <span className="user-name">
                                          {data.created_by &&
                                            capitalizeFLetter(
                                              data.created_by?.fullname
                                            )}
                                        </span>
                                        <div className="gallery-dec">
                                          {data.created_on}
                                        </div>
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                          </div>
                          {(!state.memoriesList || state.memoriesList.length === 0) && (
                            <div className="album-none">
                              <h5>No Memories Found</h5>
                            </div>
                          )}
                          {Number(state.memoriestotal) > 0 && (
                            <div className="d-flex justify-content-center mt-4">
                              <Pagination
                                activeNumber={handleMPageChange}
                                totalPage={state.memoriestotal}
                                currentPages={state.memoriescurrentPage}
                                next={state.memoriesnext}
                                maxPage={state.memoriesMaxPage}
                                pageSize={PAGE_SIZE}
                              />
                            </div>
                          )}
                        </div>

                        {/* COMPLETED */}
                        <div
                          className="tab-pane fade"
                          id="contact-4"
                          role="tabpanel"
                        >
                          <div className="row g-3 parent-gallery-container KITgallery">
                            {GalleryData?.gallery?.map((data, index) => (
                              <div
                                className="col-lg-2 col-md-4 col-sm-6 col-6"
                                key={`gallery-completed-${index}`}
                              >
                                <div className="instagram-grid">
                                  <Link
                                    className="child-gallery-single"
                                    href={`${data.img}`}
                                    data-gall="gallery03"
                                  >
                                    <div className="rbt-gallery rounded">
                                      <Image
                                        className="w-100 rounded"
                                        src={data.img}
                                        width={253}
                                        height={274}
                                        alt="Gallery Images"
                                      />
                                    </div>
                                    <span className="user-info">
                                      <span className="icon">
                                        <i className="icon-instagram"></i>
                                      </span>
                                      <span className="user-name">Batch 2</span>
                                      <div className="gallery-dec">2 Photos</div>
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* --- END TAB CONTENT --- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gallery-card-actions {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 15;
          display: flex;
          gap: 8px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-5px);
          transition: all 0.25s ease-in-out;
        }
        .instagram-grid:hover .gallery-card-actions {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .btn-action-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
          padding: 0;
        }
        .btn-action-icon:hover {
          transform: scale(1.12);
          background: #ffffff;
        }
      `}</style>

      <Modal
        title={<div className="custom-modal-header">Create New Album</div>}
        open={state.isOpen}
        onCancel={() => handleCancel()}
        footer={false}
        centered
      >
        <form className="applicants-form" onSubmit={createAlbum}>
          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
              name="Name"
              label="Name"
              onChange={(e) => setState({ album_name: e.target.value })}
              value={state.album_name}
              required
              error={state.error?.album_name}
            />
          </div>

          {/* Message */}
          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
              name="Description"
              label="Description"
              onChange={(e) => setState({ description: e.target.value })}
              value={state.description}
            // error={errMsg?.end_year}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
              name="Location"
              label="Location"
              onChange={(e) => setState({ album_location: e.target.value })}
              value={state.album_location}
            // error={errMsg?.end_year}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              label="Date"
              type="date"
              name="Date"
              value={state.album_date}
              onChange={(e) => setState({ album_date: e.target.value })}
              error={state.error?.album_date}
              required
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="select"
              // name="Who can view this Album?"
              placeholder={"Who can view this Album?"}
              label="Who can view this Album?"
              onChange={(e) => setState({ public_view: e.target.value })}
              value={state.public_view}
              required
              error={state.error?.whoCanView}
              options={[
                { value: "Public", label: "Public" },
                { value: "Site Members", label: "Site Members" },
              ]}
            />
          </div>

          {/* Action */}
          <div className="d-flex justify-content-end mt-5">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              {state.btnLoadng ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title={<div className="custom-modal-header">Upload Photos</div>}
        open={state.isMemoriesOpen}
        onCancel={() => handleCancel()}
        footer={false}
        centered
      >
        <form className="applicants-form" onSubmit={(e) => createMemories(e)}>
          <div style={{ marginTop: "15px" }}>
            <FormField
              type="file"
              name="Name"
              label="Upload images"
              accept="image/*"
              className={"p-0 "}
              multiple
              onChange={handleFileChange}
              required
              ref={fileInputRef}
            />
            {state.error?.uploadedImages && (
              <p style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {state.error.uploadedImages}
              </p>
            )}

            <div
              className="uploaded-images mt_10"
              style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
            >
              {state.uploadedImages.length > 0 &&
                state.uploadedImages.map((image, index) => (
                  <div
                    key={index}
                    className="uploaded-image-item"
                    style={{
                      width: "calc(33.333% - 10px)", // To make 3 images per row with spacing
                      display: "flex",
                      flexDirection: "column", // Stack the image and button vertically
                      alignItems: "center", // Center the image and button horizontally
                      justifyContent: "center", // Center align vertically
                      marginBottom: "10px",
                      border: "0.5px solid grey",
                      padding: "10px",
                      borderRadius: "20px",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      style={{
                        width: "100%", // Make image take full width of the container
                        height: "100px", // Fixed height for the images
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />

                    {/* Remove button below the image */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        background: "rgba(255, 0, 0, 0.7)",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px 10px",
                        borderRadius: "50px",
                        marginTop: "5px", // Space between image and button
                        fontSize: "14px",
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="select"
              name="When were the pictures taken?"
              label="When were the pictures taken?"
              placeholder={"Year"}
              onChange={(e) => setState({ year: e.target.value })}
              value={state.year}
              error={state.error?.whoCanView}
              options={years}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="select"
              name="Month"
              label="Month"
              placeholder={"Month"}
              onChange={(e) => setState({ month: e.target.value })}
              value={state.month}
              // error={state.error?.whoCanView}
              options={months}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
              name="Add relevant Tags"
              label="Add relevant Tags"
              onChange={(e) => setState({ tags: e.target.value })}
              value={state.tags}
            // error={errMsg?.end_year}
            />
          </div>

          <div className="d-flex justify-content-end mt-5">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              {state.btnLoadng ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MyGalleryLoginMain;
