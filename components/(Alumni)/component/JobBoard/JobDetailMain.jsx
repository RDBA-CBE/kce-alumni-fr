import { BaseURL } from "@/utils/BaseUrl";
import { capitalizeFLetter, formattedDate } from "@/utils/commonFunction.utils";
import axios from "axios";
import Link from "next/link";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const JobDescription = () => {
  const { id } = useParams();
  const router = useRouter();
  const [SingleData, setSingleData] = useState({});
  const [token, setToken] = useState("");
  const [isAlumni, setIsAlumni] = useState(false);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);

    if (!Token) {
      router.push("/login");
    }

    const alumni = localStorage.getItem("isAlumni");
    setIsAlumni(alumni);
  }, []);

  console.log("isAlumni", isAlumni);

  console.log("token", token);

  useEffect(() => {
    SingleDatas(id);
  }, [id]);
  const SingleDatas = (id) => {
    axios
      .get(`${BaseURL}/detail_job_post/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setSingleData(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  return (
    <section className="jd-page container section-pad">
      <div className="row gx-4">
        {/* LEFT */}
        <div className="col-lg-8">
          {/* <div className="jd-main-card p-4 "> */}
          {/* Header */}
          <div className="rbt-shadow-box bg-liblue">
            <div className="d-flex align-items-start justify-content-between jd-header ">
              <div>
                <h1 className="jd-title">{SingleData.job_title}</h1>
                <div className="jd-company-line">
                  <span className="jd-company">{SingleData.industry}</span>
                  <span className="jd-dot">—</span>
                  <span className="jd-location">{SingleData.location}</span>
                  <div className="jd-posted">
                    Posted on {formattedDate(SingleData.posted_on)}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-start gap-2 jd-action-group">
                {token &&
                  (isAlumni == "true" || isAlumni == true) &&
                  (SingleData.contact_link ? (
                    <Link
                      href={SingleData.contact_link}
                      target="_blank"
                      className="rbt-btn btn-gradient radius-round sm-btn"
                    >
                      Apply Now
                    </Link>
                  ) : (
                    <Link
                      href={`/apply-job/${id}`}
                      className="rbt-btn btn-gradient radius-round sm-btn"
                    >
                      Apply Now
                    </Link>
                  ))}

                {/* <button className="btn jd-outline-btn">Save</button> */}
                {/* <button className="rbt-btn btn-gradient radius-round sm-btn">
                  Share
                </button> */}
              </div>
            </div>

            {/* Meta / Stats */}
            <div className="jd-stats row  mt-4 ">
              <div className="col-3">
                <div className="jd-stat-label">Compensation</div>
                <div className="jd-stat-value">
                  ₹{SingleData.salary_package}
                </div>
              </div>

              <div className="col-3">
                <div className="jd-stat-label">Job Type</div>
                <div className="jd-stat-value">{SingleData.post_type}</div>
              </div>
              <div className="col-3">
                <div className="jd-stat-label">Experience</div>
                <div className="jd-stat-value">
                  {SingleData.experience_level_from} to{" "}
                  {SingleData.experience_level_to} years
                </div>
              </div>

              <div className="col-3">
                <div className="jd-stat-label">Application ends on</div>
                <div className="jd-stat-value">
                  {formattedDate(SingleData.posted_on)}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="jd-tags mt-3 ">
              {SingleData.skills?.map((t) => (
                <span className="jd-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Role Overview */}
          <div className="jd-section mt-4 rbt-shadow-box">
            <h4 className="jd-section-title">Role Description</h4>
            <p className="jd-text mb-2">
              <b>Role Name: </b>
              {SingleData?.role}
            </p>
            <p className="jd-text">
              <b>Description: </b>
              {SingleData?.job_description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="jd-section mt-4 rbt-shadow-box">
            <h4 className="jd-section-title">Contact Details</h4>
            <p className="jd-text mb-2">
              <b>Email: </b>
              {SingleData?.contact_email}
            </p>
            {SingleData?.contact_link && (
              <p className="jd-text">
                <b>Link: </b>
                <Link href={`${SingleData?.contact_link}`}>
                  {SingleData?.contact_link}
                </Link>
              </p>
            )}
            {/* <ul className="jd-list">
              <li>
                Build high-quality, reusable components with React/Next.js.
              </li>
              <li>Optimize performance and accessibility (Core Web Vitals).</li>
              <li>
                Collaborate with design and product to ship features quickly.
              </li>
              <li>Write tests and participate in code reviews.</li>
              <li>
                Mentor junior developers and contribute to best practices.
              </li>
            </ul> */}
          </div>
          {/* </div> */}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-lg-4 mt-4 mt-lg-0 ">
          <div className="jd-side-card mb-4 rbt-shadow-box">
            <div className="jd-side-title">Industry</div>
            <div className="jd-side-company fw-bold">
              {SingleData?.industry}
            </div>
            <div className="jd-side-small">
              location: {SingleData?.location}
            </div>
            <div className="jd-side-small">
              Posted By: {capitalizeFLetter(SingleData?.posted_by)}
            </div>
          </div>

          <div className="jd-side-card mb-4 rbt-shadow-box">
            <div className="jd-side-title">Recruiter Notes</div>
            <div className="jd-side-text">
              We encourage all applicants to highlight their skills, strengths,
              and achievements. Whether you are starting your career or bringing
              years of experience, share examples of your work, projects, or
              learning journey.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDescription;
