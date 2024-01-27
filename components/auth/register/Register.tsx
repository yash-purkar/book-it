"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./register.module.css";
import { useRegisterMutation } from "@/redux/api/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export const Register = () => {
  const [{ name, email, password }, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { name, email, password };
    register(userData);
  };

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(
        // @ts-ignore
        error.data?.errorMessage ?? (
          <span>
            Something went wrong! {name && <strong>{name}🙁</strong>} Plese try
            again later
          </span>
        )
      );
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Registered🥳, You can login now.");
    }
  }, [error, isSuccess]);

  return (
    <div className={styles.wrapper}>
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">Join Us</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              {" "}
              Full Name{" "}
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              onChange={handleChange}
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
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <button
            type="submit"
            className={`btn ${styles["form-btn"]} w-100 py-2`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
