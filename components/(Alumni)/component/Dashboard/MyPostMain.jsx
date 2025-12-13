import React, { useEffect, useRef, useState } from 'react';
import FormField from '@/commonComponents/FormFields';
import { Filter } from 'react-feather';
import { useRouter, usePathname } from 'next/navigation';
import {
  Dropdown,
  setDropdownData,
  TrimText,
  useSetState,
  validateForm,
} from '@/utils/commonFunction.utils';
import { message, Modal, Tooltip } from 'antd';

import Link from 'next/link';
import axios from 'axios';
import { BaseURL } from '@/utils/BaseUrl';
import Models from '@/imports/models.import';
import { jobTypeOption, VisibilityPosts } from '@/utils/constant.utils';
import Loader from '../../Loader';
import DashboardListCom from './DashboardListCom';
import Pagination from '@/commonComponents/Pagination';

const MyPostMain = () => {
  const imgInputRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

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
    title: '',
    blog: '',
    // attachmentFile: null,
    content: '',
    visibility: '',
    newPostCategory: [],
    error: {},
    postList: [],
    postCatOption: [],
    editPostId: null,
    filterTitle: '',
    filterCategory: '',
    filterShowList: {},
    currentPage: 1,
    preview: null,
  });

  useEffect(() => {
    getType();
    getTags();
    getGroup();
    GetPostCategory();
    GetPostData(1);
  }, []);

  const GetPostData = async (page) => {
    try {
      const res = await Models.post.GetPostData(page);
      console.log('✌️res --->', res);
      setState({
        postList: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
      });
    } catch (error) {
      if (error?.messages?.length > 0) {
        if (error.messages[0]?.message == 'Token is invalid or expired') {
          router.push('/login');
          localStorage.removeItem('token');
        }
      }
      console.log('error: ', error);
    }
  };
  const GetPostCategory = async () => {
    try {
      const res = await Models?.masters?.GetPostCategoryData(1);
      const dropdown = Dropdown(res?.results, 'name');
      setState({ postCatOption: dropdown });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getType = async () => {
    try {
      const res = await Models.post.type();
      const dropdown = Dropdown(res?.results, 'title');
      setState({ typeOption: dropdown });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getTags = async () => {
    try {
      const res = await Models.post.type();
      const dropdown = Dropdown(res?.results, 'title');
      setState({ tagsOption: dropdown });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getGroup = async () => {
    try {
      const res = await Models.post.type();
      const dropdown = Dropdown(res?.results, 'title');
      setState({ groupsOption: dropdown });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleFiltersSubmit = async (page) => {
    const Body = {
      title: state.filterTitle,
      post_category: state.filterCategory,
    };
    try {
      const res = await Models.post.FilterPostData(Body, page);
      console.log('✌️res --->', res);
      setState({
        postList: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
        filterShowList: Body,
      });
    } catch (error) {
      console.log('error: ', error);
      if (error?.messages?.length > 0) {
        if (error.messages[0]?.message == 'Token is invalid or expired') {
          router.push('/login');
          localStorage.removeItem('token');
        }
      }
    }
  };

  const handleClearFilter = async () => {
    const Body = {
      title: '',
      post_category: '',
    };
    try {
      const res = await Models.post.GetPostData(1);

      console.log('✌️res --->', res);
      setState({
        postList: res?.results,
        filterShowList: Body,
        filterTitle: '',
        filterCategory: '',
        currentPage: 1,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
      });
    } catch (error) {
      console.log('error: ', error);
      if (error?.messages?.length > 0) {
        if (error.messages[0]?.message == 'Token is invalid or expired') {
          router.push('/login');
          localStorage.removeItem('token');
        }
      }
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'image') {
      setState({ imageFile: file });
    }
    // else if (type === "attachment") {
    //   setState({ attachmentFile: file });
    // }
    e.target.value = null;
  };

  const removeFile = (type) => {
    if (type === 'image') {
      setState({ imageFile: null, preview: null });
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
      console.log('Validation errors:', state.error); // Log any validation errors
      return;
    }

    console.log('body: ', body);
    const formData = new FormData();

    if (state.imageFile) {
      formData.append('featured_image', state.imageFile);
    }
    // if (state.attachmentFile) {
    //   formData.append("attach", state.attachmentFile);
    // }
    formData.append('title', state.title || '');
    formData.append('blog', state.blog || '');
    formData.append('content', state.content || '');
    formData.append('post_category', state.newPostCategory || []);
    formData.append(
      'visible_to_public',
      (state.visibility == '1' && 'True') ||
        (state?.visibility == '2' && 'False') ||
        false
    );

    try {
      const res = await Models.post.CreatePostData(formData);
      console.log('✌️res --->', res);
      GetPostData(1);
      setState({
        isOpenNewPost: false,
        imageFile: null,
        // attachmentFile: null,
        title: '',
        blog: '',
        content: '',
        visibility: '',
        newPostCategory: [],
      });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const updatePost = async () => {
    const body = {
      featured_image: state.imageFile || state.preview,
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
      console.log('Validation errors:', state.error); // Log any validation errors
      return;
    }

    console.log('body: ', body);
    const formData = new FormData();

    if (state.imageFile) {
      formData.append('featured_image', state.imageFile);
    }

    formData.append('title', state.title || '');
    formData.append('blog', state.blog || '');
    formData.append('content', state.content || '');
    formData.append('post_category', state.newPostCategory || []);
    formData.append(
      'visible_to_public',
      (state.visibility == '1' && 'True') ||
        (state?.visibility == '2' && 'False') ||
        'False'
    );

    try {
      const res = await Models.post.UpdatePostData(
        state?.singleData?.id,
        formData
      );
      console.log('✌️res --->', res);
      GetPostData(state.currentPage);

      setState({
        isOpenNewPost: false,
        imageFile: null,
        title: '',
        blog: '',
        content: '',
        visibility: '',
        newPostCategory: [],
        editPostId: null,
      });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const errorFun = (errors) => {
    setState({ error: errors });
  };
  console.log('✌️error --->', state.error);

  const VisibilityDropDown = Dropdown(VisibilityPosts, 'name');

  const editPost = async (item) => {
    console.log('✌️item --->', item);
    try {
      setState({ editPostId: item.id, isOpenNewPost: true });
      const res = await Models?.post?.GetSinglePostData(item.id);
      console.log('✌️res --->', res);
      setState({ title: res.title });
      let file = null;
      // if (res.featured_image) {
      //   const url = new URL(res.featured_image);
      //   const filename = url.pathname.split("/").pop();
      //   file = await convertUrlToFile(res.featured_image, filename);
      // }

      setState({
        preview: res?.featured_image ? res?.featured_image : null,
        imageFile: null,
        title: res?.title,
        blog: res?.blog,
        content: res?.content,
        visibility: res?.visible_to_public == true ? '1' : '2',
        newPostCategory: res?.post_category?.id,
        singleData: res,
      });
    } catch (error) {
      console.log('error: ', error);
      setState({ isOpenNewPost: false });
    }
  };

  const PostLike = async (id) => {
    try {
      const res = await Models.post.PostLike(id);
      console.log('✌️res --->', res);
      GetPostData(state.currentPage);
    } catch (error) {
      console.log('error: ', error?.messages[0]?.message);
      if (error?.messages?.length > 0) {
        error?.messages[0]?.message == 'Token is invalid or expired' &&
          router.push('/login');
        localStorage.removeItem('token');
      }
    }
  };

  const PostCategoryFilterNameShow = state?.postCatOption?.filter((item) => {
    return item?.value == state?.filterShowList?.post_category;
  });

  const handlePageChange = (number) => {
    const Body = {
      title: state.filterTitle,
      post_category: state.filterCategory,
    };
    const hasFilterValues = Object.values(Body).some((val) => val); // check if any value is truthy
    if (hasFilterValues) {
      handleFiltersSubmit(number);
    } else {
      GetPostData(number);
    }
    setState({ currentPage: number });

    return number;
  };

  return (
    <>
      <div className='rbt-dashboard-area section-pad'>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-11 col-xl-10 con-wid'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='row mb-4'>
                      <div className='col-12'>
                        <div className='d-flex justify-content-between '>
                          <h5>
                            Filter
                            <Filter
                              style={{
                                marginLeft: '4px',
                                color: '#192335',
                                height: '18px',
                                width: '18px',
                              }}
                            />
                          </h5>
                          <div className='d-flex gap-3'>
                            <div
                              className='rbt-btn btn-gradient radius-round sm-btn'
                              onClick={() => router?.push('/dashboard')}
                            >
                              All Post
                            </div>

                            <div
                              className='rbt-btn btn-gradient radius-round sm-btn'
                              onClick={() =>
                                setState({
                                  isOpenNewPost: true,
                                  editPostId: null,
                                })
                              }
                            >
                              New Post
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='row g-5'>
                      {/* --------------------sidebar start--------------------- */}

                      <div className='col-lg-3 d-sidebar'>
                        <div className='rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border'>
                          <div className='inner'>
                            <div className='content-item-content'>
                              <div className='rbt-default-sidebar-wrapper'>
                                <nav className='mainmenu-nav'>
                                  <ul className='dashboard-mainmenu rbt-default-sidebar-list'>
                                    <li
                                      className='nav-item'
                                      role='presentation'
                                    >
                                      <a
                                        className={`${
                                          pathname === '#' ? 'active' : ''
                                        }`}
                                        href='#'
                                      >
                                        <FormField
                                          type='text'
                                          className='applicant-input'
                                          onChange={(e) =>
                                            setState({
                                              filterTitle: e.target.value,
                                            })
                                          }
                                          name='filterTitle'
                                          placeholder={'Filter Title'}
                                          value={state.filterTitle}
                                        />
                                      </a>
                                    </li>

                                    <li
                                      className='nav-item'
                                      role='presentation'
                                    >
                                      <a
                                        className={`w-100 ${
                                          pathname === '#' ? 'active' : ''
                                        }`}
                                        href='#'
                                      >
                                        <FormField
                                          type='select'
                                          onChange={(e) =>
                                            setState({
                                              filterCategory: e.target.value,
                                            })
                                          }
                                          name='filterCategory'
                                          placeholder={'Category Filter'}
                                          value={state.filterCategory}
                                          options={state.postCatOption}
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </nav>

                                <div
                                  className=' d-flex flex-wrap mt-5'
                                  style={{ columnGap: '10px', rowGap: '8px' }}
                                >
                                  <Link
                                    className='rbt-btn btn-gradient radius-round sm-btn'
                                    href='#'
                                    onClick={() => handleFiltersSubmit(1)}
                                  >
                                    Filter
                                  </Link>
                                  <Link
                                    className='rbt-btn btn-border-gradient radius-round sm-btn'
                                    href='#'
                                    onClick={handleClearFilter}
                                  >
                                    Clear all
                                  </Link>
                                </div>

                                {/* <div className="section-title mt--40 mb--20">
                <h6 className="rbt-title-style-2">User</h6>
              </div>

              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.siderbar.slice(7, 10).map((data, index) => (
                      <li key={index}>
                        <a
                          href={data.link}
                          className={`${
                            pathname === data.link ? "active" : ""
                          }`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </nav> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------------------sidebar end--------------------- */}

                      {/* --------------------table start--------------------- */}

                      <div className='col-lg-9'>
                        {state.pageLoading ? (
                          <Loader />
                        ) : (
                          <>
                            {/* <div className="rbt-elements-area bg-color-extra2 mb-5">
                            <div className="container">
                              <div className="row p-0">
                                <div className="col-lg-12 p-0">
                                  <form
                                    action="#"
                                    className="rbt-search-style-1"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Search Job with Job title and Role"
                                      // name="search_filter"
                                      onChange={handleSearchFilter}
                                    />
                                    <button className="search-btn">
                                      <i className="feather-search"></i>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div> */}

                            <div className='rbt-dashboard-content  p-0'>
                              <div className='content'>
                                {/* <div className="section-title d-flex justify-content-between ">
                            <h4 className="rbt-title-style-3">
                              {" "}
                              {listOfPosts.length} record(s) found
                            </h4>

                            <Link
                              className="rbt-btn btn-gradient radius-round sm-btn"
                              href="/post-a-job"
                            >
                              My Job List
                            </Link>
                          </div> */}

                                <div className='rbt-dashboard-table table-responsive mobile-table-750'>
                                  <div className='row g-5 m-0'>
                                    {state?.postList.length > 0 ? (
                                      state?.postList.map((item, index) => (
                                        <DashboardListCom
                                          page='mypost'
                                          key={index}
                                          editPost={() => editPost(item)}
                                          data={item}
                                          PostCategory={state?.groupsOption}
                                          GetData={() => GetPostData(1)}
                                          commentsOnClick={(data) =>
                                            console.log(data)
                                          }
                                          postLikeDisLinke={() => {
                                            PostLike(item.id);
                                          }}
                                        />
                                      ))
                                    ) : (
                                      <div> No Posts Found</div>
                                    )}
                                  </div>
                                </div>

                                {state?.postList.length > 9 && (
                                  <div>
                                    <div
                                      className='mb-20 '
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Pagination
                                        activeNumber={handlePageChange}
                                        totalPage={state.total}
                                        currentPages={state.currentPage}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* --------------------table end--------------------- */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className='custom-modal-header'>
            {state.editPostId ? 'Edit Post' : 'New Post'}
          </div>
        }
        open={state.isOpenNewPost}
        onCancel={() => {
          setState({
            isOpenNewPost: false,
            imageFile: null,
            // attachmentFile: null,
            title: '',
            blog: '',
            content: '',
            visibility: '',
            newPostCategory: [],
            error: null,
          });
        }}
        footer={false}
        centered
      >
        <form
          className='applicants-form'
          onSubmit={(e) => (state.editPostId ? updatePost(e) : createPost(e))}
        >
          {/* Faculty Selection */}
          <div style={{ marginTop: '15px' }}>
            <FormField
              type='text'
              name='title'
              label='Title'
              required
              value={state.title}
              onChange={(e) => setState({ title: e.target.value })}
              style={{ width: '100%' }}
              error={state.error?.title}
            />
          </div>

          {/* Message */}
          <div style={{ marginTop: '15px' }}>
            <FormField
              type='text'
              name='blog'
              label='Blog'
              required
              value={state.blog}
              onChange={(e) => setState({ blog: e.target.value })}
              style={{ width: '100%' }}
              error={state.error?.blog}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='select'
              onChange={(e) => setState({ newPostCategory: e.target.value })}
              name='Post Category'
              label='Post Category'
              placeholder={'Post Category'}
              value={state.newPostCategory}
              options={state.postCatOption}
              required
              error={state.error?.newPostCategory}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='select'
              onChange={(e) => setState({ visibility: e.target.value })}
              name='Visibility'
              label='Visibility'
              placeholder={'Visibility'}
              value={state.visibility}
              options={VisibilityDropDown}
              required
              error={state.error?.visibility}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='file'
              name='imageFile'
              label='Upload Picture'
              ref={imgInputRef}
              key={state.imageFile}
              onChange={(e) => handleFileChange(e, 'image')}
              accept='image/*'
              className={'p-0 '}
              required={true}
              error={state.error?.imageFile}
            />

            <div
              className='uploaded-images mt_10'
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            >
              {state.imageFile && (
                <>
                  <div className='uploaded-image-item'>
                    <img
                      src={URL.createObjectURL(state.imageFile)}
                      alt={`Uploaded `}
                      style={{
                        width: '50px', // Make image take full width of the container
                        height: '50px', // Fixed height for the images
                        objectFit: 'cover',
                        borderRadius: '5px',
                        position: 'relative',
                      }}
                    />
                  </div>

                  {/* Remove button below the image */}
                  <button
                    type='button'
                    onClick={() => removeFile('image')}
                    style={{
                      background: 'rgba(255, 0, 0, 0.7)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 4px',
                      borderRadius: '5px',
                      marginTop: '0px', // Space between image and button
                      fontSize: '10px',
                      position: 'absolute',

                      right: '20px',
                    }}
                  >
                    <i className='feather-trash'></i>
                  </button>
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='textarea'
              name='content'
              label='Content'
              placeholder='Type here to start a discussion'
              value={state.content}
              onChange={(e) => setState({ content: e.target.value })}
              // error={errMsg.about_me}

              style={{ height: '100px' }}
            />
          </div>

          {/* Action */}
          <div className='d-flex justify-content-end mt-3'>
            <button
              className='rbt-btn btn-gradient radius-round sm-btn'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MyPostMain;
