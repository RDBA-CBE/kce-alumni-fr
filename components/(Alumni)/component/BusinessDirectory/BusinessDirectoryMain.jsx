import React, { useEffect, useState } from 'react';
import FormField from '@/commonComponents/FormFields';
import { Filter } from 'react-feather';

import { useRouter } from 'next/navigation';
import { setDropdownData, useSetState } from '@/utils/commonFunction.utils';
import { message, Modal, Tooltip } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { BaseURL } from '@/utils/BaseUrl';
import Models from '@/imports/models.import';
import Image from 'next/image';
import Loader from '../../Loader';

const BusinessDirectoryMain = () => {
  const { confirm } = Modal;
  const router = useRouter();
  const [openSubMenuId, setOpenSubMenuId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [normelUserFilter, setNormelUserFilter] = useState([]);
  const [AdminDataLists, setAdminDataLists] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    location: '',
  });

  const [departmentList, setDepartmentList] = useState([]);
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [myBusinessDirCount, setMyBusinessDirCount] = useState([]);
  const [allUserFilterFinalDataList, setAllUserFilterFinalDataList] = useState(
    []
  );

  const pathname = usePathname();

  const [state, setState] = useSetState({
    currenIndustryPage: 1,
    hasIndustryLoadMore: null,
    pageLoading: false,
  });

  useEffect(() => {
    const Token = localStorage.getItem('token');
    setToken(Token);
    if (!Token) {
      router.push('/login');
    }

    const Admin = localStorage.getItem('isAdmin');
    setIsAdmin(Admin);

    const AlumniManager = localStorage.getItem('isAlumniManager');
    setIsAlumniManager(AlumniManager);

    const Alumni = localStorage.getItem('isAlumni');
    setIsAlumni(Alumni);

    const Faculty = localStorage.getItem('isFatulty');
    setIsFatulty(Faculty);

    // if (Admin !== "true" && AlumniManager !== "true") {
    //   router.push("/");
    // }
  }, []);

  // useEffect(() => {
  //   if (token && (isAlumni == "true" || isFatulty == "true")) {
  //     GetJobs();
  //     GetDepartmentList();
  //   }
  // }, [token, isAlumni, isFatulty]);

  useEffect(() => {
    if (token) {
      getJobsAdmin();
      GetDepartmentList();
      MyBusinessDirectory();
    }
  }, [token]);
  console.log('token', token);

  console.log('accessToken', token);

  const MyBusinessDirectory = () => {
    axios
      .get(`${BaseURL}/my_business_directory/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyBusinessDirCount(response.data.results);
      })
      .catch((error) => {
        console.log('❌error --->', error);
        if (error?.response?.data?.code === 'token_not_valid') {
          localStorage.removeItem('token');
          router.push('/login');
        }
      });
  };

  console.log('myBusinessDirCount', myBusinessDirCount);

  const getJobsAdmin = () => {
    setState({
      pageLoading: true,
    });
    axios
      .get(`${BaseURL}/retrieve_business_directory/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdminDataLists(response.data?.results);
        setFilteredData(response.data?.results);
        console.log('✌️response --->', response);
        setState({
          pageLoading: false,
        });
      })
      .catch((error) => {
        console.log('❌error --->', error);
        setState({
          pageLoading: false,
        });
        if (error?.response?.data?.code === 'token_not_valid') {
          localStorage.removeItem('token');
          router.push('/login');
        }
      });
  };

  const GetDepartmentList = async () => {
    try {
      const res = await Models.job.industryList();

      const dropdown = setDropdownData(res?.results, 'title');
      console.log('industry dd', dropdown);

      setDepartmentList(dropdown);
      setState({
        hasIndustryLoadMore: res?.next,
      });
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const handleEditClick = (id) => {
    router.push(`/edit-a-directory/${id}/`);
  };

  // Pagination Logic
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPagesForAdmin = Math.ceil(filteredData.length / itemsPerPage);
  const startIndexForAdmin = (currentPage - 1) * itemsPerPage;
  const currentDataForAdmin = filteredData.slice(
    startIndexForAdmin,
    startIndexForAdmin + itemsPerPage
  );

  const totalPagesForUser = Math.ceil(normelUserFilter.length / itemsPerPage);
  const startIndexForUser = (currentPage - 1) * itemsPerPage;
  const currentDataForUser = normelUserFilter.slice(
    startIndexForUser,
    startIndexForUser + itemsPerPage
  );

  const success = (successMsg) => {
    messageApi.open({
      type: 'success',
      content:
        successMsg || 'Success! Check your email for further instructions.',
    });
  };

  const errorNotification = (error) => {
    messageApi.open({
      type: 'error',
      content: error || 'An error occurred. Please try again.',
    });
  };

  // const showDeleteConfirm = (post) => {
  //   confirm({
  //     title: post.is_active
  //       ? "Are you sure you want to InActive this Post?"
  //       : "Are you sure you want to Active this Post?",
  //     okText: post.is_active ? "InActive" : "Active",
  //     okType: "danger",
  //     cancelText: "Cancel",
  //     onOk() {
  //       setLoading(true);
  //       axios
  //         .put(
  //           `${BaseURL}/deactivate_job_post/${post.id}/`,
  //           {
  //             is_active: !post.is_active,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           success(response.data.message || "Operation successful!");
  //           getJobsAdmin(); // Refresh the job list
  //           setLoading(false);
  //         })
  //         .catch((error) => {
  //           errorNotification(
  //             error.response?.data?.error ||
  //               "An error occurred. Please try again."
  //           );
  //           setLoading(false);
  //         });
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // };

  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    console.log('value', value);

    if (token) {
      if (value) {
        const filtered = AdminDataLists.filter(
          (post) =>
            post?.business_name?.toLowerCase().includes(value) ||
            post?.industry_type.toLowerCase().includes(value) ||
            post?.location.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(AdminDataLists); // Reset to original data if input is cleared
      }
    }
    {
      if (value) {
        const filtered = listOfPosts.filter(
          (post) =>
            post?.business_name?.toLowerCase().includes(value) ||
            post?.industry?.toLowerCase().includes(value) ||
            post?.location.toLowerCase().includes(value)
        );
        setNormelUserFilter(filtered);
      } else {
        setNormelUserFilter(listOfPosts); // Reset to original data if input is cleared
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const industryOptions = departmentList.map((ind) => ({
    value: ind.id,
    label: ind.type_name,
  }));

  const FilteredIndustryName = departmentList.filter(
    (ind) => ind.id == allUserFilterFinalDataList?.industry
  );
  console.log('✌️FilteredIndustryName --->', FilteredIndustryName);

  const bodyData = () => {
    const body = {};

    if (formData.business_name) {
      body.business_name = formData.business_name;
    }
    if (formData.industry) {
      body.industry = formData.industry.value;
    }
    if (formData.location) {
      body.location = formData.location;
    }

    return body;
  };

  const handleFiltersSubmit = (e) => {
    setState({
      pageLoading: true,
    });
    const body = bodyData();

    console.log(body);

    e.preventDefault();
    console.log('handleFiltersSubmit', formData);

    axios
      .post(`${BaseURL}/filter_business_directory/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('✌️response --->', response);
        setAdminDataLists(response.data?.results);
        setFilteredData(response.data?.results);
        setListOfPosts(response.data?.results);
        setNormelUserFilter(response.data?.results);
        setAllUserFilterFinalDataList(formData);
        setState({
          pageLoading: false,
        });
        // setFormData({
        //   business_name: "",
        //   industry: "",
        //   location: "",
        // });
      })
      .catch((error) => {
        console.log('❌error --->', error);
        setState({
          pageLoading: false,
        });
      });
  };

  const handleClearFilter = () => {
    setState({
      pageLoading: true,
    });
    const Body = {
      business_name: '',
      industry: '',
      location: '',
    };
    axios
      .post(`${BaseURL}/filter_business_directory/`, Body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('✌️response --->', response);
        setAdminDataLists(response.data?.results);
        setFilteredData(response.data?.results);
        setListOfPosts(response.data?.results);
        setNormelUserFilter(response.data?.results);
        setAllUserFilterFinalDataList(Body);
        setFormData({
          business_name: '',
          industry: '',
          location: '',
        });
        setState({
          pageLoading: false,
        });
      })
      .catch((error) => {
        console.log('❌error --->', error);
        setState({
          pageLoading: false,
        });
      });
  };

  const industryListLoadMore = async () => {
    try {
      if (state.hasIndustryLoadMore) {
        const res = await Models.job.industryList(state.currenIndustryPage + 1);

        const IndustryOption = setDropdownData(res?.results, 'title');

        setDepartmentList([...departmentList, ...IndustryOption]);
        setState({
          currenIndustryPage: state.currenIndustryPage + 1,
          hasIndustryLoadMore: res.next,
        });
      } else {
        setDepartmentList(departmentList);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  console.log('departmentList', departmentList);

  if (state.pageLoading) {
    return <Loader />; // Show loader while checking token
  }

  return (
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

                        <Link
                          className='rbt-btn btn-gradient radius-round sm-btn'
                          href='/post-a-directory'
                        >
                          Add a Business Listing
                        </Link>
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
                                  <li className='nav-item' role='presentation'>
                                    <a
                                      className={`${
                                        pathname === '#' ? 'active' : ''
                                      }`}
                                      href='#'
                                    >
                                      <FormField
                                        type='text'
                                        className='applicant-input'
                                        onChange={(e) => handleFilterChange(e)}
                                        name='business_name'
                                        value={formData.business_name}
                                        placeholder='Business Name'
                                      />
                                    </a>
                                  </li>

                                  <li className='nav-item' role='presentation'>
                                    <a
                                      className={`w-100 ${
                                        pathname === '#' ? 'active' : ''
                                      }`}
                                      href='#'
                                    >
                                      <FormField
                                        type='loadMoreSelect'
                                        className='member-dd'
                                        onChange={(e) => {
                                          setFormData({
                                            ...formData,
                                            industry: e,
                                          });
                                        }}
                                        name='industry'
                                        placeholder={'Industry'}
                                        value={formData.industry}
                                        options={departmentList}
                                        loadMore={() => industryListLoadMore()}
                                      />
                                    </a>
                                  </li>

                                  <li className='nav-item' role='presentation'>
                                    <a
                                      className={`w-100 ${
                                        pathname === '#' ? 'active' : ''
                                      }`}
                                      href='#'
                                    >
                                      <FormField
                                        className='applicant-input'
                                        type='text'
                                        onChange={(e) => handleFilterChange(e)}
                                        name='location'
                                        placeholder='Address'
                                        value={formData.location}
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
                                  onClick={handleFiltersSubmit}
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
                          <div className='rbt-elements-area bg-color-extra2 mb-5'>
                            <div className='container-fluid'>
                              <div className='row p-0'>
                                <div className='col-lg-12 p-0'>
                                  <form
                                    action='#'
                                    className='rbt-search-style-1'
                                  >
                                    <input
                                      type='text'
                                      placeholder='Search Job with Job title and Role'
                                      // name="search_filter"
                                      onChange={handleSearchFilter}
                                    />
                                    <button className='search-btn'>
                                      <i className='feather-search'></i>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='rbt-callto-action rbt-cta-default style-2'>
                            <div className='content-wrapper overflow-hidden bg-blue'>
                              <div className='row gy-5 align-items-end'>
                                <div className='col-lg-8'>
                                  <div className='inner'>
                                    <div className='content text-left'>
                                      <h5 className='mb--5'>
                                        {AdminDataLists.length} Business Found
                                      </h5>
                                      {/* <p className="b3">Create Announcement</p> */}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-lg-4 d-flex justify-content-start justify-content-lg-end'>
                                  <div className='call-to-btn text-start text-lg-end position-relative'>
                                    <Link
                                      className='rbt-btn btn-gradient radius-round sm-btn'
                                      href='/my-business-directory'
                                    >
                                      <span data-text='Add New Announcement'>
                                        My Business Directory
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='rbt-dashboard-content p-0 mt-5 mb-2'>
                            {!currentDataForAdmin.length > 0 ? (
                              <div className=' album-none'>
                                <h5>No Data Found</h5>
                              </div>
                            ) : (
                              <div className='content'>
                                <div className='section-title'>
                                  <h4 className='rbt-title-style-3 mb-2'>
                                    Business Directory List
                                  </h4>
                                </div>

                                <div className='rbt-dashboard-table table-responsive mobile-table-750'>
                                  <div className='row g-5 m-0'>
                                    {currentDataForAdmin.map((item, index) => (
                                      <div
                                        className='col-lg-6 col-12'
                                        key={index}
                                      >
                                        <div
                                          className='rbt-card card-list-2 event-list-card variation-01 rbt-hover relative'
                                          style={{ position: 'relative' }}
                                        >
                                          {/* Edit Icon in Top Right */}
                                          {(isAdmin == 'true' ||
                                            isAlumniManager == 'true') && (
                                            <div
                                              className='rbt-button-group'
                                              style={{
                                                position: 'absolute',
                                                top: '15px',
                                                right: '15px',
                                                zIndex: 10,
                                              }}
                                            >
                                              <a
                                                className='rbt-btn btn-xs bg-primary-opacity radius-round'
                                                href={`/edit-a-directory/${item.id}/`}
                                                title='Edit'
                                              >
                                                <i className='feather-edit pl--0' />
                                              </a>
                                            </div>
                                          )}

                                          <div className='rbt-card-img'>
                                            <Link
                                              href={`/event-details/${item.id}`}
                                            >
                                              <img
                                                src={
                                                  item?.logo ??
                                                  '/images/event/grid-type-01.jpg'
                                                }
                                                width={355}
                                                height={240}
                                                alt='Card image'
                                              />
                                            </Link>
                                          </div>

                                          <div className='rbt-card-body'>
                                            <ul className='rbt-meta'>
                                              <li>
                                                <i className='feather-map-pin'></i>
                                                {item?.location}
                                              </li>
                                            </ul>
                                            <h4 className='rbt-card-title'>
                                              <Link
                                                href={`business-directory/${item.id}`}
                                              >
                                                {item.business_name}
                                              </Link>
                                            </h4>
                                            <p
                                              className='text-gray mt--dec-40'
                                              style={{ fontSize: '16px' }}
                                            >
                                              <Link href={'#'}>
                                                {item.industry_type}
                                              </Link>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
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
  );
};

export default BusinessDirectoryMain;
