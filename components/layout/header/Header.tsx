"use client";
import React from "react";
import styles from "./header.module.css";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className={`${styles.nav} navbar sticky-top py-2`}>
      <div className="container">
        <div className="col-6 col-lg-3 p-0">
          <div className="navbar-brand">
            <a href="/">
              <img
                style={{ cursor: "pointer" }}
                src="/images/bookit_logo.png"
                alt="BookIT"
              />
            </a>
          </div>
        </div>

        <div className="fCol-6 col-lg-3 mt-3 mt-md-0 text-end">
          {data?.user ? (
            <div className="ml-4 dropdown d-line">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className={`${styles.avatar} avatar-nav`}>
                  <img
                    src="/images/default_avatar.jpg"
                    alt="John Doe"
                    className={`${styles["rounded-circle"]} placeholder-glow`}
                    height="50"
                    width="50"
                  />
                </figure>
                <span className="placeholder-glow ps-1">
                  {data?.user?.name}
                </span>
              </button>

              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <Link href="/admin/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <Link href="/bookings/me" className="dropdown-item">
                  My Bookings
                </Link>
                <Link href="/me/update" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  href="/"
                  onClick={handleLogout}
                  className="dropdown-item text-danger"
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <>
              {data === undefined && (
                <div className="placeholder-glow">
                  <figure className="avatar header_avatar__4PIro placeholder bg-secondary"></figure>
                  <span className="placeholder w-25 bg-secondary ms-2"></span>
                </div>
              )}
              {data === null && (
                <Link
                  href="/login"
                  className="btn btn-danger px-4 text-white login-header-btn float-right"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
