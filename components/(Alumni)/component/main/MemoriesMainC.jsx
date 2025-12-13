"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "venobox/dist/venobox.min.css";
import { useRouter, useParams } from "next/navigation";
import { message, Modal } from "antd";
import {
  ConvertFormData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import FormField from "@/commonComponents/FormFields";
import CommentBox from "../CommentBox";

const MemoriesMainC = () => {
  const params = useParams();
  const id = params.id;
  const { confirm } = Modal;

  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const fileInputRef = useRef(null);
  // const blog =  getAllPostsMeta();
  //   const selectedBlogs = blog.slice(startIndex, startIndex + 7);

  const [state, setState] = useSetState({
    isOpen: false,
    name: "",
    description: "",
    location: "",
    date: "",
    whoCanView: null,
    error: {},
    isUploadPic: false,
    uploadedImages: [],
    memoriesDetails: {},
    isReplay: false,
    reply: "",
    isLikedUser: false,
    isComment: false,
    isOpenEditPost: false,
    fileInputKey: Date.now(),
    title: "",
    blog: "",
    content: "",
    visibility: "",
    newPostCategory: [],
    groupsOption: [],
    singleData: {},
    AdminLogin: false,
    AlumniManagerLogin: false,
  });

  useEffect(() => {
    memoriesDetails();
    localStorage.setItem("memoriesBack", true);
  }, [id]);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (!Token) {
      router.push("/login");
    }

    const admin = localStorage.getItem("isAdmin");
    setState({ AdminLogin: admin });

    const alumniManager = localStorage.getItem("isAlumniManager");
    setState({ AlumniManagerLogin: alumniManager });
  }, []);

  const memoriesDetails = async () => {
    try {
      const res = await Models.gallery.memoriesDetails(id);
      setState({
        memoriesDetails: res,
        image: res?.photos?.length > 0 ? res?.photos[0] : "",
        tags: res?.tags?.length > 0 ? res?.tags : "",
        year: res?.year,
        month: res?.month,
        uploadedImages: res?.photos?.length > 0 ? [res?.photos[0]] : [],
      });
    } catch (error) {
      if (error?.data?.code === "token_not_valid") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.log("✌️error --->", error);
    }
  };
  console.log("✌️uploadedImages --->", state.uploadedImages);

  const handleCancel = () => {
    setState({ isMemoriesOpen: false });
  };

  const errorFun = (errors) => {
    setState({ error: errors });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure, You want to delete album?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDeleteAlbum();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDeleteAlbum = async () => {
    try {
      await Models.gallery.deleteMemories(id);
      router.push("/gallery");
    } catch (error) {
      console.log("error: ", error);
    }
  };

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

  const createMemories = async () => {
    try {
      const formData = new FormData();
      formData.append("year", state.year);
      formData.append("month", state.month);
      formData.append("tags", state.tags);
      await Models.gallery.updateMemories(id, formData);
      message.success("Memories Updated Successfully");
      await memoriesDetails();
      setState({
        isMemoriesOpen: false,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const PostLike = async () => {
    console.log("hello");

    try {
      const res = await Models.post.PostLike(state.memoriesDetails?.post?.id);
      console.log("✌️res --->", res);
      memoriesDetails();
    } catch (error) {
      console.log("error: ", error?.messages[0]?.message);
      if (error?.messages?.length > 0) {
        error?.messages[0]?.message == "Token is invalid or expired" &&
          router.push("/login");
        localStorage.removeItem("token");
      }
    }
  };

  const approveMemory = async () => {
    try {
      const res = await Models.post.memoryApprove(state.memoriesDetails?.id);
      console.log("✌️res --->", res);
      memoriesDetails();
    } catch (error) {
      console.log("error: ", error?.messages[0]?.message);
      if (error?.messages?.length > 0) {
        error?.messages[0]?.message == "Token is invalid or expired" &&
          router.push("/login");
        localStorage.removeItem("token");
      }
    }
  };

  const handleReplayComment = async () => {
    try {
      const body = {
        replay: state.reply,
      };
      setState({ reply: "", isReplay: false });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const addNewComment = async (value) => {
    console.log("value: ", value);
    try {
      const res = await Models?.post?.AddComments(
        state.memoriesDetails?.post?.id,
        { comment: value }
      );
      console.log("✌️res --->", res);
      memoriesDetails();
      setState({ reply: "" });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await Modal.confirm({
        title: "Are you sure you want to delete this comment?",
        okText: "Yes",
        okType: "danger",
        cancelText: "Cancel",
        async onOk() {
          try {
            const res = await Models?.post?.DeleteComments(id);
            await memoriesDetails();
            message.success("Comment deleted successfully");
          } catch (error) {
            console.error("Delete error: ", error);
            message.error("Failed to delete comment");
            throw error;
          }
        },
        onCancel() {
          console.log("Deletion cancelled");
        },
      });
    } catch (error) {
      console.error("Confirmation error: ", error);
    }
  };

  console.log("state.memoriesDetails", state.memoriesDetails);

  return (
    <>
      <div className="rbt-blog-area rbt-section-overlayping-top rbt-section-gapBottom  kit-memo">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 mt_dec--30">
              {/* {state.memoriesDetails?.post &&
              state.memoriesDetails?.post?.map((data, index) => ( */}
              <div className="col-12 mt--30">
                <div className="rbt-card variation-02 height-auto rbt-hover">
                  <div className="rbt-card-img">
                    <Link href={"#"}>
                      <Image
                        src={state.memoriesDetails?.post?.featured_image}
                        width={1085}
                        height={645}
                        priority
                        unoptimized={true}
                        alt="Card image"
                      />
                    </Link>

                    <div className="rbt-button-group justify-content-end">
                      {(state.memoriesDetails?.is_admin ||
                        state.memoriesDetails?.is_owner) && (
                        <>
                          <a
                            className="rbt-btn btn-xs bg-white radius-round text-white"
                            href="#"
                            title="Edit Memory"
                            onClick={() => setState({ isMemoriesOpen: true })}
                          >
                            <i className="feather-edit pl--0" />
                          </a>
                          <a
                            className="rbt-btn btn-xs bg-white radius-round text-white"
                            href="#"
                            title="Delete Memory"
                            onClick={() => showDeleteConfirm()}
                          >
                            <i className="feather-trash-2 pl--0" />
                          </a>
                        </>
                      )}

                      {state.memoriesDetails?.approved ? (
                        <a
                          className="rbt-btn btn-xs  radius-round"
                          href="#"
                          title="Approved"
                          onClick={() => {
                            if (!state.memoriesDetails?.approved) {
                              approveMemory();
                            }
                          }}
                        >
                          <i className="feather-check-circle pl--0" />
                        </a>
                      ) : (
                        <a
                          className="rbt-btn btn-xs  radius-round"
                          href="#"
                          title="Pending"
                          onClick={() => {
                            if (!state.memoriesDetails?.approved) {
                              approveMemory();
                            }
                          }}
                        >
                          <i className="feather-x-circle pl--0" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="rbt-card-body kit-memo-body">
                    {state.memoriesDetails?.post?.title && (
                      <>
                        <h3 className="rbt-card-title">
                          <Link
                            href={`/dashboard/${state.memoriesDetails?.post?.id}`}
                          >
                            {state.memoriesDetails?.post?.title}
                          </Link>
                        </h3>
                        <p className="rbt-card-text">
                          {state.memoriesDetails?.post?.post_category?.name}
                        </p>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="kit-memo-actions d-flex justify-content-around align-items-center border-top pt-3">
                      <button
                        className={`btn btn-ghost kit-memo-like ${
                          state.memoriesDetails?.post?.data?.is_liked_by_user
                            ? "mt-4"
                            : ""
                        }`}
                         style={{ color: state.memoriesDetails?.post?.is_liked_by_user && "red" }}
                        onClick={PostLike}
                      >
                        <i className="feather-thumbs-up me-1" style={{color:'#2f65df'}}></i>
                      </button>
                      <button
                        className="btn btn-ghost kit-memo-comment-toggle"
                        data-bs-toggle="collapse"
                        data-bs-target="#kitMemoComments"
                      >
                        <i className="feather-message-circle me-1" style={{color:'#43ad27'}}></i> 
                      </button>
                      <button className="btn btn-ghost kit-memo-share">
                        <i className="feather-share-2 me-1" style={{color:'#e53031'}}></i> 
                      </button>
                    </div>

                    {/* Likes Section */}
                    {state.memoriesDetails?.post?.post_likes?.length > 0 && (
                      <div className="kit-memo-likes d-flex align-items-center mt-3">
                        {/* Avatars */}
                        <div className="d-flex" style={{ marginRight: "10px" }}>
                          {state.memoriesDetails?.post?.post_likes
                            ?.slice(0, 3) // show only first 3
                            .map((likeUser, index) => (
                              <img
                                key={index}
                                src={
                                  likeUser?.profile_photo ||
                                  "/images/dummy-member.jpg"
                                }
                                alt={likeUser?.name || "User"}
                                className="rounded-circle border border-white"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  marginLeft: index === 0 ? "0" : "-10px", // overlap effect like Instagram
                                  zIndex: 10 - index,
                                }}
                              />
                            ))}
                        </div>

                        {/* Text */}
                        <span style={{ fontSize: "14px" }}>
                          Liked by{" "}
                          <strong>
                            {state.memoriesDetails?.post?.post_likes[0]?.liked_by}
                          </strong>
                          {state.memoriesDetails?.post?.post_likes?.length > 1 && (
                            <>
                              {" "}
                              and{" "}
                              <strong>
                                {state.memoriesDetails?.post?.post_likes?.length - 1}{" "}
                                others
                              </strong>
                            </>
                          )}
                        </span>
                      </div>
                    )}

                    {/* Comment Section */}
                    <CommentBox
                      data={state.memoriesDetails?.post}
                      commentLength={true}
                      cancelOnClick={() => setState({ isComment: false })}
                      handleReplayComment={(value) => addNewComment(value)}
                      deleteComment={(id) => handleDeleteComment(id)}
                      AdminLogin={state?.AdminLogin}
                      AlumniManagerLogin={state?.AlumniManagerLogin}
                    />
                  </div>
                </div>
              </div>
              {/* ))}  */}
            </div>
          </div>
        </div>
      </div>

      {/* Upload photos */}
      <Modal
        title={<div className="custom-modal-header">Update Memories</div>}
        open={state.isMemoriesOpen}
        onCancel={() => handleCancel()}
        footer={false}
        centered
      >
        {/* 4. Form Wrapper */}
        <form className="applicants-form" onSubmit={createMemories}>
          {/* 5. Status Select (Load More) */}
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

          {/* 7. Submit Button */}
          <div className="d-flex justify-content-end mt-3 gap-4">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
            >
              {state.btnLoadng ? "loading" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MemoriesMainC;
