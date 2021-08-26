import PropTypes from "prop-types";
import React from "react";
import styles from "./field-list-item.module.css";

export const FieldListItem = ({ label, value }) => (
  <div className={styles.fieldListItem}>
    <span className={styles.fieldListItem__key}>{label}</span>
    <span className={styles.fieldListItem__value}>{value}</span>
  </div>
);

FieldListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
