import FormField from "@/commonComponents/FormFields";
import Models from "@/imports/models.import";
import {
  formattedDate,
  objectToFormData,
  useSetState,
  validateForm,
} from "@/utils/commonFunction.utils";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { message, Modal } from "antd";
import { GENDER } from "@/utils/constant.utils";
import DatePickerField from "./datePicker";
import { useRouter } from "next/navigation";

const MemberData = (props) => {

  const router=useRouter()
  const { updateStep } = props;

  const fileInputRef = useRef(null);

  const [state, setState] = useSetState({
    email: "",
    confrmModelOpen: false,
    confrmModelOpen: false,
    proofModelOpen: false,
    dob: "",
    currenBatchPage: 1,
    errMsg: {},
  });
  console.log("✌️dob --->", state.dob);

  useEffect(() => {
    getCourse();
    getBatch();
    getMemberData();
  }, []);

  const getMemberData = async () => {
    try {
      const memberId = localStorage.getItem("memberId");
      const res = await Models.member.memberData(memberId);
      const salutation = await Models.masters.salutation();
      const SalutationOption = salutation?.results?.map((sal) => ({
        value: sal.salutation_id,
        label: sal.salutation_name,
      }));

      const find = SalutationOption?.find(
        (item) => item.value == res?.member_data?.salutation
      );

      const findGender = GENDER?.find(
        (item) => item.value == res?.member_data?.gender
      );
      if (res?.member_data?.batch_detail) {
        const batch = {
          value: res?.member_data?.batch_detail?.id,
          label: res?.member_data?.batch_detail?.title,
        };
        setState({ batch });
      }

      if (res?.member_data?.course_detail) {
        const course = {
          value: res?.member_data?.course_detail?.id,
          label: res?.member_data?.course_detail?.title,
        };
        setState({ course });
        getBatch(1, course.value);
      }

      setState({
        salutation: find,
        gender: findGender,
        mobile_no: String(res?.member_data?.mobile_no ?? ""),
        email: res?.member_data?.email,
        file: state.file,
        register_no: res?.member_data?.register_no,
        // dob: res?.member_data?.dob ? new Date(res?.member_data?.dob) : null,
      });
      setState({
        memberData: res?.member_data,
        salutationList: SalutationOption,
        memberId,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const getCourse = async () => {
    try {
      const res = await Models.masters.course();
      const CourseOption = res?.results?.map((cou) => ({
        value: cou.course_id,
        label: cou.title,
      }));
      setState({ courseList: CourseOption, hasCourseLoadMore: res?.next });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const getBatch = async (page = 1, courseId) => {
    try {
      const res = await Models.masters.batch(page, courseId);
      const BatchOption = res?.results?.map((bat) => ({
        value: bat.batch_id,
        label: bat.title,
      }));

      setState({
        batchList: BatchOption,
        currenBatchPage: page,
        hasBatchLoadMore: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isValid = validateForm(
        { email: state.email, register_no: state.register_no },
        {
          email: { required: true, email: true },
          register_no: { required: true },
        },
        (errMsg) => setState({ errMsg })
      );
      if (!isValid) return;

      const body = {
        salutation: state.salutation?.value,
        gender: state.salutation?.value,
        profile_picture: state.profile_picture,
        batch: state.batch?.value,
        course: state.course?.value,
        mobile_no: state.mobile_no,
        email: state.email.trim(),
        file: state.file,
        register_no: state.register_no.trim(),
      };

      const res = await Models.member.updateMemberData(state.memberId, body);
      router.push("/userInfo")
      // updateStep(res?.member_id, email);
    } catch (error) {
      console.log("✌️errorsddsf --->", error);
      if (error?.error == "Email not found in our records") {
        console.log("✌️records --->");
        setState({ confrmModelOpen: true, proofModelOpen: false });
      }
    }
  };

  const submitProof = async (e) => {
    try {
      e.preventDefault();
      const isValid = validateForm(
        { email: state.email, register_no: state.register_no },
        {
          email: { required: true, email: true },
          register_no: { required: true },
        },
        (errMsg) => setState({ errMsg })
      );
      if (!isValid) return;

      const body = {
        salutation: state.salutation?.value,
        gender: state.salutation?.value,
        profile_picture: state.profile_picture,
        batch: state.batch?.value,
        course: state.course?.value,
        mobile_no: state.mobile_no,
        email: state.email.trim(),
        file: state.file,
        register_no: state.register_no.trim(),
      };
      const formData = objectToFormData(body);
      const res = await Models.auth.newMemberProof(formData);
      message.success(res.message);
      setState({ proofModelOpen: false });
    } catch (error) {
      message.error(error?.error);
      setState({ proofModelOpen: false });
      console.log("✌️error --->", error);
    }
  };

  const batchListLoadMore = async () => {
    try {
      if (state.hasBatchLoadMore) {
        const nextPage = state.currenBatchPage + 1;
        const res = await Models.masters.batch(nextPage, state.course?.value);
        const BatchOption = res?.results?.map((bat) => ({
          value: bat.batch_id,
          label: bat.title,
        }));
        setState({
          currenBatchPage: nextPage,
          hasBatchLoadMore: res.next,
          batchList: [...state.batchList, ...BatchOption],
        });
      } else {
        setState({
          batchList: state.batchList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const courseListLoadMore = async () => {
    try {
      if (state.hasCourseLoadMore) {
        const res = await Models.masters.course(state.currenCoursePage + 1);
        const CourseOption = res?.results?.map((cou) => ({
          value: cou.course_id,
          label: cou.title,
        }));
        setState({
          currenCoursePage: state.currenCoursePage + 1,
          hasCourseLoadMore: res.next,
          courseList: [...state.courseList, ...CourseOption],
        });
      } else {
        setState({
          courseList: state.courseList,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    const value =
      name === "mobile_no"
        ? e.target.value.replace(/\D/g, "").slice(0, 10)
        : e.target.value;

    if (type === "file") {
      setState({ [name]: files[0] });
    } else {
      setState({ [name]: value });
    }
    setState({ errMsg: { ...state.errMsg, [name]: "" } });
  };

  return (
    <>
      <div className="col-lg-6">
        <div className="rbt-contact-form contact-form-style-1 max-width-auto">
          <h3 className="title">Profile Details</h3>
          <form className="max-width-auto" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group mt-3">
              <FormField
                type="loadMoreSelect"
                name="salutation"
                label="Salutation"
                // className={"applicant-input"}
                onChange={(value) => {
                  setState({ salutation: value });
                }}
                value={state.salutation}
                options={state.salutationList}
                error={state.errMsg?.salutation}
                required
                loadMore={() => {}}
                className="applicant-input"
              />
            </div>

            <div className="form-group mt-3">
              <FormField
                type="loadMoreSelect"
                name="Gender"
                label="Gender"
                onChange={(value) => {
                  setState({ gender: value });
                }}
                value={state.gender}
                options={GENDER}
                error={state.errMsg?.gender}
                required
                loadMore={() => {}}
                className="applicant-input"
              />
            </div>

            {/* <div className="form-group mt-3">
              <FormField
                placeholder="profile_picture"
                type="file"
                name="profile_picture"
                onChange={handleChange}
                value={state.profile_picture}
                error={state.errMsg?.profile_picture}
                className="applicant-input"
              />
            </div> */}
             <div className="form-group mt-3">
              <FormField
                type="loadMoreSelect"
                name="course"
                label="Course"
                onChange={(value) => {
                  setState({ course: value, batch: null });
                  getBatch(1, value?.value);
                }}
                value={state.course}
                options={state.courseList}
                error={state.errMsg?.course}
                required
                loadMore={() => courseListLoadMore()}
              />
            </div>
            <div className="form-group mt-3">
              <FormField
                type="loadMoreSelect"
                name="batch"
                label="Batch"
                onChange={(value) => {
                  setState({ batch: value });
                }}
                value={state.batch}
                options={state.batchList}
                error={state.errMsg?.batch}
                required
                loadMore={() => batchListLoadMore()}
              />
            </div>
           

            <div className="form-group">
              <FormField
                placeholder="Mobile No"
                type="tel"
                name="mobile_no"
                onChange={handleChange}
                value={state.mobile_no}
                error={state.errMsg?.mobile_no}
                required={true}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-group">
              <FormField
                type="date"
                onChange={(e) => setState({ dob: e.target.value })}
                name="dob"
                value={state.dob}
                placeholder={"Date of Birth"}
                className="date-field"
              />
            </div>
            <span className="focus-border"></span>

            <div className="form-group">
              <FormField
                placeholder="Email address *"
                type="text"
                name="email"
                onChange={handleChange}
                value={state.email}
                error={state?.errMsg?.email}
                required={true}
              />
              <span className="focus-border"></span>
            </div>
            {/* </div> */}
            {/* <div className="form-group mt-3 ">
              <FormField
                placeholder="file (Proof of Graduation)"
                className="applicant-input"
                ref={fileInputRef}
                type="file"
                name="file"
                value={state.file}
                onChange={handleChange}
                error={state?.errMsg?.file}
                required={true}
              />
            </div> */}

            <div className="form-group mt-3">
              <FormField
                placeholder="Register No *"
                type="text"
                name="register_no"
                onChange={handleChange}
                value={state.register_no}
                error={state.errMsg?.register_no}
                required={true}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-group message-btn mt-3 w-100">
              <button
                type="submit"
                className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Submit</span>
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
        </div>
      </div>
    </>
  );
};

export default MemberData;
