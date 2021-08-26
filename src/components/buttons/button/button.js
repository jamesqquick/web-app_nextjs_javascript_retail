import PropTypes from "prop-types";
import React from "react";
import styles from "./button.module.css";

export const Button = ({ variant, label, handleClick, enabled }) => {
  const className = `${styles.button} ${styles[`${variant}Button`]} ${
    enabled || styles[`${variant}ButtonDisabled`]
  }`;

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["solid", "text", "outline", "cta"]),
  enabled: PropTypes.bool,
};

Button.defaultProps = {
  variant: "outline",
  enabled: true,
};
