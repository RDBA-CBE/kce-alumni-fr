'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../../Loader';
import Pagination from '@/commonComponents/Pagination';

import 'venobox/dist/venobox.min.css';

import GalleryData from '../../../../data/elements/gallery.json';

const GalleryMain = () => {
  const [state, setState] = useState({
    // pageLoading: true, // Start with loading true
  });
  useEffect(() => {
    // setState({ pageLoading: true });
    import('venobox/dist/venobox.min.js').then((venobox) => {
      new venobox.default({
        selector: '.child-gallery-single',
        numeration: true,
        infinigall: true,
        spinner: 'rotating-plane',
      });
      // setState({ pageLoading: false });
    });
  }, []);
  // if (state.pageLoading) {
  //   return <Loader />;
  // }
  return (
    <div className='container'>
      <div className='row g-3 parent-gallery-container KITgallery'>
        {GalleryData &&
          GalleryData.gallery.map((data, index) => (
            <div className='col-lg-2 col-md-4 col-sm-6 col-6' key={index}>
              <div className='instagram-grid'>
                <Link
                  className='child-gallery-single '
                  key={index}
                  href={`${data.img}`}
                  data-gall='gallery01'
                >
                  <div className='rbt-gallery rounded'>
                    <Image
                      className='w-100 rounded'
                      src={data.img}
                      width={253}
                      height={274}
                      alt='Gallery Images'
                    />
                  </div>

                  
                </Link>
              </div>
            </div>
          ))}
      </div>
      {state.GalleryData?.length > 0 && (
        <div className='d-flex justify-content-center mt-4'>
          <Pagination
            activeNumber={handleMPageChange}
            totalPage={state.memoriestotal}
            currentPages={state.memoriescurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryMain;
