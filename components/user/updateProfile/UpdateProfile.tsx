"use client";
import React, { useEffect, useState } from "react";
import styles from "./updateProfile.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useLazyUpdateSessionQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/userSlice";

export const UpdateProfile = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { user: currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [updateProfile, { isSuccess, isLoading, isError, error }] =
    useUpdateProfileMutation();

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  if (data) {
    dispatch(setUser(data.user));
  }

  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
    if (isError && error && "data" in error) {
      toast.error(
        // @ts-ignore
        error.data?.errorMessage ?? (
          <span>
            Something went wrong!{" "}
            {name && <strong>{currentUser.name}🙁</strong>} Plese try again
            later
          </span>
        )
      );
    }
    if (isSuccess) {
      // @ts-ignore
      updateSession();
      // It will make a new request to the server and get new data
      router.refresh();
    }
  }, [currentUser, error, isSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfile({ name, email });
  };

  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
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
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
};
