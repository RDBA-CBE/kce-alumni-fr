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
