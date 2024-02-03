"use client"

import React, { useEffect, useState } from "react";
import styles from "./usePassword.module.css";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState<string>();
  const [oldPassword, setOldPassword] = useState<string>();
const router = useRouter();
  const [updatePassword,{isError,isSuccess,error}] = useUpdatePasswordMutation();


  useEffect(()=>{
    if (isError && error && "data" in error) {
        toast.error(
          // @ts-ignore
          error.data?.errorMessage ?? (
            <span>
              Something went wrong! Plese try again
              later
            </span>
          )
        );
      }

      if(isSuccess) {
        toast.success("Password updated successfully.");
        setOldPassword('');
        setNewPassword('');
        // Making a new request to the server, re-fetching data requests
        router.refresh();
      }
  },[isError,isSuccess,error])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwords = { oldPassword, newPassword };
    updatePassword(passwords)
  };



  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Change Password</h2>

          <div className="mb-3">
            <label className="form-label" htmlFor="old_password_field">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              name="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="new_password_field">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

          <button
            type="submit"
            className={`btn ${styles["form-btn"]} w-100 py-2`}
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};
