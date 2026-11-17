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

const PAGE_SIZE = 12;

const fetchAllPages = async (fetchPage) => {
  const results = [];
  let response = await fetchPage(1);
  let total = Number(response?.count ?? 0);
  let pageCount = 0;

  while (response) {
    results.push(...(response.results || []));
    pageCount += 1;

    if (!response.next) break;

    response = await fetchPage(pageCount + 1);
  }

  return { results, total, maxPage: pageCount };
};

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
    activeTab: '',
    filterCategory: '',
    filterApproval: 'approved', // default: show approved
    filterActive: 'active',     // default: show active
    currentPage: 1,
    total: 0,
    next: undefined,
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

    const isAdminBool =
      String(Admin).toLowerCase() === 'true' || Admin === true;

    setState({
      isAdmin: Admin,
      isAlumniManager: AlumniManager,
      isAlumni: Alumni,
      isFaculty: Faculty,
      token: Token,
      // Both admin and alumni start with approved + active events
      filterApproval: 'approved',
      filterActive: 'active',
    });
  }, [state?.token]);

  useEffect(() => {
    // GetUpComingEvents(); // Fetch initial events on load
    // GetPassedEventsData();
    GetEventCategory(); // Fetch event categories
  }, []);

  useEffect(() => {
    if (!state.token) return;
    const body = bodyData();
    if (Object.keys(body).length > 0) {
      filterData(1);
    } else {
      GetAllEventsAdmin(1);
    }
  }, [
    state.token,
    state.activeTab,
    state.filterCategory,
    state.filterApproval,
    state.filterActive,
  ]);

  const GetAllEventsAdmin = async (page) => {
    setState({ pageLoading: true });
    try {
      const { results, total, maxPage } = await fetchAllPages((pageNumber) =>
        Models?.event?.GetAllEventsAdminData(pageNumber)
      );
      setState({
        allEventsAdmin: results,
        currentPage: page,
        next: undefined,
        total,
        maxPage,
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
    setState({ pageLoading: true });
    try {
      const body = bodyData();
      const { results, total, maxPage } = await fetchAllPages((pageNumber) =>
        Models?.event?.filterEvent(pageNumber, body)
      );
      setState({
        allEventsAdmin: results,
        currentPage: page,
        next: undefined,
        total,
        maxPage,
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
      title: event.is_approved
        ? 'Are you sure you want to Un Approve this Event?'
        : 'Are you sure you want to Approve this Event?',
      okText: event.is_approved ? 'Un Approve' : 'Approve',
      okType: event.is_approved ? 'danger' : 'primary',
      okButtonProps: event.is_approved
        ? {
            style: {
              borderRadius: '8px',
            },
          }
        : {
            className: 'gallery-confirm-btn',
            style: {
              background: 'linear-gradient(90deg, #cc7539, #d76239)',
              borderColor: 'transparent',
              color: '#ffffff',
              borderRadius: '8px',
            },
          },
      cancelButtonProps: {
        className: 'gallery-cancel-btn',
        style: {
          borderRadius: '8px',
        },
      },
      cancelText: 'Cancel',
      async onOk() {
        try {
          const body = {
            is_approved: !event.is_approved,
          };
          const res = await Models?.event?.UpdateEditEventsDatas(event.id, body);
          message.success(res.message);
          filterData(state.currentPage);
        } catch (error) {
          console.log('error: ', error);
          const errorMessage =
            error.response?.data?.error || 'An error occurred';
          message.error(errorMessage);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // Admin-only: toggle active/inactive status
  const showEventActiveConfirm = (event) => {
    // Treat missing/null as active (true) since events are active by default
    const rawActive = event?.is_active;
    const currentActive =
      rawActive === true ||
      rawActive === 'true' ||
      rawActive === 1 ||
      rawActive === null ||
      rawActive === undefined;
    const nextActive = !currentActive;

    confirm({
      title: currentActive
        ? 'Are you sure you want to Inactivate this Event?'
        : 'Are you sure you want to Activate this Event?',
      okText: currentActive ? 'Inactivate' : 'Activate',
      okType: currentActive ? 'danger' : 'primary',
      okButtonProps: currentActive
        ? {
            style: { borderRadius: '8px' },
          }
        : {
            className: 'gallery-confirm-btn',
            style: {
              background: 'linear-gradient(90deg, #cc7539, #d76239)',
              borderColor: 'transparent',
              color: '#ffffff',
              borderRadius: '8px',
            },
          },
      cancelButtonProps: {
        className: 'gallery-cancel-btn',
        style: { borderRadius: '8px' },
      },
      cancelText: 'Cancel',
      async onOk() {
        try {
          const body = { is_active: nextActive };
          const res = await Models?.event?.UpdateEditEventsDatas(event.id, body);
          message.success(
            res?.message ||
              `Event ${nextActive ? 'activated' : 'inactivated'} successfully`
          );
          filterData(state.currentPage);
        } catch (error) {
          console.log('error: ', error);
          const errorMessage =
            error.response?.data?.error || 'An error occurred';
          message.error(errorMessage);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handlePageChange = (number) => {
    setState({ currentPage: number });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return number;
  };

  const bodyData = () => {
    let body = {};

    // activeTab holds the category_id ('' means All)
    if (state?.activeTab !== 0 && state?.activeTab !== '') {
      body.category_id = state?.activeTab;
    }

    if (state.filterCategory) {
      if (state.filterCategory == 'upcoming') {
        body.is_past = 'false';
      }
      if (state.filterCategory == 'completed') {
        body.is_past = 'true';
      }
    }

    // Add approval filter
    if (state.filterApproval) {
      if (state.filterApproval === 'approved') {
        body.is_approved = 'true';
      }
      if (state.filterApproval === 'unapproved') {
        body.is_approved = 'false';
      }
    }

    // Add active/inactive filter
    if (state.filterActive === 'active') {
      body.is_active = 'true';
    } else if (state.filterActive === 'inactive') {
      body.is_active = 'false';
    }

    return body;
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
                        <div className='d-flex gap-4'>
                          <Link
                          className='rbt-btn btn-gradient radius-round sm-btn'
                          href='/my-events'
                        >
                          My Events
                        </Link>
                        <Link
                          className='rbt-btn btn-gradient radius-round sm-btn'
                          href='/create-event'
                        >
                          Create Event
                        </Link>
                        </div>
                        
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
                                  {state.eventCategoryList.map((tab, index) => (
                                    <li className='rbt-check-group' key={index}>
                                      <input
                                        id={`cat-list-${index}`}
                                        type='checkbox'
                                        name={`cat-list-${index}`}
                                        checked={state.activeTab === tab.category_id}
                                        onChange={() =>
                                          setState({
                                            activeTab:
                                              state.activeTab === tab.category_id
                                                ? ''
                                                : tab.category_id,
                                            currentPage: 1,
                                          })
                                        }
                                      />
                                      <label htmlFor={`cat-list-${index}`}>
                                        {tab?.title}
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
                                      className={`w-100 ${pathname === '#' ? 'active' : ''
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

                                {String(state.isAdmin).toLowerCase() === 'true' && (
                                  <>
                                    <h5 className=' mt-5'>Approval Status</h5>
                                    <ul className='rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content'>
                                      <li
                                        className='nav-item'
                                        role='presentation'
                                      >
                                        <a
                                          className={`w-100 ${pathname === '#' ? 'active' : ''
                                            }`}
                                          href='#'
                                        >
                                          <FormField
                                            type='select'
                                            disabled={false}
                                            onChange={(e) =>
                                              setState({
                                                filterApproval: e.target.value,
                                                currentPage: 1,
                                              })
                                            }
                                            name='filterApproval'
                                            placeholder='Approval Status'
                                            value={state.filterApproval}
                                            options={[
                                              {
                                                value: 'approved',
                                                label: 'Approved',
                                              },
                                              {
                                                value: 'unapproved',
                                                label: 'Unapproved',
                                              },
                                            ]}
                                            className={'border px-3'}
                                          />
                                        </a>
                                      </li>
                                    </ul>

                                    <h5 className=' mt-5'>Active Status</h5>
                                    <ul className='rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content'>
                                      <li className='nav-item' role='presentation'>
                                        <a
                                          className={`w-100 ${pathname === '#' ? 'active' : ''}`}
                                          href='#'
                                        >
                                          <FormField
                                            type='select'
                                            disabled={false}
                                            onChange={(e) =>
                                              setState({
                                                filterActive: e.target.value,
                                                currentPage: 1,
                                              })
                                            }
                                            name='filterActive'
                                            placeholder='Active Status'
                                            value={state.filterActive}
                                            options={[
                                              { value: 'active', label: 'Active' },
                                              { value: 'inactive', label: 'Inactive' },
                                            ]}
                                            className={'border px-3'}
                                          />
                                        </a>
                                      </li>
                                    </ul>
                                  </>
                                )}
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
                          {state.allEventsAdmin.length > 0 ? <div className='container'>
                            <UpCommingEvents
                              isAdmin={state.isAdmin}
                              data={state.allEventsAdmin?.slice(
                                (state.currentPage - 1) * PAGE_SIZE,
                                state.currentPage * PAGE_SIZE
                              )}
                              Admin={state?.isAdmin}
                              AlumniManager={state?.isAlumniManager}
                              isAdminView={String(state.isAdmin).toLowerCase() === 'true'}
                              showDeleteConfirm={(event) =>
                                showEventDeleteConfirm(event)
                              }
                              showActiveConfirm={(event) =>
                                showEventActiveConfirm(event)
                              }
                            />

                            {Number(state.total) > 0 && (
                              <div>
                                <div className='mb-20 '>
                                  <Pagination
                                    activeNumber={handlePageChange}
                                    totalPage={state.total}
                                    currentPages={state.currentPage}
                                    next={state.next}
                                    maxPage={state.maxPage}
                                    pageSize={PAGE_SIZE}
                                  />
                                </div>
                              </div>
                            )}
                          </div> : <div className='text-center d-flex justify-content-center align-items-center h-' style={{ minHeight: '300px' }}>No events found.</div>}
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
