import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import styles from "./nav-bar-tab.module.css";

export const NavBarTab = ({ label, path }) => {
  const router = useRouter();

  const isRouteActive = (routePath) => router.pathname === routePath;

  let navBarTabClassName = styles.navBar__tab;

  if (isRouteActive(path)) {
    navBarTabClassName += ` ${styles.navBar__tab__active}`;
  }

  return (
    <div className={navBarTabClassName}>
      <Link href={path}>{label}</Link>
    </div>
  );
};

NavBarTab.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
