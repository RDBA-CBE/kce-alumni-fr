"use client";

import React from "react";
import videoImage1 from "../../../../public/images/new/CollegeBuilding-638_414.png";
import Image from "next/image";

export default function HomeAbout() {
  return (
    <div className="row row--35 align-items-center">
      <div className="col-lg-5 col-12 mt--50 ">
        <div className="video-popup-wrapper version-02">
          <Image
            className="w-100 rbt-radius position-relative"
            src={videoImage1}
            width={732}
            height={571}
            unoptimized={true}
            alt="Video Images"
          />
         
        </div>
      </div>
      <div className="col-lg-7 col-12 mt--50 ">
        <div className="inner">
          <div className="rbt-feature-wrapper">
            <div className="rbt-feature feature-style-2 rbt-radius">
              <div className="number">
                <span>
                  <i className="fas fa-arrow-right"></i>
                </span>
              </div>
              <div className="feature-content">
                <p className="feature-description">
                  Karpagam College of Engineering proudly completes 25 years of
                  Excellence in Education, and to mark this milestone, we are
                  hosting a grand Sangamam Alumni Meet on 20th December 2025.
                </p>
              </div>
            </div>

            <div className="rbt-feature feature-style-2 rbt-radius">
              <div className="number">
                <span>
                  <i className="fas fa-arrow-right"></i>
                </span>
              </div>
              <div className="feature-content">
                <p className="feature-description">
                  This gathering is special because the most important 25
                  batches of KCE alumni are coming together under one roof to
                  relive memories, reconnect with friends, and celebrate the
                  journey that shaped us.
                </p>
              </div>
            </div>

            <div className="rbt-feature feature-style-2 rbt-radius">
              <div className="number">
                <span>
                  <i className="fas fa-arrow-right"></i>
                </span>
              </div>
              <div className="feature-content">
                <p className="feature-description">
                  We warmly invite all our alumni to return to the campus,
                  cherish old moments, and be part of this proud celebration.
                  Let’s unite, celebrate, and make this homecoming
                  unforgettable! All alumni are warmly welcomed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
