"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./login.module.css";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
if(result?.error) {
  console.log(result)
}
  };

  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-10 col-lg-5">
        <form onSubmit={handleSubmit} className="shadow rounded bg-body">
          <h1 className="mb-3">Login</h1>
          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password_field">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <Link href="/password/forgot" className="float-end mt-2">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            className={`btn ${styles["form-btn"]} w-100 py-2`}
          >
            LOGIN
          </button>

          <div className="mt-3 mb-4">
            <Link href="/register" className="float-end">
              {" "}
              New User? Register Here{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
