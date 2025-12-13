"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { menus } from "@/utils/constant.utils";
import { useSetState } from "@/utils/commonFunction.utils";

const KITNav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const pathname = usePathname();

  const isActive = (href) => pathname.startsWith(href);
  const toggleMenuItem = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

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
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        {state.userMenu?.map((menu,idx) => (
          <li
            key={idx}
            className="with-megamenu has-menu-child-item position-static"
          >
            <Link
              className={activeMenuItem === menu.key ? "open" : ""}
              href={menu.href}
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

export default KITNav;
