"use client"
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./forgotPassword.module.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

    useEffect(() => {
    if (isSuccess) {
        setEmail("")
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(forgotPassword({ email }),{
        loading:`Sending Email to ${email}`,
        success:<p>Email Sent Successfully</p>,
        error: <p>Failed to sent email</p>
    })
  };

  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              {" "}
              Enter Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <button
            type="submit"
            className={`btn ${styles["form-btn"]} w-100 py-2`}
            disabled={isLoading}
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};
