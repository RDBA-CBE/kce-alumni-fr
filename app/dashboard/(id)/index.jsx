"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import MobileMenu from "@/components/Header/MobileMenu";



import KITHeader from "@/components/Header/KITHeader";
import GalleryMain from "@/components/(Alumni)/component/main/GalleryMain";
import KITFooter from "@/components/Footer/KITFooter";
import GalleryLoginMain from "@/components/(Alumni)/component/main/GalleryLoginMain";
import { useEffect, useState } from "react";
import MemoriesMain from "@/components/(Alumni)/component/main/MemoriesMain";
import KITBanner from "@/components/(Alumni)/component/KITSidebar/KITBanner";
import PostDetailMain from "@/components/(Alumni)/component/Dashboard/PostDetailMain";

const PostDetail = () => {
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

          

          < PostDetailMain/>

          

          < KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default PostDetail;
