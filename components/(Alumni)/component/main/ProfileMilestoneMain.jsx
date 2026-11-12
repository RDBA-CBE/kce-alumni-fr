import React, { useEffect, useState } from "react";

import MembersLoginCard from "./MembersLoginCard";
import Link from "next/link";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { memberType, registeredMember } from "@/utils/constant.utils";
import Models from "@/imports/models.import";
import {
    objIsEmpty,
    setDropdownData,
    useSetState,
    validateForm,
} from "@/utils/commonFunction.utils";
import useDebounce from "@/commonComponents/useDebounce";
import { usePathname } from "next/navigation";
import FormField from "@/commonComponents/FormFields";
import { TeamData } from "@/utils/constant.utils";
import Image from "next/image";
import Pagination from "@/commonComponents/Pagination";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";

const ProfileMilestoneMain = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        year: "",
    });
    const [errMsg, setErrMsg] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const [memberId, setMemberId] = useState(null);
    const [memberSkills, setMemberSkills] = useState([]);
    const [isAlumniContact, setIsAlumniContact] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    useEffect(() => {
        const MemberId = localStorage.getItem("member_id");
        setMemberId(MemberId);
    }, []);

    useEffect(() => {
        if (memberId !== null) {
            getMemberSkills();
            getExistingMilestone();
        }
    }, [memberId]);

    const getMemberSkills = () => {
        axios
            .get(`${BaseURL}/retrieve_member_skills/${memberId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setMemberSkills(res.data?.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getExistingMilestone = async () => {
        try {
            const res = await Models.masters.milestone(memberId);
            const latest = res?.results?.[0];
            if (!latest) return;
            setFormData({
                title: latest.title || "",
                description: latest.description || "",
                year: latest.year || "",
            });
        } catch (error) {
            console.log("✌️error --->", error);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (value) setErrMsg((prev) => ({ ...prev, [name]: "" }));
    };

    const handleEducationSubmit = async (e) => {
        e.preventDefault();
        console?.log("formDdata:", formData);
        const validationRules = {

            title: {
                required: true,
            },
            // description: {
            //     required: true
            // },
            year: {
                required: true,
            },
        };

        const isValid = validateForm(formData, validationRules, setErrMsg);
        if (!isValid) return;
        const body = {
            member: memberId,
            title: formData.title,
            description: formData.description,
            year: formData.year,
        };
        try {
            setBtnLoading(true);
            const res = await axios.post(
                `${BaseURL}/milestones/`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            messageApi.open({
                type: "success",
                content: res.data.message,
            });
            setBtnLoading(false);

            setFormData({
                title: "",
                description: "",
                year: "",
            });

            if (isAlumniContact == true || isAlumniContact == "true") {
                router.push("/edit-basic-profile");
            } else {
                router.push("/edit-basic-profile");
            }
        } catch (error) {
            console.log("error :", error);
            setBtnLoading(false);
            messageApi.open({
                type: "error",
                content: error.response.data.message,
            });
        }
    };


    const stepsData = [
        { label: "Profile Photo", icon: "feather-image", className: "active" },
        { label: "Educational Details", icon: "feather-book", className: "active" },
        { label: "Experience", icon: "feather-briefcase ", className: "active" },
        { label: "Contact", icon: "feather-phone-forwarded", className: "active" },
        { label: "Milestone", icon: "feather-star", className: "active"  },
    ];

    return (
        <div className="rbt-dashboard-area section-pad">
            {contextHolder}
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-xl-10">
                        <div className="row g-5">
                            <div className="col-lg-3 d-sidebar">
                                <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
                                    <div className="inner">
                                        <div className="content-item-content">
                                            <div className="rbt-default-sidebar-wrapper">
                                                <div className="custom-stepper container">
                                                    <ul className="stepper-list list-unstyled">
                                                        {stepsData.map((step, index) => (
                                                            <li key={index} className="stepper-item d-flex">
                                                                <div className="stepper-left">
                                                                    <div
                                                                        className={`stepper-circle ${step.className ? "active" : ""
                                                                            }`}
                                                                    >
                                                                        <i className={`${step.icon}`}></i>
                                                                    </div>
                                                                    {index < stepsData.length - 1 && (
                                                                        <div
                                                                            className={`stepper-line ${step.className ? "completed" : ""
                                                                                }`}
                                                                        ></div>
                                                                    )}
                                                                </div>
                                                                <div className="stepper-content">
                                                                    <span
                                                                        className={`stepper-text ${step.className ? "active" : ""
                                                                            }`}
                                                                    >
                                                                        {step.label}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9">
                                <div className="rbt-video-area bg-color-white overflow-hidden event-form rbt-shadow-box">
                                    <div className="container">
                                        <div className="row row--15 gy-5">
                                            <div className="section-title d-flex justify-content-between">
                                                <h4 className="rbt-title-style-3 mb-0">
                                                   Alumni Milestone
                                                    <div
                                                        className="text-gray mt-2"
                                                        style={{ fontSize: "14px" }}
                                                    >
                                                        Please add details of your Milestones 
                                                        <br /> <br />
                                                        You may <Link href={"/edit-basic-profile"}>
                                                            skip this step if not applicable.
                                                        </Link>
                                                    </div>
                                                </h4>


                                            </div>
                                            <div className="form-wrapper">
                                                <div className=" contact-form-style-1 max-width-auto py-0 px-3">
                                                    <form
                                                        id="contact-form"
                                                        className="rainbow-dynamic-form max-width-auto"
                                                        onSubmit={(e) => handleEducationSubmit(e)}
                                                    >
                                                        {/* Left Column */}
                                                        <div className="form-grid">
                                                            <div className="">
                                                                <FormField
                                                                   type="text"
                                                                    name="title"
                                                                    label="Title"
                                                                    // className={"applicant-input"}
                                                                    onChange={handleChange}
                                                                    value={formData.title}
                                                                    error={errMsg?.title}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <FormField
                                                                   type="text"
                                                                name="description"
                                                                label="Description"
                                                                // className={"applicant-input"}
                                                                onChange={handleChange}
                                                                value={formData.description}
                                                                />
                                                            </div>






                                                            <div className="">
                                                                <FormField
                                                                     type="text"
                                                                name="year"
                                                                label="Year"
                                                                onChange={handleChange}
                                                                value={formData.year}
                                                                error={errMsg?.year}
                                                                required={true}
                                                                />
                                                            </div>



                                                            


                                                        </div>




                                                        <div className="form-submit-group d-flex justify-content-between flex-wrap">
                                                            <div className="d-flex justify-content-between">
                                                                <Link
                                                                    name="submit"
                                                                    type="button"
                                                                    id="submit"
                                                                   href="/profile-alumni"
                                                                    className="rbt-btn btn-md btn-gradient hover-icon-reverse "
                                                                >
                                                                    <span className="icon-reverse-wrapper">
                                                                        <span className="btn-text">Back</span>
                                                                        <span className="btn-icon">
                                                                            <i className="feather-arrow-right"></i>
                                                                        </span>
                                                                        <span className="btn-icon">
                                                                            <i className="feather-arrow-left"></i>
                                                                        </span>
                                                                    </span>
                                                                </Link>
                                                                <button
                                                                    name="submit"
                                                                    type="submit"
                                                                    id="submit"
                                                                    disabled={btnLoading}
                                                                    className={`rbt-btn btn-md btn-gradient hover-icon-reverse ms-2 ${btnLoading ? "loading" : ""}`}
                                                                >
                                                                    <span className="icon-reverse-wrapper">
                                                                        <span className="btn-text">
                                                                            {btnLoading ? "Saving..." : "Save and Continue"}
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

                                                            <div className="rbt-card-bottom">
                                                                <a
                                                                    className="rbt-btn-link color-primary"
                                                                    // href="/edit-basic-profile"
                                                                    href="/dashboard"
                                                                >
                                                                    {" "}
                                                                    Skip & Go to Next Step
                                                                    <i className="feather-arrow-right"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileMilestoneMain;
