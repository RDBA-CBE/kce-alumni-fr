import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import AccountInfo from '../../../../data/myAccount.json';
import MyAccount from '../../../My-Account/MyAccount';
import FormField from '@/commonComponents/FormFields';
import { useRouter } from 'next/navigation';
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

const MyProfileExperienceMain = () => {
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
    industry: '',
    role: '',
    location: '',
    start_date: '',
    end_date: null,
    is_currently_working: false,
  });
  const [memberId, setMemberId] = useState('');
  const [getMemberEducation, setMemberEducation] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [location, setLocation] = useState([]);
  const [role, setRole] = useState([]);

  const router = useRouter();

  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const [state, setState] = useSetState({
    currenRolePage: 1,
    hasRoleLoadMore: null,
    hasIndustryLoadMore: null,
    currenInstitutionPage: 1,
    currenLocationPage: 1,
    hasLocationLoadMore: null,
    pageLoading: false,
    btnLoading: false,
  });

  useEffect(() => {
    GetInstitute();
    GetRole();
    GetLocation();
  }, []);

  useEffect(() => {
    const MEMBERID = localStorage.getItem('member_id');
    setMemberId(MEMBERID);

    const Admin = localStorage.getItem('isAdmin');
    console.log('✌️Admin --->', Admin);
    Admin == true || (Admin == 'true' && router.push('/users'));
  }, []);

  useEffect(() => {
    if (memberId) {
      GetMemberEducation();
    }
  }, [memberId]);

  const GetInstitute = async () => {
    try {
      const res = await Models.masters.industryList(1);
      const dropdown = setDropdownData(res?.results, 'title');
      setInstitute(dropdown);
      setState({
        hasIndustryLoadMore: res?.next,
      });
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const GetRole = async () => {
    
    try {
      const res = await Models.masters.roleList(1);
      const dropdown = setDropdownData(res?.results, 'role');
      setRole(dropdown);
      setState({
        hasRoleLoadMore: res?.next,
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
      const res = await Models.member.member_experience(memberId);
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

  const UpdateMemberGetEducation = (department) => {
    axios
      .get(`${BaseURL}/update_member_experience/${department?.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('response:', response.data);
        // setFormData(response.data);
        setFormData({
          member: response.data.id,
          industry: {
            value: response.data.industry.id,
            label: response.data.industry.title,
          },
          role: {
            value: response.data.role.id,
            label: response.data.role.role,
          },
          location: {
            value: response.data.location.id,
            label: response.data.location.location,
          },
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          is_currently_working: response.data.is_currently_working,
        });
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

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
    console?.log('formDdata:', formData);

    const validationRules = {
      industry: {
        required: true,
      },
      role: {
        required: true,
      },
      start_date: {
        required: true,
      },
      location: {
        required: true,
      },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    const body = {
      member: memberId,
      industry: formData.industry.value,
      role: formData.role.value,
      location: formData.location.value,
      start_date: formData.start_date,
      is_currently_working: formData.is_currently_working,
      end_date: formData.end_date,
    };

    console.log('body', body);

    // Conditionally add end_year if not currently pursuing
    if (!formData.is_currently_working) {
      body.end_date = formData.end_date;
    }

    if (isEditing) {
      try {
        setState({ btnLoading: true });
        const res = await axios.post(
          `${BaseURL}/update_member_experience/${formData.member}/`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setState({ btnLoading: false });

        messageApi.open({
          type: 'success',
          content: res.data.message,
        });

        setIsModalOpen(false);

        GetMemberEducation();

        setFormData({
          industry: '',
          role: '',
          location: '',
          start_date: '',
          end_date: null,
          is_currently_working: false,
        });

        // router.push("/profile-photograph");
      } catch (error) {
        console.log('error :', error);
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
        setState({ btnLoading: false });
      }
    } else {
      try {
        const res = await axios.post(
          `${BaseURL}/create_member_experience/`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        messageApi.open({
          type: 'success',
          content: res.data.message,
        });

        setIsModalOpen(false);

        GetMemberEducation();

        setFormData({
          industry: '',
          role: '',
          location: '',
          start_date: '',
          end_date: null,
          is_currently_working: false,
        });

        // router.push("/profile-photograph");
      } catch (error) {
        console.log('error :', error);
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({
      industry: '',
      role: '',
      location: '',
      start_date: '',
      end_date: '',
      is_currently_working: false,
    });
  };

  const showModal = () => {
    setFormData({
      industry: '',
      role: '',
      location: '',
      start_date: '',
      end_date: null,
      is_currently_working: false,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const editDepartment = (department) => () => {
    console.log('✌️department --->', department);

    setIsEditing(true);
    setIsModalOpen(true);
    if (memberId) {
      UpdateMemberGetEducation(department);
    }
  };

  const showDeleteConfirm = (department) => {
    console.log('✌️department --->', department);

    confirm({
      title: 'delete this Education Details?',
      content: 'Are you sure you want to delete this Education Details?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        axios
          .delete(`${BaseURL}/delete_member_experience/${department.id}/`, {
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

  const industryListLoadMore = async () => {
    try {
      if (state.hasIndustryLoadMore) {
        const res = await Models.job.industryList(state.currenIndustryPage + 1);
        // const IndustryOption = res?.results?.map((item) => ({
        //   value: item.skill_id,
        //   label: item.skill,
        // }));
        const IndustryOption = setDropdownData(res?.results, 'title');

        setInstitute([...institute, ...IndustryOption]);

        setState({
          currenIndustryPage: state.currenIndustryPage + 1,
          hasIndustryLoadMore: res.next,
        });
      } else {
        setInstitute(institute);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const roleListLoadMore = async () => {
    try {
      if (state.hasRoleLoadMore) {
        const res = await Models.job.roleList(state.currenRolePage + 1);

        const RoleOption = setDropdownData(res?.results, 'role');

        setRole([...role, ...RoleOption]);

        setState({
          currenRolePage: state.currenRolePage + 1,
          hasRoleLoadMore: res.next,
        });
      } else {
        setRole(role);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const locationListLoadMore = async () => {
    console.log('state.hasLocationLoadMore)', state.hasLocationLoadMore);

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
                    <Link href='edit-basic-profile'>Basic Details</Link>
                    <Link href='edit-profile-picture'>Profile Picture</Link>
                    <Link href='edit-profile-education'>Education</Link>
                    <Link href='edit-profile-skills'>Skills</Link>

                    <Link href='edit-profile-experience' className='active'>
                      Experience
                    </Link>
                    <Link href='edit-profile-contact'>Contact</Link>
                    <Link href='edit-milestone'>Milestone</Link>
                  </div>
                </div>
                <div className='col-lg-9 col-12'>
                  <div className='rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box'>
                    <div className='container'>
                      <div className='row row--15 gy-5'>
                        <div className='section-title d-flex justify-content-between'>
                          <h4 className='rbt-title-style-3 mb-0'>
                            Experience
                            <div
                              className='text-gray mt-2'
                              style={{ fontSize: '14px' }}
                            >
                              Please update experience details here
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
                              onSubmit={(e) => handleEducationSubmit(e)}
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
                                                color: '#000',
                                              }}
                                            >
                                              {edu?.industry}
                                            </Link>
                                          </h5>

                                          {edu?.is_currently_working !==
                                            true && (
                                            <span
                                              style={{
                                                color: '#000',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {edu?.role}( {edu?.start_date} -{' '}
                                              {edu?.end_date} )
                                            </span>
                                          )}

                                          {edu?.is_currently_working ==
                                            true && (
                                            <span
                                              style={{
                                                color: '#000',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {edu?.role}( {edu?.start_date} -{' '}
                                              {edu?.end_date
                                                ? edu?.end_date
                                                : 'Current'}{' '}
                                              )
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
                                              title='Delete'
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
                                    No Experience details added
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
            {isEditing ? 'Edit Profile Experience' : 'Add Profile Experience'}
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
              name='industry'
              label='Industry'
              // className={"applicant-input "}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  industry: value,
                })
              }
              value={formData.industry}
              options={institute}
              error={errMsg?.industry}
              required
              loadMore={() => industryListLoadMore()}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='loadMoreSelect'
              name='role'
              label='Role'
              // className={"applicant-input"}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  role: value,
                })
              }
              value={formData.role}
              error={errMsg?.role}
              options={role}
              required
              loadMore={() => roleListLoadMore()}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <input
              type='checkbox'
              name='is_currently_working'
              onChange={handleChange}
              checked={formData?.is_currently_working || false}
              id='currentlyworking'
            />
            <label
              htmlFor={`currentlyworking`}
              style={{
                marginRight: '5px',
                color: 'black',
                marginTop: '2px',
              }}
            >
              Currently working?
            </label>
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='date'
              name='start_date'
              label='Start Date'
              // className={"applicant-input"}
              onChange={handleChange}
              value={formData.start_date}
              error={errMsg?.start_date}
              required={true}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='date'
              name='end_date'
              label='End Date'
              //   className={"applicant-input"}
              onChange={handleChange}
              value={formData.end_date}
              error={errMsg?.end_date}
            />
          </div>

          <div style={{ marginTop: '15px' }}>
            <FormField
              type='loadMoreSelect'
              name='location'
              label='Location'
              // className={"applicant-input"}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  location: value,
                })
              }
              value={formData.location}
              options={location}
              error={errMsg?.location}
              required={true}
              loadMore={() => locationListLoadMore()}
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
              className={`rbt-btn btn-gradient radius-round sm-btn  ${state.btnLoading ? 'loading' : ''}`}
              type="submit"
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

export default MyProfileExperienceMain;
