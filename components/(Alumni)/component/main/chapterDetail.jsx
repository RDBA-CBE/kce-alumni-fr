import Models from "@/imports/models.import";
import { BaseURL } from "@/utils/BaseUrl";
import {
  capitalizeFLetter,
  formattedDate,
  useSetState,
} from "@/utils/commonFunction.utils";
import axios from "axios";
import Link from "next/link";

import {
  ServerInsertedHTMLContext,
  useParams,
  useRouter,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { message } from "antd";

const ChapterDetail = () => {
  const { id } = useParams();

  const [state, setState] = useSetState({
    detail: "",
    userList: [],
    adminOrManager: false,
  });

  useEffect(() => {
    chapter_detail();
    const Admin = localStorage.getItem("isAdmin");
    const AlumniManager = localStorage.getItem("isAlumniManager");
    const adminOrManager = Admin === "true" || AlumniManager === "true";
    setState({ adminOrManager });
  }, [id]);

  const chapter_detail = async () => {
    try {
      const res = await Models.chapter.detail(id);
      setState({ detail: res });
      if (res?.id) {
        joined_users(1, res?.id);
      }
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const joined_users = async (page = 1, id) => {
    try {
      const res = await Models.chapter.getUserByChapterId(page, id);
      setState({ userList: res?.results, total: res?.count });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      await Models.chapter.deleteUser(user?.id);
      message.success("User removed successfully");
      joined_users(state.currentPage, state.detail?.id);
    } catch (error) {
      console.log("Delete error:", error);
      message.error("Failed to remove user");
    }
  };
  console.log("✌️state.adminOrManager --->", state.adminOrManager);

  return (
    <section className="jd-page container-fluid section-pad">
      <div className="row justify-content-center">
        <div className="col-11 col-xl-10">
          <div className="container-fluid">
            <div className="row gx-4">
              <div className="col-lg-8">
                <div className="rbt-shadow-box">
                  <div className="d-flex align-items-start justify-content-between jd-header">
                    <div>
                      <h1 className="jd-title">{state.detail?.name}</h1>
                      <div className="jd-company-line">
                        <span className="jd-company">
                          {state.detail?.chapter_type}
                        </span>
                        <span className="jd-dot">—</span>
                        <span className="jd-location">
                          {state.detail?.location?.location}
                        </span>
                        <div className="jd-posted">
                          Created On: {formattedDate(state.detail?.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="jd-section mt-4 rbt-shadow-box">
                  <h4 className="jd-section-title">Chapter Details</h4>
                  <p className="jd-text mb-2">
                    <b>Description: </b>
                    {state.detail?.description}
                  </p>
                  <p className="jd-text mb-2">
                    <b>Type: </b>
                    {state.detail?.chapter_type}
                  </p>
                </div>

                <div className="jd-section mt-4 rbt-shadow-box">
                  <h4 className="jd-section-title">Location Details</h4>
                  <p className="jd-text mb-2">
                    <b>Location: </b>
                    {state.detail?.location?.location}
                  </p>
                  <p className="jd-text mb-2">
                    <b>Country: </b>
                    {state.detail?.country?.country_name}
                  </p>
                </div>

                {state.detail?.image && (
                  <div className="jd-section mt-4 rbt-shadow-box">
                    <h4 className="jd-section-title">Chapter Image</h4>
                    <img
                      src={state.detail.image}
                      alt="Chapter"
                      style={{
                        width: "100%",
                        maxWidth: "400px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="jd-side-card rbt-shadow-box">
                  <div className="jd-side-title d-flex justify-content-between mb-4">
                    <span>Chapter Members ({state.total || 0})</span>
                    {state.userList?.length > 9 && (
                      <Link
                        href={`/chapter-members/${id}`}
                        className="text-primary"
                        style={{ fontSize: "14px" }}
                      >
                        See All <i className="feather-arrow-right"></i>
                      </Link>
                    )}
                  </div>
                  {state.userList
                    ?.filter((user) => user?.user?.first_name)
                    ?.map((user, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-3 p-3 bg-color-primary-opacity rounded"
                      >
                        <div className="me-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white"
                            style={{
                              width: "40px",
                              height: "40px",
                              fontSize: "16px",
                              fontWeight: "bold",
                              backgroundColor: [
                                "#007bff",
                                "#28a745",
                                "#dc3545",
                                "#ffc107",
                                "#6f42c1",
                                "#fd7e14",
                              ][index % 6],
                            }}
                          >
                            {(user?.user?.first_name?.[0] || "M").toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold text-dark mb-1">
                            {user?.user?.first_name && user?.user?.last_name
                              ? `${capitalizeFLetter(
                                  user.user.first_name
                                )} ${capitalizeFLetter(user.user.last_name)}`
                              : "Member"}
                          </div>
                          <div className="text-muted small">
                            {user?.user?.email}
                          </div>
                        </div>
                        {state.adminOrManager && (
                            <div className="ms-2">
                              <button
                                className="btn btn-lg btn-outline-danger"
                                onClick={() => handleDeleteUser(user)}
                                title="Remove User"
                              >
                                <i className="feather-trash-2"></i>
                              </button>
                            </div>
                          )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterDetail;
