"use client";

import Image from "next/image";
import Link from "next/link";
import EventDetails from "../../../../data/KitEvents.json";


const EventList = ({ isPagination, top, start, end }) => {

   let getAllCourse = EventDetails;

  
  return (
    <div className="rbt-course-area rbt-sec-cir-shadow-1 bg-liblue  section-pad home-events">
  
        <div className="container">
          <div className="row mb--50">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h6 className="b2 mb--15">
                  <span className="theme-gradient">EVENTS</span>
                </h6>
                <h2 className="title w-600">
                 Lorem ipsum dolor sit amet  <br />{" "}
                  <span className="theme-gradient"> adipisicing elit</span>
                </h2>
                <p className="mt-4">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin <br /> literature from 45 BC, making it over 2000 years old.</p>
              </div>
            </div>
          </div>

          <div className="row g-5">
            {getAllCourse?.map((data, index) => (
              <div className={`col-lg-4 col-md-6 col-12`} key={index}>
                <div className="rbt-card variation-04 rbt-hover bg-blue">
                  <div className="rbt-card-img">
                   
                      <Image
                        src={data.courseImg}
                        width={355}
                        height={244}
                        alt="Card image"
                        className="rounded-3"
                      />
                      {/* {data.offPrice > 0 ? (
                        <div className="rbt-badge-3 bg-white">
                          <span>-{data.offPrice}%</span>
                          <span>Off</span>
                        </div>
                      ) : (
                        ""
                      )} */}
                   
                  </div>
                  <div className="rbt-card-body">
                    <ul className="rbt-meta">
                      <li className="text-green">
                        <i className="feather-book text-green"></i>
                        {data.lesson} 
                      </li>
                      <li className="text-green">
                        <i className="feather-users text-green"></i>
                        {data.student} 
                      </li>
                    </ul>
                    <h4 className="rbt-card-title ">
                      <Link className="text-white" href={`/course-details/${data.id}`}>
                        {data.courseTitle}
                      </Link>
                    </h4>
                    <p className="rbt-card-text text-white-off">{data.desc}</p>

                    

                    {/* <div className="rbt-card-bottom">
                      

                      <Link
                        className="rbt-btn-link color-primary"
                        href={`/login`}
                      >
                        View Event
                        <i className="feather-arrow-right"></i>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="row mt--55">
            <div className="col-lg-12">
              <div className="load-more-btn text-center">
                <Link
                  className="rbt-btn btn-gradient btn-lg hover-icon-reverse"
                  href="/course-withtab-two"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Load More</span>
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
          </div> */}
        </div>
      </div>
  );
};

export default EventList;
