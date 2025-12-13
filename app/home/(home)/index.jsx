"use client";

import React from "react";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";

import MainDemo from "@/components/01-Main-Demo/01-Main-Demo";

import KITHeader from "@/components/Header/KITHeader";
import HomeMain from "@/components/(Alumni)/component/main/HomeMain";
import KITFooter from "@/components/Footer/KITFooter";

const Home = ({ getBlog }) => {
  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />

        <HomeMain />

         {/* <Separator /> */}
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default Home;
