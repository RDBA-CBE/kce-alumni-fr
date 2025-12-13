import React from "react";
import Card from "@/components/Cards/Card";
import EventDetails from "../../../../data/KitEvents.json";
import Image from "next/image";
import Link from "next/link";

const EventsMain = () => {
  let getAllCourse = EventDetails;
  return (
    <div className="rbt-rbt-card-area  bg-color-white section-pad home-events">
      <div className="container">
        {/* <div className="row ">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h2 className="title w-600">
                Objective of the Alumini Association
              </h2>
            </div>
          </div>
        </div> */}

        <div className="row g-5 ">
          {getAllCourse?.map((data, index) => (
            <div className={`col-lg-4 col-md-6 col-12`} key={index}>
              <div className="rbt-card variation-04 rbt-hover">
                <div className="rbt-card-img">
                  <Link href={`/login`}>
                    <Image
                      src={data.courseImg}
                      width={355}
                      height={244}
                      alt="Card image"
                    />
                    {/* {data.offPrice > 0 ? (
                        <div className="rbt-badge-3 bg-white">
                          <span>-{data.offPrice}%</span>
                          <span>Off</span>
                        </div>
                      ) : (
                        ""
                      )} */}
                  </Link>
                </div>
                <div className="rbt-card-body">
                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book"></i>
                      {data.lesson}
                    </li>
                    <li>
                      <i className="feather-users"></i>
                      {data.student}
                    </li>
                  </ul>
                  <h4 className="rbt-card-title">
                    <Link className="text-white" href={`/login`}>
                      {data.courseTitle}
                    </Link>
                  </h4>
                  <p className="rbt-card-text">{data.desc}</p>

                  <div className="rbt-card-bottom">
                    <Link
                      className="rbt-btn-link text-white"
                      href={`/login`}
                    >
                     View Events
                      <i className="feather-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="row row--15">
                <Card
                  col="col-lg-4 col-md-6 col-sm-6 col-12"
                  mt="mt--30"
                  start={0}
                  end={3}
                  isDesc={true}
                  isUser={true}
                />
              </div> */}
      </div>
    </div>
  );
};

export default EventsMain;
