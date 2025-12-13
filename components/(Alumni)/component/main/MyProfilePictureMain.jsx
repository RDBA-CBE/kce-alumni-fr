import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import AccountInfo from '../../../../data/myAccount.json';
import MyAccount from '../../../My-Account/MyAccount';
import FormField from '@/commonComponents/FormFields';
import { useRouter } from 'next/navigation';
import { useSetState, validateForm } from '@/utils/commonFunction.utils';
import { message, Modal } from 'antd';
import { BloodGroupChooice } from '@/utils/constant.utils';
import Models from '@/imports/models.import';
import axios from 'axios';
import { BaseURL } from '@/utils/BaseUrl';

const MyProfilePictureMain = () => {
  const { confirm } = Modal;
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ profile_picture: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [memberId, setMemberId] = useState(null);
  const [state, setState] = useSetState({btnLoading:false,});

  useEffect(() => {
    const MemberId = localStorage.getItem('member_id');
    setMemberId(MemberId);

    const Admin = localStorage.getItem('isAdmin');
    console.log('✌️Admin --->', Admin);
    Admin == true || (Admin == 'true' && router.push('/users'));
  }, []);

  useEffect(() => {
    if (memberId !== null) {
      ProfileImageGet();
    }
  }, [memberId]);

  console.log('memberId :', memberId);

  const ProfileImageGet = async () => {
    try {
      const res = await axios?.get(`${BaseURL}/profile_picture/${memberId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('res :', res);
      setFormData({
        profile_picture: res?.data?.profile_picture,
      });
      setPreviewImage(res?.data?.profile_picture);
    } catch (error) {
      console.log('error :', error);
    }
  };

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (files[0]) {
      const file = files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB

      if (!allowedTypes.includes(file.type)) {
        message.error('Only PNG, JPEG, JPG files are allowed.');
        e.target.value = ''; // Clear input
        return;
      } else if (fileSizeInMB > 2) {
        message.error('Max file size of 2MB is allowed.');
        e.target.value = ''; // Clear input
        return;
      }

      // Create a preview URL for the uploaded image
      setPreviewImage(URL.createObjectURL(file));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      profile_picture: { required: true },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('profile_picture', formData.profile_picture);

    
    try {
      setState({btnLoading:true})
      const response = await axios.post(
        `${BaseURL}/profile_picture/${memberId}/`,
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('response :', response);
      setState({btnLoading:false})

      messageApi.open({
        type: 'success',
        content: 'Profile picture uploaded successfully!',
      });
      ProfileImageGet();

      // Clear form data
      setFormData({ profile_picture: null });
      setPreviewImage(null);
      

      // setTimeout(() => {
      //   router.push("/next-step"); // Redirect after successful upload
      // }, 1000);
    } catch (error) {
      setState({btnLoading:false})
      messageApi.open({
        type: 'error',
        content:
          error.response?.data?.error || 'An error occurred. Please try again.',
      });
    }
  };

  const handleDelete = () => {
    confirm({
      title: 'Are you sure you want to delete this profile picture?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        {
          !previewImage
            ? setPreviewImage(null)
            : axios
                .delete(`${BaseURL}/profile_picture/${memberId}/`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                })
                .then((response) => {
                  console.log('response :', response);
                  messageApi.open({
                    type: 'success',
                    content: 'Profile picture deleted successfully!',
                  });
                  ProfileImageGet();
                  if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
                })
                .catch((error) => {
                  console.log('error :', error);
                });
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <div className='my-account-section bg-color-white section-pad'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='row g-5'>
              <div className='col-lg-3 col-12'>
                <div className='rbt-my-account-tab-button nav' role='tablist'>
                  <Link href='edit-basic-profile'>Basic Details</Link>
                  <Link href='edit-profile-picture' className='active'>
                    Profile Picture
                  </Link>
                  <Link href='edit-profile-education'>Education</Link>
                  <Link href='edit-profile-skills'>Skills</Link>
                  <Link href='edit-profile-experience'>Experience</Link>
                  <Link href='edit-profile-contact'>Contact</Link>
                  <Link href='edit-milestone'>Milestone</Link>
                </div>
              </div>
              <div className='col-lg-9 col-12'>
                <div className='rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box'>
                  <div className='container'>
                    <div className='row row--15 gy-5'>
                      <div className='form-wrapper'>
                        <div className=' contact-form-style-1 max-width-auto py-0 px-3'>
                          <form
                            id='contact-form'
                            className='rainbow-dynamic-form max-width-auto'
                            onSubmit={(e) => handleSubmit(e)}
                          >
                            {/* Left Column */}
                            <div
                              className={`${
                                previewImage ? 'd-flex gap-5' : ''
                              }`}
                            >
                              {previewImage ? (
                                <div style={{ position: 'relative' }}>
                                  <img
                                    src={previewImage}
                                    alt='Profile Preview'
                                    style={{
                                      width: '190px',
                                      height: '150px',
                                      objectFit: 'cover',
                                      borderRadius: '5px',
                                    }}
                                  />
                                  <button
                                    onClick={handleDelete}
                                    style={{
                                      background: 'white',
                                      color: 'red',
                                      position: 'absolute',
                                      top: '5px',
                                      right: '5px',
                                      cursor: 'pointer',
                                      borderRadius: '3px',
                                      padding: '0px 3px',
                                      border: 'none',
                                      fontSize: '12px',
                                    }}
                                  >
                                    <i className='feather-trash'></i>
                                  </button>
                                </div>
                              ) : (
                                <img
                                  src='assets/images/profile/dummy-profile.png'
                                  alt=''
                                />
                              )}

                              <div className=''>
                                <FormField
                                  label='Profile Picture'
                                  type='file'
                                  name='profile_picture'
                                  onChange={handleChange}
                                  error={errMsg.profile_picture}
                                  ref={fileInputRef}
                                  className='formdate pt-3'
                                  required={true}
                                  allowedTypes='image/*'
                                />
                                <p
                                  className=' mt-3'
                                  style={{ fontSize: '12px' }}
                                >
                                  Only PNG, JPEG, JPG allowed.
                                  <br />
                                  Max file size of 2MB.
                                </p>
                              </div>
                            </div>

                            <div className='form-submit-group'>
                              <button
                                name='submit'
                                type='submit'
                                id='submit'
                                disabled={state.btnLoading}
                                className={`rbt-btn btn-md btn-gradient hover-icon-reverse ${
                                  state.btnLoading ? 'loading' : ''
                                }`}
                              >
                                {state.btnLoading ? (
                                  <span className='btn-loader'></span>
                                ) : (
                                  <span className='icon-reverse-wrapper'>
                                    <span className='btn-text'>
                                      Update Profile
                                    </span>
                                    <span className='btn-icon'>
                                      <i className='feather-arrow-right'></i>
                                    </span>
                                    <span className='btn-icon'>
                                      <i className='feather-arrow-right'></i>
                                    </span>
                                  </span>
                                )}
                              </button>
                            </div>
                          </form>
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
  );
};

export default MyProfilePictureMain;
