import Image from "next/image";
import Link from "next/link";

import bgImg from "/public/images/bg/bg-image-10.jpg";

const EventBanner = ({ getMatchEvent }) => {
  return (
    <>
     <div className="rbt-page-banner-wrapper event-banner">
              <div className="rbt-banner-image"></div>
              <div className="rbt-banner-content">
                <div className="rbt-banner-content-top">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-10 ">
                        <ul className="page-list">
                          <li className="rbt-breadcrumb-item">
                            <Link href="/">Home</Link>
                          </li>
                          <li>
                            <div className="icon-right">
                              <i className="feather-chevron-right"></i>
                            </div>
                          </li>
                          <li className="rbt-breadcrumb-item active">Event Detail</li>
                        </ul>

                        <div className=" title-wrapper">
                          <h1 className="title mb--0">Event Detail</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  );
};

export default EventBanner;
