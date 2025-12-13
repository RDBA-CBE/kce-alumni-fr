"use client";

import Separator from "@/components/Common/Separator";
import MobileMenu from "@/components/Header/MobileMenu";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import Context from "@/context/Context";
import Store from "@/redux/store";
import SideBarHelpDesk from "../KITSidebar/SideBarHelpDesk";
import BreadCrumb from "../../../Common/BreadCrumb";
import AllTicketsMain from "../KITHelpDesk/AllTicketsMain";
import OpenTicketsMain from "../KITHelpDesk/OpenTicketsMain";
import AllMessagesMain from "../KITHelpDesk/AllMessagesMain";
import AlumniTicketsTable from "./AlumniTicketsTable";
import ViewAlumniTickets from "./ViewAlumniTickets";
import { useSetState } from "@/utils/commonFunction.utils";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import ViewTicketDetails from "./ViewTicketDetails";
import Loader from "../../Loader";

const AllSupportTicketsMain = () => {
  const [state, setState] = useSetState({
    alltickets: false,
    viewtickets: false,
    faculty: false,
    loading: true,
  });

  const { id } = useParams(); // ✅ dynamic id from URL
  const pathname = usePathname();

  console.log("id", id);

  useEffect(() => {
    const Faculty = localStorage.getItem("isFaculty");
    setState({ faculty: Faculty === "true" ? true : false });
  }, []);

  useEffect(() => {
    if (id) {
      // ✅ when /help-desk/alumni-tickets/[id]
      setState({ alltickets: false, viewtickets: true });
    } else if (pathname.includes("/help-desk/alumni-tickets")) {
      // ✅ when just /help-desk/alumni-tickets
      setState({ alltickets: true, viewtickets: false });
    } else {
      setState({ alltickets: false, viewtickets: false });
    }

    setState({ loading: false });
  }, [pathname, id]);

  const renderContent = () => {
    if (pathname.includes("/help-desk/open-tickets")) {
      return <OpenTicketsMain />;
    }
    if (pathname.includes("/help-desk/all-support-tickets")) {
      return <AllTicketsMain />;
    }
    if (pathname.includes("/help-desk/all-messages")) {
      return <AllMessagesMain />;
    }
    if (pathname.includes(`/help-desk/alumni-tickets/${id}`)) {
      return <ViewAlumniTickets />;
    }

    if (pathname.includes("/help-desk/alumni-tickets")) {
      return <AlumniTicketsTable />;
    }
    if (pathname.includes(`/help-desk/ticket-detail/${id}`)) {
      return <ViewTicketDetails />;
    }

    return null;
  };

  return (
    <Provider store={Store}>
      <Context>
        {state.loading ? (
          // 🔹 Full page loader
          <Loader />
        ) : (
          <>
            <MobileMenu />
            <KITHeader headerSticky="rbt-sticky" headerType="" />
            <BreadCrumb title="Help Desk" text="Support Tickets" />

            <div className="rbt-dashboard-area rbt-section-gapBottom section-pad">
              <div className="container-fluid">
                <div className="row justify-content-center mx-0 px-0">
                  <div className="col-11 col-xl-10 px-0 mx-0 con-wid">
                    <div className="container-fluid px-0 mx-0">
                      <div className="row">
                        <div className="col-lg-12 px-0 mx-0">
                          <div className="row g-5">
                            {/* show sidebar only when not in list/detail */}
                            {!state?.alltickets &&
                              !state?.viewtickets &&
                              !state?.faculty && (
                                <div className="col-lg-3">
                                  <SideBarHelpDesk />
                                </div>
                              )}

                            <div
                              className={`${
                                state?.alltickets ||
                                state?.viewtickets ||
                                state?.faculty
                                  ? "col-lg-12"
                                  : "col-lg-9"
                              }`}
                            >
                              {renderContent()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {/* <Separator /> */}
            <KITFooter />
          </>
        )}
      </Context>
    </Provider>
  );
};

export default AllSupportTicketsMain;
