import { objIsEmpty, validateForm } from "@/utils/commonFunction.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import FormField from "@/commonComponents/FormFields";
import Models from "@/imports/models.import";
import Loader from "./Loader";

const LoginMain = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [loading, setLoading] = useState(false);

  // AntD message
  const [messageApi, contextHolder] = message.useMessage();

  // hold toast to trigger inside useEffect
  const [toast, setToast] = useState(null); // {type:'success'|'error', content:'text'}

  // show message only when toast changes (React-18 safe)
  useEffect(() => {
    if (toast) {
      messageApi.open(toast);
      setToast(null);
    }
  }, [toast, messageApi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const validationRules = {
        username: { required: true },
        password: { required: true },
      };

      const isValid = validateForm(formData, validationRules, setErrMsg);
      if (!isValid) {
        setLoading(false);
        return;
      }

      const res = await Models.auth.login(formData);

      // Save tokens and group flags
      localStorage.setItem("token", res.access);
      localStorage.setItem("user_id", res?.user_id);
      localStorage.setItem("member_id", res.member_id);
      localStorage.setItem("isAdmin", res?.groups?.Administrator);
      localStorage.setItem("isAlumniManager", res?.groups?.Alumni_Manager);
      localStorage.setItem("isAlumni", res?.groups?.Alumni);
      localStorage.setItem("isFaculty", res?.groups?.Faculty);
      localStorage.setItem("isAlumniProfile", res?.modules?.module1);
      localStorage.setItem("isAlumniEducation", res?.modules?.module2);
      localStorage.setItem("isAlumniExperience", res?.modules?.module3);
      localStorage.setItem("isAlumniContact", res?.modules?.module4);
      localStorage.setItem("isMilestone", res?.modules?.milestone);

      const group = res?.groups?.Student
        ? "student"
        : res?.groups?.Alumni
        ? "alumni"
        : null;
      localStorage.setItem("group", group);

      // show success toast
      setToast({ type: "success", content: "Successfully Logged In" });

      // redirect logic
      if (
        res?.groups?.Alumni_Manager === true ||
        res?.groups?.Administrator === true
      ) {
        router.push("/users");
      } else if (res?.groups?.Alumni === true) {
        const modules = res?.modules;

        if (!objIsEmpty(modules)) {
          if (modules.module1 === false) {
            router.push("/profile-photograph");
          } else if (modules.module2 === false) {
            router.push("/profile-education");
          } else if (modules.module3 === false) {
            router.push("/profile-experience");
          } else if (modules.module4 === false) {
            router.push("/profile-alumni");
          } else if (modules.milestone === false) {
            router.push("/profile-milestone");
          } else {
            router.push("/home");
          }
        } else {
          router.push("/home");
          console.error("Modules data is missing.");
        }
      } else if (res?.groups?.Faculty === true) {
        router.push("/help-desk/all-support-tickets");
      } else {
        console.log("User does not belong to Alumni or Admin groups.");
      }

      setFormData({
        username: "",
        password: "",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setToast({
        type: "error",
        content: error.error || "An error occurred. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center pt-10 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="col-lg-6">
          {contextHolder}
          <div className="rbt-contact-form contact-form-style-1 max-width-auto">
            <h3 className="title">Login</h3>
            <form className="max-width-auto" onSubmit={handleSubmit1}>
              <div className="form-group">
                <FormField
                  placeholder="Username*"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errMsg.username}
                  required={true}
                />
                <span className="focus-border"></span>
              </div>
              <div className="form-group">
                <FormField
                  placeholder="Password*"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errMsg.password}
                  required={true}
                />
                <span className="focus-border"></span>
              </div>

              <div className="row mb--30">
                <div className="col-12">
                  <div className="rbt-lost-password text-end">
                    <Link className="rbt-btn-link" href="/forgot-password">
                      Lost your password?
                    </Link>
                  </div>
                </div>
              </div>

              <div className="form-submit-group">
                <button
                  type="submit"
                  className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Log In</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </button>
              </div>

              <div className="mt-5 text-center">
                <p>
                  Don't have an account? <Link href={"/signin"}>Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginMain;
