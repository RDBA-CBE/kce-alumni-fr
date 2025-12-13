"use client";

import Link from "next/link";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Modal, Tooltip, Spin } from "antd";
import Pagination from "@/commonComponents/Pagination";

const CommonTable = (props) => {
  const {
    tableHead,
    tableData,
    heading,
    updateStatus,
    loading,
    total,
    currentPage,
    handlePageChange,
    subtitile_1,
    subtitile_2,
    subtitile_3,
  } = props;

  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="d-flex justify-content-between py-4 mb-4 ">
            <div
              className="mb-0 fw-medium text-dark"
              style={{
                fontSize: "25px",
              }}
            >
              {heading}
            </div>

            <div className="rbt-button-group justify-content-end">
              {subtitile_1 && (
                <a
                  className="rbt-btn btn-xs bg-secondary-opacity radius-round"
                  href="#"
                  title="Edit Album"
                  // onClick={() => setState({ isOpen: true })}
                >
                  <i className="feather-user pl--0" />
                </a>
              )}
              {subtitile_2 && (
                <a
                  className="rbt-btn btn-xs bg-primary radius-round"
                  href="#"
                  title="Delete Album"
                  // onClick={() => showDeleteConfirm()}
                >
                  <i className="feather-users pl--0" />
                </a>
              )}
              {subtitile_3 && (
                <a
                  className="rbt-btn btn-xs  radius-round"
                  href="#"
                  title="Create Album"
                  // onClick={() => setState({ isUploadPic: true })}
                >
                  <i className="feather-plus-circle pl--0" />
                </a>
              )}
            </div>
          </div>
          <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
            {loading ? (
              <div
                className="text-center pt-10 d-flex justify-content-center align-items-center"
                style={{
                  height: "500px",
                  maxWidth: "100%",
                }}
              >
                <Spin size="large" />
              </div>
            ) : tableData?.length > 0 ? (
              <table className="rbt-table table table-borderless">
                <thead>
                  <tr>
                    {tableHead?.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                    {/* <th>Qus</th>
                  <th>TM</th>
                  <th>CA</th>
                  <th>Result</th> */}
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {tableData?.map((item) => (
                    <tr key={item.member_id}>
                      <td>
                        <img
                          src={
                            item.profile_picture
                              ? item.profile_picture
                              : "/images/dummy-profile-pic.png"
                          }
                          alt="Profile"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                        <p
                          style={{
                            paddingTop: "10px",
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          Reg No: {item.register_no}{" "}
                        </p>
                      </td>
                      <td>
                        <Link
                          href={`tel:${item.mobile_no}`}
                          style={{
                            color: "#212529",
                            textDecoration: "underline",
                          }}
                        >
                          {item.mobile_no}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`mailto:${item.email}`}
                          style={{
                            color: "#212529",
                            textDecoration: "underline",
                          }}
                        >
                          {item.email}
                        </Link>
                      </td>
                      <td>{item.course}</td>
                      <td>{item.batch}</td>
                      <td>
                        {item.file ? (
                          <Link
                            href={item.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#212529",
                              textDecoration: "underline",
                            }}
                          >
                            {item.file.substring(
                              item.file.lastIndexOf("/") + 1
                            )}
                          </Link>
                        ) : (
                          <span>No file available</span>
                        )}
                      </td>
                      <td>
                        <Tooltip title="Approve">
                          <CheckCircleOutlined
                            className="me-3"
                            onClick={() => updateStatus(item)}
                            style={{ fontSize: "22px" }}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                className="text-center pt-10 d-flex justify-content-center align-items-center"
                style={{
                  height: "500px",
                  maxWidth: "100%",
                }}
              >
                No Data Found
              </div>
            )}
          </div>
        </div>
        {tableData?.length > 9 && (
          <div>
            <div
              className="mb-20 "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                activeNumber={handlePageChange}
                totalPage={total}
                currentPages={currentPage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommonTable;
