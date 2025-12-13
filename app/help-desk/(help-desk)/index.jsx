"use client";

import React, { useEffect, useState } from "react";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import MobileMenu from "@/components/Header/MobileMenu";
import Separator from "@/components/Common/Separator";

import KITHeader from "@/components/Header/KITHeader";

import KITFooter from "@/components/Footer/KITFooter";
import BreadCrumb from "@/components/Common/BreadCrumb";
import Form from "@/commonComponents/Form";
import PostJobForm from "@/components/(Alumni)/component/JobBoard/PostJobForm";
import HelpDeskFormMain from "@/components/(Alumni)/component/main/HelpDeskFormMain";
import AlumniTicketsTable from "@/components/(Alumni)/component/main/AlumniTicketsTable";
import { usePathname } from "next/navigation";


const HelpDeskForm = () => {

  const pathname = usePathname();
  
  const renderContent = () => {
    if (pathname.includes("/help-desk")) {
      return <HelpDeskFormMain />;
    }
   
    return null;
  };

  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />

        <BreadCrumb title="Help Desk" text="Help Desk" />

        <HelpDeskFormMain />

        {/* <JobBoardMain />  */}

         {/* <Separator /> */}
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default HelpDeskForm;
