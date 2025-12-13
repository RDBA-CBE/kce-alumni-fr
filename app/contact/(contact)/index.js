'use client';

import { Provider } from 'react-redux';
import Store from '@/redux/store';
import Context from '@/context/Context';

import MobileMenu from '@/components/Header/MobileMenu';
import Cart from '@/components/Header/Offcanvas/Cart';
import FooterOne from '@/components/Footer/Footer-One';
import KITHeader from '@/components/Header/KITHeader';
import BreadCrumb from '@/components/Common/BreadCrumb';
import KITContact from '@/components/(Alumni)/component/KITContact/KITContact';
import KITContactForm from '@/components/(Alumni)/component/KITContact/KITContact-Form';
import KITFooter from '@/components/Footer/KITFooter';

const Contact = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky='rbt-sticky' headerType='' />

          {/* <BreadCrumb title="Members" text="Members" /> */}

          <div className='rbt-conatct-area bg-gradient-11 section-pad'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='section-title text-center mb--60'>
                    {/* <span className="subtitle bg-secondary-opacity">
                      Contact Us
                    </span> */}
                    <h6 className='b2 mb--15'>
                      <span className='text-white'>Contact Us</span>
                    </h6>
                    <h2 className='title text-white'>
                      Lorem ipsum dolor sit <br /> adipiscing elit
                    </h2>
                  </div>
                </div>
              </div>
              <KITContact />
            </div>
          </div>

          <KITContactForm />

          <div className='rbt-google-map bg-color-white rbt-section-gapTop'>
            <iframe
              className='w-100'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.7279769191578!2d76.97599437502748!3d10.908265956748066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85ae942396eef%3A0xf18c9eb8f29896d8!2sKarpagam%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1757142361408!5m2!1sen!2sin'
              height='600'
              style={{ border: '0' }}
            ></iframe>
            
          </div>

          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default Contact;
