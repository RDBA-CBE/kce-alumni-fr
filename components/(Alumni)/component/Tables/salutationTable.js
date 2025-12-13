"use client";

import { EditOutlined } from "@ant-design/icons";
import { Modal, Tooltip, Spin } from "antd";

const SalutationTable = (props) => {
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
                    className="feather-plus pl--0"
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
            ) : (
              <table className="rbt-table table table-borderless">
                <thead>
                  <tr>
                    {tableHead?.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {tableData?.map((item) => (
                    <tr key={item.salutation_id}>
                      <td>{item.salutation_name}</td>
                      <td>{item.description}</td>

                      <td>
                        <Tooltip title="Edit Salutation">
                          <EditOutlined
                            onClick={() => updateUser(item)}
                            style={{ fontSize: "22px" }}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* {tableData?.length > 0 && (
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
        )} */}
      </div>
    </>
  );
};

export default SalutationTable;
