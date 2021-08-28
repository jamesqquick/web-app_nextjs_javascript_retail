import { useProfile } from "@/context/profile-context";
import { useRouter } from "next/router";

export const withProfile = (WrappedComponent) => {
  return () => {
    const router = useRouter();
    const { pathname, asPath, query } = router;
    const { email, code, success, message } = query;

    const { profile, customer } = useProfile();

    const newProfilePath = "/new-profile";
    const profilePath = "/profile";
    const emailVerificationPath = "/email-verification";

    /**
     * If profile or customer are undefined, it means that we have not executed
     * an API call to retrieve the profile information from the
     * API server.
     */
    if (profile === undefined || customer === undefined) {
      return null;
    }

    /**
     * If users have their email already verified and they want to access
     * the email verification page, redirect them to the profile page
     */
    if (pathname === emailVerificationPath && customer.emailVerified) {
      router.push(profilePath);
      return null;
    }

    /**
     * If users don't have their email already verified and they want to access
     * the email verification page, clean up the query params, and direct them
     * the email verification page.
     */
    if (
      pathname === emailVerificationPath &&
      !customer.emailVerified &&
      email === customer.email &&
      code === "success"
    ) {
      router.push({
        pathname: "/email-verification",
        query: { message, email, success },
      });
      return null;
    }

    /**
     * If profile is null it means that the customer has not completed
     * their profile. We have no customer or account record for them
     * in our database.
     *
     * We want to always redirect this type of user to the New Profile page
     * and ask them to complete their profile BEFORE they can access
     * any page that consumes profile information
     */
    if (profile === null && asPath !== newProfilePath) {
      router.push(newProfilePath);
      return null;
    }

    /**
     * If the profile is defined but the user is trying to access the
     * New Profile Page, we redirect them to the Account Page
     */
    if (profile && asPath === newProfilePath) {
      router.push(profilePath);
      return null;
    }

    return <WrappedComponent />;
  };
};
