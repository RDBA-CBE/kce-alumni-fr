import Image from "next/image";
import Link from "next/link";

import UserData from "../../../data/user.json";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import Loader from "@/components/(Alumni)/Loader";

const KITUser = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
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
        try {
          setLoading(true)
          localStorage.clear();
          setLoading(false)
          window.location.href = "/";
        } catch (error) {
          console.log("✌️error --->", error);
          setLoading(false)
        }
      },
      onCancel() {
        console.log("Cancel");
        setLoading(false)
      },
    });
  };

  const logOut = async () => {
    try {
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  return (
    <>
     
      <div className="rbt-user-menu-list-wrapper">
        {UserData &&
          UserData.user.map((person, index) => (
            <div className="inner" key={index}>
              {/* <div className="rbt-admin-profile">
                <div className="admin-thumbnail">
                  <Image
                    src={person.img}
                    width={43}
                    height={43}
                    alt="User Images"
                  />
                </div>
                <div className="admin-info">
                  <span className="name">{person.name}</span>
                  <Link
                    className="rbt-btn-link color-primary"
                    href="/instructor-profile"
                  >
                    View Profile
                  </Link>
                </div>
              </div> */}
             

              <ul className="user-list-wrapper cursor-pointer">
                {token ? (
                  <>
                   <li
                 
                
                >
                  <Link href="/change-password">
                    <i className="feather-lock"></i>
                    <span>Change Password</span>
                  </Link>
                </li>

                <li
                 onClick={() => showDeleteConfirm()}
                
                >
                  <Link href="#">
                    <i className="feather-log-out"></i>
                    <span>Logout</span>
                  </Link>
                </li></>
                 
                ) : (
                  <li
                 
                
                >
                  <Link href="/login">
                    <i className="feather-log-in"></i>
                    <span>Login</span>
                  </Link>
                </li>
                ) }
                
                 
              </ul>
            </div>
          ))}
      </div>
    </>
  );
};

export default KITUser;
