import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { TeamData } from "@/utils/constant.utils";

const MembersLoginCard = () => {
  return (
     <div className="rbt-video-area bg-color-white overflow-hidden">
      <div className="container">
        <div className="row row--15 gy-5">
          {TeamData &&
            TeamData.map((data, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-12 "
                key={index}
              >
                {data.details.map((item, innerIndex) => (
                  <div className="team" key={innerIndex}>
                    <Link
                    className="rbt-team-thumbnail w-100"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}
                  >
                    <div className="thumbnail">
                      <Image
                        src={item.img}
                        width={415}
                        height={555}
                        
                        alt="Blog Images"
                      />
                    </div>
                  </Link>
                    
                    <div className="content">
                      <h4 className="title">{item.name}</h4>
                      <p className="designation">{item.type}</p>
                    </div>
                    <ul className="social-icon">
                      <li>
                        <Link href="#">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            ))}
        </div>

        {TeamData.map((data, index) => (
          <div
            className="rbt-team-modal modal fade rbt-modal-default"
            id={`exampleModal${index}`}
            tabIndex="-1"
            aria-labelledby={`exampleModal${index}`}
            aria-hidden="true"
            key={index}
          >
            {data.details.map((item, innerIndex) => (
              <div
                className="modal-dialog modal-dialog-centered"
                key={innerIndex}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="rbt-round-btn"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="feather-x"></i>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="inner">
                      <div className="row g-5 row--30 align-items-center">
                        <div className="col-lg-4">
                          <div className="rbt-team-thumbnail">
                            <div className="thumb">
                              <Image
                                className="w-100"
                                src={item.img}
                                width={415}
                                height={555}
                          alt="Testimonial Images"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="rbt-team-details">
                            <div className="author-info">
                              <h4 className="title">{item.name}</h4>
                              <span className="designation theme-gradient">
                                {item.type}
                              </span>
                              <span className="team-form">
                                <i className="feather-map-pin"></i>
                                <span className="location">
                                  {item.location}
                                </span>
                              </span>
                            </div>
                            <p className="mb--15">{item.desc}</p>

                            <p>{item.descTwo}</p>
                            <ul className="social-icon social-default mt--20 justify-content-start">
                              <li>
                                <Link href="https://www.facebook.com/">
                                  <i className="feather-facebook"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="https://www.twitter.com">
                                  <i className="feather-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="https://www.instagram.com/">
                                  <i className="feather-instagram"></i>
                                </Link>
                              </li>
                              <li>
                                <Link href="https://www.linkdin.com/">
                                  <i className="feather-linkedin"></i>
                                </Link>
                              </li>
                            </ul>
                            <ul className="rbt-information-list mt--25">
                              <li>
                                <Link href="#">
                                  <i className="feather-phone"></i>
                                  {item.phone}
                                </Link>
                              </li>
                              <li>
                                <Link href="mailto:hello@example.com">
                                  <i className="feather-mail"></i>
                                  {item.email}
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="top-circle-shape"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MembersLoginCard