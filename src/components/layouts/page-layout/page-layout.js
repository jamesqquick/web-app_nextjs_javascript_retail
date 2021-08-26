import { Footer } from "@/components/footer/footer";
import { NavBar } from "@/components/nav/nav-bar/nav-bar";
import PropTypes from "prop-types";
import React from "react";
import styles from "./page-layout.module.css";

export const PageLayout = ({ children }) => {
  return (
    <div className={styles.pageLayout}>
      <NavBar />
      <main className={styles.pageLayout__content}>{children}</main>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
