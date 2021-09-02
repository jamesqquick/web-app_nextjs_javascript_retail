import { Loader } from "@/components/loader/loader";
import { withEmailVerificationGuard } from "@/containers/with-email-verification-guard";
import { useEmailStatus } from "@/context/email-status-context";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const EmailVerification = () => {
  const router = useRouter();
  const {
    isCustomerEmailVerified,
    isCustomerEmailUnverified,
    completeEmailVerification,
  } = useEmailStatus();

  useEffect(() => {
    if (isCustomerEmailVerified) {
      router.push("/profile");
      return;
    }

    completeEmailVerification();
  }, [isCustomerEmailVerified, isCustomerEmailUnverified]);

  return <Loader variant="light" />;
};

export default withPageAuthRequired(
  withEmailVerificationGuard(EmailVerification)
);
