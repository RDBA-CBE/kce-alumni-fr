"use client";

import Separator from "@/components/Common/Separator";

import MobileMenu from "@/components/Header/MobileMenu";
import Context from "@/context/Context";
import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import SideBarHelpDesk from "../KITSidebar/SideBarHelpDesk";
import BreadCrumb from "../../../Common/BreadCrumb";

import OpenTicketsMain from "../KITHelpDesk/OpenTicketsMain";

const OpenTickets = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />
          <BreadCrumb title="Open Tickets" text="Open Tickets" />

          <div className="rbt-dashboard-area  rbt-section-gapBottom section-pad">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-11 col-xl-10">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* <InstructorDashboardHeader /> */}

                        <div className="row g-5">
                          <div className="col-lg-3">
                            <SideBarHelpDesk />
                          </div>

                          <div className="col-lg-9">
                            {/* <AdminMain /> */}
                            <OpenTicketsMain />
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
        </Context>
      </Provider>
    </>
  );
};

export default OpenTickets;
