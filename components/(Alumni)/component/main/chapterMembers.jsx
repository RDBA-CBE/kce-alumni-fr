import Pagination from "@/commonComponents/Pagination";
import Models from "@/imports/models.import";
import { capitalizeFLetter, useSetState } from "@/utils/commonFunction.utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChapterMembers = () => {
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
      setState({
        userList: res?.results,
        total: res?.count,
        currentPage: page,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handlePageChange = (number) => {
    joined_users(number, state.detail?.id);
  };

  return (
    <section className="jd-page container-fluid section-pad">
      <div className="row justify-content-center">
        <div className="col-11 col-xl-10">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="rbt-shadow-box mb-4">
                  <h1 className="jd-title">{state.detail?.name} - Users</h1>
                  <p className="text-muted">Total Users: {state.total}</p>
                </div>

                <div className="rbt-shadow-box">
                  <div className="row">
                    {state.userList?.map((user, index) => (
                      <div key={index} className="col-lg-6 col-12 mb-4">
                        <div className="d-flex align-items-center p-3 bg-color-primary-opacity rounded">
                          <div className="me-3">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center text-white"
                              style={{
                                width: "50px",
                                height: "50px",
                                fontSize: "18px",
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
                              {(
                                user?.user?.first_name?.[0] || "M"
                              ).toUpperCase()}
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
                            <div className="text-muted">
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
                      </div>
                    ))}
                  </div>

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterMembers;
