"use client";

import Separator from "@/components/Common/Separator";

import MobileMenu from "@/components/Header/MobileMenu";

import InstructorDashboardHeader from "@/components/Instructor/InstructorDashboardHeader";
import Context from "@/context/Context";
import Store from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import MasterDataSidebar from "@/components/(Alumni)/component/KITMaster/MasterDataSidebar";
import AdminMain from "@/components/(Alumni)/component/KITMaster/AdminMain";
import QuizAttempts from "@/components/Student/QuizAttempts";
import CommonTable from "@/components/(Alumni)/commonTable";
import { useSetState, validateForm } from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import { message, Modal } from "antd";
import SalutationTable from "@/components/(Alumni)/component/Tables/salutationTable";
import FormField from "@/commonComponents/FormFields";

const Salutation = () => {
  const { confirm } = Modal;

  const [state, setState] = useSetState({
    currentPage: 1,
    approvalList: [],
    next: null,
    previous: null,
    total: 0,
    btnLoading: false,
    loading: false,
    editId: null,
  });

  const [formData, setFormData] = useState({
    salutation: "",
    description: "",
  });

  const [errMsg, setErrMsg] = useState({});
  console.log("✌️errMsg --->", errMsg);

  useEffect(() => {
    getData(1);
  }, []);

  const getData = async (page) => {
    try {
      setState({ loading: true });
      let res = await Models.masters.salutation();
      setState({
        approvalList: res?.results,
        // currentPage: page,
        // next: res?.next,
        // previous: res?.previous,
        // total: res?.count,
        loading: false,
      });
    } catch (err) {
      setState({ loading: false });

      console.log("err", err);
    }
  };

  const update = (approval) => {
    setFormData({
      salutation: approval?.salutation_name,
      description: approval?.description,
    });
    setState({ editId: approval.salutation_id, isOpen: true });
    console.log("✌️approval --->", approval);
  };

  const createSalutation = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        salutation: { required: true },
        description: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;

      const res = await Models.masters.create_salutation(formData);
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      getData();
      setFormData({
        salutation: "",
        description: "",
      });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const updateSalutation = async (e) => {
    try {
      e.preventDefault();

      const validationRules = {
        salutation: { required: true },
        description: { required: true },
      };
      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) return;

      const res = await Models.masters.update_salutation(
        state.editId,
        formData
      );
      message.success(res?.message);
      setState({ isOpen: false, editId: null });
      getData();
      setFormData({
        salutation: "",
        description: "",
      });
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
            <div className="container-fuild">
              <div className="row justify-content-center">
                <div className="col-11 col-xl-10 con-wid">
                  <div className="container-fuild">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* <InstructorDashboardHeader /> */}

                        <div className="row g-5">
                          <div className="col-lg-3">
                            <MasterDataSidebar />
                          </div>

                          <div className="col-lg-9">
                            {/* <AdminMain /> */}
                            <SalutationTable
                              heading="Salutation"
                              tableHead={[
                                "Salutation Name",
                                "description",
                                "Actions",
                              ]}
                              subtitile_1
                              tableData={state.approvalList}
                              loading={state.loading || state.btnLoading}
                              total={state.total}
                              currentPage={state.currentPage}
                              updateUser={(item) => update(item)}
                              handlePageChange={(number) => {
                                setState({ currentPage: number });
                                getData(number);
                              }}
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
              title={state.editId ? "Edit Salutation" : "Create Salutation"}
              open={state.isOpen}
              onCancel={() => setState({ isOpen: false })}
              footer={false}
              className=""
            >
              <form
                onSubmit={state.editId ? updateSalutation : createSalutation}
                className="applicants-form"
              >
                <div className="mt-5">
                  <FormField
                    type="text"
                    name="salutation"
                    label="Salutation Name"
                    value={formData.salutation}
                    onChange={handleChange}
                    error={errMsg?.salutation}
                    required={true}
                  />
                </div>

                <div className="mt-5">
                  <FormField
                    type="textarea"
                    name="description"
                    label="Description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    error={errMsg?.description}
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

export default Salutation;
