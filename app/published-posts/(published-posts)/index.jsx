"use client";

import React, { useEffect, useState } from "react";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import MobileMenu from "@/components/Header/MobileMenu";
import Separator from "@/components/Common/Separator";

import KITHeader from "@/components/Header/KITHeader";

import KITFooter from "@/components/Footer/KITFooter";

import PublishPostMain from "@/components/(Alumni)/component/Dashboard/PublishPostMain";

const PublishPost = () => {
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

        {/* <BreadCrumb title="Business Directory" text="Business Directory" /> */}

         <PublishPostMain /> 

         {/* <Separator /> */}
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default PublishPost;
