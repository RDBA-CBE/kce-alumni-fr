"use client";

import BreadCrumb from "@/components/Common/BreadCrumb";
import KITFooter from "@/components/Footer/KITFooter";
import KITHeader from "@/components/Header/KITHeader";
import MobileMenu from "@/components/Header/MobileMenu";
import LoginMain from "@/components/(Alumni)/LoginMain";
import NewsletterThree from "@/components/Newsletters/Newsletter-Three";
import Context from "@/context/Context";
import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const Login = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />
          
          {/* <BreadCrumb title="Login" text="Login & Register" /> */}

          <div className="rbt-elements-area bg-color-white rbt-section-gap">
            <div className="container">
              <div className="row gy-5 row--30 justify-content-center">
                <LoginMain />
              </div>
            </div>
          </div>

          

          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default Login;
