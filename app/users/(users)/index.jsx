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

import {
  Dropdown,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import { Modal, Select, Spin, Tooltip, message } from "antd";
import { useRouter } from "next/navigation";

import UserTable from "@/components/(Alumni)/component/Tables/userTable";
import FormField from "@/commonComponents/FormFields";

const Users = () => {
  const { confirm } = Modal;

  const router = useRouter();

  const [errMsg, setErrMsg] = useState({});

  const [state, setState] = useSetState({
    currentPage: 1,
    next: null,
    previous: null,
    total: 0,
    btnLoading: false,
    loading: false,
    userList: [],
    group_ids: [],
    email: "",
    password: "",
  });

  useEffect(() => {
    userList(1);
    roleList();
  }, []);

  const userList = async (page) => {
    try {
      setState({ loading: true });
      const res = await Models.member.users(page);
      setState({
        userList: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false });
      console.log("✌️error --->", error);
    }
  };

  const roleList = async () => {
    try {
      const res = await Models.auth.roleList();
      const dropdown = Dropdown(res, "name");
      setState({
        roleList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const updateStatus = (approval) => {
    confirm({
      title: approval.is_active
        ? "Are you sure you want to InActive this Users?"
        : "Are you sure you want to Active this Users?",

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
      let res = await Models.member.updateUserStatus(approval.id, body);
      message.success(res.message || "Operation successful!");
      userList(state.currentPage);
      setState({ btnLoading: false });
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const updateRole = async (e) => {
    e.preventDefault();

    try {
      if (state.group_ids?.length === 0) {
        message.error("Please select at least one group."); // Display error message
        return;
      }
      setState({ btnLoading: true });
      const body = {
        group_ids: state.group_ids,
        id: state.userId,
      };
      let res = await Models.member.updateUserRole(body);
      message.success(res.message || "Operation successful!");
      setState({ btnLoading: false, isOpen: false });
      userList(state.currentPage);
    } catch (err) {
      setState({ btnLoading: false });
      console.log("err", err);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const validationRules = {
        email: { required: true },
        password: { required: true },
      };
      const body = {
        email: state.email,
        password: state.password,
      };

      const isValid = validateForm(body, validationRules, setErrMsg);
      console.log("✌️isValid --->", isValid);
      if (!isValid) {
        return;
      }
      let res = await Models.member.create_user(body);
      message.success(res.message || "User created successful!");
      setState({ isOpen1: false });
      userList(1);
    } catch (err) {
      console.log("err", err);
    }
  };

  const updateUser = (item) => {
    setState({
      isOpen: true,
      userId: item.id,
      group_ids: item.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ [name]: value });
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
                  <div className="container-fluid">
                    
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row g-5">
                          <div className="col-lg-3 d-sidebar">
                            <MasterDataSidebar />
                          </div>

                          <div className="col-lg-9">
                            <UserTable
                              heading="Users"
                              tableHead={["User Name", "Roles", "Actions"]}
                              tableData={state.userList}
                              updateStatus={(item) => updateStatus(item)}
                              updateUser={(item) => updateUser(item)}
                              loading={state.loading || state.btnLoading}
                              total={state.total}
                              currentPage={state.currentPage}
                              handlePageChange={(number) => {
                                setState({ currentPage: number });
                                userList(number);
                              }}
                              subtitile_1={true}
                              subtitile_2={true}
                              subtitile_1_onPress={() =>
                                setState({
                                  isOpen1: true,
                                  email: "",
                                  password: "",
                                })
                              }
                              subtitile_2_onPress={() =>
                                router.push("/create-member")
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
              title={<div className="custom-modal-header">Edit User</div>}
              open={state.isOpen}
              onCancel={() => setState({ isOpen: false })}
              footer={false}
            >
              <form className="applicants-form" onSubmit={updateRole}>
                <Select
                  mode="multiple"
                  name="group_ids"
                  placeholder="Please select"
                  value={state.group_ids}
                  onChange={(value) => setState({ group_ids: value })}
                  style={{ width: "100%" }}
                  options={state.roleList}
                  required
                />
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="rbt-btn btn-gradient radius-round sm-btn"
                    type="submit"
                  >
                    Assign role
                  </button>
                </div>
              </form>
            </Modal>

            <Modal
              title= {<div className="custom-modal-header">Create User</div>}
              open={state.isOpen1}
              onCancel={() => setState({ isOpen1: false })}
              footer={false}
            >
              <form className="applicants-form" onSubmit={createUser}>
                <div style={{ marginTop: "15px" }}>
                  <FormField
                    type="text"
                    name="email"
                    placeholder="User name"
                    value={state.email}
                    onChange={handleChange}
                    error={errMsg?.email}
                    required={true}
                  />
                  <span className="focus-border"></span>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <FormField
                    type="password"
                    name="password"
                    placeholder="Password"
                    
                    required
                    value={state.password}
                    onChange={handleChange}
                    error={errMsg?.password}
                  />
                  <span className="focus-border"></span>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="rbt-btn btn-gradient radius-round sm-btn"
                    type="submit"
                  >
                    Create User
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

export default Users;
