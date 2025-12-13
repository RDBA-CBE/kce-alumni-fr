import Image from 'next/image';
import React from 'react';

import videoImage from '../../../../public/images/others/health-b-01.png';
import videoImage2 from '../../../../public/images/others/faq-01.png';
import videoImage1 from '../../../../public/images/others/kids-video-01.jpg';

const AboutMain = () => {
  return (
    <div className='rbt-video-area bg-color-white section-pad overflow-hidden'>
      <div className='container'>
        <div className='row '>
          <div className='col-lg-12'>
            <div className='section-title text-center'>
              <h2 className='title w-600'>
                Objective of the Alumini Association
              </h2>
            </div>
          </div>
        </div>
        <div className='row row--35 align-items-center '>
          <div className='col-lg-7 col-12 mt--50'>
            <div className='inner'>
              <div className='rbt-feature-wrapper'>
                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    {/* <h6 className="feature-title">Make a Decision</h6> */}
                    <p className='feature-description'>
                      To bring the old students of the KARPAGAM INSTITUTE OF
                      TECHNOLOGY under one forum for exchanging of their
                      experience, dissemination of knowledge and talents amongst
                      its members and also for the furtherance of fellowship,
                      advancement of scientific knowledge in general of the
                      members of the Association and Society.
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To conduct seminars, conferences, workshops, endowment
                      lectures and other academic activities and also to keep in
                      touch with one another of the college staff, non-teaching
                      staff and students.
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To create and establish Alumni endowments for granting
                      scholarships, prizes and medals to the students showing
                      high proficiency in their studies and to honour the former
                      students of the institution.
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To advise and interact with the Academic Council,
                      Management and Associations of other academic institutions
                      on matters relating to the promotion of higher education,
                      training and management systems and thereby promote the
                      welfare and status of the Institution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-12 mt--50'>
            <div className='video-popup-wrapper version-02'>
              <Image
                className='w-100 rbt-radius position-relative'
                src={videoImage}
                width={732}
                height={571}
                unoptimized={true}
                alt='Video Images'
              />
              {/* <a
                    className="rbt-btn btn-white rounded-player-2 popup-video position-to-top bounced-btn"
                    data-vbtype="video"
                    controls
                    href="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
                  >
                    <span className="play-icon"></span>
                  </a> */}
            </div>
          </div>
        </div>

        <div className='row row--35 align-items-center '>
          <div className='col-lg-5 col-12 mt--50 order-lg-0 order-1'>
            <div className='video-popup-wrapper version-02'>
              <Image
                className='w-100 rbt-radius position-relative'
                src={videoImage2}
                width={732}
                height={571}
                unoptimized={true}
                alt='Video Images'
              />
              {/* <a
                    className="rbt-btn btn-white rounded-player-2 popup-video position-to-top bounced-btn"
                    data-vbtype="video"
                    controls
                    href="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
                  >
                    <span className="play-icon"></span>
                  </a> */}
            </div>
          </div>

          <div className='col-lg-7 col-12 mt--50 order-lg-0 order-0'>
            <div className='inner'>
              <div className='rbt-feature-wrapper'>
                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To collect funds by means of subscriptions, contributions,
                      donations and gifts from the members, philanthropists for
                      the furtherance of the above objectives.
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To render financial aid to deserving students studying at
                      the Institution and to deserving alumni on compassionate
                      grounds
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To create an Alumni Research Fund for funding research
                      projects. ​
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To bring out magazines, souvenirs and newsletters
                      highlighting the activities and achievements of the
                      department and its alumni.
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To organize cultural and educational programme and to
                      organize the Alumni Day celebration. ​
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row row--35 align-items-center'>
          <div className='col-lg-7 col-12 mt--50 '>
            <div className='inner'>
              <div className='rbt-feature-wrapper'>
                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To help the Alumni to get advice from the Department on
                      various technical problems regarding various job
                      opportunities that they may come across in their work and
                      real life and information.
                    </p>
                  </div>
                </div>

                <div className='rbt-feature feature-style-2 rbt-radius'>
                  <div className='number'>
                    <span>
                      <i className='fas fa-arrow-right'></i>
                    </span>
                  </div>
                  <div className='feature-content'>
                    <p className='feature-description'>
                      To carry out such other activities as may be necessary for
                      furthering the above objects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-12 mt--50 '>
            <div className='video-popup-wrapper version-02'>
              <Image
                className='w-100 rbt-radius position-relative'
                src={videoImage1}
                width={732}
                height={571}
                unoptimized={true}
                alt='Video Images'
              />
              {/* <a
                    className="rbt-btn btn-white rounded-player-2 popup-video position-to-top bounced-btn"
                    data-vbtype="video"
                    controls
                    href="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
                  >
                    <span className="play-icon"></span>
                  </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMain;
