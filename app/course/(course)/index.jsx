"use client";

import Separator from "@/components/Common/Separator";

import MobileMenu from "@/components/Header/MobileMenu";

import Context from "@/context/Context";
import Store from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import MasterDataSidebar from "@/components/(Alumni)/component/KITMaster/MasterDataSidebar";
import { useSetState, validateForm } from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import { message, Modal } from "antd";
import FormField from "@/commonComponents/FormFields";
import CourseTable from "@/components/(Alumni)/component/Tables/courseTable";

const Course = () => {
  const { confirm } = Modal;

  const [state, setState] = useSetState({
    currentPage: 1,
    courseList: [],
    next: null,
    previous: null,
    total: 0,
    btnLoading: false,
    loading: false,
    editId: null,
    departmentList: [],
    currenDepartmentPage: 1,
    hasDepartmentLoadMore: null,
  });

  const [formData, setFormData] = useState({
    department: "",
    graduate: "",
    title: "",
  });

  console.log("formData", formData);
  

  const [errMsg, setErrMsg] = useState({});
  const [getDepartment, setGetDepartment] = useState([]);

  useEffect(() => {
    GetCourse(1);
    getDepartments();
  }, []);

  const GetCourse = async (page) => {
    try {
      setState({ loading: true });
      const res = await Models.masters.courseList(page);
      setState({
        courseList: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false });
    }
  };

  const getDepartments = async () => {
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

  const update = (approval) => {
    setFormData({
      department: {
        value: approval?.department,
        label: approval?.department,
      },
      graduate: approval?.graduate,
      title: approval?.title,
    });
    setState({ editId: approval.course_id, isOpen: true });
  };

  const createCourse = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        department: { required: true },
        graduate: { required: true },
        title: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;
      const body = {
        title: formData.title,
        graduate: formData.graduate,
        department_id: formData.department.value,
      };
      const res = await Models.masters.create_course(body);
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      GetCourse(1);
      setFormData({
        department: "",
        title: "",
        graduate: "",
      });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const updateCourse = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        department: { required: true },
        graduate: { required: true },
        title: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;

      const body = {
        title: formData.title,
        graduate: formData.graduate,
        department_id: formData.department.value,
      };

      const res = await Models.masters.update_course(state.editId, body);
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      GetCourse(1);
      setFormData({
        department: "",
        title: "",
        graduate: "",
      });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const updateStatus = (approval) => {
    confirm({
      title: approval.is_active
        ? "Are you sure you want to InActive this Course?"
        : "Are you sure you want to Active this Course?",

      okText: approval.is_active ? "InActive" : "Active",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        confirmApproval(approval);
      },
      onCancel() {},
    });
  };

  const confirmApproval = async (approval) => {
    try {
      setState({ btnLoading: true });
      const body = {
        is_active: !approval.is_active,
      };
      let res = await Models.masters.deactivate_course(
        approval.course_id,
        body
      );
      message.success(res.message || "Operation successful!");
      GetCourse(1);
      setState({ btnLoading: false });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />

          <div className="rbt-page-banner-wrapper">
            <div className="rbt-banner-image admin" />
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-11 col-xl-10 con-wid">
                  <div className="container-fuild">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row g-5">
                          <div className="col-lg-3">
                            <MasterDataSidebar />
                          </div>

                          <div className="col-lg-9">
                            <CourseTable
                              heading="Course"
                              tableHead={[
                                "Course Name",
                                "Graduate",
                                "Department",
                                "Actions",
                              ]}
                              subtitile_1
                              tableData={state.courseList}
                              loading={state.loading || state.btnLoading}
                              total={state.total}
                              currentPage={state.currentPage}
                              updateUser={(item) => update(item)}
                              handlePageChange={(number) => {
                                setState({ currentPage: number });
                                GetCourse(number);
                              }}
                              subtitile_1_onPress={() =>
                                setState({ isOpen: true ,
                                  editId:null
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              title={state.editId ? "Edit Course" : "Create Course"}
              open={state.isOpen}
              onCancel={() => {
                setErrMsg("");
                setState({ isOpen: false });
              }}
              footer={false}
              className=""
            >
              <form
                onSubmit={state.editId ? updateCourse : createCourse}
                className="applicants-form"
              >
                <div className="mt-3">
                  <FormField
                    type="text"
                    name="title"
                    label="Course Name"
                    value={formData.title}
                    onChange={handleChange}
                    error={errMsg?.title}
                    required={true}
                  />
                </div>

                <div className="mt-3">
                  <FormField
                    type="text"
                    name="graduate"
                    label="Graduate"
                    required
                    value={formData.graduate}
                    onChange={handleChange}
                    error={errMsg?.graduate}
                  />
                </div>
                <div className="mt-3">
                  <FormField
                    placeholder="Department"
                    label="Department"
                    type="loadMoreSelect"
                    name="department"
                    value={formData.department.name}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e })
                    }
                    error={errMsg.department}
                    options={state.departmentList}
                    required={true}
                    loadMore={() => departmentListLoadMore()}
                  />
                </div>

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
          </div>

           {/* <Separator /> */}
          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default Course;
