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


import ApplicantsMain from "@/components/(Alumni)/component/main/ApplicantsMain";

const Applicants = () => {
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);

  useEffect(() => {
    const Token = localStorage.getItem("token");

    setToken(Token);
  });

  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />

        <BreadCrumb title="My Job List" text="My Job List" />

         <ApplicantsMain /> 

         {/* <Separator /> */}
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default Applicants;
