import React, { useEffect, useState } from "react";
import FormField from "@/commonComponents/FormFields";

import { useParams, useRouter } from "next/navigation";
import {

  XLFormat,
} from "@/utils/commonFunction.utils";
import { message, Modal, Tooltip } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Models from "@/imports/models.import";
import { jobTypeOption } from "@/utils/constant.utils";

const ApplicantsMain = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("#tab-1");
  const [formData, setFormData] = useState({
    skills: "",
    experience: "",
    job: "",
    company_name: "",
    job_location: "",
    name_email: "",
  });
  const [exportData, setExportData] = useState({
    date: "",
    applied: "",
    status: "",
  });
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsList, setApplicantsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    if (!Token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (token) {
      GetApplicantsLists();
    }
  }, [id, token]);
  const GetApplicantsLists = () => {
    axios
      .get(`${BaseURL}/my_job_applications/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        setApplicantsList(response.data?.results);
        setFilteredData(response.data?.results);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (name) => (e) => {
    e.preventDefault();
    console.log(`${name} searched:`, formData[name]);

    setFormData((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleExportChange = (e) => {
    const { name, value } = e.target;
    setExportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExport = (e) => {
    e.preventDefault();
    XLFormat(currentDataForApplicants);
  };

  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    console.log("value", value);

    if (value) {
      const filtered = applicantsList.filter(
        (post) =>
          post?.name?.toLowerCase().includes(value) ||
          post?.email?.toLowerCase().includes(value)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(applicantsList); // Reset to original data if input is cleared
    }
  };

  console.log("filteredData", filteredData);

  // Pagination Logic
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPagesForAdmin = Math.ceil(filteredData.length / itemsPerPage);
  const startIndexForAdmin = (currentPage - 1) * itemsPerPage;
  const currentDataForApplicants = filteredData?.slice(
    startIndexForAdmin,
    startIndexForAdmin + itemsPerPage
  );
  return (
    <div className="rbt-dashboard-area section-pad">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-11 col-xl-10">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  

                  <div className="rbt-dashboard-content  p-0">
                    <div className="content">
                      <div className="section-title d-flex justify-content-between ">
                        <h4 className="rbt-title-style-3">Applicants</h4>
                        <div className="d-flex gap-3">
                          <Link
                            className="rbt-btn btn-gradient radius-round sm-btn"
                            href="/post-a-job"
                          >
                            Post Job
                          </Link>
                          <Link
                            className="rbt-btn btn-gradient radius-round sm-btn"
                            href="/job-board"
                          >
                            All Jobs
                          </Link>
                        </div>
                      </div>

                      <div className="rbt-elements-area bg-color-extra2 mb-5">
                    <div className="container-fluid">
                      <div className="row p-0 justify-content-lg-between">
                        <div className="col-lg-9 p-0">
                          <form action="#" className="rbt-search-style-1">
                            <input
                              type="text"
                              placeholder="Search Applicant with Name, Email and Role"
                              // name="search_filter"
                              onChange={handleSearchFilter}
                            />
                            <button className="search-btn">
                              <i className="feather-search"></i>
                            </button>
                          </form>

                          
                        </div>
                        <div className="col-lg-2 p-0">
                          <div
                            className="rbt-btn btn-gradient radius-round sm-btn"
                            
                            onClick={handleExport}
                           
                          >
                            Export
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                      <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--50">
                        {applicantsList.length > 0 ? (
                          <table className="rbt-table table table-borderless">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Resume</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentDataForApplicants.map((item) => (
                                <tr key={item.id}>
                                  <th>
                                    <span className="b3">
                                      <Link href="#">{item.full_name}</Link>
                                    </span>
                                  </th>
                                  <td>
                                    <span className="b3">
                                      <Link href="#">{item?.email}</Link>
                                    </span>
                                  </td>
                                  <td>
                                    <span className="b3">
                                      <Link href="#">{item?.current_role}</Link>
                                    </span>
                                  </td>
                                  <td>
                                    <span className="b3">
                                      {item?.resume ? (
                                        <Link
                                          href={item.resume}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View Resume
                                        </Link>
                                      ) : (
                                        "No Resume"
                                      )}
                                    </span>
                                  </td>

                                  <td>
                                    <div className="rbt-button-group justify-content-end gap-2">
                                      <>
                                        <Link
                                          className="rbt-btn btn-xs radius-round bg-gray"
                                          href={`/applicants-profile/${item.id}`}
                                          title="View applicants"
                                          // onClick={
                                          //   item.application_count > 0
                                          //     ? () =>
                                          //         router.push(
                                          //           `/applicants/${item?.id}`
                                          //         )
                                          //     : null
                                          // }

                                          style={{
                                            cursor: "pointer",
                                          }}
                                        >
                                          <i className="feather-eye pl--0"></i>
                                        </Link>
                                      </>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div>No Data</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --------------------table end--------------------- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsMain;
