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

const ProfileAlumniMain = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        website: "",
        linked_in: "",
        location: "",
        twitter_handle: "",
        address: "",
        postal_code: "",
    });
    const [errMsg, setErrMsg] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const [skills, setSkills] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const [memberSkills, setMemberSkills] = useState([]);
    const [location, setLocation] = useState([]);
    const [isAlumniContact, setIsAlumniContact] = useState(false);

    const [state, setState] = useSetState({

        currenLocationPage: 1,
        hasLocationLoadMore: null,
    });

    useEffect(() => {
        const MemberId = localStorage.getItem("member_id");
        setMemberId(MemberId);
    }, [memberId]);

    useEffect(() => {
        if (isAlumniContact !== null) {
            const AlumniContact = localStorage.getItem("isAlumniContact");
            setIsAlumniContact(AlumniContact);
        }
    }, [isAlumniContact]);

    useEffect(() => {
        if (memberId !== null) {
            getMemberSkills();
            getDetails();
        }
    }, [memberId]);

    useEffect(() => {
        GetSkills();
        GetLocation();
    }, []);

    const GetSkills = () => {
        axios
            .get(`${BaseURL}/retrieve_skills/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setSkills(res.data?.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDetails = async () => {
        try {
            const res = await Models.member.member_contact(memberId);
            setFormData({
                website: res?.data?.website,
                linked_in: res?.data?.linked_in,
                location: res?.data?.location_detail,
                twitter_handle: res?.data?.twitter_handle,
                address: res?.data?.address,
                postal_code: res?.data?.postal_code,
            });
        } catch (error) {
            console.log("✌️error --->", error);
        }
        axios
            .get(`${BaseURL}/retrieve_skills/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setSkills(res.data?.results);
            })
            .catch((err) => {
                console.log(err);
            });
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

        // const validationRules = {
        //   website: {
        //     required: true,
        //   },
        //   linked_in: {
        //     required: true,
        //   },
        //   twitter_handle: {
        //     required: true,
        //   },
        // };

        // const isValid = validateForm(formData, validationRules, setErrMsg);
        // if (!isValid) return;
        const body = {
            member: memberId,
            website: formData.website,
            linked_in: formData.linked_in,
            location: formData.location.value,
            twitter_handle: formData.twitter_handle,
            address: formData.address,
            postal_code: formData.postal_code,
        };

        try {
            const res = await axios.post(`${BaseURL}/create_alumni/`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            messageApi.open({
                type: "success",
                content: res.data.message,
            });

            setFormData({
                website: "",
                linked_in: "",
                location: "",
                twitter_handle: "",
                address: "",
                postal_code: "",
            });

            router.push("/edit-basic-profile");
        } catch (error) {
            console.log("error :", error);
            messageApi.open({
                type: "error",
                content: error.response.data.linked_in
                    ? error.response.data.linked_in[0]
                    : error.response.data.website
                        ? error.response.data.website[0]
                        : error.response.data.twitter_handle
                            ? error.response.data.twitter_handle[0]
                            : error.response.data.message,
            });
        }
    };

    const LocationOption = location.map((location) => ({
        value: location.id,
        label: location.location,
    }));

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


    const stepsData = [
        { label: "Profile Photo", icon: "feather-image", className: "active" },
        { label: "Educational Details", icon: "feather-book", className: "active" },
        { label: "Experience", icon: "feather-briefcase ", className: "active" },
        { label: "Contact", icon: "feather-phone-forwarded", className: "active" },
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
                                                    Alumni Contact
                                                    <div
                                                        className="text-gray mt-2"
                                                        style={{ fontSize: "14px" }}
                                                    >
                                                        Please add details of your highest level of qualification. If you have already submitted the details earlier, please add second highest educational qualification details.
                                                        <br /> <br />
                                                        You may <Link href={"/profile-milestone"}>
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
                                                                    name="website"
                                                                    label="Website (URL)"
                                                                    // className={"applicant-input"}
                                                                    onChange={handleChange}
                                                                    value={formData.website}
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <FormField
                                                                    type="text"
                                                                    name="linked_in"
                                                                    label="Linked In"
                                                                    // className={"applicant-input"}
                                                                    onChange={handleChange}
                                                                    value={formData.linked_in}
                                                                />
                                                            </div>






                                                            <div className="">
                                                                <FormField
                                                                    type="text"
                                                                    name="twitter_handle"
                                                                    label="Twitter Handle"
                                                                    // className={"applicant-input"}
                                                                    onChange={handleChange}
                                                                    value={formData.twitter_handle}
                                                                />
                                                            </div>


                                                            <div className="w-100 ">
                                                                <FormField
                                                                    type="textarea"
                                                                    name="address"
                                                                    label="Address"
                                                                    // className={"applicant-input"}
                                                                    onChange={handleChange}
                                                                    value={formData.address}
                                                                // error={errMsg?.address}
                                                                />
                                                            </div>



                                                            {formData?.is_currently_working !== true && (
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
                                                                        loadMore={() => locationListLoadMore()}
                                                                    // error={errMsg?.location}
                                                                    />
                                                                </div>
                                                            )}


                                                            <div className="">
                                                                <FormField
                                                                    type="text"
                                                                    name="postal_code"
                                                                    label="Postal Code"
                                                                    // className={"applicant-input"}
                                                                    onChange={handleChange}
                                                                    value={formData.postal_code}
                                                                // error={errMsg?.postal_code}
                                                                />
                                                            </div>


                                                        </div>




                                                        <div className="form-submit-group d-flex justify-content-between flex-wrap">
                                                            <div className="d-flex justify-content-between">
                                                                <Link
                                                                    name="submit"
                                                                    type="button"
                                                                    id="submit"
                                                                    href="/profile-experience"
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
                                                                    href="/profile-milestone"
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

export default ProfileAlumniMain;
