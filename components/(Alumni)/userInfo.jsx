import FormField from "@/commonComponents/FormFields";
import Models from "@/imports/models.import";
import {
  formattedDate,
  objectToFormData,
  useSetState,
} from "@/utils/commonFunction.utils";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { message, Modal } from "antd";
import { GENDER } from "@/utils/constant.utils";
import DatePickerField from "./datePicker";
import { useRouter } from "next/navigation";

const userInfo = (props) => {
  const router = useRouter();
  const { updateStep } = props;

  const fileInputRef = useRef(null);

  const [state, setState] = useSetState({
    email: "",
    confrmModelOpen: false,
    confrmModelOpen: false,
    proofModelOpen: false,
    dob: "",
  });
  console.log("✌️dob --->", state.dob);

  useEffect(() => {
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
      }

      setState({
        salutation: find,
        gender: findGender,
        mobile_no: Number(res?.member_data?.mobile_no),
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const member_id = localStorage.getItem("memberId");
      const body = {
        member_id: member_id,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
      };

      const res = await Models.member.createUser(body);
      message.success(res.message);
      router.push("/login");
    } catch (error) {
      console.log("✌️errorsddsf --->", error);
      if (error?.data?.error) {
        message.error(error?.data?.error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

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
          <h3 className="title">Enter Password</h3>
          <form className="max-width-auto" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group mt-3">
              <div className="form-group">
                <FormField
                  placeholder="First Name *"
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  value={state.first_name}
                  error={state?.errMsg?.first_name}
                  required={true}
                />
                <span className="focus-border"></span>
              </div>
              <div className="form-group">
                <FormField
                  placeholder="Last Name *"
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  value={state.last_name}
                  error={state?.errMsg?.last_name}
                  required={true}
                />
                <span className="focus-border"></span>
              </div>

              <div className="form-group">
                <FormField
                  placeholder="Password *"
                  type="text"
                  name="password"
                  onChange={handleChange}
                  value={state.password}
                  error={state?.errMsg?.password}
                  required={true}
                />
                <span className="focus-border"></span>
              </div>
            </div>
            <div
              className=" flex w-100 mt-5"
              style={{
                columnGap: "10px",
                rowGap: "8px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <button
                className="rbt-btn btn-md btn-gradient radius-round sm-btn w-50  "
                type="submit"
              >
                Submit
              </button>
              <button
                className="rbt-btn btn-md btn-gradient radius-round sm-btn w-50  "
                onClick={() => router.push("/login")}
                type="button"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default userInfo;
