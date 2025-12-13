import React, { useEffect } from 'react';
import { Filter } from 'react-feather';
import MembersLoginCard from './MembersLoginCard';
import Link from 'next/link';
import { message, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { memberType, registeredMember } from '@/utils/constant.utils';
import Models from '@/imports/models.import';
import { objIsEmpty, useSetState } from '@/utils/commonFunction.utils';
import useDebounce from '@/commonComponents/useDebounce';
import { usePathname } from 'next/navigation';
import FormField from '@/commonComponents/FormFields';
import { TeamData } from '@/utils/constant.utils';
import Image from 'next/image';

import EventDetails from '../../../../data/KitEvents.json';
import UpCommingEvents from '../KITEvents/UpCommingEvents';
import Pagination from '@/commonComponents/Pagination';
import Loader from '../../Loader';

const EventsLoginMain = () => {
  let getAllCourse = EventDetails;

  const pathname = usePathname();
  const [state, setState] = useSetState({
    upComingEventData: [],
    pastEventData: [],
    eventCategoryList: [],
    allEventsAdmin: [],
    isAdmin: false,
    isAlumniManager: false,
    isAlumni: false,
    isFaculty: false,
    token: '',
    activeTab: 0,
    pageLoading: false,
  });

  const { confirm } = Modal;

  const router = useRouter();

  useEffect(() => {
    const Token = localStorage.getItem('token');
    const Admin = localStorage.getItem('isAdmin');
    const AlumniManager = localStorage.getItem('isAlumniManager');
    const Alumni = localStorage.getItem('isAlumni');
    const Faculty = localStorage.getItem('isFaculty');

    setState({
      isAdmin: Admin,
      isAlumniManager: AlumniManager,
      isAlumni: Alumni,
      isFaculty: Faculty,
      token: Token,
    });
  }, [state?.token]);

  useEffect(() => {
    // GetUpComingEvents(); // Fetch initial events on load
    // GetPassedEventsData();
    GetEventCategory(); // Fetch event categories
  }, []);

  useEffect(() => {
    // if (state?.isAdmin == "true" || state?.isAlumniManager == "true") {
    const body = bodyData();
    console.log('✌️body --->', body);
    if (Object.keys(body).length > 0) {
      filterData(1);
    } else {
      GetAllEventsAdmin(1);
    }
  }, [
    state?.isAdmin || state?.isAlumniManager,
    state.activeTab,
    state.filterCategory,
  ]);

  const GetAllEventsAdmin = async (page) => {
    setState({ pageLoading: true });
    console.log('✌️page --->', page);
    try {
      const res = await Models?.event?.GetAllEventsAdminData(page);
      setState({
        allEventsAdmin: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
        pageLoading: false,
      });
    } catch (error) {
      if (error?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
      console.log(error);
      setState({ pageLoading: false });
    }
  };

  const filterData = async (page) => {
    console.log('filterData --->', page);
    try {
      const body = bodyData();

      const res = await Models?.event?.filterEvent(page, body);
      setState({
        allEventsAdmin: res?.results,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
      });
    } catch (error) {
      if (error?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
      console.log(error);
    }
  };

  // Fetch upcoming events based on selected category
  const GetUpComingEvents = async (tab) => {
    const Body = {
      category_id: tab?.category_id || '', // Use the selected category ID, or "" for 'All'
    };

    try {
      const res = await Models?.event?.GetUpcomingEventsData(Body);
      setState({ upComingEventData: res?.results });
    } catch (err) {
      if (err?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  };
  const GetPassedEventsData = async (tab) => {
    const Body = {
      category_id: tab?.category_id || '', // Use the selected category ID, or "" for 'All'
    };
    try {
      const res = await Models?.event?.GetPastEventsData(Body);
      setState({ pastEventData: res?.results });
    } catch (error) {
      if (error?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  };

  // Fetch event categories
  const GetEventCategory = async () => {
    try {
      const res = await Models.masters.GetEventCategoryData(1);
      console.log('GetEventCategory --->', res);

      // Prepend "All" category to the list
      const allEventsList = [
        { category_id: '', title: 'All' },
        ...res?.results,
      ];

      // Update state with the event categories list
      setState({ eventCategoryList: allEventsList });
    } catch (error) {
      console.log('error: ', error);
      if (error?.response?.data?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  };

  // Handle tab clicks
  const handleTabClick = (tab) => {
    setState({
      activeTab: tab.title, // Set the active tab
    });
    // Fetch upcoming events for the selected category
    GetUpComingEvents(tab);
    GetPassedEventsData(tab);
  };

  const showEventDeleteConfirm = (event) => {
    confirm({
      title: event.is_active
        ? 'Are you sure you want to InActive this Event?'
        : 'Are you sure you want to Active this Event?',
      okText: event.is_active ? 'InActive' : 'Active',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          const body = {
            is_active: !event.is_active,
          };

          const res = await Models?.event?.InactiveEvents(event.id, body);

          message.success(res.message);

          GetAllEventsAdmin(state.currentPage);
        } catch (error) {
          console.log('error: ', error);

          // Handle error response properly
          const errorMessage =
            error.response?.data?.error || 'An error occurred';
          message.error(errorMessage);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });

    console.log('Deleting event:', event);
    // Perform is_active logic here if needed
  };

  const tabs = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 2,
      label: 'Reunions',
    },
    {
      value: 1,
      label: 'Webinars',
    },
  ];

  const handlePageChange = (number) => {
    const body = bodyData();
    if (Object.keys(body).length > 0) {
      filterData(number);
    } else {
      GetAllEventsAdmin(number);
    }

    setState({ currentPage: number });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return number;
  };

  const bodyData = () => {
    let bodyData = {};

    if (state?.activeTab != 0) {
      bodyData.category_id = state?.activeTab;
    }
    if (state?.activeTab == 1) {
      bodyData.category_id = 2;
    }
    if (state?.activeTab == 2) {
      bodyData.category_id = 1;
    }

    if (state.filterCategory) {
      if (state.filterCategory == 'upcoming') {
        bodyData.is_past = 'false';
      }
      if (state.filterCategory == 'completed') {
        bodyData.is_past = 'true';
      }
    }

    return bodyData;
  };

  return (
    <div className='rbt-dashboard-area section-pad'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-11 col-xxl-10 con-wid'>
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
                          href='/create-event'
                        >
                          Create Event
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='row g-2'>
                    <div className='col-lg-3 d-sidebar'>
                      <div className='rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border'>
                        <div className='inner'>
                          <div className='content-item-content'>
                            <div className='rbt-default-sidebar-wrapper rbt-single-widget '>
                              <nav className='mainmenu-nav '>
                                <h5 className='rbt-widget-title'>Categories</h5>
                                <ul className='rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content'>
                                  {tabs.map((tab, index) => (
                                    <li className='rbt-check-group' key={index}>
                                      <input
                                        key={tab?.value}
                                        id={`cat-list-${index}`}
                                        type='checkbox'
                                        name={`cat-list-${index}`}
                                        checked={state.activeTab === index}
                                        onChange={() =>
                                          setState({ activeTab: index })
                                        }
                                      />
                                      <label htmlFor={`cat-list-${index}`}>
                                        {tab?.label}
                                        {/* <span className="rbt-lable count">
                                          15
                                        </span> */}
                                      </label>
                                    </li>
                                  ))}
                                </ul>

                                <h5 className=' mt-5'>Select Event Type</h5>
                                <ul className='rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content'>
                                  <li
                                    className='nav-item'
                                    role='presentation'
                                    // style={{
                                    //   borderBottom:"1px solid #6b7385"
                                    // }}
                                  >
                                    <a
                                      className={`w-100 ${
                                        pathname === '#' ? 'active' : ''
                                      }`}
                                      href='#'
                                    >
                                      <FormField
                                        type='select'
                                        disabled={false}
                                        onChange={(e) =>
                                          setState({
                                            filterCategory: e.target.value,
                                          })
                                        }
                                        name='filterCategory'
                                        placeholder='Event Type'
                                        value={state.filterCategory}
                                        options={[
                                          {
                                            value: 'upcoming',
                                            label: 'Upcoming',
                                          },
                                          {
                                            value: 'completed',
                                            label: 'Completed',
                                          },
                                        ]}
                                        className={'border px-3'}
                                      />
                                    </a>
                                  </li>
                                </ul>
                              </nav>

                              {/* <div
                                className=" d-flex flex-wrap mt-5"
                                style={{ columnGap: "10px", rowGap: "8px" }}
                              >
                                <Link
                                  className="rbt-btn btn-gradient radius-round sm-btn"
                                  href="#"
                                  onClick={filterSubmit}
                                >
                                  Filter
                                </Link>
                                <Link
                                  className="rbt-btn btn-border-gradient radius-round sm-btn"
                                  href="#"
                                  onClick={clearFilter}
                                >
                                  Clear all
                                </Link>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='col-lg-9'>
                      {state.pageLoading ? (
                        <Loader /> // 👈 show loader
                      ) : (
                        <div className='rbt-rbt-card-area  bg-color-white '>
                          <div className='container'>
                            <UpCommingEvents
                              isAdmin={state.isAdmin}
                              data={state.allEventsAdmin} // Use the data fetched for upcoming events
                              // onClick={(id) => {
                              //   router.push(`edit-event/${id}`);
                              // }}
                              Admin={state?.isAdmin}
                              AlumniManager={state?.isAlumniManager}
                              showDeleteConfirm={(event) =>
                                showEventDeleteConfirm(event)
                              }
                            />

                            {state.allEventsAdmin?.length > 0 && (
                              <div>
                                <div className='mb-20 '>
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
                      )}
                    </div>
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

export default EventsLoginMain;
