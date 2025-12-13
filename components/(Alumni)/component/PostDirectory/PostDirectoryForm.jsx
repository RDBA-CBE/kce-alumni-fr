"use client";

import React, { useEffect, useState, useRef } from "react";
import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { message, Select } from "antd";
import Link from "next/link";
import { BaseURL } from "@/utils/BaseUrl";
import {
  setDropdownData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import FormField from "@/commonComponents/FormFields";
import { jobTypeOption, YearOfExperience } from "@/utils/constant.utils";
import axios from "axios";
import Models from "@/imports/models.import";

const PostDirectoryForm = () => {
  const router = useRouter();
  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    business_name: "",
    country_code: "",
    contact_email: "",
    contact_number: "",
    website: "",
    location: "",
    logo: null,
    description: "",
    industry_type: "",
    are_you_part_of_management: false,
  });
  const [errMsg, setErrMsg] = useState({});
  const [country, setCountry] = useState([]);

  const [preview, setPreview] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const fileInputRef = useRef(null);
  const [token, setToken] = useState("");
  const [industryType, setIndustryType] = useState([]);

  const [state, setState] = useSetState({
    currenIndustryTypePage: 1,
    hasIndustryTypeLoadMore: null,
    currenCountryPage: 1,
    hasCountryLoadMore: null,
  });

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    if (!Token) {
      router.push("/login");
    }
  }, []);

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const UserId = localStorage.getItem("user_id");
    setUserId(UserId);
  }, []);

  useEffect(() => {
    if (token) {
      countryList();
      GetIndustryType();
    }
  }, [token]);

  const countryList = async () => {
    try {
      const res = await Models.masters.GetCountryList(1);

      const countryOptions = res?.results?.map((cou) => ({
        value: cou.id,
        label: cou.country_name,
      }));
      setCountry(countryOptions);
      setState({
        hasCountryLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const GetIndustryType = async () => {
    try {
      const res = await Models.masters.bussinessTypeList(1);
      const JobOption = res?.results?.map((job) => ({
        value: job.id,
        label: job.type_name,
      }));

      setIndustryType(JobOption);
      setState({
        hasIndustryTypeLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const industryTypeListLoadMore = async () => {
    try {
      if (state.hasIndustryTypeLoadMore) {
        const res = await Models.masters.bussinessTypeList(
          state.currenIndustryTypePage + 1
        );

        const IndustryTypeOption = res?.results?.map((job) => ({
          value: job.id,
          label: job.type_name,
        }));

        setIndustryType([...industryType, ...IndustryTypeOption]);
        setState({
          currenIndustryTypePage: state.currenIndustryTypePage + 1,
          hasIndustryTypeLoadMore: res.next,
        });
      } else {
        setIndustryType(industryType);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const CountryListLoadMore = async () => {
    try {
      if (state.hasCountryLoadMore) {
        const res = await Models.masters.GetCountryList(
          state.currenCountryPage + 1
        );

        const countryOptions = res?.results?.map((cou) => ({
          value: cou.id,
          label: cou.country_name,
        }));

        setCountry([...country, ...countryOptions]);
        setState({
          currenCountryPage: state.currenCountryPage + 1,
          hasCountryLoadMore: res.next,
        });
      } else {
        setCountry(country);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
      }
    } else if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked, // Update checkbox state
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDeleteImage = () => {
    setPreview(null);
    setFormData((prevState) => ({
      ...prevState,
      logo: null,
    }));
    setFileInputKey(Date.now());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      business_name: { required: true },
      country_code: { required: true },
      contact_email: { required: true },
      contact_number: { required: true },
      website: { required: true },
      location: { required: true },
      logo: { required: true },
      description: { required: true },
      industry_type: { required: true },
    };

    const isValid = validateForm(formData, validationRules, setErrMsg);

    if (!isValid) {
      console.log("Validation errors:", errMsg);
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      // Convert are_you_part_of_management to a boolean string if it's a checkbox
      if (key === "are_you_part_of_management") {
        formDataToSend.append(key, formData[key] ? "True" : "False"); // Ensure it's a string of 'true' or 'false'
      } else if (key === "industry_type") {
        formDataToSend.append("industry_type", formData.industry_type.value);
      } else if (key === "country_code") {
        formDataToSend.append("country_code", formData.country_code.value);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      setState({ btnLoading: true });

      const response = await axios.post(
        `${BaseURL}/create_business_directory/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✌️response --->", response);
      router.push("/business-directory/");
      setFormData({
        business_name: "",
        country_code: "",
        contact_email: "",
        contact_number: "",
        website: "",
        location: "",
        logo: null,
        description: "",
        industry_type: "",
      });
      setErrMsg({});
      setPreview(null);
      setFileInputKey(Date.now());
      setState({ btnLoading: false });
    } catch (error) {
      console.log("❌error --->", error);
      setState({ btnLoading: false });
    }
  };

  console.log("formData", formData);

  return (
    <div className={`rbt-contact-address `}>
      {contextHolder}
      <div className="container section-pad">
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex justify-content-between ">
              <h5>Post a Business Directory</h5>
              <Link
                className="rbt-btn btn-gradient radius-round sm-btn"
                href="/business-directory"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="form-wrapper">
              <div className="rbt-contact-form contact-form-style-1 max-width-auto bg-gray">
                <form
                  id="contact-form"
                  method="POST"
                  action="mail.php"
                  className="rainbow-dynamic-form max-width-auto"
                  onSubmit={handleSubmit}
                >
                  <div className="form-grid">
                    {/* Left Column */}
                    <div className="form-group">
                      <FormField
                        placeholder="Business Name"
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.business_name}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Contact Email"
                        type="email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.contact_email}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Contact Number"
                        type="tel"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.contact_number}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Website"
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.website}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Address"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={(e) => handleChange(e)}
                        error={errMsg.location}
                        required={true}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Country"
                        type="loadMoreSelect"
                        className="form-dd"
                        name="country_code"
                        value={formData.country_code}
                        onChange={(e) => {
                          setFormData({ ...formData, country_code: e });
                        }}
                        error={errMsg.country_code}
                        options={country}
                        required={true}
                        loadMore={() => CountryListLoadMore()}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Industry Type"
                        type="loadMoreSelect"
                        className="form-dd"
                        name="industry_type"
                        value={formData.industry_type}
                        onChange={(e) => {
                          setFormData({ ...formData, industry_type: e });
                        }}
                        error={errMsg.industry_type}
                        options={industryType}
                        required={true}
                        loadMore={() => industryTypeListLoadMore()}
                      />
                      <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                      <FormField
                        placeholder="Logo"
                        type="file"
                        name="logo"
                        ref={fileInputRef}
                        key={fileInputKey}
                        error={errMsg.logo}
                        onChange={(e) => handleChange(e)}
                        accept="image/*,application/pdf"
                        required={true}
                        className="file-input"
                      />
                      <span className="focus-border"></span>
                      {preview && (
                        <div
                          style={{
                            marginLeft: "10px",
                            width: "100px",
                            height: "80px",
                            position: "relative",
                          }}
                        >
                          {preview && (
                            <div
                              style={{
                                marginLeft: "10px",
                                width: "100px",
                                height: "80px",
                                position: "relative",
                              }}
                            >
                              <img
                                src={preview}
                                alt="preview"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              <button
                                type="button"
                                onClick={handleDeleteImage}
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  right: "0",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "red",
                                  fontSize: "20px",
                                }}
                              >
                                {/* <DeleteOutlined /> */}
                              </button>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={handleDeleteImage}
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: "red",
                              fontSize: "20px",
                            }}
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group w-100">
                    <FormField
                      placeholder="Job Description"
                      type="textarea"
                      className="file-input"
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleChange(e)}
                      error={errMsg.description}
                      required={true}
                    />
                  </div>

                  {/* <div className="form-group w-100">
                    <FormField
                      label="Are you part of management?"
                      type="checkbox"
                      name="are_you_part_of_management"
                      checked={formData.are_you_part_of_management}
                      onChange={(e) => handleChange(e)}
                    />
                  </div> */}

                  <div style={{ marginTop: "15px" }}>
                    <input
                      type="checkbox"
                      name="are_you_part_of_management"
                      onChange={(e) => handleChange(e)}
                      checked={formData.are_you_part_of_management}
                      id="partofmanagement"
                    />
                    <label
                      htmlFor={`partofmanagement`}
                      style={{
                        marginRight: "5px",
                        color: "black",
                        marginTop: "2px",
                      }}
                    >
                     Are you part of management?
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="form-submit-group mt--50">
                    <button
                      name="submit"
                      type="submit"
                      id="submit"
                      className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                      style={{
                        cursor: state?.btnLoading ? "not-allowed" : "pointer",
                      }}
                      disabled={state.btnLoading}
                    >
                      {state?.btnLoading ? (
                        <span className="btn-loader"></span>
                      ) : (
                        <span className="icon-reverse-wrapper">
                          <span className="btn-text">Submit</span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="feather-arrow-right"></i>
                          </span>
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDirectoryForm;
