"use client";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Modal, Tooltip, Spin } from "antd";
import Pagination from "@/commonComponents/Pagination";

const UserTable = (props) => {
  const {
    tableHead,
    tableData,
    heading,
    updateStatus,
    updateUser,
    loading,
    total,
    currentPage,
    handlePageChange,
    subtitile_1,
    subtitile_2,
    subtitile_3,
    subtitile_1_onPress,
    subtitile_2_onPress,
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
                  onClick={() => subtitile_1_onPress()}
                >
                  <i
                    className="feather-user pl--0"
                    onClick={() => subtitile_1_onPress()}
                  />
                </a>
              )}
              {subtitile_2 && (
                <a
                  className="rbt-btn btn-xs bg-primary radius-round"
                  href="#"
                  title="Delete Album"
                  onClick={() => subtitile_2_onPress()}
                >
                  <i
                    className="feather-users pl--0"
                    onClick={() => subtitile_2_onPress()}
                  />
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
                  <tr >
                    {tableHead?.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                    
                    
                  </tr>
                </thead>

                <tbody>
                  {tableData?.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        opacity: item?.is_active ? 1 : 0.5,
                      }}
                    >
                      <td>{item.username}</td>
                      <td>
                        {item.groups.map((group) => group.name).join(", ")}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item?.is_active && (
                          <Tooltip title="Assign Role">
                            <UserSwitchOutlined
                              className="me-3"
                              onClick={() => updateUser(item)}
                              style={{ fontSize: "22px" }}
                            />
                          </Tooltip>
                        )}

                        <Tooltip
                          title={item?.is_active ? "Active" : "InActive"}
                        >
                          {item?.is_active ? (
                            <CheckCircleOutlined
                              onClick={() => updateStatus(item)}
                              style={{
                                color: "green",
                                fontSize: "22px",
                              }}
                            />
                          ) : (
                            <CloseCircleOutlined
                              onClick={() => updateStatus(item)}
                              style={{
                                color: "red",
                                fontSize: "22px",
                              }}
                            />
                          )}
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
        {tableData?.length > 9 ? (
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
    </>
  );
};

export default UserTable;
