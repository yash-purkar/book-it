import { ResetPassword } from "@/components/user/resetPassword/ResetPassword";
import React from "react";

interface ResetPasswordProps {
  params: {
    token: string;
  };
}

const ResetPasswordPage = ({ params }: ResetPasswordProps) => {
  return <ResetPassword token={params.token} />;
};

export default ResetPasswordPage;
