import { TrimText, useSetState } from "@/utils/commonFunction.utils";
import { Modal, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import DashboardCommentBox from "./DashboardCommentBox";
import Models from "@/imports/models.import";
import DashUserCom from "./DashUserCom";
import Image from "next/image";
import LikedUserLIst from "./LikedUserLIst";

const DashboardListCom = ({ data, GetData, editPost, postLikeDisLinke, page }) => {

  console.log("page", page);
  
  const router = useRouter();
  const { confirm } = Modal;

  const [state, setState] = useSetState({
    reply: "",
    openCommentPostId: null, // 👈 Track which post's comment box is open
    isLikedUser: false,
    AdminLogin: false,
    AlumniManagerLogin: false,
  });

  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (!Token) router.push("/login");

    const admin = localStorage.getItem("isAdmin");
    setState({ AdminLogin: admin });

    const alumniManager = localStorage.getItem("isAlumniManager");
    setState({ AlumniManagerLogin: alumniManager });
  }, []);

  const addNewComment = async (value) => {
    try {
      const res = await Models?.post?.AddComments(data?.id, { comment: value });
      console.log("✌️res --->", res);
      GetData();
      setState({ reply: "" });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleDeleteComment = async (id) => {
    confirm({
      title: "Are you sure, You want to delete this comment?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const res = await Models?.post?.DeleteComments(id);
          console.log("✌️res --->", res);
          GetData();
          message.success("Comment deleted successfully");
        } catch (error) {
          console.log("error: ", error);
        }
      },
    });
  };

  return (
    <>
      <div className={`col-12 mt-0 mb-5`}>
        <div
          className="rbt-card event-list-card variation-01 rbt-hover relative"
          style={{ position: "relative" }}
        >
          {/* Edit Icon */}
          {(state?.AdminLogin == "true" ||
            state?.AlumniManagerLogin == "true") && (
            <div
              className="rbt-button-group"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: 10,
              }}
            >
              <div
                className="rbt-btn btn-xs bg-primary-opacity radius-round"
                onClick={() => editPost()}
                title="Edit"
              >
                <i className="feather-edit pl--0" />
              </div>
            </div>
          )}

          <div className="rbt-card-body pt-0 card-w-img">
            <div className="row card-list-2 event-list-card variation-01 rbt-hover relative gap-4">
              {data?.featured_image && (
                <div className={`${page ? "rbt-card-img col-12 col-md-5 col-lg-4" : "rbt-card-img col-12 col-md-4 col-lg-3"}`}>
                  <Link
                    href={`/dashboard/${data.id}`}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <img
                      src={
                        data?.featured_image
                          ? data?.featured_image
                          : "/images/event/grid-type-01.jpg"
                      }
                      width={355}
                      height={240}
                      
                      alt="Card image"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </Link>
                </div>
              )}

              <div className={`${page ? "col-12 col-md-6 col-lg-7" : "col-12 col-md-7 col-lg-8"}`}>
                <h4 className="rbt-card-title font-20">
                  <Link href={`/dashboard/${data?.id}`}> {data?.title}</Link>
                </h4>
                <p
                  className="text-gray mt--dec-40 mb-3"
                  style={{ fontSize: "16px" }}
                >
                  {data?.post_category?.name}
                </p>

                 <p
                  className="text-gray mt--dec-40 mb-3"
                  style={{ fontSize: "16px" }}
                >
                  {TrimText (data?.content , 150)}
                </p>

                <DashUserCom
                  data={data}
                  isShowDate={true}
                  isBtnShow={true}
                  btnText="View Detail Post"
                  btnOnClick={() => router?.push(`/dashboard/${data?.id}`)}
                />

                <div className="rbt-card-bottom mt-4">
                  <a
                    className="rbt-btn-link color-primary"
                    href={`/dashboard/${data?.id}`}
                  >
                    View Post
                    <i className="feather-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="kit-memo-actions d-flex align-items-center border-top pt-3 mt-4">
              <button
                className="btn btn-ghost kit-memo-comment-toggle"
                onClick={() =>
                  setState({
                    openCommentPostId:
                      state.openCommentPostId === data?.id ? null : data?.id, // 👈 toggle per post
                    isLikedUser: false,
                  })
                }
              >
                <i className="feather-message-circle me-1" style={{color:'#43ad27'}}></i> 
              </button>
              <button
                className="btn btn-ghost kit-memo-like"
                style={{ color: data?.post_liked && "red" }}
                onClick={postLikeDisLinke}
              >
                <i className="feather-thumbs-up me-1" style={{color:'#2f65df'}}></i>
              </button>

              

              <button className="btn btn-ghost kit-memo-share">
                <i className="feather-share-2 me-1" style={{color:'#e53031'}}></i> 
              </button>
            </div>

            {/* Likes */}
            {data?.post_likes?.length > 0 && (
              <div className="kit-memo-likes d-flex align-items-center mt-3">
                <div
                  className="d-flex"
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    setState({  openCommentPostId: null })
                  }
                >
                  {data?.post_likes?.slice(0, 3).map((likeUser, index) => (
                    <img
                      key={index}
                      src={
                        likeUser?.profile_photo || "/images/dummy-member.jpg"
                      }
                      alt={likeUser?.name || "User"}
                      className="rounded-circle border border-white"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: index === 0 ? "0" : "-10px",
                        zIndex: 10 - index,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: "12px" }}>
                  Liked by <strong>{data?.post_likes[0]?.liked_by}</strong>
                  {data?.post_likes?.length > 1 && (
                    <>
                      {" "}
                      and <strong>{data?.post_likes?.length - 1} others</strong>
                    </>
                  )}
                </span>
              </div>
            )}

            {/* Comment Section */}
            {state.openCommentPostId === data?.id && (
              <DashboardCommentBox
                data={data}
                cancelOnClick={() => setState({ openCommentPostId: null })}
                handleReplayComment={(value) => addNewComment(value)}
                deleteComment={(id) => handleDeleteComment(id)}
                AdminLogin={state?.AdminLogin}
                AlumniManagerLogin={state?.AlumniManagerLogin}
              />
            )}
          </div>
        </div>
      </div>

      <Modal
        title={<div className="custom-modal-header">People Who Like This</div>}
        open={state.isLikedUser}
        onCancel={() => setState({ isLikedUser: false })}
        footer={false}
        centered
      >
        {state?.postList?.post_likes?.map((likeUserList, index) => (
          <LikedUserLIst
            key={index}
            data={likeUserList}
            isShowDate={true}
            isBtnShow={true}
            btnText="View Detail Post"
            btnOnClick={() => router?.push(`/dashboard/${data?.id}`)}
          />
        ))}
      </Modal>
    </>
  );
};

export default DashboardListCom;
