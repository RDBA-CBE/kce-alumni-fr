import Image from "next/image";
import { RWebShare } from "react-web-share";

const ProfilePage = () => {
  return (
    <div className="container">
      

      <div className="row g-5 align-items-start justify-content-center">
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

          <div className="custom-profile-card">
            <div className="custom-profile-header">
              <img
                src="/images/profile-photo.jpg"
                alt="Profile"
                className="custom-profile-image"
              />
              <div className="custom-profile-info">
                <h3 className="custom-profile-name">David Adams</h3>
                <p className="custom-profile-role">Senior Product Designer</p>
                {/* <p className="custom-trial-expiry">Trial Expires in 02 Days.</p> */}
              </div>
            </div>

            <div className="custom-progress-section">
              <h4>Your Profile Progress</h4>
              <p>Complete your profile to impress recruiters</p>
              <div className="custom-progress-bar">
                <div
                  className="custom-progress-fill"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <span className="custom-progress-percent">85%</span>
            </div>
            <div className="d-flex gap-2">
              <button className="rbt-btn btn-gradient radius-round sm-btn">
                Edit Profile
              </button>{" "}
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
            </div>
          </div>
        </div>

        <div className="col-lg-7">
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
                          <span className="custom-info-value">345432</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">About me :</span>
                          <span className="custom-info-value">-</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">Born on :</span>
                          <span className="custom-info-value">2000-01-04</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">Gender :</span>
                          <span className="custom-info-value">Male</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Blood Group :
                          </span>
                          <span className="custom-info-value">A_NEGATIVE</span>
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
                    <h6 className="title">Teva Pharmaceuticals</h6>
                    <p>
                      Pharmaceutical Marketing Manager (2025-01-03 – ) -
                      Bangalore
                    </p>
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
                    <h6 className="title">Karpagam College of Pharmacy</h6>
                    <p>BSc (2017 – 2020) - Bangalore</p>
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
                          <span className="custom-info-value">-</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">City :</span>
                          <span className="custom-info-value">Bangalore</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Postal Code :
                          </span>
                          <span className="custom-info-value">-</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Contact No :
                          </span>
                          <span className="custom-info-value">9876543210</span>
                        </div>
                        <div className="custom-info-row">
                          <span className="custom-info-label">
                            Email Address :
                          </span>
                          <span className="custom-info-value">
                            test43@gmail.com
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
                    <h6 className="title">Milestone Data: 2020</h6>
                    <p>Milestone Description</p>
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
                        <span className="badge bg-success px-3 py-2 rounded-pill">
                          Pharmaceutical Marketing
                        </span>
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

export default ProfilePage;
