"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import "venobox/dist/venobox.min.css";

import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "@/context/Context";
import { addToCartAction } from "@/redux/action/CartAction";

const EventSidebar = ({ getEventData }) => {
  const { toggle, setToggle, cartToggle, setCart } = useAppContext();
  const [hideOnScroll, setHideOnScroll] = useState(false);


  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const [amount, setAmount] = useState(1);

  const addToCartFun = (id, amount, product) => {
    dispatch(addToCartAction(id, amount, product));
    setCart(!cartToggle);
  };

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });
    localStorage.setItem("hiStudy", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    import("venobox/dist/venobox.min.js").then((venobox) => {
      new venobox.default({
        selector: ".popup-video",
      });
    });

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHide = currentScrollPos > 250;

      setHideOnScroll(isHide);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="inner">
        <div
          className={`video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15 ${
            hideOnScroll ? "d-none" : ""
          }`}
        >
          <div className="video-content">
            {/* {getEventData.eventImg && (
              <Image
                className="w-100 rbt-radius"
                src={getEventData.eventImg}
                width={355}
                height={255}
                alt="Video Images"
              />
            )} */}
          </div>
        </div>

        <div className="content ">
          <div >
            <div className="add-to-card-button mb--15">
              <Link
                className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
                href="#"
                onClick={() =>
                  addToCartFun(getEventData.id, amount, getEventData)
                }
              >
                <span className="btn-text">Apply Now</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right"></i>
                </span>
              </Link>
            </div>

            <div className="add-to-card-button mb--15">
              <Link
                className="rbt-btn btn-border  icon-hover w-100 d-block text-center"
                href="#"
                onClick={() =>
                  addToCartFun(getEventData.id, amount, getEventData)
                }
              >
                <span className="btn-text">Add to Calendar</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right"></i>
                </span>
              </Link>
            </div>
            <div className="event-actions mb--15">
              {/* <Link
                className="rbt-btn btn-gradient icon-hover event-btn"
                href="#"
                onClick={() =>
                  addToCartFun(getEventData.id, amount, getEventData)
                }
              >
                <span className="btn-text">Apply Now</span>
                <span className="btn-icon">
                  <i className="feather-arrow-right"></i>
                </span>
              </Link> */}

               <Link
                className="rbt-btn btn-gradient icon-hover event-btn"
                href="#"
              >
                <span className="btn-text">Email Attendees</span>
                <span className="btn-icon">
                  <i className="feather-mail"></i>
                </span>
              </Link>

              <Link
                className="rbt-btn btn-border icon-hover event-btn"
                href="#"
              >
                <span className="btn-text">Edit Event</span>
                <span className="btn-icon">
                  <i className="feather-edit"></i>
                </span>
              </Link>

             

              <Link
                className="rbt-btn btn-border icon-hover event-btn"
                href="#"
              >
                <span className="btn-text">Export Attendees</span>
                <span className="btn-icon">
                  <i className="feather-download"></i>
                </span>
              </Link>

              <Link
                className="rbt-btn btn-gradient icon-hover event-btn"
                href="#"
              >
                <span className="btn-text">Publish & Share</span>
                <span className="btn-icon">
                  <i className="feather-share-2"></i>
                </span>
              </Link>
            </div>
          </div>

          <div
            className={`rbt-widget-details has-show-more ${
              !toggle ? "active" : ""
            }`}
          >
            <ul className="has-show-more-inner-content rbt-course-details-list-wrapper">
              {/* {getEventData.roadmap.map((item, innerIndex) => (
                <li key={innerIndex}>
                  <span>{item.text}</span>
                  <span className="rbt-feature-value rbt-badge-5">
                    {item.desc}
                  </span>
                </li>
              ))} */}

              <li>
                <span>Start date</span>
                <span className="rbt-feature-value rbt-badge-5">20 sept</span>
              </li>

              <li>
                <span>Start Time</span>
                <span className="rbt-feature-value rbt-badge-5">20 sept</span>
              </li>
              <li>
                <span>Registration Close Date</span>
                <span className="rbt-feature-value rbt-badge-5">20 sept</span>
              </li>

              <li>
                <span>End Date</span>
                <span className="rbt-feature-value rbt-badge-5">20 sept</span>
              </li>

              <li>
                <span>Catergory</span>
                <span className="rbt-feature-value rbt-badge-5">20 sept</span>
              </li>

              <li>
                <span>Venue</span>
                <span className="rbt-feature-value rbt-badge-5">20 sept</span>
              </li>
            </ul>
            <div
              className={`rbt-show-more-btn ${!toggle ? "active" : ""}`}
              onClick={() => setToggle(!toggle)}
            >
              Show More
            </div>
          </div>

          <div className="social-share-wrapper mt--30 text-center">
            <div className="rbt-post-share d-flex align-items-center justify-content-center">
              <ul className="social-icon social-default transparent-with-border justify-content-center">
                <li>
                  <Link href="https://www.facebook.com/" title="View In Map">
                    <i className="feather-map-pin"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.twitter.com" title="Add to Calendar">
                    <i className="feather-calendar"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/" title="View Link">
                    <i className="feather-link"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="mt--20" />
            <div className="contact-with-us text-center">
              <p>For details about the course</p>
              {/* <p className="rbt-badge-2 mt--10 justify-content-center w-100">
                <i className="feather-phone mr--5"></i> Call Us:
                <Link href="#">
                  <strong>+444 555 666 777</strong>
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventSidebar;
