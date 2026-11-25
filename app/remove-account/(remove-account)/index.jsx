"use client";

import React from "react";
import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import BreadCrumb from "@/components/Common/BreadCrumb";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import RemoveAccount from "@/components/Remove-Account/RemoveAccount";

const RemoveAccountComponent = () => {
  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />
        <BreadCrumb
          title="Account Removal Request"
          text="Remove Account"
        />
        <RemoveAccount />
        <Cart />
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default RemoveAccountComponent;
