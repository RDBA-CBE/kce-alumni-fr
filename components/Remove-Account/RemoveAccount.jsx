"use client";

import React, { useState } from "react";
import Link from "next/link";
import { message } from "antd";

const RemoveAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneClean = formData.phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    // Reason validation
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for removal is required";
    } else if (formData.reason.trim().length < 5) {
      newErrors.reason = "Reason must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      message.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      // Simulate API submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const successNotice =
        "Your request has been submitted to the admin. The admin will review and process your account removal.";

      setSuccessMessage(successNotice);
      message.success(successNotice);

      // Reset form data after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
      message.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rbt-contact-area bg-color-white rbt-section-gap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {/* Information Notice Card */}


            {/* Success Message Banner */}
            {successMessage && (
              <div
                className="p-4 mb-4 radius-6"
                style={{
                  backgroundColor: "#ebfbee",
                  border: "1px solid #b2f2bb",
                  borderRadius: "8px",
                }}
              >
                <div className="d-flex align-items-start">
                  <div className="me-3 mt-1">
                    <i
                      className="feather-check-circle"
                      style={{ fontSize: "28px", color: "#2b8a3e" }}
                    ></i>
                  </div>
                  <div>
                    <h5 className="mb-1" style={{ color: "#2b8a3e", fontWeight: "600" }}>
                      Request Submitted Successfully!
                    </h5>
                    <p className="mb-1" style={{ color: "#212529", fontSize: "15px", fontWeight: "500" }}>
                      {successMessage}
                    </p>

                  </div>
                </div>
              </div>
            )}

            {/* Form Card */}
            <div
              className="rbt-contact-form contact-form-style-1 max-width-auto shadow-sm"
              style={{
                background: "#ffffff",
                border: "1px solid #e9ecef",
                borderRadius: "10px",
                padding: "40px",
              }}
            >
              <div className="section-title text-start mb-4">
                <span className="subtitle bg-primary-opacity">KCE ALUMNI</span>
                <h3 className="title mt-2">Request Account Removal</h3>
                <p className="description text-muted">
                  Please provide your registered details below to submit an account deletion request.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="form-group mb--20">
                  <label
                    htmlFor="name"
                    className="form-label d-block text-dark fw-bold mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Enter your registered full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    style={{
                      border: errors.name ? "1px solid #dc3545" : "1px solid #ced4da",
                      borderRadius: "6px",
                      padding: "12px 16px",
                    }}
                  />
                  {errors.name && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <i className="feather-alert-circle me-1"></i> {errors.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="form-group mb--20">
                  <label
                    htmlFor="email"
                    className="form-label d-block text-dark fw-bold mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    Primary Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter your registered email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    style={{
                      border: errors.email ? "1px solid #dc3545" : "1px solid #ced4da",
                      borderRadius: "6px",
                      padding: "12px 16px",
                    }}
                  />
                  {errors.email && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <i className="feather-alert-circle me-1"></i> {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group mb--20">
                  <label
                    htmlFor="phone"
                    className="form-label d-block text-dark fw-bold mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <input
                    name="phone"
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number (e.g. 9842198210)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    style={{
                      border: errors.phone ? "1px solid #dc3545" : "1px solid #ced4da",
                      borderRadius: "6px",
                      padding: "12px 16px",
                    }}
                  />
                  {errors.phone && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <i className="feather-alert-circle me-1"></i> {errors.phone}
                    </div>
                  )}
                </div>

                {/* Reason */}
                <div className="form-group mb--25">
                  <label
                    htmlFor="reason"
                    className="form-label d-block text-dark fw-bold mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    Reason for Removal <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="reason"
                    id="reason"
                    rows="4"
                    placeholder="Please explain why you want to delete your account..."
                    value={formData.reason}
                    onChange={handleChange}
                    className={`form-control ${errors.reason ? "is-invalid" : ""}`}
                    style={{
                      border: errors.reason ? "1px solid #dc3545" : "1px solid #ced4da",
                      borderRadius: "6px",
                      padding: "12px 16px",
                      minHeight: "110px",
                    }}
                  ></textarea>
                  {errors.reason && (
                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <i className="feather-alert-circle me-1"></i> {errors.reason}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="form-submit-group mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                    style={{
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">
                        {isSubmitting ? "Submitting Request..." : "Submit Removal Request"}
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                      <span className="btn-icon">
                        <i className="feather-arrow-right"></i>
                      </span>
                    </span>
                  </button>
                </div>
              </form>

              <div className="text-center mt-4">
                <p className="text-muted" style={{ fontSize: "13px" }}>
                  For additional support, email us directly at{" "}
                  <a href="mailto:alumni@kce.ac.in" className="color-primary fw-bold">
                    alumni@kce.ac.in
                  </a>{" "}
                  or read our{" "}
                  <Link href="/privacy-policy" className="color-primary fw-bold">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveAccount;
