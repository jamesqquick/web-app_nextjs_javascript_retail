import { NavBarBrand } from "@/components/nav/nav-bar-brand/nav-bar-brand";
import { NavBarTab } from "@/components/nav/nav-bar-tab/nav-bar-tab";
import Link from "next/link";
import React from "react";
import styles from "./nav-bar.module.css";

export const NavBar = () => {
  return (
    <div className={styles.navBar__container}>
      <nav className={styles.navBar}>
        <Link href="/" passHref>
          <div>
            <NavBarBrand />
          </div>
        </Link>

        <div className={styles.navBar__tabs}>
          <NavBarTab label="MyByte" path="/profile" />
        </div>
      </nav>
    </div>
  );
};
