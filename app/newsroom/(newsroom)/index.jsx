"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import Separator from "@/components/Common/Separator";
import MobileMenu from "@/components/Header/MobileMenu";
import BreadCrumb from "@/components/Common/BreadCrumb";
import KITHeader from "@/components/Header/KITHeader";
import NewsRoomMain from "@/components/(Alumni)/component/main/NewsRoomMain";
import KITFooter from "@/components/Footer/KITFooter";
import SideBar from "@/components/(Alumni)/component/KITSidebar/SideBar";

import { useState } from "react";

const NewsRoom = () => {
  const [selectedYear, setSelectedYear] = useState("all"); // 👈 default to all

  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />
          <BreadCrumb title="Newsroom" text="Newsroom" />

          <div className="rbt-dashboard-area section-pad home-jobs">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row g-5">
                    <div className="col-lg-3">
                      <SideBar
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                      />
                    </div>

                    <div className="col-lg-9">
                      <NewsRoomMain selectedYear={selectedYear} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

           {/* <Separator /> */}
          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};


export default NewsRoom;
