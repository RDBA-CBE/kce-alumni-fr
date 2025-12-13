"use client";

import { usePathname } from "next/navigation";
// import SidebarData from "../../data/dashboard/student/siderbar.json";
import { Calendar } from "react-feather";
import Link from "next/link";

const SideBarLogin = () => {
  const pathname = usePathname();

  const year =[
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025"
  ]
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
                  {year &&
                    year.map((data, index) => (
                      <li className="nav-item" key={index} role="presentation">
                        <a
                          className={`${
                            pathname === "#" ? "active" : ""
                          }`}
                          href= "#"
                        >
                            {/* <Calendar/> */}
                          <i className="feather-calendar" />
                          <span>{data}</span>
                        </a>
                      </li>
                     ))} 
                </ul>
              </nav>

              <div className="col-lg-12 d-flex gap-5 mt-5"> 
                <Link className="rbt-btn btn-gradient radius-round sm-btn" href="#">
                  Filter
                </Link>
                <Link className="rbt-btn btn-border-gradient radius-round sm-btn" href="#">
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

export default SideBarLogin;
