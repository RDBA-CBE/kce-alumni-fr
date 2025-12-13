"use client";

import { usePathname } from "next/navigation";
// import SidebarData from "../../data/dashboard/student/siderbar.json";
import { Calendar } from "react-feather";
import Link from "next/link";
import FormField from "@/commonComponents/FormFields";
import { useState } from "react";

const SideBarJob = () => {
  const pathname = usePathname();


   const [departmentList, setDepartmentList] = useState([]);


  return (
    <>
      <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
        <div className="inner">
          <div className="content-item-content">
            <div className="rbt-default-sidebar-wrapper">
              {/* <div className="section-title mb--20">
                <h6 className="rbt-title-style-2">Welcome, user</h6>
              </div> */}
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  <li className="nav-item" role="presentation">
                    <a
                      className={`${pathname === "#" ? "active" : ""}`}
                      href="#"
                    >
                      {/* <i className="feather-calendar" /> */}
                      <FormField
                        type="text"
                        className="applicant-input"
                        // onChange={(e) => handleFilterChange(e)}
                        name="job_title"
                        // value={formData.job_title}
                        placeholder="Job Title"
                      />
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className={`${pathname === "#" ? "active" : ""}`}
                      href="#"
                    >
                      {/* <i className="feather-calendar" /> */}
                      <FormField
                        type="loadMoreSelect"
                        className="member-dd"
                        
                        name="industry"
                        placeholder={"Industry"}
                        value={formData.industry}
                        onChange={(e) => {
                          setFormData({ ...formData, industry: e });
                        }}
                        options={departmentList}
                        loadMore={() => industryListLoadMore()}
                      />
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="col-lg-12 d-flex gap-5 mt-5">
                <Link
                  className="rbt-btn btn-gradient radius-round sm-btn"
                  href="#"
                >
                  Filter
                </Link>
                <Link
                  className="rbt-btn btn-border-gradient radius-round sm-btn"
                  href="#"
                >
                  Cancel
                </Link>
              </div>

              {/* <div className="section-title mt--40 mb--20">
                <h6 className="rbt-title-style-2">User</h6>
              </div>

              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.siderbar.slice(7, 10).map((data, index) => (
                      <li key={index}>
                        <a
                          href={data.link}
                          className={`${
                            pathname === data.link ? "active" : ""
                          }`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarJob;
