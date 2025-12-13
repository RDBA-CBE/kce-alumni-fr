"use client";

import React, { useEffect, useState } from "react";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import BreadCrumb from "@/components/Common/BreadCrumb";
import MembersMain from "@/components/(Alumni)/component/main/MembersMain";
import MembersLoginMain from "@/components/(Alumni)/component/main/MembersLoginMain";
import Loader from "@/components/(Alumni)/Loader";

const Members = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    setLoading(false); // Stop loader once token is checked
  }, []);

  if (loading) {
    return <Loader />; // Show loader while checking token
  }

  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />
        <BreadCrumb title="Members" text="Members" />
        {token ? <MembersLoginMain /> : <MembersMain />}
         {/* <Separator /> */}
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default Members;
