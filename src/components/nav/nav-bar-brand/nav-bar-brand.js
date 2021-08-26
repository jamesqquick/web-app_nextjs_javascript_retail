import React from "react";
import styles from "./nav-bar-brand.module.css";

export const NavBarBrand = React.forwardRef(({ href }, ref) => {
  return (
    <a href={href} ref={ref}>
      <div className={styles["navBarBrand"]}>
        <div className={styles["navBarBrand__image"]}>
          <img
            src="https://images.ctfassets.net/23aumh6u8s0i/3JTPKxhlN7N8ceAhmVQQDf/24c37febdd4a8a440c0ce2a1d1340f64/whatabyte.svg"
            alt="whatabyte logo"
          />
        </div>
        <div className={styles["navBarBrand__text"]}>WHATABYTE</div>
      </div>
    </a>
  );
});
