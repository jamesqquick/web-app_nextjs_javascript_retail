import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import styles from "./content-layout.module.css";

export const ContentLayout = ({
  children,
  title,
  description,
  bgImg,
  documentTitle,
}) => {
  const hasHeader = title && description;

  return (
    <>
      <Head>
        <title>{documentTitle} | WHATABYTE</title>
      </Head>
      <div
        className={styles.contentLayout}
        style={{
          backgroundImage: bgImg ? `url(${bgImg})` : "",
          backgroundSize: "cover",
        }}
      >
        {hasHeader && (
          <>
            <div className={styles.contentLayoutHeader__container}>
              <header className={styles.contentLayoutHeader}>
                <h2 className={styles.contentLayoutHeader__title}>{title}</h2>
                <small className={styles.contentLayoutHeader__description}>
                  {description}
                </small>
              </header>
            </div>
          </>
        )}

        <div className={styles.contentLayoutContent__container}>
          <article
            className={`${styles.contentLayoutContent} ${styles.contentLayoutContent__padded}`}
          >
            {children}
          </article>
        </div>
      </div>
    </>
  );
};

ContentLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  bgImg: PropTypes.string,
  children: PropTypes.node.isRequired,
  documentTitle: PropTypes.string.isRequired,
};
