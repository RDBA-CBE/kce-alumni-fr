"use client";

import Link from "next/link";

const SangamamBanner = () => {
  return (
    <div className="rbt-course-area section-pad bg-liblue alumni-awards">
      <div className="container">

        {/* Section Header */}
        <div className="row mb--50">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h6 className="b2 mb--15">
                <span className="theme-gradient">SANGAMAM 2026</span>
              </h6>
              <h2 className="title w-600">
                A Reunion of Hearts, <br />
                <span className="theme-gradient">A Celebration of Journeys</span>
              </h2>
              <p className="mt-4">
                A bond that never fades. Dear Alumni, we invite you to be part of this grand reunion!
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row g-5 align-items-stretch">

          {/* Left — Event Info + Register */}
          <div className="col-lg-7 ">
            <div className="variation-01 rbt-hover h-100 " style={{ borderRadius: 16, background: "#fff", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
              <div className="rbt-card-body p--40">

                {/* Badge row */}
                <div className="d-flex flex-wrap gap-3 mb--30">
                  <span className="rbt-badge-2" style={{ background: "#bacbe9", fontWeight: "bold" }}>
                    <i className="feather-calendar me-1" />SANGAMAM 2026
                  </span>
                  
                  <span className="rbt-badge-2" style={{ background: "#bacbe9", fontWeight: "bold" }}>
                    <i className="feather-star me-1" /> Grand Alumni Meet
                  </span>
                  
                </div>

                {/* Meta info */}
                <div className="row g-4 mb--30 mt--20">
                  <div className="col-sm-6">
                    <div className="rbt-feature feature-style-2 rbt-radius" style={{background: "linear-gradient(218deg, #192f59 0%, #1e3f7c 100%)", color: "#fff"}}>
                      <div className="icon" style={{ background: "#fff" }}>
                        <i className="feather-calendar" style={{ color: "#192f59 " }} />
                      </div>
                      <div className="feature-content">
                        <h6 className="feature-title" style={{ color: "#fff" }}>Date</h6>
                        <p className="feature-description">19th December 2026</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="rbt-feature feature-style-2 rbt-radius"  style={{background: "linear-gradient(218deg, #192f59 0%, #1e3f7c 100%)", color: "#fff"}}>
                      <div className="icon" style={{ background: "#fff" }}>
                        <i className="feather-map-pin" style={{ color: "#192f59 " }} />
                      </div>
                      <div className="feature-content">
                        <h6 className="feature-title" style={{ color: "#fff" }}>Venue</h6>
                        <p className="feature-description">KCE Auditorium, Coimbatore</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr style={{ borderColor: "var(--color-border)", margin: "0 0 28px" }} />

                {/* Register CTA */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">
                  <div>
                    <h5 className="title mb--5">Ready to Join Us?</h5>
                    <p className="b2 mb--0">Secure your spot at the grand reunion.</p>
                  </div>
                  <div className="call-to-btn mt-0">
                    <Link
                      href="https://forms.gle/ZT2Q6BSUt6dTn6LK9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rbt-btn btn-gradient hover-icon-reverse radius-round"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">
                          <i className="feather-edit me-2" />Register Now
                        </span>
                        <span className="btn-icon"><i className="feather-arrow-right" /></span>
                        <span className="btn-icon"><i className="feather-arrow-right" /></span>
                      </span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right — Alumni Awards */}
          <div className="col-lg-5">
            <div
              className="variation-01 h-100"
              style={{
                borderRadius: 16,
                background: "linear-gradient(218deg, #192f59 0%, #1e3f7c 100%)",
                border: "none",
                padding: "30px",
              }}
            >
              <div className="rbt-card-body p--40 d-flex flex-column h-100">

                {/* Icon */}
                <div
                  style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  <i className="feather-award" style={{ fontSize: 24, color: "#fff" }} />
                </div>

                <h6 className="b2 mb--10" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: 1, textTransform: "uppercase" }}>
                  Alumni Awards 2026
                </h6>
                <h4 className="title mb--15" style={{ color: "#fff" }}>
                  <i className="feather-award me-2" />Recognising Excellence
                </h4>
                <p className="b2 mb--30" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, flex: 1 }}>
                  Nominate yourself or a deserving alumnus for recognition across 10 award categories — from lifetime achievement to emerging talent.
                </p>

                {/* Stats */}
                <div className="d-flex gap-5 mb--30">
                  <div>
                    <h3 className="title mb--0" style={{ color: "#fff" }}>10</h3>
                    <p className="b2 mb--0" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Award Categories</p>
                  </div>
                  <div>
                    <h3 className="title mb--0" style={{ color: "#fff" }}>4</h3>
                    <p className="b2 mb--0" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Category Groups</p>
                  </div>
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.15)", margin: "0 0 24px" }} />

                {/* Buttons */}
                <div className="d-flex flex-column gap-3">
                  <div className="call-to-btn mt-0">
                    <Link
                      href="https://forms.gle/XkarubU2btPbvumHA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rbt-btn btn-white hover-icon-reverse radius-round w-100 text-center"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">
                          <i className="feather-award me-2" />Apply for Awards
                        </span>
                        <span className="btn-icon"><i className="feather-arrow-right" /></span>
                        <span className="btn-icon"><i className="feather-arrow-right" /></span>
                      </span>
                    </Link>
                  </div>
                  <Link
                    href="/alumni-awards"
                    className="rbt-btn-link text-center mt-3 view-btn"
                    style={{ color: "rgb(255, 255, 255)", fontSize: 14 }}
                  >
                    View all award categories <i className="feather-arrow-right" />
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SangamamBanner;
