import React, { useEffect, useState } from 'react';
import FormField from '@/commonComponents/FormFields';

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

const MyBusinessListing = () => {
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
  const [allUserFilterFinalDataList, setAllUserFilterFinalDataList] = useState(
    []
  );
   const [state, setState] = useSetState({
      // currenIndustryPage: 1,
      // hasIndustryLoadMore: null,
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
    }
  }, [token]);
  console.log('token', token);

  // const GetJobs = () => {
  //   axios
  //     .get(`${BaseURL}/retrieve_job_post/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("✌️response --->", response);
  //       setListOfPosts(response.data);
  //       setNormelUserFilter(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("❌error --->", error);
  //     });
  // };

  console.log('accessToken', token);
  const getJobsAdmin = () => {
    setState({
      pageLoading: true,
    });
    axios
      .get(`${BaseURL}/my_business_directory/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdminDataLists(response.data.results);
        setFilteredData(response.data.results);
        console.log('✌️response --->', response);
        setState({
          pageLoading: false,
        });
      })
      .catch((error) => {
        console.log('❌error --->', error);
      });
      setState({
          pageLoading: false,
        });
  };

  const GetDepartmentList = () => {
    
    axios
      .get(`${BaseURL}/retrieve_industry_type/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartmentList(response.data.results);
        
      })
      .catch((error) => {
        console.log('❌error --->', error);
        
      });
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

  const handleFiltersSubmit = (e) => {
    e.preventDefault();
    console.log('handleFiltersSubmit', formData);

    axios
      .post(`${BaseURL}/filter_business_directory/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('✌️response --->', response);
        setAdminDataLists(response.data);
        setFilteredData(response.data);
        setListOfPosts(response.data);
        setNormelUserFilter(response.data);
        setAllUserFilterFinalDataList(formData);
        // setFormData({
        //   business_name: "",
        //   industry: "",
        //   location: "",
        // });
      })
      .catch((error) => {
        console.log('❌error --->', error);
      });
  };

  const handleClearFilter = () => {
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
        setAdminDataLists(response.data);
        setFilteredData(response.data);
        setListOfPosts(response.data);
        setNormelUserFilter(response.data);
        setAllUserFilterFinalDataList(Body);
        setFormData({
          business_name: '',
          industry: '',
          location: '',
        });
      })
      .catch((error) => {
        console.log('❌error --->', error);
      });
  };

  console.log('currentDataForUser', currentDataForUser);

  console.log('isAdmin', isAdmin);
  console.log('isAlumniManager', isAlumniManager);
  console.log('isAlumni', isAlumni);
  console.log('isFatulty', isFatulty);

  console.log('listOfPosts', listOfPosts);

  if (state.pageLoading) {
    return <Loader />; // Show loader while checking token
  }
  return (
    <div className='rbt-dashboard-area section-pad my-business'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-11 col-xl-10'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-12'>
                  {/* <div className="row mb-4">
                    <div className="col-12">
                      <div className="d-flex justify-content-between ">
                        <h5>Filter</h5>
                        <Link
                          className="rbt-btn btn-gradient radius-round sm-btn"
                          href="/post-a-directory"
                        >
                          Add a Business Listing
                        </Link>
                      </div>
                    </div>
                  </div> */}

                  <div className='row g-5'>
                    {/* --------------------sidebar start--------------------- */}

                    {/* --------------------sidebar end--------------------- */}

                    {/* --------------------table start--------------------- */}

                    <div className='col-lg-12'>
                      {state.pageLoading ? (
                        <Loader />
                      ) : (
                        <>
                          {/* <div className="rbt-elements-area bg-color-extra2 mb-5">
                        <div className="container">
                          <div className="row p-0">
                            <div className="col-lg-12 p-0">
                              <form action="#" className="rbt-search-style-1">
                                <input
                                  type="text"
                                  placeholder="Search Job with Job title and Role"
                                  name="search_filter"
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

                          <div className='rbt-callto-action rbt-cta-default style-2 px-4'>
                            <div className='content-wrapper overflow-hidden pt--30 pb--30 bg-blue'>
                              <div className='row gy-5 align-items-end justify-content-between'>
                                <div className='col-lg-8'>
                                  <div className='inner'>
                                    <div className='content text-left'>
                                      <h5 className='mb--5'>
                                        My Business Directory
                                      </h5>
                                      {/* <p className="b3">Create Announcement</p> */}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-lg-4 d-flex justify-content-start justify-content-lg-end'>
                                  <div className='call-to-btn  text-end position-relative '>
                                    <Link
                                      className='rbt-btn btn-gradient radius-round sm-btn'
                                      href='/my-business-directory'
                                    >
                                      <span data-text='Add New Announcement'>
                                        Add Business Directory
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>

                              <div className='row p-0 mt-5'>
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

                          <div className='rbt-dashboard-content  mt-5 p-0'>
                            <div className='content'>
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

                                        <div className='rbt-card-img'>
                                          <Link
                                            href={`/event-details/${item.id}`}
                                          >
                                            <img
                                              src={item?.logo ?? '/images/event/grid-type-01.jpg'}
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
                                            <Link href={`#`}>
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

export default MyBusinessListing;
