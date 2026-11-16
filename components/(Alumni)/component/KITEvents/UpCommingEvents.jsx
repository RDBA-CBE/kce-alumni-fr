import React from "react";
import { Modal, Tooltip, message } from "antd";
import Link from "next/link";
import EventDetails from "../../../../data/KitEvents.json";
import { formattedDate } from "@/utils/commonFunction.utils";

const UpCommingEvents = (props) => {
  const {
    data,
    Admin,
    AlumniManager,
    isAdmin,
    Faculty,
    showDeleteConfirm,
    isEdit,
  } = props;
  console.log("✌️data --->", data);

  const onClick = (id) => {
    console.log("✌️id --->", id);
  };

  const isOwnerOrAdmin = (event) => {
    const isOwner =
      event?.is_owner === true ||
      event?.is_owner === "true" ||
      event?.is_owner === 1;
    const isAdminUser =
      event?.is_admin === true ||
      event?.is_admin === "true" ||
      event?.is_admin === 1 ||
      isAdmin === true ||
      isAdmin === "true" ||
      Admin === true ||
      Admin === "true" ||
      (typeof window !== "undefined" &&
        (String(localStorage.getItem("isAdmin")).toLowerCase() === "true" ||
          localStorage.getItem("isAdmin") === true));
    return Boolean(isOwner || isAdminUser);
  };

  let getAllCourse = EventDetails;

  return (
    <div className="row g-5 events-log">
      {data?.map((event, index) => (
        <div className={`col-lg-4 col-md-6 col-12`} key={index}>
          <div className="rbt-card variation-04 rbt-hover p-3">
            {isOwnerOrAdmin(event) && (
              <div
                className="rbt-button-group"
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  zIndex: 10,
                }}
              >
                <a
                  className="rbt-btn bg-white btn-xs  radius-round eve-edit"
                  href={`/edit-event/${event.id}/`}
                  title="Edit"
                >
                  <i
                    className="feather-edit pl--0 text-white "
                    style={{ fontSize: "14px" }}
                  />
                </a>
                {event?.is_approved == true ? (
                  <a
                    className="rbt-btn bg-white btn-xs  radius-round "
                    href={`#`}
                    title="Active"
                    onClick={() => showDeleteConfirm(event)}
                  >
                    <i
                      className="feather-check-circle pl--0 text-white "
                      style={{ fontSize: "14px" }}
                    />
                  </a>
                ) : (
                  <a
                    className="rbt-btn bg-white btn-xs  radius-round "
                    href={`#`}
                    title="Inctive"
                    onClick={() => showDeleteConfirm(event)}
                  >
                    <i
                      className="feather-x-circle pl--0 text-white "
                      style={{ fontSize: "14px" }}
                    />
                  </a>
                )}
              </div>
            )}

            <div className="rbt-card-img">
              <Link href={`/event-details/${event.id}`}>
                <img
                  src={event?.event_wallpaper}
                  width={355}
                  height={244}
                  alt="Card image"
                  style={{ minHeight: "200px", maxHeight: "200px" }}
                />
              </Link>
            </div>
            <div className="rbt-card-body">
              <ul className="rbt-meta">
                <li>
                  <i className="feather-calendar"></i>
                  {formattedDate(event?.start_date) || "Event Date"},{" "}
                  {event?.start_time || "Event Time"}
                </li>
                <li>
                  <i className="feather-star"></i>
                  {event?.category}
                </li>
              </ul>
              <h5 className="mb-3">
                <Link href={`/event-details/${event.id}`}>{event?.title}</Link>
              </h5>
              <ul className="rbt-meta">
                <li>
                  <i className="feather-map-pin"></i>

                  {event?.venue}
                </li>
              </ul>

              <div className="rbt-card-bottom">
                <Link
                  className="rbt-btn-link color-primary"
                  href={`/event-details/${event.id}`}
                >
                  View Event
                  <i className="feather-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpCommingEvents;
