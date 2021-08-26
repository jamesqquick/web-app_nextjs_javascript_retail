import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import "./loader.module.css";

export const Loader = ({ variant }) => (
  <div className={`loader loader--${variant}`}>
    <FontAwesomeIcon icon={faSpinner} size="4x" spin />
  </div>
);

Loader.propTypes = {
  variant: PropTypes.oneOf(["dark", "light"]),
};

Loader.defaultProps = {
  variant: "light",
};
