"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo/logo.png";

import { useAppContext } from "@/context/Context";
import KITMblNav from "./KITMblNav";
import { useEffect, useState } from "react";

import { menus } from "@/utils/constant.utils";
import { useSetState } from "@/utils/commonFunction.utils";

const MobileMenu = () => {
  const { mobile, setMobile } = useAppContext();

    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAlumniManager, setIsAlumniManager] = useState(false);
    const [isFaculty, setIsFaculty] = useState(false);
    const [isAlumni, setIsAlumni] = useState(false);
    const [member_id, setIsmemberId] = useState("");
  
  
    const [state, setState] = useSetState({
      menuList: menus,
      userMenu: [],
    });
  
    useEffect(() => {
      const Token = localStorage.getItem("token");
      setToken(Token);
  
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
      setIsAlumniManager(localStorage.getItem("isAlumniManager") === "true");
      setIsFaculty(localStorage.getItem("isFaculty") === "true");
      setIsAlumni(localStorage.getItem("isAlumni") === "true");
      const memberId = localStorage.getItem("member_id")
      setIsmemberId(memberId)
    }, []);
  
  
    useEffect(() => {
      const { admin, alumniManager, alumni, faculty, user, guest } =
        state?.menuList || {};
  
      if (token && isAdmin) {
        console.log("isAdmin");
        setState({ userMenu: admin });
      } else if (token && isAlumniManager) {
        console.log("isAlumniManager");
        setState({ userMenu: alumniManager });
      } else if (token && isAlumni) {
        console.log("isAlumni");
        setState({ userMenu: alumni });
      } else if (token && isFaculty) {
        console.log("isFaculty");
        setState({ userMenu: faculty });
      } else if (token) {
        console.log("token");
        setState({ userMenu: user });
      } else {
        console.log("guest");
        setState({ userMenu: guest });
      }
    }, [token, isAdmin, isAlumniManager, isAlumni, isFaculty, state.menuList]);

  return (
    <>
      <div className={`popup-mobile-menu ${mobile ? "" : "active"}`}>
        <div className="backdrop" onClick={() => setMobile(!mobile)}></div>
        <div className="inner-wrapper">
          <div className="inner-top">
            <div className="content">
              <div className="logo">
                {/* <Link href="/"> */}
                  <Image
                    src={logo}
                    width={137}
                    height={45}
                    alt="Education Logo Images"
                  />
                {/* </Link> */}
              </div>
              <div className="rbt-btn-close">
                <button
                  className="close-button rbt-round-btn"
                  onClick={() => setMobile(!mobile)}
                >
                  <i className="feather-x"></i>
                </button>
              </div>
            </div>
           
            <ul className="navbar-top-left rbt-information-list justify-content-start">
              <li>
                <Link href="mailto:hello@example.com">
                  <i className="feather-mail"></i>info@karpagamtech.ac.in
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="feather-phone"></i>0422 3502440
                </Link>
              </li>
            </ul>
          </div>

          <KITMblNav />

         

          <div className="mobile-menu-bottom">

             {!token && <div className="rbt-btn-wrapper mb--20">
              <Link
                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center"
                href="/signin"
              >
                <span>Register Now</span>
              </Link>
            </div>}
            

            <div className="social-share-wrapper">
              <span className="rbt-short-title d-block">Find With Us</span>
              <ul className="social-icon social-default transparent-with-border justify-content-start mt--20">
                <li>
                  <Link href="https://www.facebook.com/">
                    <i className="feather-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.twitter.com">
                    <i className="feather-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/">
                    <i className="feather-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkdin.com/">
                    <i className="feather-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
