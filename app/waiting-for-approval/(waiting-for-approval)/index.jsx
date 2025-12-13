"use client";

import Separator from "@/components/Common/Separator";

import MobileMenu from "@/components/Header/MobileMenu";

import InstructorDashboardHeader from "@/components/Instructor/InstructorDashboardHeader";
import Context from "@/context/Context";
import Store from "@/redux/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import MasterDataSidebar from "@/components/(Alumni)/component/KITMaster/MasterDataSidebar";
import AdminMain from "@/components/(Alumni)/component/KITMaster/AdminMain";
import QuizAttempts from "@/components/Student/QuizAttempts";
import CommonTable from "@/components/(Alumni)/commonTable";
import { useSetState } from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import { message, Modal } from "antd";

const WaitingForApproval = () => {
  const { confirm } = Modal;

  const [state, setState] = useSetState({
    currentPage: 1,
    approvalList: [],
    next: null,
    previous: null,
    total: 0,
    btnLoading: false,
    loading: false,
  });

  useEffect(() => {
    getData(1);
  }, []);

  const getData = async (page) => {
    try {
      setState({ loading: true });
      let res = await Models.member.pendingMember(page);
      setState({
        approvalList: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
        loading: false,
      });
    } catch (err) {
      setState({ loading: false });

      console.log("err", err);
    }
  };

  const updateStatus = (approval) => {
    confirm({
      title: "Are you sure you want this approval?",
      okText: "Yes",
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
      let res = await Models.member.approveMember(approval.member_id);
      message.success(res.message || "Operation successful!");
      getData();
      setState({ btnLoading: false });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
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
                        {/* <InstructorDashboardHeader /> */}

                        <div className="row g-5">
                          <div className="col-lg-3 d-sidebar">
                            <MasterDataSidebar />
                          </div>

                          <div className="col-lg-9">
                            {/* <AdminMain /> */}
                            <CommonTable
                              heading="Waiting For Approval"
                              tableHead={[
                                "Profile Pic",
                                "Mobile No",
                                "Email",
                                "Course",
                                "Batch",
                                "File",
                                "",
                              ]}
                              tableData={state.approvalList}
                              updateStatus={(item) => updateStatus(item)}
                              loading={state.loading || state.btnLoading}
                              total={state.total}
                              currentPage={state.currentPage}
                              handlePageChange={(number) => {
                                setState({ currentPage: number });
                                getData(number);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

           {/* <Separator /> */}
          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default WaitingForApproval;
