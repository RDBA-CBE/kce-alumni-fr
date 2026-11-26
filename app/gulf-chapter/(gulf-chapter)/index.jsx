"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import MobileMenu from "@/components/Header/MobileMenu";
import BreadCrumb from "@/components/Common/BreadCrumb";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";

import GulfChapters from "@/components/(Alumni)/component/GulfChapters";

const GulfChapter = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />
          <BreadCrumb title="Gulf Chapter" text="Gulf Chapter" />
          <GulfChapters />

          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default GulfChapter;
