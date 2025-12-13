"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";
// import sal from "sal.js";

import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import EventBreadCrumb from "@/components/Events/EventBreadCrumb";
import EventDetails from "@/components/Events/EventDetails";
import CallToActionFour from "@/components/Call-To-Action/CallToAction-Four";

import EventData from "../../../data/events.json";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import EventDetailsMain from "@/components/(Alumni)/component/main/EventDetailsMain";
import EventBanner from "@/components/(Alumni)/component/EventDetails/EventBanner";
import Link from "next/link";

const SingleEvent = () => {
  const { id } = useParams();
  console.log("id", id);

  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />
          <EventBanner />

          <div className="rbt-course-details-area section-pad">
            <div className="container">
              
                    <EventDetailsMain id={id} />
                  
            </div>
          </div>

          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default SingleEvent;
