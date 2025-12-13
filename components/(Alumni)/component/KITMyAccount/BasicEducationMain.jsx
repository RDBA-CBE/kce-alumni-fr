import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import AccountInfo from '../../../../data/myAccount.json';
import MyAccount from '../../../My-Account/MyAccount';
import FormField from '@/commonComponents/FormFields';
import { useParams, useRouter } from 'next/navigation';
import {
  setDropdownData,
  useSetState,
  validateForm,
} from '@/utils/commonFunction.utils';
import { message, Modal } from 'antd';
import { BloodGroupChooice } from '@/utils/constant.utils';
import Models from '@/imports/models.import';
import axios from 'axios';
import { BaseURL } from '@/utils/BaseUrl';
import Loader from '../../Loader';

const BasicEducationMain = () => {

    const {id} = useParams()
    
  const { confirm } = Modal;
  const [activeIndex, setActiveIndex] = useState(4);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState({
    status: false,
    key: 1,
  });
  const [formData, setFormData] = useState({
    institute: '',
    degree: '',
    location: '',
    start_year: '',
    end_year: null,
    is_currently_pursuing: false,
  });
 
  const [getMemberEducation, setMemberEducation] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [location, setLocation] = useState([]);

  const [state, setState] = useSetState({
    currenInstitutionPage: 1,
    hasInstitutionLoadMore: null,
    currenLocationPage: 1,
    hasLocationLoadMore: null,
    pageLoading: false,
    btnLoading: false,
  });

  const router = useRouter();

  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GetInstitute();
    GetLocation();
  }, []);

  useEffect(() => {
    if (id) {
      GetMemberEducation();
    }
  }, [id]);

  const GetInstitute = async () => {
    try {
      const res = await Models.masters.institutions();
      const dropdown = setDropdownData(res?.results, 'title');
      setInstitute(dropdown);
      setState({
        hasInstitutionLoadMore: res?.next,
      });
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const GetLocation = async () => {
    try {
      const res = await Models.masters.locationList(1);
      const dropdown = setDropdownData(res?.results, 'location');
      setLocation(dropdown);
      setState({
        hasLocationLoadMore: res?.next,
      });
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const GetMemberEducation = async () => {
    setState({
      pageLoading: true,
    });
    try {
      const res = await Models.member.member_education(id);
      setMemberEducation(res?.results);
      setState({
        pageLoading: false,
      });
    } catch (error) {
      console.log('✌️error --->', error);
      setState({
        pageLoading: false,
      });
    }
  };

  console.log('setMemberEducation', getMemberEducation);

  const UpdateMemberGetEducation = (department) => {
    axios
      .get(`${BaseURL}/update_member_education/${department?.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('response:', response.data);
        // setFormData(response.data);
        setFormData({
          member: response?.data?.id,
          institute: {
            value: response?.data?.institute?.id,
            label: response?.data?.institute?.title,
          },
          degree: response?.data?.degree,
          location: {
            value: response?.data?.location?.id,
            label: response?.data?.location?.location,
          },
          start_year: response?.data?.start_year,
          end_year: response?.data?.end_year,
          is_currently_pursuing: response?.data?.is_currently_pursuing,
        });
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  console.log('setFormData', formData);

  //

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Set to checked for checkboxes
    }));
  };

  



  const success = (success) => {
    messageApi.open({
      type: 'success',
      content: success || 'Successfully Registered',
    });
  };
  const errorNotification = (error) => {
    messageApi.open({
      type: 'error',
      content: error || 'An error occurred. Please try again.',
    });
  };
  const handleEducationSubmit = async (e) => {
  e.preventDefault();

  const validationRules = {
    institute: { required: true },
    degree: { required: true },
    start_year: { required: true },
  };

  const isValid = validateForm(formData, validationRules, setErrMsg);
  if (!isValid) return;

  // Additional validation: end_year must be greater than start_year
  if (
    !formData.is_currently_pursuing && // Only check if not currently pursuing
    formData.end_year &&
    parseInt(formData.end_year) <= parseInt(formData.start_year)
  ) {
    setErrMsg((prev) => ({
      ...prev,
      end_year: 'End Year should be greater than Start Year',
    }));
    return; // Stop form submission
  }

  const body = {
    member: id,
    institute: formData.institute.value,
    degree: formData.degree,
    location: formData.location.value,
    start_year: formData.start_year,
    is_currently_pursuing: formData.is_currently_pursuing,
  };

  if (!formData.is_currently_pursuing) {
    body.end_year = formData.end_year;
  }

  try {
    setState({ btnLoading: true });

    const url = isEditing
      ? `${BaseURL}/update_member_education/${formData.member}/`
      : `${BaseURL}/create_member_education/`;

    const res = await axios.post(url, body, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    messageApi.open({ type: 'success', content: res.data.message });

    setIsModalOpen(false);
    GetMemberEducation();

    setFormData({
      institute: '',
      degree: '',
      location: '',
      start_year: '',
      end_year: null,
      is_currently_pursuing: false,
    });

  } catch (error) {
    console.log('error :', error);
    messageApi.open({
      type: 'error',
      content: error.response?.data?.message || 'Something went wrong',
    });
  } finally {
    setState({ btnLoading: false });
  }
};


  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({
      institute: '',
      degree: '',
      location: '',
      start_year: '',
      end_year: null,
      is_currently_pursuing: false,
    });
  };

  const showModal = () => {
    setFormData({
      institute: '',
      degree: '',
      location: '',
      start_year: '',
      end_year: null,
      is_currently_pursuing: false,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const editDepartment = (department) => () => {
    console.log('✌️department --->', department);

    setIsEditing(true);
    setIsModalOpen(true);
    if (id) {
      UpdateMemberGetEducation(department);
    }
  };

  const showDeleteConfirm = (department) => {
    console.log('✌️department --->', department);

    confirm({
      title: 'Delete this Education Details?',
      content: 'Are you sure you want to delete this Education Details?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        axios
          .delete(`${BaseURL}/delete_member_education/${department.id}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            console.log('✌️response --->', response);
            message.success(response.data.message || 'Operation successful!');

            GetMemberEducation();
          })
          .catch((error) => {
            console.log('❌error --->', error);
            message.error(
              error.response?.data?.error ||
                'An error occurred. Please try again.'
            );
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });

    console.log('Deleting department:', department);
    // Perform is_active logic here if needed
  };

  const institutionListLoadMore = async () => {
    try {
      if (state.hasInstitutionLoadMore) {
        const res = await Models.masters.institutions(
          state.currenInstitutionPage + 1
        );

        const InstitutionOption = setDropdownData(res?.results, 'title');
        setInstitute([...institute, ...InstitutionOption]);

        setState({
          curreninstitutionPage: state.curreninstitutionPage + 1,
          hasinstitutionLoadMore: res.next,
        });
      } else {
        setInstitute(institute);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const locationListLoadMore = async () => {
    try {
      if (state.hasLocationLoadMore) {
        const res = await Models.job.locationList(state.currenLocationPage + 1);

        const LocationOption = setDropdownData(res?.results, 'location');
        console.log('loadmore location res', res);

        setLocation([...location, ...LocationOption]);
        setState({
          currenlocationPage: state.currenlocationPage + 1,
          hasLocationLoadMore: res.next,
        });
      } else {
        setLocation(location);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return state.pageLoading ? (
    <Loader /> // 👈 show loader
  ) : (
    <>
      <div className='my-account-section bg-color-white section-pad'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='row g-5'>
                <div className='col-lg-3 col-12'>
                  <div className='rbt-my-account-tab-button nav' role='tablist'>
                     <Link href={`/edit-basic-profile/${id}`} >
                        Basic Details
                      </Link>
                      <Link href={`/edit-profile-picture/${id}`}>Profile Picture</Link>
                      <Link href={`/edit-profile-education/${id}`} className="active">Education</Link>
                      <Link href={`/edit-profile-skills/${id}`}>Skills</Link>

                      <Link href={`/edit-profile-experience/${id}`}>Experience</Link>
                      <Link href={`/edit-profile-contact/${id}`}>Contact</Link>
                      <Link href={`/edit-milestone/${id}`}>Milestone</Link>
                  </div>
                </div>
                <div className='col-lg-9 col-12'>
                  <div className='rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box'>
                    <div className='container'>
                      <div className='row row--15 gy-5'>
                        <div className='section-title d-flex justify-content-between'>
                          <h4 className='rbt-title-style-3 mb-0'>
                            Education
                            <div
                              className='text-gray mt-2'
                              style={{ fontSize: '14px' }}
                            >
                              Please update profile details here
                            </div>
                          </h4>

                          <div className='rbt-button-group align-items-start'>
                            <div
                              className='rbt-btn btn-xs  radius-round'
                              title='Add Education'
                              onClick={showModal}
                            >
                              <i className='feather-plus pl--0'></i>
                            </div>
                          </div>
                        </div>

                        <div className='form-wrapper'>
                          <div className=' contact-form-style-1 max-width-auto py-0 px-3'>
                            <div
                              id='contact-form'
                              className='rainbow-dynamic-form max-width-auto'
                              onSubmit={(e) => handleSubmit(e)}
                            >
                              {getMemberEducation?.length > 0 ? (
                                <div className=''>
                                  <div className='sidebar-widget category-widget'>
                                    <div className='widget-content'>
                                      {getMemberEducation?.map((edu, index) => (
                                        <div
                                          className='py-3 px-5 bg-liblue mb-3  rounded-3'
                                          key={index}
                                          style={{ position: 'relative' }}
                                        >
                                          <h5 className='mb-2'>
                                            <Link
                                              href='#'
                                              style={{
                                                textTransform: 'capitalize',
                                                color: '',
                                              }}
                                            >
                                              {edu?.institute}
                                            </Link>
                                          </h5>

                                          {edu?.is_currently_pursuing !==
                                            true && (
                                            <span
                                              style={{
                                                color: '#000',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {edu?.degree}( {edu?.start_year} -{' '}
                                              {edu?.end_year} )
                                            </span>
                                          )}

                                          {edu?.is_currently_pursuing ==
                                            true && (
                                            <span
                                              style={{
                                                color: '#000',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {edu?.degree}( {edu?.start_year} -
                                              Current )
                                            </span>
                                          )}

                                          <div
                                            className='rbt-button-group'
                                            style={{
                                              position: 'absolute',
                                              top: '15px',
                                              right: '15px',
                                              zIndex: '10',
                                            }}
                                          >
                                            <button
                                              className='rbt-btn bg-white btn-xs  radius-round eve-edit'
                                              onClick={editDepartment(edu)}
                                              title='Edit'
                                            >
                                              <i
                                                className='feather-edit pl--0 text-white '
                                                style={{ fontSize: '14px' }}
                                              ></i>
                                            </button>
                                            <button
                                              className='rbt-btn bg-white btn-xs  radius-round '
                                              onClick={() =>
                                                showDeleteConfirm(edu)
                                              }
                                              title='Active'
                                            >
                                              <i
                                                className='feather-trash pl--0 text-white '
                                                style={{ fontSize: '14px' }}
                                              ></i>
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div
                                    className='text-gray mt-2'
                                    style={{ fontSize: '14px' }}
                                  >
                                    No Educations details added
                                  </div>
                                </>
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
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className='custom-modal-header'>
            {isEditing ? 'Edit Profile Education' : 'Create Profile Education'}
          </div>
        }
        open={isModalOpen}
        onCancel={() => handleCancel()}
        footer={false}
        centered
      >
        {/* 4. Form Wrapper */}
        <form className='applicants-form' onSubmit={handleEducationSubmit}>
          {/* 5. Status Select (Load More) */}
          <div style={{ marginTop: '15px' }}>
            <FormField
              type='loadMoreSelect'
              name='institute'
              label='Institute'
              // className={"applicant-input "}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  institute: value,
                })
              }
              value={formData.institute}
              options={institute}
              error={errMsg?.institute}
              required
              loadMore={() => institutionListLoadMore()}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='text'
              name='degree'
              label='Degree'
              // className={"applicant-input"}
              onChange={handleChange}
              value={formData.degree}
              error={errMsg?.degree}
              required
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <input
              type='checkbox'
              name='is_currently_pursuing'
              onChange={handleChange}
              checked={formData?.is_currently_pursuing || false}
              id='currentlyPursuing'
            />
            <label
              htmlFor={`currentlyPursuing`}
              style={{
                marginRight: '5px',
                color: 'black',
                marginTop: '2px',
              }}
            >
              Currently Pursuing?
            </label>
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='text'
              name='start_year'
              label='Start Year'
              // className={"applicant-input"}
              onChange={handleChange}
              value={formData.start_year}
              error={errMsg?.start_year}
              required={true}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='text'
              name='end_year'
              label='End Year'
              // className={"applicant-input"}
              onChange={handleChange}
              value={formData.end_year}
              error={errMsg?.end_year}
            />
          </div>

          {/* 7. Submit Button */}
          <div className='d-flex justify-content-end mt-3 gap-3'>
            <button
              className='rbt-btn btn-gradient radius-round sm-btn'
              type='button'
              onClick={() => handleCancel()}
            >
              Cancel
            </button>

            <button
              className={`rbt-btn btn-gradient radius-round sm-btn ${state.btnLoading ? 'loading' : ''}`}
              type='submit'
              disabled={state.btnLoading}
            >
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BasicEducationMain;
