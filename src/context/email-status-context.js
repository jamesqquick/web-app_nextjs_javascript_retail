import { useProfile } from "@/context/profile-context";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const EmailStatusContext = createContext();

export const useEmailStatus = () => {
  const context = useContext(EmailStatusContext);

  if (!context) {
    throw new Error(`useEmail must be used within a EmailContext`);
  }

  return context;
};

export const EmailProvider = (props) => {
  const VerificationProcessStates = {
    IDLE: "idle",
    CUSTOMER_RECORD_LOADING: "customer record loading",
    CUSTOMER_RECORD_LOADED: "customer record loaded",
    CUSTOMER_EMAIL_VERIFIED: "customer email verified",
    CUSTOMER_EMAIL_UNVERIFIED: "customer email unverified",
    VERIFICATION_EMAIL_SENDING: "verification email sending",
    VERIFICATION_EMAIL_SENT: "verification email sent",
    VERIFICATION_EMAIL_ERROR: "verification email error",
    AUTH0_EMAIL_VERIFYING: "auth0 email verifying",
    AUTH0_EMAIL_VERIFIED: "auth0 email verified",
    AUTH0_EMAIL_VERIFY_ERROR: "auth0 email verify error",
    CUSTOMER_RECORD_UPDATING: "user updating",
    CUSTOMER_RECORD_UPDATE_ERROR: "user update error",
  };

  const { customer, updateCustomer } = useProfile();
  const [email, setEmail] = useState(undefined);
  const [emailVerified, setEmailVerified] = useState(undefined);

  const [emailVerificationMessage, setEmailVerificationMessage] =
    useState(undefined);

  const [verificationProcessState, setVerificationProcessState] = useState(
    VerificationProcessStates.IDLE
  );

  const isIdle = verificationProcessState === VerificationProcessStates.IDLE;
  const isCustomerRecordLoading =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_RECORD_LOADING;
  const isCustomerRecordLoaded =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_RECORD_LOADED;
  const isCustomerEmailVerified =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_EMAIL_VERIFIED;
  const isCustomerEmailUnverified =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_EMAIL_UNVERIFIED;
  const isVerificationEmailSending =
    verificationProcessState ===
    VerificationProcessStates.VERIFICATION_EMAIL_SENDING;
  const isVerificationEmailSent =
    verificationProcessState ===
    VerificationProcessStates.VERIFICATION_EMAIL_SENT;
  const isVerificationEmailError =
    verificationProcessState ===
    VerificationProcessStates.VERIFICATION_EMAIL_ERROR;
  const isAuth0EmailVerifying =
    verificationProcessState ===
    VerificationProcessStates.AUTH0_EMAIL_VERIFYING;
  const isAuth0EmailVerified =
    verificationProcessState === VerificationProcessStates.AUTH0_EMAIL_VERIFIED;
  const isAuth0EmailVerifyError =
    verificationProcessState ===
    VerificationProcessStates.AUTH0_EMAIL_VERIFY_ERROR;
  const isCustomerRecordUpdating =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_RECORD_UPDATING;
  const isCustomerRecordUpdateError =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_RECORD_UPDATE_ERROR;

  // actions

  const loadCustomerRecord = () => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_RECORD_LOADING
    );
  };

  const setCustomerEmailData = (customer) => {
    const { email, emailVerified } = customer;

    setEmail(email);
    setEmailVerified(emailVerified);

    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_RECORD_LOADED
    );
  };

  const markEmailAsVerified = () => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_EMAIL_VERIFIED
    );
    setEmailVerificationMessage("Verified");
  };

  const markEmailAsUnverified = () => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_EMAIL_UNVERIFIED
    );
    setEmailVerificationMessage("Please verify email");
  };

  const sendVerificationEmail = async () => {
    if (isCustomerEmailUnverified || isVerificationEmailError) {
      setVerificationProcessState(
        VerificationProcessStates.VERIFICATION_EMAIL_SENDING
      );
      setEmailVerificationMessage("Sending verification email...");
    }
  };

  const markVerificationEmailAsSent = () => {
    setVerificationProcessState(
      VerificationProcessStates.VERIFICATION_EMAIL_SENT
    );
    setEmailVerificationMessage("Verification email sent!");
  };

  const reportVerificationEmailError = (message) => {
    setVerificationProcessState(
      VerificationProcessStates.VERIFICATION_EMAIL_ERROR
    );
    setEmailVerificationMessage(message);
  };

  const markEmailAsAuth0Verified = () => {
    setVerificationProcessState(VerificationProcessStates.AUTH0_EMAIL_VERIFIED);
  };

  const updateCustomerRecord = () => {
    if (isAuth0EmailVerified || isCustomerRecordUpdateError) {
      setVerificationProcessState(
        VerificationProcessStates.CUSTOMER_RECORD_UPDATING
      );
      setEmailVerificationMessage("Updating...");
    }
  };

  const reportUpdateCustomerRecordError = (message) => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_RECORD_UPDATE_ERROR
    );
    setEmailVerificationMessage(message);
  };

  useEffect(() => {
    const stateLoop = async () => {
      if (isIdle) {
        loadCustomerRecord();
      }

      if (isCustomerRecordLoading) {
        if (!customer) {
          return null;
        }

        setCustomerEmailData(customer);
      }

      if (isCustomerRecordLoaded) {
        if (emailVerified) {
          markEmailAsVerified();
        }

        if (!emailVerified) {
          markEmailAsUnverified();
        }
      }

      if (isCustomerEmailUnverified) {
        console.log(`needs user action...`);
      }

      if (isVerificationEmailSending) {
        try {
          await axios.get("/api/customers/send-verification-email");

          markVerificationEmailAsSent();
        } catch (error) {
          if (error.response) {
            const { status } = error.response;
            const message = "can't send verification email, try again later";

            if (status === 409) {
              markEmailAsAuth0Verified();
              return;
            }

            reportVerificationEmailError(message);
            return;
          }

          reportVerificationEmailError(message);
        }
      }

      if (isVerificationEmailError) {
        console.log(`needs user action...`);
      }

      if (isAuth0EmailVerified) {
        updateCustomerRecord();
      }

      if (isCustomerRecordUpdating) {
        try {
          const { data } = await axios.post(
            "/api/customers/complete-email-verification"
          );

          updateCustomer(data);

          markEmailAsVerified();
        } catch (error) {
          if (error.response) {
            reportUpdateCustomerRecordError(
              "can't complete verification, please try again later"
            );
          }
        }
      }

      if (isCustomerRecordUpdateError) {
        console.log(`needs user action...`);
      }
    };

    stateLoop();
  }, [VerificationProcessStates, customer]);

  const value = useMemo(
    () => ({
      email,
      isIdle,
      isCustomerRecordLoading,
      isCustomerEmailVerified,
      isCustomerEmailUnverified,
      isVerificationEmailSending,
      isVerificationEmailSent,
      isVerificationEmailError,
      isCustomerRecordUpdating,
      isCustomerRecordUpdateError,
      emailVerificationMessage,
      sendVerificationEmail,
      updateCustomerRecord,
      markEmailAsAuth0Verified,
    }),
    [verificationProcessState, emailVerificationMessage]
  );

  return <EmailStatusContext.Provider value={value} {...props} />;
};
