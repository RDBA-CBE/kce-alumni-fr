"use client";

const SideBar = ({ selectedYear, setSelectedYear }) => {
  const yearList = ["all", "2021", "2022", "2023", "2024", "2025"];

  return (
    <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
      <div className="inner">
        <div className="content-item-content">
          <div className="rbt-default-sidebar-wrapper">
            <nav className="mainmenu-nav">
              <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                {yearList.map((year, index) => (
                  <li
                    className={`nav-item ${selectedYear === year ? "active" : ""}`}
                    key={index}
                    role="presentation"
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedYear(year);
                      }}
                    >
                      <i className="feather-calendar" />
                      <span>{year === "all" ? "Show All" : year}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SideBar;
