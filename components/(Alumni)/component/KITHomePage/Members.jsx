import Image from 'next/image';
import Link from 'next/link';

import TeamData from '../../../../data/elements/team.json';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseURL } from '@/utils/BaseUrl';

const Members = () => {
  const router = useRouter();

  const [latestMembers, setLatestMembers] = useState([]);
  const [memData, setMemData] = useState([]);

  useEffect(() => {
    GetAllMembers();
  }, []);

  const GetAllMembers = async () => {
    try {
      const response = await axios.get(`${BaseURL}/latest_members/`);
      let data = [];
      let memData = [];
      if (response.data?.length > 4) {
        data = response.data.slice(0, 10);
        memData = response.data.slice(4, 9);
      } else {
        data = response.data;
      }
      setLatestMembers(data);
      setMemData(memData);
    } catch (error) {
      console.error('Error fetching latest members:', error.message || error);
    }
  };

  console.log('latestMembers', latestMembers);

  return (
    <>
      <div className='container'>
        <div className='row mb--50'>
          <div className='col-lg-12'>
            <div className='section-title text-center'>
              <h6 className='b2 mb--15'>
                <span className='theme-gradient'>LOREM</span>
              </h6>
              <h2 className='title w-600'>Latest Members</h2>
              <p className='mt-4'>
                Equal blame belongs to those who fail in their duty through
                weakness of will, which is the <br /> same as saying through
                shrinking from toil and pain.
              </p>
            </div>
          </div>
        </div>

        <div className='row g-5'>
          {latestMembers &&
            latestMembers.map((data, index) => (
              <div
                className={`${
                  index < 4
                    ? 'col-lg-3 col-md-6 col-sm-6 col-12'
                    : 'col-lg-2 col-md-3 col-sm-4 col-12'
                }`}
                key={index}
              >
                <div className='rbt-team-modal-thumb nav nav-tabs'>
                  <Link
                    className='rbt-team-thumbnail w-100'
                    href='#'
                    data-bs-toggle='modal'
                    data-bs-target={`#exampleModal${index}`}
                  >
                    <div className='thumb'>
                      <img
                        className={`w-100 ${
                          index < 4 ? 'large-img' : 'sm-image'
                        } `}
                        src={
                          data?.profile_picture &&
                          !data.profile_picture.includes('undefined')
                            ? data.profile_picture
                            : '/images/team/3.webp'
                        }
                        width={415}
                        height={555}
                        alt='Testimonial Images'
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {latestMembers?.map((item, index) => (
          <div
            className='rbt-team-modal modal fade rbt-modal-default '
            id={`exampleModal${index}`}
            tabIndex='-1'
            aria-labelledby={`exampleModal${index}`}
            aria-hidden='true'
            key={index}
            style={{background:"transparent"}}
          >
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content p-0'>
                <div className='modal-header'>
                  <button
                    type='button'
                    className='rbt-round-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  >
                    <i className='feather-x'></i>
                  </button>
                </div>

                <div className='modal-body'>
                  <div className='inner'>
                    <div className='row g-5 row--30 align-items-center'>
                      <div className='col-lg-4'>
                        <div className='rbt-team-thumbnail'>
                          <div className='thumb'>
                            <img
                              className='w-100'
                              src={
                                item?.profile_picture &&
                                !item.profile_picture.includes('undefined')
                                  ? item.profile_picture
                                  : '/images/team/3.webp'
                              }
                              width={415}
                              height={555}
                              alt='Member Profile'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-lg-8'>
                        <div className='rbt-team-details'>
                          <div className='author-info'>
                            <h4 className='title'>{item.name || item.email}</h4>
                            <span className='designation theme-gradient'>
                              {item.course}
                            </span>

                            <span className='team-form'>
                              <span className='location'> {item.batch}</span>
                            </span>
                            {/* <span className="team-form">
                              <i className="feather-map-pin"></i>
                              <span className="location">{item.location}</span>
                            </span> */}
                          </div>

                          {/* <p className="mb--15">{item.desc}</p>
                          <p>{item.descTwo}</p> */}

                          {/* <ul className="social-icon social-default mt--20 justify-content-start">
                            <li>
                              <Link href="https://www.facebook.com/">
                                <i className="feather-facebook"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="https://www.twitter.com">
                                <i className="feather-twitter"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="https://www.instagram.com/">
                                <i className="feather-instagram"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="https://www.linkedin.com/">
                                <i className="feather-linkedin"></i>
                              </Link>
                            </li>
                          </ul> */}

                          <ul className='rbt-information-list mt--25'>
                            {item.phone && (
                              <li>
                                <Link href={`tel:${item.phone}`}>
                                  <i className='feather-phone'></i>
                                  {item.phone}
                                </Link>
                              </li>
                            )}
                            {item.email && (
                              <li>
                                <Link href={`mailto:${item.email}`}>
                                  <i className='feather-mail'></i>
                                  {item.email}
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='top-circle-shape'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Members;
