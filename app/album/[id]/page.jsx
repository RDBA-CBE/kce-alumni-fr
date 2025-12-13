"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import MobileMenu from "@/components/Header/MobileMenu";

import BreadCrumb from "@/components/Common/BreadCrumb";
import FooterOne from "@/components/Footer/Footer-One";

import KITHeader from "@/components/Header/KITHeader";
import GalleryMain from "@/components/(Alumni)/component/main/GalleryMain";
import KITFooter from "@/components/Footer/KITFooter";
import GalleryLoginMain from "@/components/(Alumni)/component/main/GalleryLoginMain";
import { useEffect, useState } from "react";
import AlbumMain from "@/components/(Alumni)/component/main/AlbumMain";


const Page = () => {
   const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAlumniManager, setIsAlumniManager] = useState(false);
    const [isFatulty, setIsFatulty] = useState(false);
    const [isAlumni, setIsAlumni] = useState(false);
  
    useEffect(() => {
      const Token = localStorage.getItem("token");
  
      setToken(Token);
    });

  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />

          <BreadCrumb title="Album" text="Album" />

          < AlbumMain />

          

          < KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default Page;
