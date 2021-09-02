import { useProgressiveProfiling } from "@/context/progressive-profiling-context";
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
    CUSTOMER_EMAIL_VERIFIED: "customer email verified",
    CUSTOMER_EMAIL_UNVERIFIED: "customer email unverified",
    VERIFICATION_EMAIL_SENDING: "verification email sending",
    VERIFICATION_EMAIL_SENT: "verification email sent",
    VERIFICATION_EMAIL_ERROR: "verification email error",
    CUSTOMER_RECORD_UPDATING: "user updating",
    CUSTOMER_RECORD_UPDATE_ERROR: "user update error",
  };

  const { profile, updateProfile } = useProgressiveProfiling();
  const [email, setEmail] = useState(undefined);
  const [emailVerified, setEmailVerified] = useState(undefined);

  const [emailVerificationMessage, setEmailVerificationMessage] =
    useState(undefined);
  const [emailVerificationError, setEmailVerificationError] =
    useState(undefined);

  const [verificationProcessState, setVerificationProcessState] = useState(
    VerificationProcessStates.IDLE
  );

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

  const isCustomerRecordUpdating =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_RECORD_UPDATING;
  const isCustomerRecordUpdateError =
    verificationProcessState ===
    VerificationProcessStates.CUSTOMER_RECORD_UPDATE_ERROR;

  const markEmailAsVerified = () => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_EMAIL_VERIFIED
    );

    setEmailVerified(true);
    setEmailVerificationMessage("verified");
  };

  const markEmailAsUnverified = () => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_EMAIL_UNVERIFIED
    );

    setEmailVerified(false);
    setEmailVerificationMessage("please verify email");
  };

  const markVerificationEmailAsSending = () => {
    setVerificationProcessState(
      VerificationProcessStates.VERIFICATION_EMAIL_SENDING
    );

    setEmailVerificationMessage("sending email...");
  };

  const markVerificationEmailAsSent = () => {
    setVerificationProcessState(
      VerificationProcessStates.VERIFICATION_EMAIL_SENT
    );

    setEmailVerificationMessage("verification email sent");
  };

  const reportVerificationEmailError = (message) => {
    setVerificationProcessState(
      VerificationProcessStates.VERIFICATION_EMAIL_ERROR
    );

    setEmailVerificationError(message);
    setEmailVerificationMessage(undefined);
  };

  const markProfileAsUpdating = () => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_RECORD_UPDATING
    );

    setEmailVerificationMessage("updating...");
  };

  const reportProfileUpdateError = (message) => {
    setVerificationProcessState(
      VerificationProcessStates.CUSTOMER_RECORD_UPDATE_ERROR
    );

    setEmailVerificationError(message);
    setEmailVerificationMessage(undefined);
  };

  useEffect(() => {
    if (profile) {
      const { customer } = profile;
      const { email, emailVerified } = customer;

      setEmail(email);

      if (emailVerified) {
        markEmailAsVerified();
      }

      if (!emailVerified) {
        markEmailAsUnverified();
      }
    }
  }, [profile]);

  const sendVerificationEmail = async () => {
    try {
      markVerificationEmailAsSending();

      await axios.get("/api/customers/send-verification-email");

      markVerificationEmailAsSent();
    } catch (error) {
      const message = "can't send verification email, try again later";

      if (error.response) {
        const { status } = error.response;

        if (status === 409) {
          await completeEmailVerification();
          return;
        }

        reportVerificationEmailError(message);

        return;
      }

      reportVerificationEmailError(message);
    }
  };

  const completeEmailVerification = async () => {
    try {
      markProfileAsUpdating();

      const { data } = await axios.post(
        "/api/customers/complete-email-verification"
      );

      updateProfile({ customer: data });

      markEmailAsVerified();
    } catch (error) {
      if (error.response) {
        reportProfileUpdateError(
          "can't complete verification, please try again later"
        );
      }
    }
  };

  const value = useMemo(
    () => ({
      email,
      isCustomerEmailVerified,
      isCustomerEmailUnverified,
      isVerificationEmailSending,
      isVerificationEmailSent,
      isVerificationEmailError,
      isCustomerRecordUpdating,
      isCustomerRecordUpdateError,
      emailVerificationMessage,
      emailVerificationError,
      sendVerificationEmail,
      completeEmailVerification,
    }),
    [
      verificationProcessState,
      email,
      emailVerified,
      emailVerificationMessage,
      emailVerificationError,
    ]
  );

  return <EmailStatusContext.Provider value={value} {...props} />;
};
