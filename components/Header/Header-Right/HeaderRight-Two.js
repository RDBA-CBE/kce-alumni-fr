"use client";

import Link from "next/link";

import { useSelector } from "react-redux";

import { useAppContext } from "@/context/Context";
import KITUser from "../Offcanvas/KITUsers";
import { useEffect, useState } from "react";

const HeaderRightTwo = ({ btnClass, btnText, userType }) => {
  const { mobile, setMobile, search, setSearch, cartToggle, setCart } =
    useAppContext();

  const { total_items } = useSelector((state) => state.CartReducer);

   const [token, setToken] = useState("");
    
    useEffect(() => {
      const Token = localStorage.getItem("token");
      // if (!Token) {
      //   window.location.href = "/login";
      // }
      setToken(Token);
    }, []);

  return (
    <div className="header-right">
      <ul className="quick-access">
        {/* <li className="access-icon">
          <Link
            className={`search-trigger-active rbt-round-btn ${
              search ? "" : "open"
            }`}
            href="#"
            onClick={() => setSearch(!search)}
          >
            <i className="feather-search"></i>
          </Link>
        </li> */}

        {/* <li className="access-icon rbt-mini-cart">
          <Link
            className="rbt-cart-sidenav-activation rbt-round-btn"
            href="#"
            onClick={() => setCart(!cartToggle)}
          >
            <i className="feather-shopping-cart"></i>
            <span className="rbt-cart-count">{total_items}</span>
          </Link>
        </li> */}

        <li className="account-access rbt-user-wrapper d-none d-xl-block">
          <Link href="#">
            <i className="feather-user" style={{color:'#43ad27'}}></i>

          </Link>
          <KITUser />
        </li>

        <li className="access-icon rbt-user-wrapper d-block d-xl-none">
          <Link className="rbt-round-btn" href="#">
            <i className="feather-user"></i>
          </Link>
          <KITUser />
        </li>
      </ul>

      {!token &&
      <div className="rbt-btn-wrapper d-none d-xl-block">
        <Link className={`rbt-btn ${btnClass}`} href="/signin">
          <span data-text={`${btnText}`}>{btnText}</span>
        </Link>
      </div>
      }

      

      <div className="mobile-menu-bar d-block d-xl-none">
        <div className="hamberger">
          <button
            className="hamberger-button rbt-round-btn"
            onClick={() => setMobile(!mobile)}
          >
            <i className="feather-menu"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderRightTwo;
