import { BaseURL } from "@/utils/BaseUrl";

import { message, Modal } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ViewAlumniTickets = () => {
  const { id } = useParams();
  console.log("✌️id --->", id);

  const [SingleData, setSingleData] = useState({});
  const [token, setToken] = useState("");

  const [ticketReplies, setTicketReplies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      SingleDatas(id);

      getTicketReplies(id);
    }
  }, [id, token]);

  const SingleDatas = (id) => {
    axios
      .get(`${BaseURL}/detail_my_ticket/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setSingleData(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const getTicketReplies = (id) => {
    axios
      .get(`${BaseURL}/tickets_replies/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setTicketReplies(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  return (
    <div className="container">
      {/* {contextHolder} */}
      <div className="rbt-callto-action rbt-cta-default style-2 mb-4">
        <div className="content-wrapper overflow-hidden pt--30 pb--30 bg-blue">
          <div className="row gy-5 align-items-end">
            <div className="col-lg-8">
              <div className="inner">
                <div className="content text-left">
                  <h5 className="mb--5">Tickets # {SingleData?.id}</h5>
                  {/* <p className="b3">Create Announcement</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
              <div className="call-to-btn text-start text-lg-end position-relative">
                <Link
                  className="rbt-btn btn-gradient radius-round sm-btn"
                  href="/help-desk/alumni-tickets"
                >
                  <span data-text="Add New Announcement">
                   Back
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <section className="ticket-details-section rounded-4">
        <div className="container-fluid">
          {/* Status & Info */}
          <div className="ticket-info">
            <div className="ticket-meta">
              <p>
                <span>Category:</span> {SingleData?.category || "-"}
              </p>
              <p>
                <span>Priority:</span> {SingleData?.priority || "-"}
              </p>
              <p>
                <span>Status:</span> {SingleData?.status || "-"}
              </p>
            </div>

            {SingleData?.due_date && (
              <div className="ticket-due">
                <p>
                  <span>Due Date:</span> {SingleData?.due_date}
                </p>
              </div>
            )}
          </div>

          {/* Ticket Content */}
          <div className="ticket-content">
            <p>
              <b>Content : </b>
              {SingleData?.content}
            </p>
          </div>

          {/* Replies */}
          <div className="ticket-replies">
            {ticketReplies?.length === 0 ? (
              <div className="no-replies">
                <p>No replies yet</p>
              </div>
            ) : (
              <>
                <h6>Replies</h6>
                <div className="replies-list">
                  {ticketReplies.map((reply) => (
                    <div key={reply?.id} className="reply-card">
                      <p className="reply-message">{reply?.message}</p>
                      <span className="reply-meta" style={{ fontSize: "14px" }}>
                        Posted by {reply?.posted_by} on {reply?.posted_on}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewAlumniTickets;
