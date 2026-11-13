"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";
import MobileMenu from "@/components/Header/MobileMenu";
import BreadCrumb from "@/components/Common/BreadCrumb";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import Link from "next/link";

// ── Project theme tokens (from public/scss/default/_variables.scss) ──────────
// --color-primary  : #192f59  (navy)
// --color-secondary: #0091ff  (bright blue)
// --color-btn-1    : #cc7539  (orange)
// --color-btn-2    : #d76239  (orange-red)
// gradient-7       : 218deg, #0091ff → #192f59

// ─── data ─────────────────────────────────────────────────────────────────────

const AWARDS_GLANCE = [
  { no: 1,  award: "Distinguished Alumni Award",                 category: "Lifetime and Impact",                        icon: "feather-award"       },
  { no: 2,  award: "Societal Impact Award",                      category: "Lifetime and Impact",                        icon: "feather-heart"       },
  { no: 3,  award: "Nation Builder Award",                       category: "Lifetime and Impact",                        icon: "feather-shield"      },
  { no: 4,  award: "Alumni Mentor Award",                        category: "Contribution to College & Alumni Community", icon: "feather-user-check"  },
  { no: 5,  award: "Career Catalyst Award",                      category: "Contribution to College & Alumni Community", icon: "feather-briefcase"   },
  { no: 6,  award: "Alumni Chapter & Community Builder Award",   category: "Contribution to College & Alumni Community", icon: "feather-globe"       },
  { no: 7,  award: "Alumni Volunteer of the Year Award",         category: "Contribution to College & Alumni Community", icon: "feather-gift"        },
  { no: 8,  award: "Startup Founder Award",                      category: "Entrepreneurship and Excellence",            icon: "feather-zap"         },
  { no: 9,  award: "Sports and Cultural Excellence Award",       category: "Entrepreneurship and Excellence",            icon: "feather-flag"        },
  { no: 10, award: "Rising Star Award",                          category: "Emerging Talent",                            icon: "feather-star"        },
];

const CATEGORIES = [
  {
    id: "cat1", label: "Category 1", title: "Lifetime and Impact", icon: "feather-award", count: 3,
    awards: [
      { no: 1, icon: "feather-award",  name: "Distinguished Alumni Award",  subtitle: "Lifetime achievement, senior alumni",
        criteria: ["Graduated at least 15 years ago","Sustained, outstanding achievement in their field over a long career","Held a senior leadership position or earned national or international recognition","Brought lasting credit to the college through their reputation","Maintained a record of integrity"] },
      { no: 2, icon: "feather-heart",  name: "Societal Impact Award",       subtitle: "Service to society",
        criteria: ["Led or supported initiatives in education, health, environment, rural development or community welfare","Measurable benefit to society (people reached, lives improved, sustained over time)","Work done voluntarily or through an NGO, social enterprise or CSR programme","Supporting evidence such as reports, photos and testimonials"] },
      { no: 3, icon: "feather-shield", name: "Nation Builder Award",        subtitle: "Armed forces, police, civil services",
        criteria: ["Serving or retired officer in the armed forces, police, IAS/IPS/IFS or another civil service","Notable service record — commendations, gallantry or service medals, or major administrative achievements","Excellent conduct and public service","Ranks and postings verified through official documents"] },
    ],
  },
  {
    id: "cat2", label: "Category 2", title: "Contribution to College and Alumni Community", icon: "feather-users", count: 4,
    awards: [
      { no: 4, icon: "feather-user-check", name: "Alumni Mentor Award",                        subtitle: "Guiding students and juniors",
        criteria: ["Regular mentoring, guest lectures, workshops or career guidance sessions for students","At least 3 sessions or mentees in the past 2 years","Feedback from students or faculty","Real influence on students' career choices or skills"] },
      { no: 5, icon: "feather-briefcase",  name: "Career Catalyst Award",                      subtitle: "Job referrals and recruitment drives",
        criteria: ["Helped students or alumni get jobs, internships or interviews through referrals","Facilitated campus recruitment drives or company tie-ups","Number of students placed or opportunities created, with supporting details","Confirmation from the placement cell"] },
      { no: 6, icon: "feather-globe",      name: "Alumni Chapter and Community Builder Award", subtitle: "Regional chapters and alumni events",
        criteria: ["Led a regional or city alumni chapter, or organised alumni meets","Increased alumni participation and engagement","Number of events held, attendance and outcomes","Strengthened the bond between alumni and the college"] },
      { no: 7, icon: "feather-gift",       name: "Alumni Volunteer of the Year Award",         subtitle: "Most active voluntary contribution",
        criteria: ["Most active voluntary contribution to the alumni cell and college in the year","Time given to events, committees, outreach, fundraising or documentation","Reliability and commitment, endorsed by the alumni cell coordinator","Open to alumni of any batch"] },
    ],
  },
  {
    id: "cat3", label: "Category 3", title: "Entrepreneurship and Excellence", icon: "feather-trending-up", count: 2,
    awards: [
      { no: 8, icon: "feather-zap",  name: "Startup Founder Award",                subtitle: "Young founders, startups under 5 years",
        criteria: ["Founder or co-founder of a startup less than 5 years old","Registered business with a viable product or service","Evidence of growth — revenue, funding, customers, jobs created or recognitions","Innovation and future potential","Bonus for supporting fellow alumni or students (internships, hiring)"] },
      { no: 9, icon: "feather-flag", name: "Sports and Cultural Excellence Award", subtitle: "Sports, arts and culture",
        criteria: ["Achievement at state, national or international level in sports, arts, music, dance, literature or performing arts","Awards, medals or documented recognition","Inspiring role model for students","Representation of the college or alumni community"] },
    ],
  },
  {
    id: "cat4", label: "Category 4", title: "Emerging Talent", icon: "feather-star", count: 1,
    awards: [
      { no: 10, icon: "feather-star", name: "Rising Star Award", subtitle: "Alumni with up to 5 years of experience",
        criteria: ["Graduated within the last 5 years","Rapid career growth, early promotions or outstanding work performance","Notable achievement — a project, innovation, publication or recognition","Leadership potential and a positive attitude","Fast progress in a short time"] },
    ],
  },
];

const ELIGIBILITY = [
  { icon: "feather-check-circle", title: "Good Standing",  text: "Alumnus of Karpagam College of Engineering, in good standing, with no disciplinary or legal issues" },
  { icon: "feather-file-text",    title: "Nomination",      text: "Nomination by self, peers, faculty or the Alumni Cell, with supporting documents" },
  { icon: "feather-info",         title: "One Per Year",    text: "One award per person per year; past winners are not eligible for the same award again" },
];

// ─── page ─────────────────────────────────────────────────────────────────────

const AlumniAwards = () => {
  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />
        {/* <BreadCrumb title="Alumni Awards" text="Alumni Awards" /> */}

        {/* ══ HERO — gradient-7 (secondary→primary) ═══════════════════════ */}
        <div
          className="section-pad"
          style={{
            background: "#192f59",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-60, left:-60, width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <span style={{ background:"rgba(255,255,255,0.15)", color:"#fff", borderRadius:50, padding:"6px 18px", fontSize:13, display:"inline-block", marginBottom:20 }}>
                  <i className="feather-calendar me-2" />Alumni Meet 2026 · 19 December 2026
                </span>
                <h2 className="title" style={{ color:"#fff", fontWeight:800 }}>
                  Alumni <span style={{ color:"#cc7539" }}>Awards 2026</span>
                </h2>
                <p className="b2 mt--20" style={{ color:"rgba(255,255,255,0.85)" }}>
                  Recognising excellence, service and leadership among the KCE alumni community
                </p>
                <div className="d-flex justify-content-center flex-wrap gap-3 mt--30">
                  {[
                    { icon:"feather-award",   label:"10 Award Categories" },
                    { icon:"feather-layers",  label:"4 Category Groups" },
                    { icon:"feather-map-pin", label:"Karpagam College of Engineering" },
                  ].map((b,i) => (
                    <span key={i} style={{ background:"rgba(255,255,255,0.12)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)", borderRadius:50, padding:"7px 18px", fontSize:13, display:"inline-flex", alignItems:"center", gap:8 }}>
                      <i className={b.icon} /> {b.label}
                    </span>
                  ))}
                </div>

                {/* apply CTA in hero */}
                <div className="mt--40" >
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe779_Sfwag1d9uZEVgaCw9o6_c8YOL95kTdA3dI47ioXl-HA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rbt-btn btn-gradient hover-icon-reverse radius-round"
                    style={{ margin:"0 auto"}}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">
                        <i className="feather-award me-2" />Apply for Alumni Awards
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

        {/* ══ AWARDS AT A GLANCE — light primary tint bg ═══════════════════ */}
        <div className="section-pad" style={{ background:"#f1f7ff" }}>
          <div className="container">
            <div className="row justify-content-center mb--50">
              <div className="col-lg-7 text-center">
                <h6 className="b2 mb--10" style={{ color:"#cc7539", textTransform:"uppercase", letterSpacing:2 }}>Overview</h6>
                <h3 className="title w-600">Awards at a Glance</h3>
                <p className="b2 mt--10" style={{ color:"#6b7385" }}>Ten awards across four categories celebrating the best of our alumni</p>
              </div>
            </div>

            <div className="row g-4">
              {AWARDS_GLANCE.map((item) => (
                <div key={item.no} className="col-lg-4 col-md-6">
                  <div
                    className="rbt-shadow-box rbt-radius h-100"
                    style={{ background:"#fff", border:"1px solid rgba(0,145,255,0.12)", transition:"transform .2s, box-shadow .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,145,255,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=""; }}
                  >
                    <div className="p-4 d-flex align-items-start gap-3">
                      {/* icon circle — secondary blue tint */}
                      <div style={{ width:46, height:46, borderRadius:"50%", flexShrink:0, background:"rgba(0,145,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <i className={item.icon} style={{ fontSize:20, color:"#0091ff" }} />
                      </div>
                      <div>
                        {/* <span style={{ background:"#192f59", color:"#fff", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700, marginBottom:6, display:"inline-block" }}>
                          #{item.no}
                        </span> */}
                        <h6 className="mb--5" style={{ fontSize:20, lineHeight:1.4, color:"#192335", fontWeight:700 }}>{item.award}</h6>
                        <p className="b3 mb-0" style={{ color:"#000", fontSize:16 }}>{item.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CATEGORIES DETAIL ════════════════════════════════════════════ */}
        {CATEGORIES.map((cat, catIdx) => (
          <div key={cat.id} className="section-pad" style={{ background: catIdx % 2 === 0 ? "#fff" : "#f1f7ff" }}>
            <div className="container">

              {/* category label bar — primary navy */}
              <div className="row justify-content-center mb--50">
                <div className="col-lg-9 text-center">
                  <div
                    className="d-inline-flex align-items-center gap-3 px-4 py-3 rbt-radius mb--20"
                    style={{ background:"#192f59", color:"#fff" }}
                  >
                    <i className={cat.icon} style={{ fontSize:20 }} />
                    <span style={{ opacity:0.75, fontSize:12, textTransform:"uppercase", letterSpacing:2 }}>{cat.label}</span>
                    <span style={{ width:1, height:18, background:"rgba(255,255,255,0.3)" }} />
                    <strong style={{ fontSize:15 }}>{cat.title}</strong>
                  </div>
                  <p className="b3 mb-0" style={{ color:"#6b7385" }}>
                    <span style={{ background:"rgba(0,145,255,0.1)", color:"#0091ff", borderRadius:20, padding:"4px 14px", fontSize:13, fontWeight:600 }}>
                      {cat.count} Award{cat.count > 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              </div>

              {/* award cards */}
              <div className="row g-5">
                {cat.awards.map((award) => (
                  <div key={award.no} className="col-lg-6">
                    <div
                      className="rbt-radius h-100"
                      style={{ background:"#fff", boxShadow:"0 4px 20px rgba(25,47,89,0.08)", overflow:"hidden", border:"1px solid rgba(25,47,89,0.08)", transition:"transform .2s, box-shadow .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(25,47,89,0.14)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(25,47,89,0.08)"; }}
                    >
                      {/* top bar — secondary blue */}
                      <div style={{ background:"#192f59", padding:"16px 22px" }}>
                        <div className="d-flex align-items-center gap-3">
                          <div style={{ width:40, height:40, borderRadius:"50%", flexShrink:0, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <i className={award.icon} style={{ fontSize:18, color:"#fff" }} />
                          </div>
                          <div>
                            {/* <span style={{ background:"rgba(255,255,255,0.22)", color:"#fff", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700, marginBottom:4, display:"inline-block" }}>
                              #{award.no}
                            </span> */}
                            <h5 className="mb-0" style={{ color:"#fff", fontWeight:700, fontSize:20 }}>{award.name}</h5>
                            <p className="mb-0" style={{ color:"rgba(255,255,255,0.78)", fontSize:15, fontStyle:"italic" }}>{award.subtitle}</p>
                          </div>
                        </div>
                      </div>

                      {/* criteria body */}
                      <div className="p-4">
                        {award.criteria.map((item, i) => (
                          <div key={i} className="d-flex align-items-start gap-3 mb--14">
                            <div style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, background:"rgba(0,145,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", marginTop:2 }}>
                              <i className="feather-check" style={{ fontSize:11, color:"#0091ff" }} />
                            </div>
                            <p className="b3 mb-0" style={{ color:"#444", lineHeight:1.65, fontSize:16 }}>{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ══ ELIGIBILITY — primary navy bg ════════════════════════════════ */}
        <div className="section-pad" style={{ background:"#192f59" }}>
          <div className="container">
            <div className="row justify-content-center mb--50">
              <div className="col-lg-7 text-center">
                <h6 className="b2 mb--10" style={{ color:"#cc7539", textTransform:"uppercase", letterSpacing:2 }}>Eligibility</h6>
                <h3 className="title" style={{ color:"#fff", fontWeight:700 }}>Common Eligibility for All Awards</h3>
                <p className="b2 mt--10" style={{ color:"rgba(255,255,255,0.7)" }}>Every nomination must meet these baseline requirements</p>
              </div>
            </div>

            <div className="row g-4 justify-content-center">
              {ELIGIBILITY.map((item, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div
                    className="rbt-radius text-center h-100"
                    style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", padding:"36px 28px", transition:"background .2s" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(0,145,255,0.18)"}
                    onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                  >
                    <div style={{ width:60, height:60, borderRadius:"50%", margin:"0 auto 20px", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className={item.icon} style={{ fontSize:24, color:"#192f59" }} />
                    </div>
                    <h6 style={{ color:"#cc7539", fontWeight:700, marginBottom:10, fontSize:18 }}>{item.title}</h6>
                    <p className="b3 mb-0" style={{ color:"rgba(255,255,255,0.82)", lineHeight:1.7, fontSize:16 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ APPLY CTA STRIP ═════════════════════════════════════════════ */}
        <div className="row justify-content-center mt--60">
          <div className="col-lg-10">
            <div
              className="rbt-radius"
              style={{
                background: "linear-gradient(218deg, #0091ff 0%, #192f59 100%)",
                padding: "40px 48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <div>
                <h4 style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 8 }}>
                  🏆 Ready to Apply?
                </h4>
                <p className="b2 mb-0" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Nominate yourself or a deserving alumnus for Alumni Awards 2026.
                </p>
              </div>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSe779_Sfwag1d9uZEVgaCw9o6_c8YOL95kTdA3dI47ioXl-HA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="rbt-btn hover-icon-reverse radius-round"
                style={{ background: "#cc7539", color: "#fff", flexShrink: 0 }}
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">
                    <i className="feather-external-link me-2" />Apply Now
                  </span>
                  <span className="btn-icon"><i className="feather-arrow-right" /></span>
                  <span className="btn-icon"><i className="feather-arrow-right" /></span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ══ FOOTER NOTE ══════════════════════════════════════════════════ */}
        {/* <div className="bg-color-white">
          <div className="container">
            <div className="text-center py-4">
              <p className="b3 mb-0" style={{ color:"#aaa" }}>
                Karpagam College of Engineering &nbsp;|&nbsp; Alumni Meet 2026 &nbsp;|&nbsp; 19-12-2026
              </p>
            </div>
          </div>
        </div> */}

        <KITFooter />
      </Context>
    </Provider>
  );
};

export default AlumniAwards;
