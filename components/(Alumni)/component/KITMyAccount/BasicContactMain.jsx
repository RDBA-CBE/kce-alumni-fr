import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AccountInfo from '../../../../data/myAccount.json';
import MyAccount from '../../../My-Account/MyAccount';
import FormField from '@/commonComponents/FormFields';
import { useParams, useRouter } from 'next/navigation';
import { setDropdownData, useSetState } from '@/utils/commonFunction.utils';
import { message } from 'antd';
import { BloodGroupChooice } from '@/utils/constant.utils';
import Models from '@/imports/models.import';
import axios from 'axios';
import { BaseURL } from '@/utils/BaseUrl';
import Loader from '../../Loader';

const BasicContactMain = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    website: '',
    linked_in: '',
    location: '',
    twitter_handle: '',
    address: '',
    postal_code: '',
  });
  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [skills, setSkills] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const [memberSkills, setMemberSkills] = useState([]);
  const [location, setLocation] = useState([]);
  const [isAlumniContact, setIsAlumniContact] = useState(false);

  const [state, setState] = useSetState({
    currenLocationPage: 1,
    hasLocationLoadMore: null,
    pageLoading: false,
  });

  const {id} = useParams()

  useEffect(() => {
    if (id) {
      getMemberSkills();
    }
  }, [id]);

  useEffect(() => {
    if (isAlumniContact !== null) {
      const AlumniContact = localStorage.getItem('isAlumniContact');
      setIsAlumniContact(AlumniContact);
    }
  }, [isAlumniContact]);

  useEffect(() => {
    GetSkills();
    GetLocation();
  }, []);

  const GetSkills = () => {
    axios
      .get(`${BaseURL}/retrieve_skills/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setSkills(res.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetLocation = async () => {
    try {
      const res = await Models.job.locationList();
      const dropdown = setDropdownData(res?.results, 'location');
      setLocation(dropdown);
      setState({
        hasLocationLoadMore: res?.next,
      });
    } catch (error) {
      console.log('✌️error --->', error);
    }
  };

  const getMemberSkills = () => {
    setState({
      pageLoading: true,
    });
    axios
      .get(`${BaseURL}/retrieve_alumni/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('res :', response);
        setFormData({
          website: response.data.data.website,
          linked_in: response.data.data.linked_in,
          location: {
            value: response.data.data.location_detail.id,
            label: response.data.data.location_detail.location,
          },
          twitter_handle: response.data.data.twitter_handle,
          address: response.data.data.address,
          postal_code: response.data.data.postal_code,
        });
        const AlumniContact = localStorage.setItem(
          'isAlumniContact',
          response.data?.modules?.module4
        );
        setIsAlumniContact(AlumniContact);
        setState({
          pageLoading: false,
        });
      })      
      .catch((err) => {
        console.log(err);
        setState({
          pageLoading: false,
        });
      });
  };

  console.log('formdata', formData);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Set to checked for checkboxes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console?.log('formDdata:', formData);

    // const validationRules = {
    //   website: {
    //     required: true,
    //   },
    //   linked_in: {
    //     required: true,
    //   },
    //   twitter_handle: {
    //     required: true,
    //   },
    // };

    // const isValid = validateForm(formData);
    // if (!isValid) return;
    const body = {
      member: Number(id),
      website: formData.website,
      linked_in: formData.linked_in,
      location: formData.location?.value || null,
      twitter_handle: formData.twitter_handle,
      address: formData.address,
      postal_code: formData.postal_code,
      btnLoading: false,
    };

    if (isAlumniContact === true || isAlumniContact === 'true') {
      try {
        const res = await axios.post(
          `${BaseURL}/update_alumni/${id}/`,
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
        setState({btnLoading:false})

        getMemberSkills();
        // router.push("/profile-photograph");
      } catch (error) {
        console.log('error :', error);
        messageApi.open({
          type: 'error',
          content: error.response?.data.linked_in
            ? error.response?.data.linked_in[0]
            : error.response?.data.website
            ? error.response?.data.website[0]
            : error.response?.data.twitter_handle
            ? error.response?.data.twitter_handle[0]
            : error.response?.data.message,
        });
        setState({btnLoading:false})
      }
    } else {
      try {
        const res = await axios.post(`${BaseURL}/create_alumni/`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        messageApi.open({
          type: 'success',
          content: res.data.message,
        });

        getMemberSkills();
      } catch (error) {
        console.log('error :', error);
        messageApi.open({
          type: 'error',
          content: error.response.data.linked_in
            ? error.response.data.linked_in[0]
            : error.response.data.website
            ? error.response.data.website[0]
            : error.response.data.twitter_handle
            ? error.response.data.twitter_handle[0]
            : error.response.data.message,
        });
      }
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

  console.log('isAlumniContact:', isAlumniContact);
  return state.pageLoading ? (
    <Loader /> // 👈 show loader
  ) : (
    <>
      <div className='my-account-section bg-color-white section-pad'>
        {contextHolder}
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
                      <Link href={`/edit-profile-education/${id}`}>Education</Link>
                      <Link href={`/edit-profile-skills/${id}`}>Skills</Link>

                      <Link href={`/edit-profile-experience/${id}`}>Experience</Link>
                      <Link href={`/edit-profile-contact/${id}`} className="active">Contact</Link>
                      <Link href={`/edit-milestone/${id}`}>Milestone</Link>
                  </div>
                </div>
                <div className='col-lg-9 col-12'>
                  <div className='rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box'>
                    <div className='container'>
                      <div className='row row--15 gy-5'>
                        <div className='section-title'>
                          <h4 className='rbt-title-style-3 mb-0'>
                            Contact
                            <div
                              className='text-gray mt-2'
                              style={{ fontSize: '14px' }}
                            >
                              Please update contact details here
                            </div>
                          </h4>
                        </div>
                        <div className='form-wrapper'>
                          <div className=' contact-form-style-1 max-width-auto py-0 px-3'>
                            <form
                              id='contact-form'
                              className='rainbow-dynamic-form max-width-auto'
                              onSubmit={(e) => handleSubmit(e)}
                            >
                              <div className='form-grid'>
                                {/* Left Column */}
                                <div className=''>
                                  <FormField
                                    type='text'
                                    name='website'
                                    label='Website (URL)'
                                    onChange={handleChange}
                                    value={formData.website}
                                    // error={errMsg?.website}
                                    // required
                                  />
                                  <span className='focus-border'></span>
                                </div>
                                <div className=''>
                                  <FormField
                                    type='text'
                                    name='linked_in'
                                    label='Linked In'
                                    onChange={handleChange}
                                    value={formData.linked_in}
                                    // error={errMsg?.linked_in}
                                    // required
                                  />
                                  <span className='focus-border'></span>
                                </div>
                                <div className=''>
                                  <FormField
                                    type='text'
                                    name='twitter_handle'
                                    label='Twitter Handle'
                                    onChange={handleChange}
                                    value={formData.twitter_handle}
                                    // error={errMsg?.twitter_handle}
                                    // required={true}
                                  />
                                  <span className='focus-border'></span>
                                </div>
                                <div className=''>
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
                                    loadMore={() => locationListLoadMore()}
                                    // error={errMsg?.location}
                                  />
                                  <span className='focus-border'></span>
                                </div>
                                <div className=''>
                                  <FormField
                                    type='textarea'
                                    name='address'
                                    label='Address'
                                    onChange={handleChange}
                                    value={formData.address}
                                    // error={errMsg?.address}
                                  />
                                  <span className='focus-border'></span>
                                </div>

                                <div className=''>
                                  <FormField
                                    type='text'
                                    name='postal_code'
                                    label='Postal Code'
                                    onChange={handleChange}
                                    value={formData.postal_code}
                                    // error={errMsg?.postal_code}
                                  />
                                  <span className='focus-border'></span>
                                </div>

                                {/* Submit */}
                              </div>

                              <div className='form-submit-group'>
                                <button
                                  name='submit'
                                  type='submit'
                                  id='submit'
                                  disabled={state.btnLoading}
                                  className={`rbt-btn btn-md btn-gradient hover-icon-reverse w-100 ${
                                    state.btnLoading ? 'loading' : ""
                                  }`}
                                >
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
    </>
  );
};

export default BasicContactMain;
