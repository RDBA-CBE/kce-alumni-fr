import React, { useEffect, useState } from "react";
import FormField from "@/commonComponents/FormFields";

import { useParams, useRouter } from "next/navigation";
import {
  ObjIsEmpty,
  objIsEmpty,
  setDropdownData,
  useSetState,
} from "@/utils/commonFunction.utils";
import { message } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Models from "@/imports/models.import";
import {
  
  memberType,
  registeredMember,
} from "@/utils/constant.utils";
import useDebounce from "@/commonComponents/useDebounce";
import Image from "next/image";
import Pagination from "@/commonComponents/Pagination";

const PublishShareMain = () => {
  const router = useRouter();
  const { id } = useParams;

  const [messageApi, contextHolder] = message.useMessage();

  const pathname = usePathname();

  const [state, setState] = useSetState({
    memberList: [],
    batchList: [],
    roleList: [],
    courseList: [],
    departmentList: [],
    skillDropdownList: [],
    industryList: [],
    institutionList: [],
    locationList: [],
    total: 0,
    currentPage: 1,
    search: "",
    roleList: [],
    member_type: null,
    filterLoading: false,
    selectedRowKeys: [],
    currenBatchPage: 1,
    hasBatchLoadMore: null,
    currenCoursePage: 1,
    hasCourseLoadMore: null,
    currenRolePage: 1,
    hasRoleLoadMore: null,
    currenDepartmentPage: 1,
    hasDepartmentLoadMore: null,
    currenSkillPage: 1,
    hasSkillLoadMore: null,
    currenIndustryPage: 1,
    hasIndustryLoadMore: null,
    currenInstitutionPage: 1,
    hasInstitutionLoadMore: null,
    currenLocationPage: 1,
    hasLocationLoadMore: null,
  });

  const debouncedSearch = useDebounce(state.search);

  useEffect(() => {
    roleList();
    locationList();
    institution();
    skillList();
    industryList();
    department();
    course();
    batch();
    alreadySelectedMember();
  }, []);

  useEffect(() => {
    const body = bodyData();
    if (!objIsEmpty(body)) {
      filterData(1);
    } else {
      memberList(1);
    }
  }, [debouncedSearch]);

  const memberList = async (page) => {
    try {
      setState({ pageLoading: true });
      const res = await Models.member.list(page);
      setState({
        memberList: res.results,
        currentPage: page,
        next: res?.next,
        prev: res?.previous,
        refresh: false,
        moreLoading: false,
        loading: false,
        total: res?.count,
        pageLoading: false,
      });
    } catch (error) {
      setState({ pageLoading: false });

      console.log("✌️error --->", error);
    }
  };

  const alreadySelectedMember = async () => {
    try {
      const members = localStorage.getItem("selectedMembers");
      if (members) {
        const parsedMembers = JSON.parse(members);
        console.log("✌️parsedMembers --->", parsedMembers);
        setState({ selectedRowKeys: parsedMembers });
      }
    } catch (err) {
      if (err?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.log(err);
    }
  };

  const filterData = async (page) => {
    try {
      setState({ filterLoading: true });
      const body = bodyData();

      const res = await Models.member.filter(page, body);
      console.log("filterData --->", res);
      setState({
        memberList: res.results,
        currentPage: page,
        next: res?.next,
        prev: res?.previous,
        refresh: false,
        moreLoading: false,
        loading: false,
        total: res?.count,
        filterLoading: false,
      });
    } catch (error) {
      setState({ filterLoading: false });

      console.log("✌️error --->", error);
    }
  };

  const roleList = async () => {
    try {
      const res = await Models.job.roleList();
      const dropdown = setDropdownData(res?.results, "role");
      setState({ roleList: dropdown, hasRoleLoadMore: res?.next });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const locationList = async () => {
    try {
      setState({ loading: true });
      const res = await Models.job.locationList();
      const dropdown = setDropdownData(res?.results, "location");
      setState({
        locationList: dropdown,
        loading: false,
        hasLocationLoadMore: res?.next,
      });
    } catch (error) {
      setState({ loading: false });
      console.log("✌️error --->", error);
    }
  };

  const institution = async () => {
    try {
      setState({ loading: true });
      const res = await Models.masters.institutions();
      const dropdown = setDropdownData(res?.results, "title");
      setState({
        institutionList: dropdown,
        hasInstitutionLoadMore: res?.next,
      });
    } catch (error) {
      setState({ loading: false });

      console.log("✌️error --->", error);
    }
  };

  const industryList = async () => {
    try {
      const res = await Models.job.industryList();

      const dropdown = setDropdownData(res?.results, "title");
      setState({ industryList: dropdown, hasIndustryLoadMore: res?.next });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const skillList = async () => {
    try {
      setState({ loading: true });

      const res = await Models.job.skillList();
      const dropdown = res?.results?.map((item) => ({
        value: item?.skill_id,
        label: item.skill,
      }));
      setState({
        skillDropdownList: dropdown,
        loading: false,
        hasSkillLoadMore: res?.next,
      });
    } catch (error) {
      setState({ loading: false });

      console.log("✌️error --->", error);
    }
  };

  const batch = async (page = 1, courseId) => {
    try {
      setState({ loading: true });
      const res = await Models.masters.batch(page, courseId);
      const dropdown = res?.results?.map((item) => ({
        value: item?.batch_id,
        label: item?.title,
      }));
      setState({
        batchList: dropdown,
        loading: false,
        currenBatchPage: page,
        hasBatchLoadMore: res?.next,
      });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const course = async () => {
    try {
      setState({ loading: true });
      const res = await Models.masters.course();

      const dropdown = res?.results?.map((item) => ({
        value: item?.course_id,
        label: item?.title,
      }));
      setState({
        courseList: dropdown,
        loading: false,
        hasCourseLoadMore: res?.next,
      });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const department = async () => {
    try {
      setState({ loading: true });
      const res = await Models.masters.department();

      const dropdown = res?.results?.map((item) => ({
        value: item?.department_id,
        label: item?.short_name,
      }));
      setState({
        departmentList: dropdown,
        loading: false,
        hasDepartmentLoadMore: res?.next,
      });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const errorNotification = (error) => {
    messageApi.open({
      type: "error",
      content: error || "An error occurred. Please try again.",
    });
  };

  const handlePageChange = (number) => {
    memberList(number);
    setState({ currentPage: number });
    window.scrollTo({ top: 0, behavior: "smooth" });

    return number;
  };

  const filterSubmit = async () => {
    try {
      setState({ filterLoading: true });
      const body = bodyData();
      if (ObjIsEmpty(body)) {
        // errorNotification("Please select at least one filter.");
        setState({ filterLoading: false });
        memberList(1);

        return;
      }
      const res = await Models.member.filter(1, body);
      console.log("filterData --->", res);
      setState({
        memberList: res.results,
        currentPage: 1,
        next: res?.next,
        prev: res?.previous,
        refresh: false,
        moreLoading: false,
        loading: false,
        total: res?.count,
        filterLoading: false,
      });
    } catch (error) {
      setState({ filterLoading: false });
      errorNotification(error?.message || "An error occurred while filtering.");
    }
  };


  const bodyData = () => {
    const body = {};
    // member_type,batch,course,role,department,skills,industry,institution,location,dob,registered

    if (state.search) {
      body.search = state.search;
    }
    if (state.member_type) {
      body.member_type = state.member_type;
    }
    if (state.member_type == "Alumni") {
      if (state.batch) {
        body.batch = state.batch.value;
      }
      if (state.course) {
        body.course = state.course.value;
      }
    }
    if (state.role) {
      body.role = state.role.value;
    }
    if (state.department) {
      body.department = state.department.value;
    }
    if (state.skills) {
      body.skills = state.skills.value;
    }
    if (state.industry) {
      body.industry = state.industry.value;
    }
    if (state.institution) {
      body.institution = state.institution.value;
    }
    if (state.location) {
      body.location = state.location.value;
    }
    if (state.dob) {
      body.dob = state.dob;
    }
    if (state.registered) {
      body.registered = state.registered == "Registered" ? true : false;
    }
    return body;
  };

  const clearFilter = async () => {
    try {
      setState({
        registered: "",
        dob: "",
        location: "",
        institution: "",
        industry: "",
        skills: "",
        department: "",
        course: "",
        batch: "",
        role: "",
        member_type: "",
        search: "",
      });
      await memberList(1);
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const memberTypeOption = memberType?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const RegisterdOption = registeredMember.map((item) => ({
    label: item?.label,
    value: item?.name,
  }));



  const batchListLoadMore = async () => {
    try {
      if (state.hasBatchLoadMore) {
        const nextPage = state.currenBatchPage + 1;
        const res = await Models.masters.batch(nextPage, state.course?.value);
        const BatchOption = res?.results?.map((bat) => ({
          value: bat.batch_id,
          label: bat.title,
        }));
        setState({
          batchList: [...state.batchList, ...BatchOption],
          currenBatchPage: nextPage,
          hasBatchLoadMore: res.next,
        });
      } else {
        setState({
          batchList: state.batchList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const courseListLoadMore = async () => {
    try {
      if (state.hasCourseLoadMore) {
        const res = await Models.masters.course(state.currenCoursePage + 1);
        const CourseOption = res?.results?.map((bat) => ({
          value: bat.course_id,
          label: bat.title,
        }));
        setState({
          courseList: [...state.courseList, ...CourseOption],
          currenCoursePage: state.currenCoursePage + 1,
          hasCourseLoadMore: res.next,
        });
      } else {
        setState({
          courseList: state.courseList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const roleListLoadMore = async () => {
    try {
      if (state.hasRoleLoadMore) {
        const res = await Models.job.roleList(state.currenRolePage + 1);
        // const RoleOption = res?.results?.map((role) => ({
        //   value: role.batch_id,
        //   label: role.title,
        // }));
        const RoleOption = setDropdownData(res?.results, "role");

        setState({
          roleList: [...state.roleList, ...RoleOption],
          currenRolePage: state.currenRolePage + 1,
          hasRoleLoadMore: res.next,
        });
      } else {
        setState({
          roleList: state.roleList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const departmentListLoadMore = async () => {
    try {
      if (state.hasDepartmentLoadMore) {
        const res = await Models.masters.department(
          state.currenDepartmentPage + 1
        );
        const DepartmentOption = res?.results?.map((deparment) => ({
          value: deparment.department_id,
          label: deparment.short_name,
        }));

        setState({
          deparmentList: [...state.deparmentList, ...DepartmentOption],
          currenDeparmentPage: state.currenDeparmentPage + 1,
          hasDeparmentLoadMore: res.next,
        });
      } else {
        setState({
          deparmentList: state.deparmentList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const skillListLoadMore = async () => {
    try {
      if (state.hasSkillLoadMore) {
        const res = await Models.job.skillList(state.currenSkillPage + 1);
        const SkillOption = res?.results?.map((skill) => ({
          value: skill.skill_id,
          label: skill.skill,
        }));

        setState({
          skillDropdownList: [...state.skillDropdownList, ...SkillOption],
          currenSkillPage: state.currenSkillPage + 1,
          hasSkillLoadMore: res.next,
        });
      } else {
        setState({
          skillDropdownList: state.skillDropdownList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const industryListLoadMore = async () => {
    try {
      if (state.hasIndustryLoadMore) {
        const res = await Models.job.industryList(state.currenIndustryPage + 1);
        // const IndustryOption = res?.results?.map((item) => ({
        //   value: item.skill_id,
        //   label: item.skill,
        // }));
        const IndustryOption = setDropdownData(res?.results, "title");

        setState({
          industryList: [...state.industryList, ...IndustryOption],
          currenIndustryPage: state.currenIndustryPage + 1,
          hasIndustryLoadMore: res.next,
        });
      } else {
        setState({
          industryList: state.industryList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const institutionListLoadMore = async () => {
    try {
      if (state.hasInstitutionLoadMore) {
        const res = await Models.masters.institutions(
          state.currenInstitutionPage + 1
        );

        const InstitutionOption = setDropdownData(res?.results, "title");

        setState({
          institutionList: [...state.institutionList, ...InstitutionOption],
          curreninstitutionPage: state.curreninstitutionPage + 1,
          hasinstitutionLoadMore: res.next,
        });
      } else {
        setState({
          institutionList: state.institutionList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const locationListLoadMore = async () => {
    console.log("state.hasLocationLoadMore)", state.hasLocationLoadMore);

    try {
      if (state.hasLocationLoadMore) {
        const res = await Models.job.locationList(state.currenLocationPage + 1);
        // const InstitutionOption = res?.results?.map((item) => ({
        //   value: item.skill_id,
        //   label: item.skill,
        // }));
        const LocationOption = setDropdownData(res?.results, "location");
        console.log("loadmore location res", res);

        setState({
          locationList: [...state.locationList, ...LocationOption],
          currenlocationPage: state.currenlocationPage + 1,
          hasLocationLoadMore: res.next,
        });
      } else {
        setState({
          locationList: state.locationList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="rbt-dashboard-area section-pad">
      <div className="container-fluid">
        {contextHolder}
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  {/* <div className="row mb-4">
                    <div className="col-12">
                      <div className="d-flex justify-content-between ">
                        <h5>Filter</h5>
                        <Link
                          className="rbt-btn btn-gradient radius-round sm-btn"
                          href="/post-a-job"
                        >
                          Post New Job
                        </Link>
                      </div>
                    </div>
                  </div> */}

                  <div className="row g-5">
                    {/* --------------------sidebar start--------------------- */}

                    <div className="col-lg-3 d-sidebar">
                      <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
                        <div className="inner">
                          <div className="content-item-content">
                            <div className="rbt-default-sidebar-wrapper">
                              <nav className="mainmenu-nav">
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="text"
                                        className="applicant-input"
                                        onChange={(e) =>
                                          setState({
                                            member_type: e.target.value,
                                          })
                                        }
                                        name="member_type"
                                        value={state.member_type}
                                        options={memberTypeOption}
                                        placeholder={"Member Type"}
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
                                            className="member-dd"
                                            onChange={(e) => {
                                              setState({
                                                course: e,
                                                batch: null,
                                                currenBatchPage: 1,
                                              });
                                              batch(1, e?.value);
                                            }}
                                            name="course"
                                            value={state.course}
                                            options={state.courseList}
                                            placeholder={"Course"}
                                            loadMore={() =>
                                              courseListLoadMore()
                                            }
                                          />
                                        </a>
                                      </li>

                                  {state.member_type == "Alumni" && (
                                    <>
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
                                            className="member-dd"
                                            onChange={(e) =>
                                              setState({ batch: e })
                                            }
                                            name="batch"
                                            value={state.batch}
                                            options={state.batchList}
                                            placeholder={"Batch"}
                                            loadMore={() => batchListLoadMore()}
                                          />
                                        </a>
                                      </li>

                                     
                                    </>
                                  )}

                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="loadMoreSelect"
                                        className="member-dd"
                                        onChange={(e) => setState({ role: e })}
                                        name="role"
                                        value={state.role}
                                        options={state.roleList}
                                        placeholder={"role"}
                                        loadMore={() => roleListLoadMore()}
                                      />
                                    </a>
                                  </li>

                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="loadMoreSelect"
                                        className="member-dd"
                                        onChange={(e) =>
                                          setState({ department: e })
                                        }
                                        name="department"
                                        value={state.department}
                                        options={state.departmentList}
                                        placeholder={"Department"}
                                        loadMore={() =>
                                          departmentListLoadMore()
                                        }
                                      />
                                    </a>
                                  </li>

                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="loadMoreSelect"
                                        className="member-dd"
                                        onChange={(e) =>
                                          setState({ skills: e })
                                        }
                                        name="skills"
                                        value={state.skills}
                                        options={state.skillDropdownList}
                                        placeholder={"Skills"}
                                        loadMore={() => skillListLoadMore()}
                                      />
                                    </a>
                                  </li>

                                  {/* ------ */}
                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="loadMoreSelect"
                                        className="member-dd"
                                        onChange={(e) =>
                                          setState({ industry: e })
                                        }
                                        name="industry"
                                        value={state.industry}
                                        options={state.industryList}
                                        placeholder={"Industry"}
                                        loadMore={() => industryListLoadMore()}
                                      />
                                    </a>
                                  </li>

                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="loadMoreSelect"
                                        className="member-dd"
                                        onChange={(e) =>
                                          setState({ institution: e })
                                        }
                                        name="institution"
                                        value={state.institution}
                                        options={state.institutionList}
                                        placeholder={"Institution"}
                                        loadMore={() =>
                                          institutionListLoadMore()
                                        }
                                      />
                                    </a>
                                  </li>

                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="loadMoreSelect"
                                        className="member-dd"
                                        onChange={(e) =>
                                          setState({ location: e })
                                        }
                                        name="location"
                                        value={state.location}
                                        options={state.locationList}
                                        placeholder={"Location"}
                                        loadMore={() => locationListLoadMore()}
                                      />
                                    </a>
                                  </li>

                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      <FormField
                                        type="date"
                                        className="date-field"
                                        onChange={(e) =>
                                          setState({ dob: e.target.value })
                                        }
                                        name="dob"
                                        value={state.dob}
                                        placeholder={"Date of Birth"}
                                      />
                                    </a>
                                  </li>

                                  <li className="nav-item" role="presentation">
                                    <a
                                      className={`w-100 ${
                                        pathname === "#" ? "active" : ""
                                      }`}
                                      href="#"
                                    >
                                      {/* <FormField
                                        type="select"
                                        onChange={(e) => handleFilterChange(e)}
                                        name="post_type"
                                        placeholder={"Post Type"}
                                        value={formData.post_type}
                                        options={JobOption}
                                      /> */}
                                      <FormField
                                        type="select"
                                        // className="member-dd"
                                        name="registered"
                                        placeholder={"Member Status"}
                                        value={state.registered}
                                        onChange={(e) =>
                                          setState({
                                            registered: e.target.value,
                                          })
                                        }
                                        options={RegisterdOption}
                                      />
                                    </a>
                                  </li>
                                </ul>
                              </nav>

                              <div
                                className=" d-flex flex-wrap mt-5"
                                style={{ columnGap: "10px", rowGap: "8px" }}
                              >
                                <Link
                                  className="rbt-btn btn-gradient radius-round sm-btn"
                                  href="#"
                                  onClick={filterSubmit}
                                >
                                  Filter
                                </Link>
                                <Link
                                  className="rbt-btn btn-border-gradient radius-round sm-btn"
                                  href="#"
                                  onClick={clearFilter}
                                >
                                  Clear all
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --------------------sidebar end--------------------- */}

                    {/* --------------------table start--------------------- */}

                    <div className="col-lg-9">
                      <div className="rbt-elements-area bg-color-extra2 mb-5">
                        <div className="container">
                          <div className="row p-0">
                            <div className="col-lg-12 p-0">
                              <form action="#" className="rbt-search-style-1">
                                <input
                                  type="text"
                                  placeholder="Type a Member Name, or Member Email Id, Course to filter the Members."
                                  // name="search_filter"
                                  onChange={(e) =>
                                    setState({ search: e.target.value })
                                  }
                                />
                                <button className="search-btn">
                                  <i className="feather-search"></i>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      {state.memberList?.length > 0 ? (
                        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                          <div className="content">
                            <div className="section-title d-flex justify-content-between">
                              <h4 className="rbt-title-style-3">User List</h4>
                              <button
                                className="rbt-btn btn-gradient radius-round sm-btn"
                                // href="#"
                                onClick={() => {
                                  if (state.selectedRowKeys?.length === 0) {
                                    errorNotification(
                                      "Please select at least one member."
                                    );
                                    return;
                                  } else {
                                    router.push(`/email-attendee/${id}`);
                                    localStorage.setItem(
                                      "selectedMembers",
                                      JSON.stringify(state.selectedRowKeys)
                                    );
                                  }
                                }}
                              >
                                Submit
                              </button>
                            </div>

                            <div className="rbt-dashboard-table table-responsive mobile-table-750">
                              <table className="rbt-table table table-borderless">
                                <thead>
                                  <tr>
                                    <th>Select</th>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Batch</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {state.memberList.map((item) => (
                                    <tr key={item.id}>
                                      <th>
                                        <span className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content">
                                          <div className="rbt-check-group d-flex flex-direction-colunm justify-content-center align-items-center">
                                            <input
                                              id={`cat-list-${item.id}`}
                                              type="checkbox"
                                              name={`cat-list-${item.id}`}
                                              checked={state.selectedRowKeys?.some(
                                                (row) => row.id === item.id
                                              )}
                                              onChange={(e) => {
                                                const isSelected =
                                                  e.target.checked;
                                                if (isSelected) {
                                                  setState({
                                                    selectedRowKeys: [
                                                      ...state.selectedRowKeys,
                                                      {
                                                        id: item.id,
                                                        name:
                                                          item.name ||
                                                          item.email,
                                                      },
                                                    ],
                                                  });
                                                } else {
                                                  setState({
                                                    selectedRowKeys:
                                                      state.selectedRowKeys.filter(
                                                        (row) =>
                                                          row.id !== item.id
                                                      ),
                                                  });
                                                }
                                              }}
                                            />
                                            <label
                                              htmlFor={`cat-list-${item.id}`}
                                            >
                                              {""}
                                            </label>
                                          </div>
                                        </span>
                                      </th>
                                      <td>
                                        <span className="b3">
                                          <Link href={`/members/${item.id}`}>
                                            <img
                                              src={
                                                item?.profile_picture ||
                                                "/images/dummy-profile-pic.png"
                                              }
                                              alt={item.name}
                                              style={{
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                height: "50px",
                                                width: "50px",
                                              }}
                                              fallback="/images/dummy-profile-pic.png"
                                            />
                                          </Link>
                                        </span>
                                      </td>
                                      <td>
                                        <span className="b3">
                                          <Link href={`/members/${item.id}`}>
                                            {item?.email}
                                          </Link>
                                        </span>
                                      </td>
                                      <td>
                                        <span className="b3">
                                          <Link href="#">{item.course}</Link>
                                        </span>
                                      </td>
                                      <td>
                                        <span className="b3">
                                          <Link href="#">{item?.batch}</Link>
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className=" album-none">
                          <h5>No Data !</h5>
                        </div>
                      )}

                      {state.memberList?.length > 0 && (
                        <div>
                          <div className="mb-20 ">
                            <Pagination
                              activeNumber={handlePageChange}
                              totalPage={state.total}
                              currentPages={state.currentPage}
                            />
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
      </div>
    </div>
  );
};

export default PublishShareMain;
