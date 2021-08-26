import { Button } from "@/components/buttons/button/button";
import PropTypes from "prop-types";
import React from "react";
import styles from "./hero-banner.module.css";

export const HeroBanner = ({ title, description, label, handleClick }) => {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroBanner__content}>
        <div className={styles.heroBanner__wrapper}>
          <h1 className={styles.heroBanner__title}>{title}</h1>
          <h3 className={styles.heroBanner__description}>{description}</h3>
        </div>
        <Button variant="solid" label={label} handleClick={handleClick} />
      </div>
    </div>
  );
};

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
