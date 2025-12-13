import { validateForm } from "@/utils/commonFunction.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import FormField from "@/commonComponents/FormFields";
import axios from "axios";
import Models from "@/imports/models.import";
import { BaseURL } from "@/utils/BaseUrl";

const ForgetPasswordMain = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const success = (successMsg) => {
      messageApi.open({
        type: "success",
        content:
          successMsg || "Success! Check your email for further instructions.",
      });
    };

    const errorNotification = (error) => {
      messageApi.open({
        type: "error",
        content: error || "An error occurred. Please try again.",
      });
    };

    const validationRules = {
      email: { required: true },
    };
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) {
      setLoading(false);

      return;
    }

    axios
      .post(`${BaseURL}/forget_password/`, formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("response:", res.data);
          success(res?.data?.message);
        }
        console.log("response:", res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log("Error:", error);
        errorNotification(error?.response?.data?.error);
      });
  };

  return (
    <>
      <div className="col-lg-6">
        {contextHolder}
        <div className="rbt-contact-form contact-form-style-1 max-width-auto">
          <h3 className="title">Forgot Password</h3>
          <form className="max-width-auto" onSubmit={handleSubmit}>
            <div className="form-group">
              <FormField
                placeholder="User Name"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errMsg.email}
                required={true}
              />
              <span className="focus-border"></span>
            </div>
            

            

            <div className="form-submit-group d-flex justify-content-between">
              <button
                type="button"
                className="rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none"
                 onClick={()=>router.push("/login")}
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Cancel</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  
                </span>
              </button>
              <button
                type="submit"
                className="rbt-btn btn-md btn-gradient hover-icon-reverse "
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Update Password</span>
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
               Back to <Link href={"/login"}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordMain;
