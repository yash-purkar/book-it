import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="fs-3">
          <span className="text-danger">OOPS! Page Not Found</span>
        </p>
        <p className="lead">The page you are looking for does not exist.</p>
        <Link href={"/"} className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
