import {
  formattedDate,
  useSetState,
  formatForGoogleCalendar,
  convertTo12HourFormat,
} from '@/utils/commonFunction.utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import 'venobox/dist/venobox.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { useAppContext } from '@/context/Context';
import { addToCartAction } from '@/redux/action/CartAction';
import Models from '@/imports/models.import';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import EventParticipants from '../EventDetails/EventParticipants';
import { message, Modal } from 'antd';
import QuestionForm from '../EventDetails/QuestionForm';
import Pagination from '@/components/Common/Pagination';
import Loader from '../../Loader';

const EventDetailsMain = ({ getMatchEvent, id }) => {
  const [state, setState] = useSetState({
    activeTab: 'All',
    eventData: {},
    userData: [],
    tabs: [],
    group: null,
    loading: false,
    btnLoading: false,
    question: [],
    pageLoading: false,
  });

  const router = useRouter();
  const { toggle, setToggle, cartToggle, setCart } = useAppContext();
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [responses, setResponses] = useState({});
  const [otherInputs, setOtherInputs] = useState({});

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const [amount, setAmount] = useState(1);

  const addToCartFun = (id, amount, product) => {
    dispatch(addToCartAction(id, amount, product));
    setCart(!cartToggle);
  };

  useEffect(() => {
    dispatch({ type: 'COUNT_CART_TOTALS' });
    localStorage.setItem('hiStudy', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    import('venobox/dist/venobox.min.js').then((venobox) => {
      new venobox.default({
        selector: '.popup-video',
      });
    });

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHide = currentScrollPos > 250;

      setHideOnScroll(isHide);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (id) {
      GetEventDetails();
      registered_details(1);
    }
  }, [id]);

  useEffect(() => {
    const group = localStorage.getItem('group');
    setState({
      group: group,
      // isAlumniContact:isAlumniContact == "true" ? true : false,
      // isAlumniEducation:isAlumniEducation ==
    });
  }, [state.group]);

  console.log('group', state.group);

  useEffect(() => {
    if (isModalOpen) register_event();
  }, [isModalOpen]);

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg || 'Successfully Registered',
    });
  };

  const failure = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const GetEventDetails = async () => {
    setState({ pageLoading: true });
    try {
      const res = await Models?.event?.GetEditEventsDatas(id);
      console.log('✌️res--->', res);

      const tabs = [
        'Email Attendees',
        'Export Attendees',
        ...(res?.is_admin ? ['Edit Event'] : []), // Only shown for admins
        'Publish & Share',
      ];
      setState({
        eventData: res,
        tabs,
        pageLoading: false,
      });
    } catch (err) {
      if (err?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
       setState({ pageLoading: false });
    }
   
  };

  const registered_details = async (page) => {
    try {
      const res = await Models?.event?.registered_details(id, page);
      console.log('registered_details--->', res);
      setState({
        userData: res?.results?.registered_users,
        currentPage: page,
        next: res?.next,
        previous: res?.previous,
        total: res?.count,
      });
    } catch (err) {
      if (err?.code === 'token_not_valid') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  };

  const handleClickTab = (tab) => {
    console.log('tab: ', tab);
    setState({ activeTab: tab });
    if (tab == 'Edit Event') {
      router.push(`/edit-event/${id}`);
    }
    if (tab == 'Email Attendees') {
      router.push(`/email-attendees/${id}`);
    }

    if (tab == 'Export Attendees') {
      handleDownloadExcel();
    }
    if (tab == 'Publish & Share') {
      console.log('hello');

      router.push(`/publish-and-share/${id}`);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([state?.eventData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Event Details');
    XLSX.writeFile(workbook, 'event_details.xlsx');
  };

  // const handleClickBtn = async (type) => {
  //   try {
  //     if (type == "willJoin") {
  //       router.push(`/apply-event/${id}`);
  //     } else if (type == "maybe") {
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  const handleClickBtn = () => {
    // setOpenRegisterModal(true);
    setIsModalOpen(true);
  };

  const AddToCalendarButton = () => {
    const startDate = state?.eventData?.start_date; // Event start date (e.g., "2024-12-06")
    const startTime = state?.eventData?.start_time; // Event start time (e.g., "13:45:00")

    // Format the date and time for Google Calendar
    const startDateTime = formatForGoogleCalendar(startDate, startTime);

    // Construct the Google Calendar event URL
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      state.eventData?.title
    )}&dates=${startDateTime}/${startDateTime}&details=${encodeURIComponent(
      state.eventData?.description
    )}&location=${encodeURIComponent(state.eventData?.venue)}`;

    // Open Google Calendar URL in a new tab
    window.open(googleCalendarUrl, '_blank');
  };

  const viewOnMap = () => {
    const address = state?.eventData?.address; // Get the address

    // Construct Google Maps URL by encoding the address
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
      address
    )}`;

    // Open the Google Maps URL in a new tab
    window.open(googleMapsUrl, '_blank');
  };

  const handlePageChange = (number) => {
    registered_details(number);
    setState({ currentPage: number });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return number;
  };

  const register_event = async () => {
    try {
      setState({ loading: true });
      const res = await Models.masters.register_event(id);
      setState({ question: res, loading: false });
    } catch (e) {
      console.log(e);
      setState({ loading: false });
    }
  };

  const getFinalResponses = async () => {
    try {
      setState({ btnLoading: true });

      const final = {
        responses: state.question.map((q) => ({
          question_id: q.id,
          response:
            responses[q.id] === 'Others'
              ? otherInputs[q.id] || null
              : responses[q.id] || null,
        })),
      };

      await Models.masters.post_register_event(id, final);
      success('Event Registered Successfully');

      setState({ btnLoading: false });
      onCancel(); // close modal
    } catch (error) {
      console.log(error);
      failure(error?.data?.error || error || 'Something went wrong');
      setState({ btnLoading: false });
    }
  };
  if (state.pageLoading) {
    return <Loader />; // Show loader while checking token
  }
  return (
    <>
      <div className='row g-5 event-details'>
        <div className='col-lg-8'>
          <div className='course-details-content'>
            <div className='rbt-feature-box rbt-shadow-box thuumbnail bg-liblue'>
              <img
                className='w-100'
                src={
                  state?.eventData?.event_wallpaper
                    ? state?.eventData?.event_wallpaper
                    : '/images/event/grid-type-01.jpg'
                }
                width={800}
                height={550}
                
                alt='Card image'
                style={{
                  minHeight: '400px',
                  maxHeight: '520px',
                  objectFit: 'cover',
                }}
              />
            </div>

            {state?.eventData?.description && (
              <div className='rbt-feature-box rbt-shadow-box mt--40 bg-liblue'>
                <div className='row g-5'>
                  <div className='col-lg-12'>
                    <div className='section-title'>
                      <h5 className='title mb--20'>
                        {state?.eventData?.title}
                      </h5>
                    </div>
                    <p
                      className='mb-2'
                      dangerouslySetInnerHTML={{
                        __html: state?.eventData?.description,
                      }}
                    ></p>
                    {state?.eventData?.instructions && (
                      <p>
                        <b>Event Instruction : {''}</b>
                        {state?.eventData?.instructions}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {state.userData?.length > 0 && (
              <div className='rbt-feature-box rbt-shadow-box rbt-participants-area mt--40 bg-liblue'>
                <EventParticipants userData={state?.userData} />

                {state.userData?.length > 0 && (
                  <div>
                    <div className='mt-5'>
                      <Pagination
                        activeNumber={handlePageChange}
                        totalPage={state.total}
                        currentPages={state.currentPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='col-lg-4 mt_md--60 mt_sm--60'>
          <div className='course-sidebar  sticky-top rbt-shadow-box course-sidebar-top bg-liblue'>
            <div className='inner'>
              <div
                className={`video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15 ${
                  hideOnScroll ? 'd-none' : ''
                }`}
              >
                <div className='video-content'>
                  <img
                    className='w-100  rbt-radius'
                    src={
                      state?.eventData?.event_wallpaper
                        ? state?.eventData?.event_wallpaper
                        : '/images/course/course-01.jpg'
                    }
                    width={355}
                    height={255}
                    alt='Video Images'
                  />
                </div>
              </div>

              <div className='content '>
                <div>
                  <div className='add-to-card-button mb--15'>
                    <div
                      className='rbt-btn btn-gradient icon-hover w-100 d-block text-center'
                      onClick={() => handleClickBtn()}
                    >
                      <span className='btn-text'>Apply Now</span>
                      <span className='btn-icon'>
                        <i className='feather-arrow-right'></i>
                      </span>
                    </div>
                  </div>

                  {(state.group === 'alumni' || state.group === 'student') && (
                    <div className='add-to-card-button mb--15'>
                      <div
                        className='rbt-btn btn-border  icon-hover w-100 d-block text-center'
                        onClick={AddToCalendarButton}
                      >
                        <span className='btn-text'>Add to Calendar</span>
                        <span className='btn-icon'>
                          <i className='feather-arrow-right'></i>
                        </span>
                      </div>
                    </div>
                  )}

                  {state.group !== 'alumni' && state.group !== 'student' && (
                    <div className='event-actions mb--15'>
                      <button
                        className='rbt-btn btn-gradient icon-hover event-btn'
                        onClick={() => handleClickTab('Email Attendees')}
                      >
                        <span className='btn-text'>Email Attendees</span>
                        <span className='btn-icon'>
                          <i className='feather-mail'></i>
                        </span>
                      </button>

                      <button
                        className='rbt-btn btn-border icon-hover event-btn'
                        onClick={() => handleClickTab('Edit Event')}
                      >
                        <span className='btn-text'>Edit Event</span>
                        <span className='btn-icon'>
                          <i className='feather-edit'></i>
                        </span>
                      </button>

                      <button
                        className='rbt-btn btn-border icon-hover event-btn'
                        onClick={() => handleClickTab('Export Attendees')}
                      >
                        <span className='btn-text'>Export Attendees</span>
                        <span className='btn-icon'>
                          <i className='feather-download'></i>
                        </span>
                      </button>

                      <button
                        className='rbt-btn btn-gradient icon-hover event-btn '
                        // href="#"
                        onClick={() => handleClickTab('Publish & Share')}
                      >
                        <span className='btn-text'>Publish & Share</span>
                        <span className='btn-icon'>
                          <i className='feather-share-2'></i>
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className={`rbt-widget-details has-show-more ${
                    !toggle ? 'active' : ''
                  }`}
                >
                  <ul className='has-show-more-inner-content rbt-course-details-list-wrapper'>
                    <li>
                      <span>Start date</span>
                      <span className='rbt-feature-value rbt-badge-5'>
                        {formattedDate(state?.eventData?.start_date)}
                      </span>
                    </li>

                    <li>
                      <span>Start Time</span>
                      <span className='rbt-feature-value rbt-badge-5'>
                        {convertTo12HourFormat(state?.eventData?.start_time)}
                      </span>
                    </li>

                    <li>
                      <span>Registration Close Date</span>
                      <span className='rbt-feature-value rbt-badge-5'>
                        {formattedDate(
                          state?.eventData?.registration_close_date
                        )}
                      </span>
                    </li>

                    <li>
                      <span>Venue</span>
                      <span className='rbt-feature-value rbt-badge-5'>
                        {state?.eventData?.venue}
                      </span>
                    </li>

                    <li>
                      <span>Catergory</span>
                      <span className='rbt-feature-value rbt-badge-5'>
                        {state?.eventData?.category}
                      </span>
                    </li>

                    <li>
                      <span>Address</span>
                      <span className='rbt-feature-value rbt-badge-5'>
                        {state?.eventData?.address}
                      </span>
                    </li>
                  </ul>

                  {/* Show More / Show Less button */}
                  <div
                    className={`rbt-show-more-btn ${!toggle ? 'active' : ''}`}
                    onClick={() => setToggle(!toggle)}
                  >
                    {toggle ? 'Show More' : 'Show Less'}
                  </div>
                </div>

                <div className='social-share-wrapper mt--30 text-center'>
                  <div className='rbt-post-share d-flex align-items-center justify-content-center'>
                    <ul className='social-icon social-default transparent-with-border justify-content-center'>
                      <li>
                        <Link href='#' title='View In Map' onClick={viewOnMap}>
                          <i className='feather-map-pin'></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='#'
                          title='Add to Calendar'
                          onClick={AddToCalendarButton}
                        >
                          <i className='feather-calendar'></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${state?.eventData?.link}`}
                          title='View Link'
                        >
                          <i className='feather-link'></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <hr className='mt--20' />
                  <div className='contact-with-us text-center'>
                    <p>Amet consectetur adipisicing elit</p>
                    {/* <p className="rbt-badge-2 mt--10 justify-content-center w-100">
                <i className="feather-phone mr--5"></i> Call Us:
                <Link href="#">
                  <strong>+444 555 666 777</strong>
                </Link>
              </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {contextHolder}

        <Modal
          title={<div className='custom-modal-header'>Apply Now</div>}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
          centered
          width={800}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              className='inner-box overflow-auto'
              style={{ maxHeight: '60vh' }}
            >
              {state.question?.map((item, index) => (
                <div
                  className='mb-4'
                  key={`${item?.id}-${index}`}
                  style={{
                    marginBottom:
                      state.question?.length - 1 === index ? '5vh' : '1rem',
                  }}
                >
                  <QuestionForm
                    data={item}
                    responses={responses}
                    setResponses={setResponses}
                    otherInputs={otherInputs}
                    setOtherInputs={setOtherInputs}
                  />
                </div>
              ))}
            </div>

            <div className='d-flex justify-content-end mt-3 gap-2'>
              <button
                className='rbt-btn btn-gradient radius-round sm-btn'
                type='button'
                disabled={state.btnLoading}
                onClick={getFinalResponses}
              >
                {state.btnLoading ? 'Submitting...' : 'Submit'}
              </button>

              <button
                className='rbt-btn btn-gradient radius-round sm-btn'
                type='button'
                style={{ cursor: 'pointer', borderRadius: '0' }}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </>
    </>
  );
};

export default EventDetailsMain;
