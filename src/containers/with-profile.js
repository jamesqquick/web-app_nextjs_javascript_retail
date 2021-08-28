import { useProfile } from "@/context/profile-context";
import { useRouter } from "next/router";

export const withProfile = (WrappedComponent) => {
  return () => {
    const router = useRouter();
    const { asPath } = router;
    const { profile } = useProfile();

    const newProfilePath = "/new-profile";
    const profilePath = "/profile";

    /**
     * If profile is undefined it means that we have not executed
     * an API call to retrieve the profile information from the
     * API server.
     */
    if (profile === undefined) {
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
