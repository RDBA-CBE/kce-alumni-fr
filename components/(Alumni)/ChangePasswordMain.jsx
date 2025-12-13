import { validateForm } from "@/utils/commonFunction.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import FormField from "@/commonComponents/FormFields";
import axios from "axios";
import Models from "@/imports/models.import";

const ChangePasswordMain = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    // username: "",
    oldPassword: "",
    newPassword: "",
    confirmnewPassword: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const [token, setToken] = useState("");

  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (!Token) {
      router.push("/login");
    }
    setToken(Token);
  }, []);

  console.log("token", token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Function to show success message
    const success = (successMsg) => {
      messageApi.open({
        type: "success",
        content:
          successMsg || "Success! Check your email for further instructions.",
      });
    };

    // Function to show error notification
    const errorNotification = (error) => {
      messageApi.open({
        type: "error",
        content: error || "An error occurred. Please try again.",
      });
    };

    // Validation rules for the form
    const validationRules = {
      // username: { required: true },
      oldPassword: { required: true },
      newPassword: { required: true },
      confirmnewPassword: { required: true },
    };

    // Perform form validation
    const isValid = validateForm(formData, validationRules, setErrMsg);
    if (!isValid) return;

    // Check if new and confirm passwords match
    if (formData.newPassword !== formData.confirmnewPassword) {
      setErrMsg({
        ...errMsg,
        confirmnewPassword: "Passwords do not match.",
      });
      return;
    }

    const body = {
      // username: formData.username,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    axios
      .post(`${BaseURL}/change_password/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("response:", res);
        if (res.status === 200) {
          console.log("response data:", res.data);

          setTimeout(() => {
            success(res?.data?.message);
          }, 1000);
          localStorage.setItem("token", res.data.access);

          router.push("/");

          setFormData({
            // username: "",
            oldPassword: "",
            newPassword: "",
            confirmnewPassword: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Ensure error message is extracted properly
        const errorMessage =
          error?.response?.data?.error ||
          "An error occurred. Please try again.";
        errorNotification(errorMessage);
      });
  };

  return (
    <>
      <div className="col-lg-6">
        {contextHolder}
        <div className="rbt-contact-form contact-form-style-1 max-width-auto">
          <h3 className="title">Change Password</h3>
          <form className="max-width-auto" onSubmit={handleSubmit}>
            <div className="form-group">
              <FormField
                placeholder="Old Password"
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  error={errMsg.oldPassword}
                //   className="applicant-input"
                  required={true}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <FormField
                placeholder="New Password"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  error={errMsg.newPassword}
                //   className="applicant-input"
                  required={true}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-group">
              <FormField
                placeholder="Confirm New Password"
                  type="password"
                  name="confirmnewPassword"
                  value={formData.confirmnewPassword}
                  onChange={handleChange}
                  error={errMsg.confirmnewPassword}
                  
                  required={true}
              />
              <span className="focus-border"></span>
            </div>

            

            <div className="form-submit-group">
              <button
                type="submit"
                className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Update</span>
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
               Go Back to Home? <Link href={"/home"}>Back</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordMain;
