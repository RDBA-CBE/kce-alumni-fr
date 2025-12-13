"use client";

import { usePathname } from "next/navigation";
// import SidebarData from "../../data/dashboard/instructor/siderbar.json";
import Link from "next/link";

const MasterDataSidebar = () => {
  const pathname = usePathname();

  const sideMenu = [
  { label: "Waiting For Approval", href: "/waiting-for-approval", key: "Waiting For Approval", icon: "feather-clock" },
  { label: "Users", href: "/users", key: "user", icon: "feather-user" },
  { label: "Salutation", href: "/salutation", key: "salutation", icon: "feather-type" },
  { label: "Course", href: "/course", key: "course", icon: "feather-book" },
  { label: "Batch", href: "/batch", key: "batch", icon: "feather-layers" },
  { label: "Department", href: "/department", key: "department", icon: "feather-grid" },
  { label: "Institution", href: "/institution", key: "institution", icon: "feather-home" },
  { label: "Industry", href: "/industry", key: "industry", icon: "feather-briefcase" },
  { label: "Skills", href: "/skills", key: "skills", icon: "feather-star" },
  { label: "Job Roles", href: "/role", key: "role", icon: "feather-briefcase" },
  { label: "Business Type", href: "/industry-type", key: "industry-type", icon: "feather-layers" },
  { label: "Location", href: "/location", key: "location", icon: "feather-map-pin" },
  { label: "Country", href: "/country", key: "country", icon: "feather-flag" },
  { label: "Ticket Category", href: "/categories", key: "categories", icon: "feather-tag" },
  { label: "Post Category", href: "/post-category", key: "post-category", icon: "feather-edit-3" },
  { label: "Event Category", href: "/event-category", key: "event-category", icon: "feather-calendar" },
];


  return (
    <>
      <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border bg-gray">
        <div className="inner">
          <div className="content-item-content">
            <div className="rbt-default-sidebar-wrapper">
              {/* <div className="section-title mb--20">
                <h6 className="rbt-title-style-2">Welcome, Rafi</h6>
              </div> */}
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list nav-tabs">
                  {sideMenu &&
                    sideMenu.map((data, index) => (
                      <li className="nav-item" key={index} role="presentation">
                        <Link
                          className={`${
                            pathname === data.link ? "active" : ""
                          }`}
                          href={data.href}
                        >
                          <i className={data.icon} />
                          <span>{data.label}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>

              {/* <div className="section-title mt--40 mb--20">
                <h6 className="rbt-title-style-2">Instructor</h6>
              </div>

              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.siderbar.slice(7, 11).map((data, index) => (
                      <li key={index}>
                        <Link
                          href={data.link}
                          className={`${
                            pathname === data.link ? "active" : ""
                          }`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>

              <div className="section-title mt--40 mb--20">
                <h6 className="rbt-title-style-2">User</h6>
              </div>

              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.siderbar.slice(11, 13).map((data, index) => (
                      <li key={index}>
                        <Link
                          href={data.link}
                          className={`${
                            pathname === data.link ? "active" : ""
                          }`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </Link>
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

export default MasterDataSidebar;
