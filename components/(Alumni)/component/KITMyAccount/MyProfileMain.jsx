import { BaseURL } from "@/utils/BaseUrl";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";

const MyProfileMain = () => {
  const { id } = useParams();
  console.log("✌️id --->", id);
  const router = useRouter();

  const [SingleData, setSingleData] = useState({});
  const [token, setToken] = useState("");
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [isAdmin, setIsAdmin] = useState(null);
  const [milestone, setMilestone] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (!token) {
      router?.push("/login");
    }
    const Admin = localStorage.getItem("isAdmin");
    setIsAdmin(Admin);
  }, []);

  useEffect(() => {
    if (token) {
      SingleDatas(id);
      GetProfileStatus(id);
      GerMilestone(id);
    }
  }, [id, token]);

  const SingleDatas = (id) => {
    axios
      .get(`${BaseURL}/detail_view/${id}/`, {
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
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const GerMilestone = (id) => {
    axios
      .get(`${BaseURL}/milestones/`, {
        params: {
          member: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("resp:", response.data?.results);
        // setFormData(response.data);
        setMilestone(response.data?.results);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const GetProfileStatus = (id) => {
    axios
      .get(`${BaseURL}/profile_status/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setProfilePercentage(response.data?.completion_percentage);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const handleLinkedInShare = () => {
    const postUrl = encodeURIComponent("http://alumni.decodeschool.com/"); // URL to share
    const postTitle = encodeURIComponent("Milestone"); // Optional title
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}&title=${postTitle}`;
    console.log("linkedInUrl", linkedInUrl);
    window.open(linkedInUrl, "_blank", "width=600,height=500");
  };

  return (
    <div className="container rbt-dashboard-area">
      <div className="row g-5 align-items-start justify-content-center section-pad">
        {/* Accordion Section */}

        <div className="col-lg-4 ">
          {/* <div className="thumbnail">
            <Image
              className="radius-6"
              src="/images/course-thumbnail.jpg"
              width={526}
              height={644}
              alt="Course Thumbnail"
            />
          </div> */}

          <div className="custom-profile-card rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border my-0">
            <div className="custom-profile-header">
              <img
                src={
                  SingleData.profile_picture
                    ? SingleData.profile_picture
                    : "/images/dummy-profile-pic.png"
                }
                alt="Profile"
                className="custom-profile-image"
              />
              <div className="custom-profile-info">
                {SingleData?.name && SingleData?.name != " " ? (
                  <h3 className="custom-profile-name">
                    {SingleData?.salutation}. {SingleData?.name}
                  </h3>
                ) : (
                  <h3 className="custom-profile-name">
                    {SingleData?.salutation}. {SingleData?.email}
                  </h3>
                )}

                <p className="custom-profile-role">
                  {SingleData?.course}
                  {""}
                  {SingleData?.batch && <span>({SingleData?.batch})</span>}
                </p>
                {/* <p className="custom-trial-expiry">Trial Expires in 02 Days.</p> */}
              </div>
            </div>

            <div className="custom-progress-section">
              <h4>Your Profile Progress</h4>
              <p>Complete your profile to impress recruiters</p>
              <div className="custom-progress-bar">
                <div
                  className="custom-progress-fill"
                  style={{ width: `${profilePercentage}%` }}
                ></div>
              </div>
              <span className="custom-progress-percent">
                {" "}
                {profilePercentage}% Completed
              </span>
            </div>
            <div className="d-flex gap-2">
              {(isAdmin == true || isAdmin == "true") && (
                <Link
                  href={`/edit-basic-profile/${id}`}
                  className="rbt-btn btn-gradient radius-round sm-btn"
                >
                  Edit Profile
                </Link>
              )}

              {(isAdmin == true || isAdmin == "true") && (
                 <RWebShare
                          data={{
                            title: "Karpagam Institute Of Technology",
                            text: `Check this out!`,
                            url: window.location.href,
                          }}
                          onClick={() => console.log("shared successfully!")}
                        >
                <button className="rbt-btn btn-gradient radius-round sm-btn">
                  Share Profile
                </button>
                </RWebShare>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="rbt-accordion-style rbt-accordion-01 rbt-accordion-06 accordion">
            <div className="accordion" id="profileAccordion">
              {/* Accordion Item 1 - Personal Info */}
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Personal Information
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#profileAccordion"
                >
                  <div className="accordion-body card-body">
                    <div className="custom-info-card">
                      <div className="custom-info-table">
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Register No :
                          </span>
                          <span className="custom-info-value">
                            {SingleData?.register_no
                              ? SingleData?.register_no
                              : "-"}
                          </span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">About me :</span>
                          <span className="custom-info-value">
                            {" "}
                            {SingleData?.about_me ? SingleData?.about_me : "-"}
                          </span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">Born on :</span>
                          <span className="custom-info-value">
                            {" "}
                            {SingleData?.dob ? SingleData?.dob : "-"}
                          </span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">Gender :</span>
                          <span className="custom-info-value">
                            {" "}
                            {SingleData?.gender
                              ? SingleData?.gender == "M"
                                ? "Male"
                                : SingleData?.gender == "F"
                                ? "Female"
                                : "Other"
                              : "-"}
                          </span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Blood Group :
                          </span>
                          <span className="custom-info-value">
                            {" "}
                            {SingleData?.blood_group
                              ? SingleData?.blood_group
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Item 2 - Professional Details */}
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Professional Details
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#profileAccordion"
                >
                  <div className="accordion-body card-body">
                    {SingleData && SingleData?.experiences
                      ? SingleData?.experiences?.map((item, index) => (
                          <div key={index}>
                            <h6 className="title"> {item?.industry}</h6>
                            <p>
                              {item?.role} ({item?.start_date} {""}
                              {item?.is_currently_working
                                ? " Present"
                                : `- ${item?.end_date}`}
                              ) - {item?.location}
                            </p>
                          </div>
                        ))
                      : "No Experience"}
                  </div>
                </div>
              </div>

              {/* Accordion Item 3 - Education Details */}
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Education Details
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#profileAccordion"
                >
                  <div className="accordion-body card-body">
                    {SingleData && SingleData?.education
                      ? SingleData?.education?.map((item, index) => (
                          <>
                            <h6 className="title">{item?.institute}</h6>
                            <p>
                              {" "}
                              {item?.degree} ({item?.start_year}
                              {""} - {""}
                              {item?.is_currently_pursuing
                                ? " Present"
                                : item?.end_year}
                              ) - {item?.location}
                            </p>
                          </>
                        ))
                      : "No Education Details"}
                  </div>
                </div>
              </div>

              {/* Accordion Item 4 - Contact Details */}
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Contact Details
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#profileAccordion"
                >
                  <div className="accordion-body card-body">
                    <div className="custom-info-card">
                      <div className="custom-info-table">
                        <div className="custom-info-row">
                          <span className="custom-info-label">Address :</span>
                          <span className="custom-info-value">
                            {SingleData &&
                              SingleData?.alumni &&
                              SingleData?.alumni?.location &&
                              SingleData?.alumni?.location}
                          </span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">City :</span>
                          <span className="custom-info-value">Bangalore</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Postal Code :
                          </span>
                          <span className="custom-info-value">
                            {" "}
                            {SingleData &&
                            SingleData?.alumni &&
                            SingleData?.alumni?.postal_code
                              ? SingleData?.alumni?.postal_code
                              : "-"}
                          </span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Contact No :
                          </span>
                          <span className="custom-info-value">
                            {SingleData?.mobile_no ? (
                              <Link href={`tel:${SingleData?.mobile_no}`}>
                                {SingleData?.mobile_no}
                              </Link>
                            ) : (
                              "-"
                            )}
                          </span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Email Address :
                          </span>
                          <span className="custom-info-value">
                            {SingleData?.email ? (
                              <Link href={`mailto:${SingleData?.email}`}>
                                {SingleData?.email}
                              </Link>
                            ) : (
                              "-"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Item 5 - Milestone */}
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Milestone
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#profileAccordion"
                >
                  <div className="accordion-body card-body">
                    {milestone
                      ? milestone?.map((item, index) => (
                          <div key={index}>
                            <h6 className="title"> {item?.title}</h6>
                            <p> {item?.year}</p>
                            <p> {item?.description}</p>
                          </div>
                        ))
                      : "No Milestone data"}
                  </div>
                </div>
              </div>

              {/* Accordion Item 6 */}
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    Member Skills
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#tutionaccordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    <div className="custom-info-card">
                      <div className="d-flex flex-wrap gap-2">
                        {SingleData?.skills?.length > 0
                          ? SingleData?.skills?.map((data, index) => (
                              <span
                                key={index}
                                className="badge pro-skills px-3 py-2 "
                              >
                                {data}
                              </span>
                            ))
                          : "No Skills"}

                        {/* Add more skills like this */}
                        {/* <span className="badge bg-primary px-3 py-2 rounded-pill">Leadership</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
      </div>
    </div>
  );
};

export default MyProfileMain;
