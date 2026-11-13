"use client";

import Image from "next/image";
import Link from "next/link";

const EventDetails =[
  {
    "id": "event-1",
    "courseImg": "/images/event-1.jpeg",
    // "offPrice": 20,
    // "lesson": "2026",
    // "student": "By School of Management Studies",
    // "courseTitle": "SPOTKANIC '26 – Alumni Meet for the Class of 2010",
    // "desc": "Organized by the School of Management Studies to foster professional networking, encourage engaging interactions, and celebrate the achievements and contributions of the 2010 batch alumni while strengthening their bond with the institution.",
    // "link": "https://learn.kce.ac.in/spotkanic-26-alumni-meet-2010-school-of-management/",
    // "review": 45,
    // "price": 199
  },
  {
    "id": "event-3",
    "courseImg": "/images/event-2.jpeg",
    // "offPrice": 10,
    // "lesson": "Recent",
    // "student": "By Alumni Experts",
    // "courseTitle": "Alumni Seminar on \"Java-Driven IoT: Scalable Solutions for Smart Devices\"",
    // "desc": "Conducted as part of technical knowledge-sharing initiatives, featuring alumni experts connecting modern enterprise technology trends—specifically Java and Internet of Things (IoT)—with scalable smart device solutions.",
    // "link": "https://learn.kce.ac.in/alumni-seminar-on-a-path-for-career-opportunity-with-entrepreneurship-development/",
    // "review": 60,
    // "price": 299
  },
 
]


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
                Celebrating Connections, Knowledge and   <br />{" "}
                  <span className="theme-gradient"> Achievements</span>
                </h2>
                <p className="mt-4">Our events bring together alumni, faculty, students, and industry experts to reconnect, share knowledge, and celebrate milestones. From alumni meets and conferences to workshops and cultural gatherings, each event strengthens the KCE community and creates lasting memories.</p>
              </div>
            </div>
          </div>

          <div className="row g-5">
            {getAllCourse?.map((data, index) => (
              <div className={`col-lg-4 col-md-6 col-12`} key={index}>
                <div className="rbt-card variation-04 rbt-hover " style={{backgroundColor:'transparent', padding:0}}>
                  <div className="rbt-card-img">
                   
                      <Image
                        src={data.courseImg}
                        width={355}
                        height={244}
                        alt="Card image"
                        className="rounded-3"
                        style={{width:"100%"}}
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
                  {/* <div className="rbt-card-body">
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
                      <Link className="text-white" href={`#`}>
                        {data.courseTitle}
                      </Link>
                    </h4>
                    <p className="rbt-card-text text-white-off">{data.desc}</p>

                    

                    <div className="rbt-card-bottom">
                      

                      <Link
                        className="rbt-btn-link color-primary"
                        href={`/login`}
                      >
                        View Event
                        <i className="feather-arrow-right"></i>
                      </Link>
                    </div>
                  </div> */}
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
