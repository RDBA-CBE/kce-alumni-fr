"use client";

import React from "react";
import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import PrivacyPolicy from "@/components/Privacy-Policy/PrivacyPolicy";

const PrivacyPolicyComponent = () => {
  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />
        <PrivacyPolicy />
        <Cart />
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default PrivacyPolicyComponent;
