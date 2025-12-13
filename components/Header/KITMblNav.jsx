"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useAppContext } from "@/context/Context";
import { menus } from "@/utils/constant.utils";
import { useSetState } from "@/utils/commonFunction.utils";

const KITMblNav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const pathname = usePathname();
  const isActive = (href) => pathname.startsWith(href);

  const toggleMenuItem = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

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

  // read auth info
  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);

    setIsAdmin(localStorage.getItem("isAdmin") === "true");
    setIsAlumniManager(localStorage.getItem("isAlumniManager") === "true");
    setIsFaculty(localStorage.getItem("isFaculty") === "true");
    setIsAlumni(localStorage.getItem("isAlumni") === "true");
    const memberId = localStorage.getItem("member_id");
    setIsmemberId(memberId);
  }, []);

  // set menu based on role
  useEffect(() => {
    const { admin, alumniManager, alumni, faculty, user, guest } =
      state?.menuList || {};

    if (token && isAdmin) {
      setState({ userMenu: admin });
    } else if (token && isAlumniManager) {
      setState({ userMenu: alumniManager });
    } else if (token && isAlumni) {
      setState({ userMenu: alumni });
    } else if (token && isFaculty) {
      setState({ userMenu: faculty });
    } else if (token) {
      setState({ userMenu: user });
    } else {
      setState({ userMenu: guest });
    }
  }, [token, isAdmin, isAlumniManager, isAlumni, isFaculty, state.menuList]);

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        {state.userMenu.map((menu, index) => (
          <li
            key={index}
            className={`${
              menu.children ? "has-menu-child-item with-megamenu" : ""
            }`}
          >
            <Link
              href={menu.href || "#"}
              className={`${activeMenuItem === menu.key ? "open" : ""}`}
              onClick={() => toggleMenuItem(menu.key)}
            >
              {menu.label}
              
            </Link>

           
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default KITMblNav;
