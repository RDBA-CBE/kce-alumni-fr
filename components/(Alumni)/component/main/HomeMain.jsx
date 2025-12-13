"use client";

import { useEffect, useState } from "react";

import sal from "sal.js";
import Banner from "../KITHomePage/Banner";
import Connect from "../KITHomePage/Connect";
import Link from "next/link";
import SuccessStories from "../KITHomePage/SuccessStories";
import JobList from "../KITHomePage/JobList";
import EventData from "../../../../data/events.json";
import Members from "../KITHomePage/Members";
import Gallery from "../KITHomePage/Gallery";
import CallToActionFour from "../../../Call-To-Action/CallToAction-Four";
import EventList from "../KITHomePage/EventList";
import Loader from "../../Loader";
import AlumniConnect from "../KITHomePage/AlumniConnect";

const HomeMain = ({ blogs }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    });
    setLoading(false);
  }, []);

  // if (loading) {
  //     return <Loader />; // Show loader while checking token
  //   }

  return (
    <>
      {/* ----------banner start----------- */}

      <div className="rbt-slider-main-wrapper position-relative home">
        <Banner />
      </div>

      {/* ----------banner end----------- */}

      {/* ----------Connect start----------- */}

      <div className="rbt-category-area bg-color-white rbt-section-gapTop home-connect success-story">
        <div className="container">
          <div className="row g-5">
            <Connect />
          </div>
        </div>
        <div className="p-0 mt--60" style={{borderRadius:"none"}}>
          <AlumniConnect />
        </div>
      </div>

      {/* ----------Connect end----------- */}

      {/* ----------testimonial start----------- */}

      <div className="rbt-testimonial-area bg-color-white rbt-section-gapBottom overflow-hidden section-pad success-story">
        <div className="container-fluid">
          <div className="row g-5 align-items-center">
            <div className="col-xl-3">
              <div className="section-title pl--100 pl_md--30 pl_sm--0">
                {/* <span className="subtitle bg-pink-opacity">
                  Success Stories
                </span> */}
                <h6 className="b2 mb--15">
                  <span className="theme-gradient">SUCCESS STORIES</span>
                </h6>
                <h2 className="title">What Our Alumini's Say</h2>
                <p className="description mt--20">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <div className="call-to-btn  mt-0">
                  <Link
                    className="rbt-btn btn-gradient hover-icon-reverse radius-round d-flex align-items-center"
                    href="/about"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text"> More About University</span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <SuccessStories />
          </div>
        </div>
      </div>

      {/* ----------testimonial end----------- */}

      {/* ----------Event List start---------------- */}

      <EventList isPagination={false} top={false} start={0} end={3} />

      {/* ----------Event List end----------- */}

      {/* ----------Job list start----------- */}
      <div className="section-pad">
        <div className="container">
          <div className="row mb--50">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h6 className="b2 mb--15">
                  <span className="theme-gradient">LOREM</span>
                </h6>
                <h2 className="title w-600">Latest Jobs</h2>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor <br /> incididunt ut labore et dolore magna
                  aliqua.
                </p>
              </div>
            </div>
          </div>

          <JobList
            isPagination={true}
            parentClass="card-list-2 event-list-card"
            childClass="col-lg-6 col-md-6 col-12"
            getEvents={EventData}
          />
        </div>
      </div>

      {/* ----------Job list end----------- */}

      {/* ----------Team start----------- */}
      <div className="rbt-team-area bg-color-extra2 section-pad">
        <Members />
      </div>

      {/* ----------Team end----------- */}

      {/* ----------gallary---------- */}

      <Gallery />

      {/*--------------------gallary------------------- */}

      {/* -----------------CTA -------------------------*/}

      <div className="rbt-callto-action-area rbt-section-gapTop">
        <div
          className="rbt-callto-action rbt-cta-default style-4 mt--75"
          style={{ backgroundImage: "url('/images/shape/Untitled-1.jpg')" }}
        >
          <CallToActionFour btnClass="rbt-btn btn-gradient hover-icon-reverse radius-round" />
        </div>
      </div>
    </>
  );
};

export default HomeMain;
