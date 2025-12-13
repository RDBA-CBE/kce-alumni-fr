import Link from "next/link";
import React from "react";

const KITBanner = ({ text, col, blogdata }) => {
  return (
    <>
      <div className="rbt-page-banner-wrapper memo-det">
        <div className="rbt-banner-image"></div>
        <div className="rbt-banner-content">
          <div className="rbt-banner-content-top">
            <div className="container">
              <div className="row">
                <div className={col}>
                  <ul className="page-list">
                    <li className="rbt-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <div className="icon-right">
                        <i className="feather-chevron-right"></i>
                      </div>
                    </li>
                    <li className="rbt-breadcrumb-item active">{text}</li>
                  </ul>

                  <div className=" title-wrapper">
                    <h1 className="title mb--0">{text}</h1>
                    
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

export default KITBanner;
