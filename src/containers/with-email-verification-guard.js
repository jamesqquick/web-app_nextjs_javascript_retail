import { useEmailStatus } from "@/context/email-status-context";
import { useRouter } from "next/router";

export const withEmailVerificationGuard = (WrappedComponent) => {
  return () => {
    const router = useRouter();
    const { pathname, query } = router;

    const { email, isVerified, isUnverified } = useEmailStatus();

    const profilePath = "/profile";
    const emailVerificationPath = "/email-verification";

    const isEmailVerificationPage = pathname === emailVerificationPath;

    const isEmailVerificationRedirectFromAuth0 =
      query.email === email && query.code === "success";

    if (!email) {
      return null;
    }

    /**
     * If users have their email already verified and they want to access
     * the email verification page, redirect them to the profile page
     */
    if (isEmailVerificationPage && isVerified) {
      router.push(profilePath);
      return null;
    }

    /**
     * If users don't have their email already verified and they want to access
     * the email verification page, clean up the query params, and direct them
     * the email verification page.
     */
    if (
      isEmailVerificationPage &&
      isUnverified &&
      isEmailVerificationRedirectFromAuth0
    ) {
      router.push({
        pathname: emailVerificationPath,
        query: {
          message: query.message,
          email: query.email,
          success: query.success,
        },
      });
      return null;
    }

    if (
      isEmailVerificationPage &&
      isUnverified &&
      !isEmailVerificationRedirectFromAuth0
    ) {
      router.push(profilePath);
      return null;
    }

    return <WrappedComponent />;
  };
};
