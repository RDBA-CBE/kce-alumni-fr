"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import MobileMenu from "@/components/Header/MobileMenu";
import BreadCrumb from "@/components/Common/BreadCrumb";
import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";

import AsiaPacificChapters from "@/components/(Alumni)/component/AsiaPacificChapter";

const AsiaPacificChapterPage = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />
          <BreadCrumb
            title="Asia Pacific Chapter"
            text="Asia Pacific Chapter"
          />
          <AsiaPacificChapters />
          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default AsiaPacificChapterPage;
