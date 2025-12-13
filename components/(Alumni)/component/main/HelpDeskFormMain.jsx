'use client';

import React, { useEffect, useState, useRef } from 'react';
import { DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { message, Select } from 'antd';
import Link from 'next/link';
import { BaseURL } from '@/utils/BaseUrl';
import {
  setDropdownData,
  useSetState,
  validateForm,
} from '@/utils/commonFunction.utils';
import FormField from '@/commonComponents/FormFields';
import { jobTypeOption, YearOfExperience } from '@/utils/constant.utils';
import axios from 'axios';
import Models from '@/imports/models.import';
import Loader from '../../Loader';

const HelpDeskFormMain = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    category: '',
    content: '',
  });

  const [fixedFormData, setFixedFormData] = useState({
    full_name: '',
    email: '',
    contact: '',
  });

  const [errMsg, setErrMsg] = useState({});
  const [memberId, setMemberId] = useState('');
  const [categoryTicket, setCategoryTicket] = useState([]);
  const [token, setToken] = useState('');
  const [state, setState] = useSetState({
    pageLoading: false,
    btnLoading: false,
  });

  useEffect(() => {
    const Token = localStorage.getItem('token');
    setToken(Token);
    if (!Token) {
      router.push('/login');
    }

    const memberId = localStorage.getItem('member_id');
    setMemberId(memberId)

    const Alumni = localStorage.getItem('isAlumni');
    
    console.log('Alumni --->', Alumni);

    if (Alumni !== 'true') {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (token) {
      GetDepartmentList();
      GetHelpDesk();
    }
  }, [token]);

  

  const GetHelpDesk = () => {
    axios
      .get(`${BaseURL}/member_data/${memberId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFixedFormData({
           full_name: `${response?.data?.member_data?.first_name} ${response?.data?.member_data?.last_name}`,
    email: response?.data?.member_data?.email,
    contact: response?.data?.member_data?.mobile_no,
        });
      })
      .catch((error) => {
        console.log('❌error --->', error);
      });
  };
  console.log('fixedFormData', fixedFormData);

  const GetDepartmentList = () => {
    axios
      .get(`${BaseURL}/retrieve_ticket_category/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategoryTicket(response.data?.results);
      })
      .catch((error) => {
        console.log('❌error --->', error);
        if (error?.response?.data?.code === 'token_not_valid') {
          localStorage.removeItem('token');
          router.push('/login');
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      category: { required: true },
      content: { required: true },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);

    if (!isValid) {
      console.log('Validation errors:', errMsg);
      return;
    }

    const Body = {
      category: formData.category,
      content: formData.content,
      priority: 'Low',
    };

    console.log('Body', Body);

    try {
      setState({ btnLoading: true });
      const response = await axios.post(`${BaseURL}/create_ticket/`, Body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      console.log('✌️response --->', response);
      message.success(response.data.message);
      router.push('/help-desk/alumni-tickets');
      setFormData({
        category: '',
        content: '',
      });
      setErrMsg({});
      setState({ btnLoading: false });
    } catch (error) {
      console.log('❌error --->', error);
      message.error(error.response.data.message);
      setState({ btnLoading: false });
    }
  };

  const CategoryOptions = categoryTicket.map((cou) => ({
    value: cou.id,
    label: cou.category,
  }));

  return state.pageLoading ? (
    <Loader /> // 👈 show loader
  ) : (
    <>
      <div className={`rbt-contact-address `}>
        <div className='container section-pad'>
          <div className='row mb-4 justify-content-center'>
            <div className='col-lg-10'>
              <div className='d-flex justify-content-between '>
                <h5>Alumni Help Desk</h5>
                <Link
                  className='rbt-btn btn-gradient radius-round sm-btn'
                  href='/help-desk/alumni-tickets'
                >
                  All Tickets
                </Link>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-lg-10'>
              <div className='form-wrapper'>
                <div className='rbt-contact-form contact-form-style-1 max-width-auto'>
                  <form
                    id='contact-form'
                    method='POST'
                    className='rainbow-dynamic-form max-width-auto'
                    onSubmit={handleSubmit}
                  >
                    <div className='form-grid'>
                      <div className=''>
                        <FormField
                          label='Name'
                          type='text'
                          name='name'
                          value={fixedFormData.full_name}
                          required={true}
                        />
                        <span className='focus-border'></span>
                      </div>

                      {/* Left Column */}

                      <div className=''>
                        <FormField
                          label='Contact Email'
                          type='email'
                          name='email'
                          value={fixedFormData.email}
                          // className="applicant-input"
                          required={true}
                        />
                        <span className='focus-border'></span>
                      </div>

                      <div className=''>
                        <FormField
                          label='Contact Number'
                          type='tel'
                          value={fixedFormData.contact}
                          // className="applicant-input"
                          required={true}
                          // disabled={true}
                        />
                        <span className='focus-border'></span>
                      </div>

                      <div className=''>
                        <FormField
                          label='Category'
                          type='select'
                          name='category'
                          className='form-dd '
                          value={formData.category}
                          onChange={handleChange}
                          error={errMsg.category}
                          // className="applicant-input"
                          options={CategoryOptions}
                          required={true}
                        />
                        <span className='focus-border'></span>
                      </div>
                    </div>

                    <div className=' w-100 mt-4'>
                      <FormField
                        label='Content'
                        type='textarea'
                        name='content'
                        value={formData.content}
                        onChange={handleChange}
                        error={errMsg.content}
                        required={true}
                      />
                      <span className='focus-border'></span>
                    </div>

                    {/* Submit */}
                    <div className='form-submit-group'>
                      <button
                        name='submit'
                        type='submit'
                        id='submit'
                        disabled={state.btnLoading}
                        className={`rbt-btn btn-md btn-gradient hover-icon-reverse w-100  ${state.btnLoading ? 'loading' : ''}`}
                      >
                        <span className='icon-reverse-wrapper'>
                          <span className='btn-text'>Submit</span>
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
    </>
  );
};

export default HelpDeskFormMain;
