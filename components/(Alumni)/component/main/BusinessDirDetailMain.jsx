import { BaseURL } from "@/utils/BaseUrl";
import { capitalizeFLetter, formattedDate } from "@/utils/commonFunction.utils";
import axios from "axios";
import Link from "next/link";

import {
  ServerInsertedHTMLContext,
  useParams,
  useRouter,
} from "next/navigation";
import React, { useEffect, useState } from "react";

const BusinessDirDetailMain = () => {
  const { id } = useParams();
  console.log("✌️id --->", id);

  const router = useRouter();

  const [SingleData, setSingleData] = useState({});
  const [token, setToken] = useState("");
  const [relatedBusiness, setRelatedBusiness] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      SingleDatas(id);
      GetAllBusinessDirectory();
    }
  }, [id, token]);

  const SingleDatas = (id) => {
    axios
      .get(`${BaseURL}/detail_business_directory/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const GetAllBusinessDirectory = () => {
    axios
      .get(`${BaseURL}/retrieve_business_directory/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response?.data);
        setRelatedBusiness(response?.data?.results);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  console.log("SingleData", SingleData);

  const FiveRelatedBusiness =
    relatedBusiness.length > 5 ? relatedBusiness.slice(0, 5) : relatedBusiness;
  console.log("✌️FiveRelatedBusiness --->", FiveRelatedBusiness);

  return (
    <section className="jd-page container-fluid section-pad">
      <div className="row justify-content-center">
        <div className="col-11 col-xl-10">
          <div className="container-fluid">
            <div className="row gx-4">
              {/* LEFT */}
              <div className="col-lg-8">
                {/* <div className="jd-main-card p-4 "> */}
                {/* Header */}
                <div className="rbt-shadow-box">
                  <div className="d-flex align-items-start justify-content-between jd-header ">
                    <div>
                      <h1 className="jd-title">{SingleData.business_name}</h1>
                      <div className="jd-company-line">
                        <span className="jd-company">
                          {SingleData.industry_type}
                        </span>
                        <span className="jd-dot">—</span>
                        <span className="jd-location">
                          {SingleData.location}
                        </span>
                        <div className="jd-posted">
                          Listed On : {formattedDate(SingleData.listed_on)}
                        </div>
                      </div>
                    </div>

                    {/* <div className="d-flex align-items-start gap-2 jd-action-group">
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

             
              </div> */}
                  </div>

                  {/* Tags */}
                </div>

                {/* Role Overview */}
                <div className="jd-section mt-4 rbt-shadow-box">
                  <h4 className="jd-section-title">Business Details</h4>

                  <p className="jd-text mb-2">
                    <b>Description: </b>
                    {SingleData?.description}
                  </p>

                  {SingleData?.website && (
                    <p className="jd-text mb-2">
                      <b>Website: </b>
                      {SingleData?.website}
                    </p>
                  )}

                  {SingleData?.listed_by && (
                    <p className="jd-text mb-2">
                      <b>Posted By: </b>
                      {SingleData?.listed_by}
                    </p>
                  )}
                </div>

                {/* Responsibilities */}
                <div className="jd-section mt-4 rbt-shadow-box">
                  <h4 className="jd-section-title">Contact Details</h4>
                  <p className="jd-text mb-2">
                    <b>Address: </b>
                    {SingleData?.location && SingleData.location}
                    {SingleData?.location && SingleData?.country_code
                      ? ", "
                      : ""}
                    {SingleData?.country_code && SingleData.country_code}
                  </p>
                  {SingleData?.contact_email && (
                    <p className="jd-text mb-2">
                      <b>Email: </b>
                      <Link href={`mailto:${SingleData?.contact_email}`}>
                        {SingleData?.contact_email}
                      </Link>
                    </p>
                  )}

                  {SingleData?.contact_number && (
                    <p className="jd-text">
                      <b>Contact Number: </b>
                      <Link href={`tellto:${SingleData?.contact_link}`}>
                        {SingleData?.contact_number}
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
                <div className="jd-side-card rbt-shadow-box">
                  <div className="jd-side-title d-flex justify-content-between mb-4">
                    <span>More Business Lists</span>

                    <Link
                      href="/business-directory"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      See All <i className="feather-arrow-right"></i>
                    </Link>
                  </div>

                  {FiveRelatedBusiness.map((item, index) => (
                    <div
                      key={index}
                      className="jd-similar-item bus-list mb-3 bg-color-primary-opacity"
                    >
                      <div className="fw-bold">
                        <img src={item?.logo} alt="business img" />
                      </div>
                      <div className="jd-side-small text-muted d-flex align-items-center">
                        {" "}
                        {item?.business_name}
                      </div>
                    </div>
                  ))}
                  <Link className="rbt-btn btn-gradient radius-round sm-btn mt-5" 
                  href={"/post-a-directory"}>
                    {" "}
                    Add a Business Listing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessDirDetailMain;
