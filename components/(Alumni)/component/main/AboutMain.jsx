import Image from 'next/image';
import React from 'react';

import videoImage from '../../../../public/images/others/health-b-01.png';
import videoImage2 from '../../../../public/images/others/faq-01.png';
import videoImage1 from '../../../../public/images/others/kids-video-01.jpg';
import HomeAbout from '../KITHomePage/about';

const officeBearers = [
  {
    role: 'President',
    name: 'R. NAVINPRABHU',
    qualification: 'MECH (BATCH: 2001-05)',
    designation: 'FRANCHISE OWNER OF UNACADEMY & UPGRAD',
    industry:" ICUBE ACADEMICS PVT LTD",
    image:"/images/alumnimem/abt-img-1.png"
  },
 
  {
    role: 'Joint Secretary',
    name: 'D. SARATHKUMAR',
    qualification: 'CIVIL (BATCH: 2011-15)',
    designation: ' CIVIL AND STRUCTURAL ENGINEER',
    industry:"JAS ASSOCIATES",
    image:"/images/alumnimem/abt-img-2.png"
  },
 
  {
    role: 'Secretary',
    name: 'JAYAKUMAR NAGOORLINGAM',
    qualification: 'CSE (BATCH: 2001-2005)',
    designation: ' FOUNDER & CEO',
    industry:"QUZERA WEB TECHNOLOGIES PVT LTD",
    image:"/images/alumnimem/abt-img-3.png"
  },
];

const AboutMain = () => {
  return (
    <div className='rbt-video-area bg-color-white  overflow-hidden pt-5' style={{paddingBottom:0, }}>
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
               <HomeAbout />

        {/* <div className='row row--35 align-items-center '>
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
                    <p className='feature-description'>
                      To bring the old students of the KARPAGAM COLLEGE OF
                      ENGINEERING under one forum for exchanging of their
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
             
            </div>
          </div>
        </div> */}
      </div>
      {/* ── Alumni Association Office Bearers ─────────────────────────── */}
      <section className='section-pad mt-5' style={{ background: '#192f59', position: 'relative', overflow: 'hidden' }}>

        {/* decorative circles */}
        <div style={{ position:'absolute', top:-120, right:-120, width:460, height:460, borderRadius:'50%', background:'rgba(0,145,255,0.07)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-100, left:-100, width:360, height:360, borderRadius:'50%', background:'rgba(0,145,255,0.05)', pointerEvents:'none' }} />

        <div className='container' style={{ position:'relative', zIndex:1 }}>

          {/* heading */}
          <div className='row justify-content-center mb--50'>
            <div className='col-lg-7 text-center'>
              <h6 className='b2 mb--10' style={{ color:'#cc7539', textTransform:'uppercase', letterSpacing:3 }}>
                Leadership
              </h6>
              <h2 className='title w-600' style={{ color:'#fff' }}>Alumni Association Office Bearers</h2>
              <p className='b2 mt--10' style={{ color:'rgba(255,255,255,0.65)' }}>
                Meet the dedicated leaders driving the KCE Alumni Association forward
              </p>
            </div>
          </div>

          {/* cards */}
          <div className='row g-5 justify-content-center'>
            {officeBearers.map((person, idx) => (
              <div className='col-lg-4 col-md-6 col-12' key={person.role}>
                <div
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'transform .25s, background .25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.background = 'rgba(0,145,255,0.13)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                >
                  {/* ── large image ── */}
                  <div style={{ position: 'relative', width: '100%', height: 380, overflow: 'hidden' }}>
                    <Image
                      src={person.image}
                      fill
                      alt={person.name}
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      unoptimized
                    />
                  </div>

                  {/* ── role highlight bar ── */}
                  <div style={{
                    background: 'linear-gradient(90deg, #cc7539 0%, #d76239 100%)',
                    padding: '14px 24px',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <i className='feather-award' style={{ fontSize: 18, color: '#fff', flexShrink: 0 }} />
                    <h5 style={{
                      margin: 0, color: '#fff', fontWeight: 800,
                      fontSize: 18, letterSpacing: 1, textTransform: 'uppercase',
                    }}>
                      {person.role}
                    </h5>
                  </div>

                  {/* ── text body ── */}
                  <div style={{ padding: '20px 24px 26px' }}>
                    {/* name */}
                    <h4 style={{ color: '#fff', fontWeight: 800, fontSize: 20, marginBottom: 6, lineHeight: 1.3 }}>
                      {person.name}
                    </h4>

                    {/* qualification */}
                    <p style={{ color: '#0091ff', fontWeight: 600, fontSize: 14, marginBottom: 16 }}>
                      <i className='feather-book-open' style={{ marginRight: 6, fontSize: 13 }} />
                      {person.qualification}
                    </p>

                    {/* divider */}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />

                    {/* designation */}
                    <div className='d-flex align-items-start gap-2 mb--10'>
                      <i className='feather-briefcase' style={{ fontSize: 14, color: '#cc7539', flexShrink: 0, marginTop: 3 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.5 }}>
                        {person.designation}
                      </span>
                    </div>

                    {/* industry */}
                    <div className='d-flex align-items-start gap-2'>
                      <i className='feather-building' style={{ fontSize: 14, color: '#cc7539', flexShrink: 0, marginTop: 3 }} />
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.5 }}>
                        {person.industry}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutMain;
