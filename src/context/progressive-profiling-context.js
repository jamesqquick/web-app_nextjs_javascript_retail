import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const fetchProfileHelper = async (customerId) => {
  try {
    const { data } = await axios.get(`/api/profiles/retrieve/${customerId}`);

    return { data };
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      if (status === 404) {
        return { data: null };
      }

      return { error: "can't get profile, try again later" };
    }
  }
};

const updateProfileHelper = async (updatedProfileData) => {
  const { customer, rewards } = updatedProfileData;

  if (!(customer && rewards)) {
    return { error: "can't update profile, try again later" };
  }

  const { id } = customer;

  try {
    const { data } = await axios.post(
      `/api/profiles/update/${id}`,
      updatedProfileData
    );

    return { data };
  } catch (error) {
    if (error.response) {
      return { error: "can't update profile, try again later" };
    }
  }
};

const createProfileHelper = async (newCustomerData) => {
  if (!newCustomerData) {
    return { error: "can't create profile, try again later" };
  }

  try {
    const { data } = await axios.post("/api/profiles/create", newCustomerData);

    return { data };
  } catch (error) {
    if (error.response) {
      return { error: "can't create profile, try again later" };
    }
  }
};

const ProgressiveProfilingContext = createContext();

export const useProgressiveProfiling = () => {
  const context = useContext(ProgressiveProfilingContext);

  if (!context) {
    throw new Error(`useProfile must be used within a ProfileProvider`);
  }

  return context;
};

export const ProfileProvider = (props) => {
  const { user, isLoading: isAuth0Loading } = useUser();

  const [customerId, setCustomerId] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [profileError, setProfileError] = useState(undefined);

  const isProfileLoading = profile === undefined;
  const isNewCustomer = profile === null;
  const isExistingCustomer = !(profile === null || profile === undefined);
  const hasProfileError = !(
    profileError === null ||
    profileError === undefined ||
    profileError === ""
  );

  const customer = profile ? profile.customer : undefined;
  const rewards = profile ? profile.rewards : undefined;

  const updateProfile = async (profileData) => {
    const { data, error } = await updateProfileHelper(profileData);

    if (data) {
      setProfile(data);
    }

    if (error) {
      setProfileError(error);
    }
  };

  const createProfile = async (formData) => {
    const { name } = formData;

    const newCustomerData = {
      id: customerId,
      name,
      email: user.email,
      emailVerified: user.email_verified,
    };

    const { data, error } = await createProfileHelper(newCustomerData);

    if (data) {
      setProfile(data);
      return;
    }

    if (error) {
      setProfileError(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async (id) => {
      const { data, error } = await fetchProfileHelper(id);

      if (data || data === null) {
        setProfile(data);
      }

      if (error) {
        setProfileError(error);
      }
    };

    if (isAuth0Loading || !user) {
      return null;
    }

    const { sub } = user;

    setCustomerId(sub);

    if (customerId) {
      fetchProfile(customerId);
    }
  }, [isAuth0Loading, user, customerId]);

  const value = useMemo(
    () => ({
      customerId,
      profile,
      profileError,
      customer,
      rewards,
      isProfileLoading,
      isNewCustomer,
      isExistingCustomer,
      hasProfileError,
      updateProfile,
      createProfile,
    }),
    [profile]
  );

  return <ProgressiveProfilingContext.Provider value={value} {...props} />;
};
