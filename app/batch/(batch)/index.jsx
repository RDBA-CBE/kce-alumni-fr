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
import BatchTable from "@/components/(Alumni)/component/Tables/batchTable";

const Course = () => {
  const { confirm } = Modal;

  const [state, setState] = useSetState({
    currentPage: 1,
    batchList: [],
    next: null,
    previous: null,
    total: 0,
    btnLoading: false,
    loading: false,
    editId: null,
  });

  const [formData, setFormData] = useState({
    title: "",
    start_year: "",
    end_year: "",
  });

  const [errMsg, setErrMsg] = useState({});

  useEffect(() => {
    GetBatch(1);
    getDepartments();
  }, []);

  const GetBatch = async (page) => {
    try {
      setState({ loading: true });
      const res = await Models.masters.batchList(page);
      console.log("✌️res --->", res);
      setState({
        batchList: res?.results,
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
      const res = await Models.masters.department();

      const DepartmentOption = res?.results?.map((cou) => ({
        value: cou.department_id,
        label: cou.full_name,
      }));
      setState({
        hasDepartmentLoadMore: res?.next,
        departmentList: DepartmentOption,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const update = (approval) => {
    setFormData({
      start_year: approval?.start_year,
      end_year: approval?.end_year,
      title: approval?.title,
    });
    setState({ editId: approval.batch_id, isOpen: true });
  };

  const createBatch = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        start_year: { required: true },
        end_year: { required: true },
        title: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;
      const res = await Models.masters.create_batch(formData);
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      GetBatch(1);
      setFormData({
        graduate: "",
        start_year: "",
        end_year: "",
      });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const updateBatch = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        start_year: { required: true },
        end_year: { required: true },
        title: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;
      const res = await Models.masters.update_batch(state.editId, formData);
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      GetBatch(1);
      setFormData({
        title: "",
        start_year: "",
        end_year: "",
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
                            <BatchTable
                              heading="Batch"
                              tableHead={[
                                "Batch Name",
                                "Start Year",
                                "End Year",
                                "Actions"
                              ]}
                              subtitile_1
                              tableData={state.batchList}
                              loading={state.loading || state.btnLoading}
                              total={state.total}
                              currentPage={state.currentPage}
                              updateUser={(item) => update(item)}
                              handlePageChange={(number) => {
                                setState({ currentPage: number });
                                GetBatch(number);
                              }}
                              updateStatus={(item) => updateStatus(item)}
                              subtitile_1_onPress={() =>
                                setState({ isOpen: true })
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
              title={state.editId ? "Edit Batch" : "Create Batch"}
              open={state.isOpen}
              onCancel={() => {
                setErrMsg("");
                setState({ isOpen: false });
              }}
              footer={false}
              className=""
            >
              <form
                onSubmit={state.editId ? updateBatch : createBatch}
                className="applicants-form"
              >
                <div className="mt-3">
                  <FormField
                    type="text"
                    name="title"
                    label="Batch Name"
                    value={formData.title}
                    onChange={handleChange}
                    error={errMsg?.title}
                    required={true}
                  />
                </div>

                <div className="mt-3">
                  <FormField
                    type="number"
                    name="start_year"
                    label="Start Year"
                    required
                    value={formData.start_year}
                    onChange={handleChange}
                    error={errMsg?.start_year}
                  />
                </div>
                <div className="mt-3">
                  <FormField
                    type="number"
                    name="end_year"
                    label="End Year"
                    required
                    value={formData.end_year}
                    onChange={handleChange}
                    error={errMsg?.end_year}
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
