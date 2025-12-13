import Link from 'next/link';
import Separator from '../Common/Separator';

const CopyRight = () => {
  return (
    <>
       {/* <Separator /> */}
      <div
        className='copyright-area copyright-style-1 ptb--20'
        style={{backgroundColor:'#192f59'}}
      >
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12'>
              <p className='rbt text-center text-lg-start text-white'>
                Copyright © 2025
                <Link className='mx-2 text-white' href='#'>
                  Karpagam
                </Link>
                All Rights Reserved
              </p>
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12'>
              <ul className='copyright-link rbt-link-hover justify-content-center text-white justify-content-lg-end mt_sm--10 mt_md--10'>
                <li>
                  <Link className='text-white' href='#'>Terms of Service</Link>
                </li>
                <li>
                  <Link  className='text-white' href='#'>Privacy Policy</Link>
                </li>
                <li>
                  <Link  className='text-white' href='#'>Subscription</Link>
                </li>
                <li>
                  <Link  className='text-white' href='/login'>Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopyRight;
