"use client"
import { useResetPasswordMutation } from "@/redux/api/authApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./resetPassword.module.css";
import { useRouter } from "next/navigation";

interface ResetPasswordProps {
  token: string;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const [resetPassword, { isSuccess,error,isLoading,isError }] = useResetPasswordMutation();

  useEffect(() => {
    console.log({error})
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
    if (isSuccess) {
        toast.success("Password Reset Successfully. You can try to login.")
      router.push('/login');
    }
  }, [isSuccess,error,isError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwords = { password, confirmPassword };
    resetPassword({ token, body: passwords })
  };

  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password_field" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

          <button
            type="submit"
            className={`btn ${styles["form-btn"]} w-100 py-2`}
            disabled={isLoading}
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};
