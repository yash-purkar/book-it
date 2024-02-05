"use client";

import React, { useEffect, useState } from "react";
import styles from "./uploadAvatar.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useUploadAvatarMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";

export const UploadAvatar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [avatar, setAvatar] = useState<string>();
  const [avatarPreview, setAvatarPreview] =
    useState<string>("/images/avatar.jpg");

  //   We want user to display avatar there if user already has.
  const { user } = useAppSelector((state) => state.auth);

  const [uploadAvatar, { isError, isSuccess, error }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (user &&user?.avatar) {
      setAvatarPreview(user.avatar.url);
    }
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const reader = new FileReader();

    reader.onload = () => {
      // If file is ready.
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
        setAvatarPreview(reader.result as string);
      }
    };

    // When it complete the onload is triggered.
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    uploadAvatar({ avatar });
  };

  useEffect(() => {
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
      toast.success("Avatar uploaded");

      // It will make a new request to the server and get new data
      router.refresh();
    }
  }, [isSuccess,isError,error]);

  useEffect(()=>{
    toast.error("We are working on this feature.",{
      id:'err',
      duration:1500
    })
  },[])

  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">Upload Avatar</h2>

          <div className="form-group">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <figure className={`${styles.avatar} item-rtl`}>
                  <img
                    src={avatarPreview}
                    className={`${styles["rounded-circle"]}`}
                    alt="image"
                  />
                </figure>
              </div>
              <div className="input-foam">
                <label className="form-label" htmlFor="customFile">
                  Choose Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="form-control"
                  id="customFile"
                  accept="images/*"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={true}
            className={`btn ${styles["form-btn"]} w-100 py-2`}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};
