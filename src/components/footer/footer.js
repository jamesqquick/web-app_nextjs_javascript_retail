import { Button } from "@/components/buttons/button/button";
import PropTypes from "prop-types";
import React from "react";
import styles from "./footer.module.css";

const FooterHyperlink = ({ children, path }) => {
  return (
    <a
      className={styles.footer__hyperlink}
      href={path}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

FooterHyperlink.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const Footer = () => {
  const resourceList = [
    {
      path: "https://auth0.com/why-auth0/",
      label: "Why Auth0",
    },
    {
      path: "https://auth0.com/docs/get-started",
      label: "How It Works",
    },
    {
      path: "https://auth0.com/blog/developers/",
      label: "Developer Blog",
    },
    {
      path: "https://auth0.com/contact-us",
      label: "Contact an Expert",
    },
  ];

  return (
    <div className={styles.footer__container}>
      <footer className={styles.footerGrid}>
        <div className={styles.footerGrid__info}>
          <div className={styles.footerInfo__message}>
            <p className={styles.footerMessage__headline}>
              <span>WHATABYTE is brought to you by&nbsp;</span>
              <FooterHyperlink path="https://auth0.com/">Auth0</FooterHyperlink>
            </p>
            <p className={styles.footerMessage__description}>
              <FooterHyperlink path="https://auth0.com/docs/quickstarts/">
                <span>
                  Securely implement authentication using Auth0 on any stack and
                  any device&nbsp;
                </span>
                <u>in less than 10 minutes</u>
              </FooterHyperlink>
            </p>
          </div>
          <div className={styles.footerInfo__button}>
            <Button
              label="Create Free Auth0 Account"
              variant="cta"
              handleClick={() =>
                window.open(
                  "https://auth0.com/signup",
                  "_blank",
                  "noopener noreferrer"
                )
              }
            />
          </div>
          <div className={styles.footerInfo__resourceList}>
            {resourceList.map((resource) => (
              <div
                key={resource.path}
                className={styles.footerInfo__resourceListItem}
              >
                <FooterHyperlink path={resource.path}>
                  {resource.label}
                </FooterHyperlink>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerGrid__brand}>
          <div className={styles.footerBrand}>
            <img
              className={styles.footerBrand__logo}
              src="https://images.ctfassets.net/23aumh6u8s0i/1UiaijF2PoaHIfcaIMRWYZ/cba84a2df9ba67f48e80aa117d0c78a3/auth0-shield.svg"
              alt="Auth0"
            />
            <FooterHyperlink path="https://auth0.com/">
              Auth0 Inc
            </FooterHyperlink>
          </div>
        </div>
      </footer>
    </div>
  );
};
