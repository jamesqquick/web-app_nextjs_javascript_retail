import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(`useProfile must be used within a ProfileProvider`);
  }

  return context;
};

export const ProfileProvider = (props) => {
  const [profile, setProfile] = useState(undefined);
  const [customer, setCustomer] = useState(undefined);
  const [rewards, setRewards] = useState(undefined);

  const { user } = useUser();

  const updateProfile = (data) => {
    if (data) {
      const { customer, rewards } = data;

      setProfile(data);
      setCustomer(customer || null);
      setRewards(rewards || null);

      return;
    }

    setProfile(null);
    setCustomer(null);
    setRewards(null);
  };

  const updateRewards = (data) => {
    if (data) {
      setProfile({ ...profile, rewards: data });
      setRewards(data);
    }
  };

  const updateCustomer = (data) => {
    if (data) {
      setProfile({ ...profile, customer: data });
      setCustomer(data);
    }
  };

  const value = useMemo(
    () => ({
      profile,
      customer,
      rewards,
      updateProfile,
      updateRewards,
      updateCustomer,
    }),
    [profile, customer, rewards]
  );

  const { data, error } = useSWR(
    user
      ? () => {
          const { sub: customerId } = user;
          return `/api/profiles/retrieve/${customerId}`;
        }
      : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (data) {
      updateProfile(data);
    }

    if (error) {
      updateProfile(null);
    }
  }, [data, error]);

  return <ProfileContext.Provider value={value} {...props} />;
};
