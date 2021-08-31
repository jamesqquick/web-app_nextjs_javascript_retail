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
    markEmailAsAuth0Verified,
  } = useEmailStatus();

  useEffect(() => {
    if (isCustomerEmailUnverified) {
      markEmailAsAuth0Verified();
      router.push("/profile");
    }

    if (isCustomerEmailVerified) {
      router.push("/profile");
    }
  }, [isCustomerEmailVerified, isCustomerEmailUnverified]);

  return <Loader variant="light" />;
};

export default withPageAuthRequired(
  withEmailVerificationGuard(EmailVerification)
);
