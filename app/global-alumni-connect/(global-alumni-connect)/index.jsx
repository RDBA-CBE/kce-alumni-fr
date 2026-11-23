"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import MobileMenu from "@/components/Header/MobileMenu";
import BreadCrumb from "@/components/Common/BreadCrumb";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import GlobalAlumniConnect from "@/components/(Alumni)/component/GlobalAlumniConnect";

const GlobalAlumniConnectPage = () => {
  return (
    <Provider store={Store}>
      <Context>
        <MobileMenu />
        <KITHeader headerSticky="rbt-sticky" headerType="" />
        <BreadCrumb
          title="Global Alumni Connect"
          text="Global Alumni Connect"
        />
        <GlobalAlumniConnect />
        <KITFooter />
      </Context>
    </Provider>
  );
};

export default GlobalAlumniConnectPage;
