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

const ProfileExperienceMain = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        industry: "",
        role: "",
        location: "",
        start_date: "",
        end_date: null,
        is_currently_working: false,
    });

    const [errMsg, setErrMsg] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const [skills, setSkills] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const [memberSkills, setMemberSkills] = useState([]);
    const [industry, setIndustry] = useState([]);
    const [location, setLocation] = useState([]);
    const [role, setRole] = useState([]);
    const [isAlumniContact, setIsAlumniContact] = useState(false);

    const [state, setState] = useSetState({
        currentRolePage: 1,
        roleList: [],
        currenIndustryPage: 1,
        hasIndustryLoadMore: null,
        currenLocationPage: 1,
        hasLocationLoadMore: null,
    });

    useEffect(() => {
        const MemberId = localStorage.getItem("member_id");
        setMemberId(MemberId);
    }, [memberId]);

    useEffect(() => {
        if (memberId !== null) {
            getMemberSkills();
        }
    }, [memberId]);

    useEffect(() => {
        if (isAlumniContact !== null) {
            const AlumniContact = localStorage.getItem("isAlumniContact");
            setIsAlumniContact(AlumniContact);
        }
    }, [isAlumniContact]);

    // useEffect(() => {
    //   const AlumniExperience = localStorage.getItem("isAlumniExperience");
    //   (AlumniExperience == true || AlumniExperience == "true") &&
    //     router.push("/profile-alumni");
    //   console.log("✌️AlumniExperience --->", AlumniExperience);
    // }, []);

    useEffect(() => {
        GetIndustry();
        GetLocation();
        GetRole();
    }, []);

    const GetRole = async () => {
        try {
            const res = await Models.masters.roleList(state.currentRolePage);
            const dropdown = setDropdownData(res?.results, "role");
            setRole(dropdown);
            setState({
                roleList: dropdown,
                hasMoreLead: res.next,
            });
        } catch (error) {
            console.log("✌️error --->", error);
        }
    };

    const roleListLoadMore = async () => {
        try {
            if (state.hasMoreLead) {
                const res = await Models.masters.roleList(state.currentRolePage + 1);
                const dropdown = setDropdownData(res?.results, "role");
                setState({
                    roleList: [...state.roleList, ...dropdown],
                    hasMoreLead: res.next,
                    currentRolePage: state.currentRolePage + 1,
                });
            } else {
                setState({
                    roleList: state.roleList,
                });
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const GetIndustry = async () => {
        try {
            const res = await Models.job.industryList();
            const dropdown = setDropdownData(res?.results, "title");
            setIndustry(dropdown);
            setState({
                hasIndustryLoadMore: res?.next,
            });
        } catch (error) {
            console.log("✌️error --->", error);
        }
    };

    const GetLocation = async () => {
        try {
            const res = await Models.job.locationList();
            const dropdown = setDropdownData(res?.results, "location");
            setState({
                hasLocationLoadMore: res?.next,
            });
            setLocation(dropdown);
        } catch (error) {
            console.log("✌️error --->", error);
        }
    };

    const getMemberSkills = () => {
        axios
            .get(`${BaseURL}/retrieve_member_skills/${memberId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log("res :", res);
                setMemberSkills(res.data?.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value, // Set to checked for checkboxes
        }));
    };

    const handleEducationSubmit = async (e) => {
        e.preventDefault();
        console?.log("formDdata:", formData);

        const validationRules = {
            industry: {
                required: true,
            },
            role: {
                required: true,
            },
            start_date: {
                required: true,
            },
            location: {
                required: true,
            },
        };

        const isValid = validateForm(formData, validationRules, setErrMsg);
        if (!isValid) return;
        const body = {
            member: memberId,
            industry: formData.industry.value,
            role: formData.role?.value,
            location: formData.location.value,
            start_date: formData.start_date,
            end_date: formData.end_date,
            is_currently_working: formData.is_currently_working,
        };

        try {
            const res = await axios.post(
                `${BaseURL}/create_member_experience/`,
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

            setFormData({
                industry: "",
                role: "",
                location: "",
                start_date: "",
                end_date: null,
                is_currently_working: false,
            });

            if (isAlumniContact == true || isAlumniContact == "true") {
                router.push("/edit-basic-profile");
            } else {
                router.push("/profile-alumni");
            }
        } catch (error) {
            console.log("error :", error);
            messageApi.open({
                type: "error",
                content: error.response.data.message,
            });
        }
    };

    const locationListLoadMore = async () => {
        try {
            if (state.hasLocationLoadMore) {
                const res = await Models.job.locationList(state.currenLocationPage + 1);

                const LocationOption = setDropdownData(res?.results, "location");
                console.log("loadmore location res", res);

                setLocation([...location, ...LocationOption]);
                setState({
                    currenlocationPage: state.currenlocationPage + 1,
                    hasLocationLoadMore: res.next,
                });
            } else {
                setLocation(location);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const industryListLoadMore = async () => {
        try {
            if (state.hasIndustryLoadMore) {
                const res = await Models.job.industryList(state.currenIndustryPage + 1);

                const IndustryOption = setDropdownData(res?.results, "title");

                setIndustry([...industry, ...IndustryOption]);
                setState({
                    currenIndustryPage: state.currenIndustryPage + 1,
                    hasIndustryLoadMore: res.next,
                });
            } else {
                setIndustry(industry);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };


    const stepsData = [
        { label: "Profile Photo", icon: "feather-image", className: "active" },
        { label: "Educational Details", icon: "feather-book", className: "active" },
        { label: "Experience", icon: "feather-briefcase ", className: "active" },
        { label: "Contact", icon: "feather-phone-forwarded" },
        { label: "Milestone", icon: "feather-star" },
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
                                                    Highest Experience
                                                    <div
                                                        className="text-gray mt-2"
                                                        style={{ fontSize: "14px" }}
                                                    >Please add details of your highest level of qualification. If you have already submitted the details earlier, please add second highest educational qualification details. <br /> <br />
                                                        You may <Link href={"/profile-alumni"}>
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
                                                                    type="loadMoreSelect"
                                                                    name="industry"
                                                                    label="Industry"
                                                                    // className={"applicant-input "}
                                                                    onChange={(value) =>
                                                                        setFormData({
                                                                            ...formData,
                                                                            industry: value,
                                                                        })
                                                                    }
                                                                    value={formData.industry}
                                                                    options={industry}
                                                                    error={errMsg?.industry}
                                                                    required
                                                                    loadMore={() => industryListLoadMore()}
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <FormField
                                                                    type="loadMoreSelect"
                                                                    name="role"
                                                                    label="Role"
                                                                    // className={"applicant-input"}
                                                                    onChange={(value) =>
                                                                        setFormData({
                                                                            ...formData,
                                                                            role: value,
                                                                        })
                                                                    }
                                                                    value={formData.role}
                                                                    error={errMsg?.role}
                                                                    options={role}
                                                                    required
                                                                    loadMore={() => roleListLoadMore()}
                                                                />
                                                            </div>






                                                            <div className="">
                                                                <FormField
                                                                    type="date"
                                                                    name="start_date"
                                                                    label="Start Date"
                                                                    // className={"applicant-input"}
                                                                    onChange={handleChange}
                                                                    value={formData.start_date}
                                                                    error={errMsg?.start_date}
                                                                    required={true}
                                                                />
                                                            </div>


                                                            <div className="w-100 mt--50">
                                                                <input
                                                                    type="checkbox"

                                                                    name="is_currently_working"
                                                                    label="Currently Pursuing?"
                                                                    onChange={handleChange}
                                                                    checked={formData?.is_currently_working || false} // Ensure it defaults to false if undefined
                                                                    error={errMsg?.is_currently_working}
                                                                    id="currentlyPursuing"
                                                                />
                                                                <label
                                                                    htmlFor={`currentlyPursuing`}
                                                                    style={{
                                                                        marginRight: "5px",
                                                                        color: "black",
                                                                        marginTop: "2px",
                                                                    }}
                                                                >
                                                                    Currently Working?
                                                                </label>
                                                            </div>



                                                            {formData?.is_currently_working !== true && (
                                                                <div className="">
                                                                    <FormField
                                                                        type="date"
                                                                        name="end_date"
                                                                        label="End Date"
                                                                        // className={"applicant-input"}
                                                                        onChange={handleChange}
                                                                        value={formData.end_date}
                                                                        error={errMsg?.end_date}
                                                                    />
                                                                </div>
                                                            )}


                                                            <div className="">
                                                                <FormField
                                                                    type="loadMoreSelect"
                                                                    name="location"
                                                                    label="Location"
                                                                    // className={"applicant-input"}
                                                                    onChange={(value) =>
                                                                        setFormData({
                                                                            ...formData,
                                                                            location: value,
                                                                        })
                                                                    }
                                                                    value={formData.location}
                                                                    options={location}
                                                                    error={errMsg?.location}
                                                                    required={true}
                                                                    loadMore={() => locationListLoadMore()}
                                                                />
                                                            </div>


                                                        </div>




                                                        <div className="form-submit-group d-flex justify-content-between flex-wrap">
                                                            <div className="d-flex justify-content-between">
                                                                <Link
                                                                    name="submit"
                                                                    type="button"
                                                                    id="submit"
                                                                    href="/profile-education"
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
                                                                    className="rbt-btn btn-md btn-gradient hover-icon-reverse ms-2"
                                                                >
                                                                    <span className="icon-reverse-wrapper">
                                                                        <span className="btn-text">
                                                                            Save and Continue
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
                                                                    href="/profile-alumni"
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

export default ProfileExperienceMain;
