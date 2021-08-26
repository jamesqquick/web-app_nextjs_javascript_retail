import PropTypes from "prop-types";
import React from "react";
import styles from "./action-banner.module.css";

export const ActionBanner = ({ message, actionButton }) => {
  return (
    <div className={styles.actionBanner}>
      <div className={styles.actionBanner__messageContainer}>
        {message.map((line) => (
          <span key={line} className={styles.actionBanner__message}>
            {line}
          </span>
        ))}
      </div>
      <div className={styles.actionBanner__buttons}>{actionButton}</div>
    </div>
  );
};

ActionBanner.propTypes = {
  message: PropTypes.arrayOf(PropTypes.node),
  actionButton: PropTypes.node,
};
