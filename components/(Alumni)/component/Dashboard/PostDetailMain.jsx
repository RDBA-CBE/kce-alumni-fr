"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "venobox/dist/venobox.min.css";
import { useRouter, useParams } from "next/navigation";
import { message, Modal } from "antd";
import {
  ConvertFormData,
  Dropdown,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import Models from "@/imports/models.import";
import FormField from "@/commonComponents/FormFields";
import CommentBox from "../CommentBox";
import { VisibilityPosts } from "@/utils/constant.utils";
import DashboardCommentBox from "./DashboardCommentBox";
import DashUserCom from "./DashUserCom";
import LikedUserLIst from "./LikedUserLIst";

const PostDetailMain = () => {
  const params = useParams();
  const id = params.id;
  const imgInputRef = useRef(null);

  const { confirm } = Modal;

  const router = useRouter();

  const [state, setState] = useSetState({
    type: null,
    tags: null,
    groups: null,
    typeOption: [],
    tagsOption: [],
    groupsOption: [],
    isOpenNewPost: false,
    fileInputKey: Date.now(),
    imageFile: null,
    title: "",
    blog: "",
    // attachmentFile: null,
    content: "",
    visibility: "",
    newPostCategory: [],
    error: {},
    postList: [],
    postCatOption: [],
    editPostId: null,
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
    // getType();
    // getTags();
    // getGroup();
    GetPostCategory();
    GetPostData();
  }, []);

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

  const GetPostData = async () => {
    try {
      const res = await Models.post.GetSinglePostData(id);
      console.log("✌️res --->", res);
      setState({ postList: res });
    } catch (error) {
      if (error?.messages?.length > 0) {
        if (error.messages[0]?.message == "Token is invalid or expired") {
          router.push("/login");
        }
      }
      console.log("error: ", error);
    }
  };
  const GetPostCategory = async () => {
    try {
      const res = await Models?.masters?.GetPostCategoryData(1);
      const dropdown = Dropdown(res?.results, "name");
      setState({ postCatOption: dropdown });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //   const getType = async () => {
  //     try {
  //       const res = await Models.post.type();
  //       const dropdown = Dropdown(res, "title");
  //       setState({ typeOption: dropdown });
  //     } catch (error) {
  //       console.log("error: ", error);
  //     }
  //   };

  //   const getTags = async () => {
  //     try {
  //       const res = await Models.post.type();
  //       const dropdown = Dropdown(res, "title");
  //       setState({ tagsOption: dropdown });
  //     } catch (error) {
  //       console.log("error: ", error);
  //     }
  //   };

  //   const getGroup = async () => {
  //     try {
  //       const res = await Models.post.type();
  //       const dropdown = Dropdown(res, "title");
  //       setState({ groupsOption: dropdown });
  //     } catch (error) {
  //       console.log("error: ", error);
  //     }
  //   };

  const handleFiltersSubmit = async () => {
    try {
      const res = await Models.post.type();
      const dropdown = Dropdown(res, "title");
      setState({ groupsOption: dropdown });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleClearFilter = () => {
    setState({
      type: null,
      tags: null,
      groups: null,
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") {
      setState({ imageFile: file });
    }
    // else if (type === "attachment") {
    //   setState({ attachmentFile: file });
    // }
    e.target.value = null;
  };

  const removeFile = (type) => {
    if (type === "image") {
      setState({ imageFile: null });
    }
    // else if (type === "attachment") {
    //   setState({ attachmentFile: null });
    // }
  };

  const createPost = async () => {
    const body = {
      featured_image: state.imageFile,
      // attach: state.attachmentFile,
      title: state.title,
      blog: state.blog,
      content: state.content,
      post_category: state.newPostCategory,
      visible_to_public: state.visibility,
    };

    const validationRules = {
      title: { required: true },
      blog: { required: true },
      featured_image: { required: true },
      // attach: { required: true },
      content: { required: true },
      post_category: { required: true },
      visible_to_public: { required: true },
    };
    const isValid = validateForm(body, validationRules, errorFun);

    if (!isValid) {
      console.log("Validation errors:", state.error); // Log any validation errors
      return;
    }

    console.log("body: ", body);
    const formData = new FormData();

    if (state.imageFile) {
      formData.append("featured_image", state.imageFile);
    }
    // if (state.attachmentFile) {
    //   formData.append("attach", state.attachmentFile);
    // }
    formData.append("title", state.title || "");
    formData.append("blog", state.blog || "");
    formData.append("content", state.content || "");
    formData.append("post_category", state.newPostCategory || []);
    formData.append(
      "visible_to_public",
      (state.visibility == "1" && "True") ||
        (state?.visibility == "2" && "False") ||
        false
    );

    try {
      const res = await Models.post.CreatePostData(formData);
      console.log("✌️res --->", res);
      GetPostData();
      setState({
        isOpenNewPost: false,
        imageFile: null,
        // attachmentFile: null,
        title: "",
        blog: "",
        content: "",
        visibility: "",
        newPostCategory: [],
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const body = {
      featured_image: state.imageFile,
      // attach: state.attachmentFile,
      title: state.title,
      blog: state.blog,
      content: state.content,
      post_category: state.newPostCategory,
      visible_to_public: state.visibility,
    };

    const validationRules = {
      title: { required: true },
      blog: { required: true },
      featured_image: { required: true },
      // attach: { required: true },
      content: { required: true },
      post_category: { required: true },
      visible_to_public: { required: true },
    };
    const isValid = validateForm(body, validationRules, errorFun);

    console.log(state.error);

    if (!isValid) {
      console.log("Validation errors:", state.error); // Log any validation errors
      return;
    }

    console.log("body: ", body);
    const formData = new FormData();

    if (state.imageFile) {
      formData.append("featured_image", state.imageFile);
    }
    // if (state.attachmentFile) {
    //   formData.append("attach", state.attachmentFile);
    // }
    formData.append("title", state.title || "");
    formData.append("blog", state.blog || "");
    formData.append("content", state.content || "");
    formData.append("post_category", state.newPostCategory || []);
    formData.append(
      "visible_to_public",
      (state.visibility == "1" && "True") ||
        (state?.visibility == "2" && "False") ||
        "False"
    );

    try {
      const res = await Models.post.UpdatePostData(
        state?.singleData?.id,
        formData
      );
      console.log("✌️res --->", res);
      GetPostData();

      setState({
        isOpenNewPost: false,
        imageFile: null,
        title: "",
        blog: "",
        content: "",
        visibility: "",
        newPostCategory: [],
        editPostId: null,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  console.log("state.error", state.error);

  const errorFun = (errors) => {
    setState({ error: errors });
  };

  const VisibilityDropDown = Dropdown(VisibilityPosts, "name");

  const editPost = async (item) => {
    try {
      setState({ editPostId: item.id, isOpenNewPost: true });
      const res = await Models?.post?.GetSinglePostData(item.id);
      setState({ title: res.title });
      let file = null;
      if (res.featured_image) {
        const url = new URL(res.featured_image);
        const filename = url.pathname.split("/").pop();
        file = await convertUrlToFile(res.featured_image, filename);
      }

      setState({
        imageFile: file,
        title: res?.title,
        blog: res?.blog,
        content: res?.content,
        visibility: res?.visible_to_public == true ? "1" : "2",
        newPostCategory: res?.post_category?.id,
        singleData: res,
      });
    } catch (error) {
      console.log("error: ", error);
      setState({ isOpenNewPost: false });
    }
  };

  const PostLike = async (id) => {
    try {
      const res = await Models.post.PostLike(id);
      console.log("✌️res --->", res);
      GetPostData();
    } catch (error) {
      console.log("error: ", error?.messages[0]?.message);
      if (error?.messages?.length > 0) {
        error?.messages[0]?.message == "Token is invalid or expired" &&
          router.push("/login");
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
      const res = await Models?.post?.AddComments(state?.postList?.id, {
        comment: value,
      });
      console.log("✌️res --->", res);
      GetPostData();
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
      onOk() {
        try {
          const res = Models?.post?.DeleteComments(id);
          console.log("✌️res --->", res);
          GetPostData();
          message.success("Comment deleted successfully");
        } catch (error) {
          console.log("error: ", error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
    try {
      const res = await Models?.post?.DeleteComments(id);
      console.log("✌️res --->", res);
      GetPostData();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      {/* {state.memoriesDetails?.post !== null ? ( */}
      <div className="rbt-blog-area  section-pad kit-memo">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 mt_dec--30">
              {/* {state.memoriesDetails?.post &&
              state.memoriesDetails?.post?.map((data, index) => ( */}
              <div className="col-12 mt--30">
                <div className="rbt-card variation-02 height-auto rbt-hover">
                  <div className="rbt-card-img">
                    {state?.postList?.featured_image && (
                      <Link href={"#"}>
                        <Image
                          src={state?.postList?.featured_image}
                          width={1085}
                          height={645}
                          
                          unoptimized={true}
                          alt="Card image"
                        />
                      </Link>
                    )}

                    <div className="rbt-button-group justify-content-end">
                      {/* {(state.memoriesDetails?.is_admin ||
                        state.memoriesDetails?.is_owner) && ( */}
                      <>
                        <a
                          className="rbt-btn btn-xs bg-white radius-round text-white"
                          href="#"
                          title="Edit"
                          onClick={() => editPost(state?.postList)}
                        >
                          <i className="feather-edit pl--0" />
                        </a>
                      </>
                      {/* )} */}
                    </div>
                  </div>

                  <div className="rbt-card-body kit-memo-body">
                    {state?.postList?.title && (
                      <>
                        <h3 className="rbt-card-title">
                          <Link href={`/dashboard/${state?.postList?.id}`}>
                            {state?.postList?.title}
                          </Link>
                        </h3>
                        <p className="rbt-card-text mb-3">
                          {state?.postList?.post_category?.name}
                        </p>
                        {state?.postList?.content && (
                          <p className="mb-2" style={{ fontSize: "14px" }}>
                            {" "}
                            {state?.postList?.content}
                          </p>
                        )}
                      </>
                    )}

                    <DashUserCom
                      data={state?.postList}
                      isShowDate={true}
                      isBtnShow={true}
                      btnText="View Detail Post"
                      btnOnClick={() => router?.push(`/dashboard/${data?.id}`)}
                    />

                    {/* Action Buttons */}
                    <div className="kit-memo-actions d-flex justify-content-around align-items-center border-top pt-3 mt-4">
                      <button
                        className={`btn btn-ghost kit-memo-like ${
                          state?.postList?.post?.post_liked ? "mt-4" : ""
                        }`}
                        style={{
                          color: state?.postList?.post_liked && "red",
                        }}
                        onClick={() => PostLike(state?.postList?.id)}
                      >
                        <i className="feather-thumbs-up me-1"></i> Like
                      </button>

                      <button
                        className="btn btn-ghost kit-memo-comment-toggle"
                        data-bs-toggle="collapse"
                        data-bs-target="#kitMemoComments"
                        onClick={() =>
                          setState({
                            isLikedUser: false,
                            isComment: true,
                            isReplay: false,
                          })
                        }
                      >
                       <i className="feather-message-circle me-1" style={{color:'#43ad27'}}></i> {" "}
                        {state?.postList?.post_comments_count} Comments
                      </button>

                      <button className="btn btn-ghost kit-memo-share">
                        <i className="feather-share-2 me-1"></i> Share
                      </button>
                    </div>

                    {/* Likes Section */}
                    {state?.postList?.post_likes?.length > 0 && (
                      <div className="kit-memo-likes d-flex align-items-center mt-3">
                        {/* Avatars */}
                        <div className="d-flex" style={{ marginRight: "10px" }}>
                          {state?.postList?.post_likes
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
                        <span
                          style={{ fontSize: "14px", cursor: "pointer" }}
                          onClick={() =>
                            setState({
                              isLikedUser:
                                state?.postList?.post_likes?.length > 0 && true,
                              isComment: false,
                              isReplay: false,
                            })
                          }
                        >
                          Liked by{" "}
                          <strong>
                            {state?.postList?.post_likes[0]?.liked_by}
                          </strong>
                          {state?.postList?.post_likes?.length > 1 && (
                            <>
                              {" "}
                              and{" "}
                              <strong>
                                {state?.postList?.post_likes?.length - 1} others
                              </strong>
                            </>
                          )}
                        </span>
                      </div>
                    )}

                    {/* Comment Section */}
                    {state.isComment && (
                      <DashboardCommentBox
                        data={state?.postList}
                        commentLength={true}
                        cancelOnClick={() => setState({ isComment: false })}
                        handleReplayComment={(value) => addNewComment(value)}
                        deleteComment={(id) => handleDeleteComment(id)}
                        AdminLogin={state?.AdminLogin}
                        AlumniManagerLogin={state?.AlumniManagerLogin}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* ))}  */}
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        <>
        <div className="rbt-blog-area section-pad  kit-memo">

            <div className="album-none">
            <h5>Memories is Empty !</h5>
          </div>

        </div>
        
        </>
      )} */}

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

      <Modal
        title={
          <div className="custom-modal-header">
            {state.editPostId ? "Edit Post" : "New Post"}
          </div>
        }
        open={state.isOpenNewPost}
        onCancel={() => {
          setState({
            isOpenNewPost: false,
            imageFile: null,
            // attachmentFile: null,
            title: "",
            blog: "",
            content: "",
            visibility: "",
            newPostCategory: [],
            error: null,
          });
        }}
        footer={false}
        centered
      >
        {/* 4. Form Wrapper */}
        <form
          className="applicants-form"
          onSubmit={(e) => {
            e.preventDefault(); // stop default form submission
            e.stopPropagation(); // prevent bubbling into Modal
            if (state.editPostId) {
              updatePost();
            } else {
              createPost();
            }
          }}
        >
          {/* 5. Status Select (Load More) */}
          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
              name="title"
              label="Title"
              required
              value={state.title}
              onChange={(e) => setState({ title: e.target.value })}
              placeholder="Title"
              style={{ width: "100%" }}
              error={state.error?.title}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="text"
              name="blog"
              label="Blog"
              required
              value={state.blog}
              onChange={(e) => setState({ blog: e.target.value })}
              placeholder="Blog"
              style={{ width: "100%" }}
              error={state.error?.blog}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="select"
              onChange={(e) => setState({ newPostCategory: e.target.value })}
              name="Post Category"
              label="Post Category"
              placeholder={"Post Category"}
              value={state.newPostCategory}
              options={state.postCatOption}
              required
              error={state.error?.newPostCategory}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="select"
              onChange={(e) => setState({ visibility: e.target.value })}
              name="Visibility"
              label="Visibility"
              placeholder={"Visibility"}
              value={state.visibility}
              options={VisibilityDropDown}
              required
              error={state.error?.visibility}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="file"
              name="imageFile"
              label="Picture"
              ref={imgInputRef}
              key={state.imageFile}
              onChange={(e) => handleFileChange(e, "image")}
              accept="image/*"
              className="p-0"
              required
              error={state.error?.imageFile}
            />

            <div
              className="uploaded-images mt_10"
              style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
            >
              {state.imageFile && (
                <div
                  className="uploaded-images mt_10"
                  style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                >
                  {state.imageFile && (
                    <>
                      <div className="uploaded-image-item">
                        <img
                          src={URL.createObjectURL(state.imageFile)}
                          alt={`Uploaded `}
                          style={{
                            width: "50px", // Make image take full width of the container
                            height: "50px", // Fixed height for the images
                            objectFit: "cover",
                            borderRadius: "5px",
                            position: "relative",
                          }}
                        />
                      </div>

                      {/* Remove button below the image */}
                      <button
                        type="button"
                        onClick={() => removeFile("image")}
                        style={{
                          background: "rgba(255, 0, 0, 0.7)",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          padding: "2px 4px",
                          borderRadius: "5px",
                          marginTop: "0px", // Space between image and button
                          fontSize: "10px",
                          position: "absolute",

                          right: "20px",
                        }}
                      >
                        <i className="feather-trash"></i>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormField
              type="textarea"
              name="content"
              label="Content"
              placeholder="Type here to start a discussion"
              value={state.content}
              onChange={(e) => setState({ content: e.target.value })}
              // error={errMsg.about_me}

              style={{ height: "100px" }}
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

export default PostDetailMain;
