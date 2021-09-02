import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import styles from "./loader.module.css";

export const Loader = ({ variant }) => (
  <div className={`${styles.loader} ${styles[variant]}`}>
    <FontAwesomeIcon icon={faSpinner} size="4x" spin />
  </div>
);

Loader.propTypes = {
  variant: PropTypes.oneOf(["dark", "light"]),
};

Loader.defaultProps = {
  variant: "light",
};
