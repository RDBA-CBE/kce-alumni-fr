"use client";

import Models from "@/imports/models.import";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";

const Otp = (props) => {
  const router = useRouter();
  const { updateStep, memberEmail, memberId } = props;
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  // Countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        otp,
        member_id: memberId,
      };
      const res = await Models.auth.verifyOtp(body);
      message.success(res?.message);
      localStorage.setItem("memberId",memberId)
      router.push("/memberData");
    } catch (error) {
      message.error(error?.error);
      console.log("✌️error --->", error);
    }
  };

  const resendOtp = async () => {
    try {
      // e.preventDefault();
      const res = await Models.auth.register({ email: memberEmail });
      message.success(res?.message)
      console.log("✌️res --->", res);
      setOtp("");
      setTimer(30);
    } catch (error) {
      message.error(error?.message);
      console.log("✌️error --->", error);
    }
  };

  const handleResend = () => {
  
    resendOtp();
  };

  return (
    <div className="col-lg-6">
      <div className="rbt-contact-form contact-form-style-1 max-width-auto">
        <h3 className="title">Verify OTP</h3>

        <form
          onSubmit={handleSubmit}
          className="text-center justify-center items-center"
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={false}
            containerStyle={{
              justifyContent: "center",
              gap: "10px",
              padding: "10px",
            }}
            inputStyle={{
              width: "5rem",
              height: "5rem",
              margin: "0 0.5rem",
              fontSize: "1.5rem",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
            renderInput={(props) => <input {...props} />}
          />

          <div className="mt-4">
            <button
              type="submit"
              disabled={otp.length !== 6}
              className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
            >
              Verify OTP
            </button>
          </div>
        </form>

        {/* TIMER + RESEND */}
        <div className="mt-4 text-center">
          {timer > 0 ? (
            <p className=" text-lg text-gray-600">
              Resend OTP in <b>{timer}s</b>
            </p>
          ) : (
            <div
              onClick={handleResend}
              className="cursor-pointer text-lg text-gray-600 text-decoration-underline cursor-pointer hover:text-blue-600"
            >
              Resend OTP
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;
