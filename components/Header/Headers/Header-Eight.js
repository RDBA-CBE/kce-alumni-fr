"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import HeaderRightTwo from "../Header-Right/HeaderRight-Two";
import Search from "../Offcanvas/Search";

import logo from "../../../public/images/logo/logo.png";
import logoLight from "../../../public/images/dark/logo/logo-light.png";
import { useAppContext } from "@/context/Context";
import KITNav from "../KITNav";
import { Modal } from "antd";

const HeaderEight = ({
  headerType,
  gapSpaceBetween,
  sticky,
  headerSticky,
  navigationEnd,
  container,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const { isLightTheme } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [token, setToken] = useState("");
  const { confirm } = Modal;
  
  useEffect(() => {
    const Token = localStorage.getItem("token");
    // if (!Token) {
    //   window.location.href = "/login";
    // }
    setToken(Token);
  }, []);


   const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure, You want to logout?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isAlumniManager");
        localStorage.removeItem("isAlumni");
        localStorage.removeItem("isFatulty");
        message.success("logout successfully");
        window.location.href = "/";
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };


  return (
    <>
      <div
        className={`rbt-header-wrapper ${gapSpaceBetween} ${sticky}  ${
          !headerType && isSticky ? `${headerSticky}` : ""
        }`}
      >
        <div className={`${container}`}>
          <div className={`mainbar-row ${navigationEnd} align-items-center`}>
            <div className="header-left rbt-header-content">
              <div className="header-info">
                <div className="logo">
                  <Link href="/">
                    {isLightTheme ? (
                      <Image
                        src={logo}
                        width={152}
                        height={50}
                        priority={true}
                        alt="Education Logo Images"
                      />
                    ) : (
                      <Image
                        src={logoLight}
                        width={152}
                        height={50}
                        priority={true}
                        alt="Education Logo Images"
                      />
                    )}
                  </Link>
                </div>
              </div>

              {/* <div className="header-info d-none d-lg-block">
                <Category />
              </div> */}
            </div>

            <div className="rbt-main-navigation d-none d-xl-block">
              <KITNav />
            </div>

            <HeaderRightTwo
              userType="Admin"
              btnText="Register Now"
              btnClass="  radius-round btn-sm "
            />
          </div>
        </div>
        <Search />
      </div>
    </>
  );
};

export default HeaderEight;
