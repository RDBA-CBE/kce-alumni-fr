"use client";

import Separator from "@/components/Common/Separator";

import MobileMenu from "@/components/Header/MobileMenu";

import Context from "@/context/Context";
import Store from "@/redux/store";
import React from "react";

import { Provider } from "react-redux";

import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";

import BreadCrumb from "@/components/Common/BreadCrumb";
import CreateMemberForm from "@/components/(Alumni)/component/Member/createMember";

const CreateMember = () => {

  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />

          <BreadCrumb title="New Member" text="New-Member" />

          <CreateMemberForm />
           {/* <Separator /> */}
          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default CreateMember;
