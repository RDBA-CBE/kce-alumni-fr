import React from 'react';
import EventDetails from '../../../../data/KitEvents.json';
import Image from 'next/image';
import Link from 'next/link';


const NewsRoomMain = ({ selectedYear }) => {
  let filteredNews =
    selectedYear === 'all'
      ? EventDetails
      : EventDetails.filter((event) => {
          const year = event.lesson.split(', ').pop();
          return String(year) === String(selectedYear);
        });

  return (
    <div className='rbt-rbt-card-area bg-color-white'>
      <div className=' mt-5 mb-5'>
  <div className='alumni-achievement-card'>

    {/* Main Banner Image */}
    <div className='alumni-main-banner'>
      <Image
        src='/images/alumni-specials/alumni-ach-1.jfif'
        alt='R. Praveen Kumar - Governance Icon'
        fill
        priority
        sizes='100vw'
        style={{ objectFit: 'contain' }}
      />
    </div>

    {/* Supporting Images */}
    <div className='alumni-gallery'>
     
        <div  className='alumni-gallery-item'>
          <Image
            src={`/images/alumni-specials/alumni-ach-2.jpeg`}
            alt='R. Praveen Kumar'
            fill
            // sizes='(max-width: 576px) 50vw, 25vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div  className='alumni-gallery-item'>
          <Image
            src={`/images/alumni-specials/alumni-ach-3.jpeg`}
            alt='R. Praveen Kumar'
            fill
            // sizes='(max-width: 576px) 50vw, 25vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div  className='alumni-gallery-item'>
          <Image
            src={`/images/alumni-specials/alumni-ach-4.webp`}
            alt='R. Praveen Kumar'
            fill
            // sizes='(max-width: 576px) 50vw, 25vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
        {/* <div  className='alumni-gallery-item'>
          <Image
            src={`/images/alumini/12.jpeg`}
            alt='R. Praveen Kumar'
            fill
            sizes='(max-width: 576px) 50vw, 25vw'
            style={{ objectFit: 'cover' }}
          />
        </div> */}
    </div>

    {/* Info Row */}
    <div
      style={{
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection:"column",
          // alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <span
        
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(226,45,45,0.08)',
            color: '#e22d2d',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: 600,
            width:"fit-content"
          }}
        >
          <i className='feather-shield'></i> Governance Icon
        </span>

        <div>
          <h5 style={{ fontWeight: 600, marginBottom: '8px' }}>
            R. Praveen Kumar
          </h5>
          <p style={{ color: '#777', fontSize: '13px', marginBottom: 0 }}>
            Mechanical Engineering &nbsp;|&nbsp; BATCH 2010–2014
          </p>
        </div>
      </div>

      <div
      className='align-items-md-end'
        style={{
          display: 'flex',
          // alignItems: 'end',
          flexDirection:"column",
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >
        <h5
          style={{
            fontWeight: 600,
            color: '#222',
            marginBottom: 0,
            // fontSize: '18px'
          }}
        >
          <i
            className='feather-briefcase'
            style={{ marginRight: '6px', color: '#e22d2d' }}
          ></i>
          Deputy Superintendent of Police
        </h5>

        <p style={{ color: '#666', marginBottom: 0, fontSize: '14px', fontWeight:600 }}>
          <i
            className='feather-map-pin'
            style={{ marginRight: '6px', color: '#e22d2d' }}
          ></i>
          Ramanathapuram
        </p>
      </div>
    </div>

  </div>
</div>



      <div className='container'>
        <div className='row g-5'>
          {filteredNews.length > 0 ? (
            filteredNews.map((data, index) => (
              <div className='col-12 ' key={index}>
                <div className='rbt-card variation-04 rbt-hover newsroom-card'>
                  <div className='rbt-card-img d-none d-md-block'>
                    <Image
                      src={data.courseImg}
                      width={355}
                      height={244}
                      alt='Card image'
                      className='h-100'
                    />
                  </div>
                  <div
                    className='rbt-card-body'
                    style={{ paddingTop: '0px', width: '100%' }}
                  >
                    <ul className='rbt-meta'>
                      <li>
                        <i className='feather-book'></i>
                        {data.lesson}
                      </li>
                      <li>
                        <i className='feather-users'></i>
                        {data.student}
                      </li>
                    </ul>
                    <h4 className='rbt-card-title'>{data.courseTitle}</h4>
                    <p
                      className='rbt-card-text text-dark'
                      style={{ width: '100%' }}
                    >
                      {data.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className='col-12 d-flex justify-content-center align-items-center'
              style={{ minHeight: '400px' }} // adjust height as per your section
            >
              <p className='text-center'>No news found for {selectedYear}</p>
            </div>
          )}
        </div>
      </div>
      


    </div>
  );
};

export default NewsRoomMain;
