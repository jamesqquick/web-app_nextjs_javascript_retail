import PropTypes from "prop-types";
import styles from "./list.module.css";

export const List = ({ title, children }) => (
  <div className={styles.list}>
    <h3 className={styles.list__title}>{title}</h3>
    <div className={styles.list__container}>{children}</div>
  </div>
);

List.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
