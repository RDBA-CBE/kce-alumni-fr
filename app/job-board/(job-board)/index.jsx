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

import JobBoardMain from "@/components/(Alumni)/component/JobBoard/JobBoardMain";
import Loader from "@/components/(Alumni)/Loader";

const JobBoard = () => {
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Token = localStorage.getItem("token");

    setToken(Token);
    setLoading(false);
  });

    if (loading) {
      return <Loader />; // Show loader while checking token
    }

  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />

        <BreadCrumb title="Job Board" text="JobBoard" />

         <JobBoardMain /> 

         {/* <Separator /> */}
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default JobBoard;
