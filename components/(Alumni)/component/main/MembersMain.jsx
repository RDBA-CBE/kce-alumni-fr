import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TeamData } from "@/utils/constant.utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";


const MembersMain = () => {

   const router = useRouter();
  const [latestMembers, setLatestMembers] = useState([]);
  useEffect(() => {
    GetAllMembers();
  }, []);

  const GetAllMembers = () => {
    axios
      .get(`${BaseURL}/latest_members/`)
      .then((response) => {
        console.log("response:", response.data);
        setLatestMembers(response.data.slice(0,8));
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  console.log("latestMembers:", latestMembers);

  const FinalLatestMembers = latestMembers?.slice(0, 8);
  console.log("✌️FinalLatestMembers --->", FinalLatestMembers);

  return (
    <div className="rbt-video-area bg-color-white section-pad overflow-hidden home-mem">
      <div className="container">
        {/* <div className="row ">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h2 className="title w-600">
                Lorem ipsum dolor sit amet 
              </h2>
            </div>
          </div>
        </div> */}
        <div className="row row--15 ">
          {latestMembers &&
            latestMembers.map((item, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-12 p-15"
                key={index} 
              >
                {/* {latestMembers.map((item, innerIndex) => ( */}
                  <div className="team" >
                    <Link
                    className="rbt-team-thumbnail w-100"
                    href={`/login`}
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${index}`}
                  >
                    <div className="thumbnail" >
                      <img
                      
                        src={item?.profile_picture &&
                                !item.profile_picture.includes("undefined")
                                  ? item.profile_picture
                                  : "/images/dummy-profile-pic.png"}
                        width={415}
                        height={555}
                        priority
                        alt="Blog Images"
                      />
                    </div>
                  </Link>
                    
                    <div className="content">
                    <Link href={`/login`}>  <h4 className="title">{item.name ? item.name : item.email}</h4> </Link>
                      <p className="designation">{item.course}</p>
                    </div>
                    {/* <ul className="social-icon">
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
                    </ul> */}
                  </div>
                {/* ))} */}
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
  );
};

export default MembersMain;
