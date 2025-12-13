import { BaseURL } from '@/utils/BaseUrl';
import { message, Modal } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSetState } from '@/utils/commonFunction.utils';
import Loader from '../../Loader';

const AlumniTicketsTable = () => {
  const { confirm } = Modal;
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: '',
    description: '',
    // end_year: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [departmentDatas, setDepartmentDatas] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [state, setState] = useSetState({ pageLoading: false });

  useEffect(() => {
    const Token = localStorage.getItem('token');
    setToken(Token);
    if (!Token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (token) {
      GetRole();
    }
  }, [token]);

  const GetRole = () => {
    setState({ pageLoading: true });
     
    axios
      .get(`${BaseURL}/my_ticket/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('✌️response --->', response);
        setDepartmentDatas(response.data?.results);
        setState({ pageLoading: false });
         
      })
      .catch((error) => {
        console.log('error --->', error);
        if (error?.response?.data?.code === 'token_not_valid') {
          localStorage.removeItem('token');
          router.push('/login');
        }
        setState({ pageLoading: false });
        
      });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  // table pagination
  // Calculate the number of pages
  const totalPages = Math.ceil(departmentDatas.length / itemsPerPage);

  // Slice the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = departmentDatas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (state.pageLoading) {
    return <Loader />; // Show loader while checking token
  }
  return (
    <div className='container'>
      {contextHolder}

      <div className='row mb-4 justify-content-center'>
        <div className='col-lg-12'>
          <div className='d-flex justify-content-between '>
            <h5>All Tickets</h5>
            <Link
              className='rbt-btn btn-gradient radius-round sm-btn'
              href='/help-desk'
            >
              Create
            </Link>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='rbt-dashboard-table table-responsive mobile-table-750 mt--30'>
          {departmentDatas?.length === 0 ? (
            // --- EMPTY STATE ---
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  width: '400px',
                  fontSize: '16px',
                }}
              >
                <h6 style={{ marginBottom: '10px' }}>No Tickets Found</h6>
              </div>
            </div>
          ) : (
            // --- TABLE DATA ---
            <>
              <table className='rbt-table table table-borderless'>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item.id}>
                      <th>
                        <p className='b3'>{item.category}</p>
                      </th>
                      <td>
                        <p className='b3'>{item.priority}</p>
                      </td>
                      <td>
                        <p className='b3'>{item.status}</p>
                      </td>
                      <td>
                        <div className='rbt-button-group justify-content-end'>
                          {/* Assign Faculty */}
                          <div
                            className='rbt-btn btn-xs bg-primary-opacity radius-round color-danger '
                            // href={`/help-desk/ticket-detail/${item.ticket_id}`}
                            onClick={() =>
                              router.push(
                                `/help-desk/alumni-tickets/${item.id}`
                              )
                            }
                            title='View'
                          >
                            <i className='feather-eye' />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* --- PAGINATION --- */}
              {/* {departmentDatas?.length > 0 && (
                  <div className="row">
                    <div className="col-lg-12 mt-0">
                      <Pagination
                        activeNumber={handlePageChange}
                        totalPage={state.total}
                        currentPages={state.currentPage}
                      />
                    </div>
                  </div>
                )} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniTicketsTable;
