import { useProgressiveProfiling } from "@/context/progressive-profiling-context";
import { useRouter } from "next/router";

export const withProgressiveProfiling = (WrappedComponent) => {
  return () => {
    const router = useRouter();
    const { asPath } = router;
    const { isProfileLoading, isNewCustomer, isExistingCustomer } =
      useProgressiveProfiling();

    const profilePage = "/profile";
    const newProfilePage = "/profile/new";
    const editProfilePage = "/profile/edit";

    const isNewProfilePage = asPath === newProfilePage;
    const isProfilePage = asPath === profilePage;
    const isEditProfilePage = asPath === editProfilePage;

    if (isProfileLoading) {
      return null;
    }

    /**
     * Customers who are not fully registered can only access
     * the new profile page to complete the registration process
     */
    if ((isProfilePage || isEditProfilePage) && isNewCustomer) {
      router.push(newProfilePage);
      return null;
    }

    if (isNewProfilePage && isExistingCustomer) {
      router.push(profilePage);
      return null;
    }

    return <WrappedComponent />;
  };
};
