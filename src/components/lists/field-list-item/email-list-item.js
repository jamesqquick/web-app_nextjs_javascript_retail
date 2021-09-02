import { useEmailStatus } from "@/context/email-status-context";
import PropTypes from "prop-types";
import React from "react";
import styles from "./field-list-item.module.css";

export const EmailListItem = ({ label }) => {
  const {
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
  } = useEmailStatus();

  return (
    <div className={styles.fieldListItem}>
      <span className={styles.fieldListItem__key}>
        {label}
        {isCustomerEmailVerified && (
          <span className={`${styles.chip} ${styles.chipSuccess}`}>
            {emailVerificationMessage}
          </span>
        )}
        {isCustomerEmailUnverified && (
          <button
            onClick={sendVerificationEmail}
            className={`${styles.chip} ${styles.chipButton} ${styles.chipInfo}`}
          >
            {emailVerificationMessage}
          </button>
        )}
        {isVerificationEmailSending && (
          <span className={`${styles.chip} ${styles.chipInfo}`}>
            {emailVerificationMessage}
          </span>
        )}
        {isVerificationEmailSent && (
          <span className={`${styles.chip} ${styles.chipSuccess}`}>
            {emailVerificationMessage}
          </span>
        )}
        {isVerificationEmailError && (
          <button
            onClick={sendVerificationEmail}
            className={`${styles.chip} ${styles.chipButton} ${styles.chipDanger}`}
          >
            {emailVerificationError}
          </button>
        )}
        {isCustomerRecordUpdating && (
          <span className={`${styles.chip} ${styles.chipInfo}`}>
            {emailVerificationMessage}
          </span>
        )}
        {isCustomerRecordUpdateError && (
          <button
            onClick={completeEmailVerification}
            className={`${styles.chip} ${styles.chipButton} ${styles.chipDanger}`}
          >
            {emailVerificationError}
          </button>
        )}
      </span>
      <span className={styles.fieldListItem__value}>{email}</span>
    </div>
  );
};

EmailListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  verified: PropTypes.bool,
  fieldAction: PropTypes.func,
};
