"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Pagination from "../../../Common/Pagination";
import { useRouter } from "next/navigation";
import Models from "@/imports/models.import";
import { formattedDate } from "@/utils/commonFunction.utils";

const JobList = ({
  getEvents,
  parentClass,
  childClass,
  isPagination,
  start,
  end,
}) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
   const router = useRouter();
  const [latestJobs, setLatestJobs] = useState([]);
    const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);

  const startIndex = (page - 1) * 6;

  const getSelectedEvent = events.slice(startIndex, startIndex + 6);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setEvents(getEvents.events);
    setTotalPages(Math.ceil(getEvents.events.length / 6));
  }, [setTotalPages, setEvents]);



  useEffect(() => {
    const Token = localStorage.getItem("token");

    setToken(Token);
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Models.job.latestJobList();
      console.log("✌️res --->", res);
      setLatestJobs(res?.results);
      const token = localStorage.getItem("token");
      setToken(token);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const Jobdata = [
    {
      id: "event-1",
      img: "/images/event/latest-job-1.jpg",
      date: "11 Jan 2025",
      location: "IAC",
      time: "8:00 am - 5:00 pm",
      title: "Content Developer",
      buttonText: "Get Ticket",
      buttonLink: "/events/international-education-fair-2025",
    },
    {
      id: "event-2",
      img: "/images/event/latest-job-1.jpg",
      date: "20 Feb 2025",
      location: "Chennai",
      time: "10:00 am - 6:00 pm",
      title: "New Testing Job",
      buttonText: "Register Now",
      buttonLink: "/events/global-tech-conference-2025",
    },
    {
      id: "event-3",
      img: "/images/event/latest-job-1.jpg",
      date: "5 Mar 2025",
      location: "Coimbatore",
      time: "9:00 am - 4:00 pm",
      title: "new jobs",
      buttonText: "Book Seat",
      buttonLink: "/events/startup-entrepreneurship-summit",
    },
    {
      id: "event-3",
      img: "/images/event/latest-job-1.jpg",
      date: "5 Mar 2025",
      location: "Coimbatore",
      time: "9:00 am - 4:00 pm",
      title: "Content Developer",
      buttonText: "Book Seat",
      buttonLink: "/events/startup-entrepreneurship-summit",
    },
    {
      id: "event-3",
      img: "/images/event/latest-job-1.jpg",
      date: "5 Mar 2025",
      location: "Coimbatore",
      time: "9:00 am - 4:00 pm",
      title: "Software Developers",
      buttonText: "Book Seat",
      buttonLink: "/events/startup-entrepreneurship-summit",
    },
    {
      id: "event-3",
      img: "/images/event/latest-job-1.jpg",
      date: "5 Mar 2025",
      location: "Coimbatore",
      time: "9:00 am - 4:00 pm",
      title: "Software Developers",
      buttonText: "Book Seat",
      buttonLink: "/events/startup-entrepreneurship-summit",
    },
  ];

  return (
    <>
      <div className="row g-5 home-jobs">
        {latestJobs.map((data, index) => (
          <div className={`${childClass}`} key={index}>
            <div className={`rbt-card ${parentClass} variation-01 rbt-hover bg-liblue`}>
              <div className="rbt-card-img">
                <Link href={`/job-details/${data.id}`}>
                  <Image
                    src={`/images/event/latest-job-1.jpg`}
                    width={355}
                    height={240}
                    
                    alt="Card image"
                  />
                  {/* <div className="rbt-badge-3 bg-white">
                    <span>{data.badgeDate}</span>
                    <span>{data.badgeYear}</span>
                  </div> */}
                </Link>
              </div>
              <div className="rbt-card-body">
                <ul className="rbt-meta">
                  <li>
                    <i className="feather-map-pin"></i>
                    {data.location}
                  </li>
                  <li>
                    <i className="feather-clock"></i>
                    {formattedDate(data.dead_line)}
                  </li>
                </ul>
                <h4 className="rbt-card-title">
                  {token ? (
                    <Link href={`/job-details/${data.id}`}>{data.job_title}</Link>
                  ) : (
                    <Link href="/login">{data.job_title}</Link>
                  )}
                </h4>

                <div className="read-more-btn">
                  <Link
                    className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                    href={`/job-details/${data.id}`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Browse Job</span>
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
          </div>
        ))}
      </div>
      {/* {isPagination ? (
        <div className="row">
          <div className="col-lg-12 mt--60">
            <Pagination
              totalPages={totalPages}
              pageNumber={page}
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        ""
      )} */}
    </>
  );
};

export default JobList;
