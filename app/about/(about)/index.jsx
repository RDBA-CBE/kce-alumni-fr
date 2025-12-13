"use client";

import React from "react";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";


import KITHeader from "@/components/Header/KITHeader";

import KITFooter from "@/components/Footer/KITFooter";
import BreadCrumb from "@/components/Common/BreadCrumb";
import AboutMain from "@/components/(Alumni)/component/main/AboutMain";


const About = () => {
console.log('✌️About --->', );
  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />

         <BreadCrumb title="About" text="About" />

         <AboutMain/>

        <Cart />

         {/* <Separator /> */}
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default About;
