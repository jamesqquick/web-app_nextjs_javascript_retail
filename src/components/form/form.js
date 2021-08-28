import { Button } from "@/components/buttons/button/button";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";

const FormField = ({ label, name, defaultValue, register, required }) => (
  <div className={styles.formField}>
    <span className={styles.formFieldKey}>{label}</span>
    <input
      className={styles.formFieldValue}
      defaultValue={defaultValue}
      {...register(name, { required: required })}
    />
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

FormField.defaultProps = {
  defaultValue: "",
  required: false,
};

export const Form = ({ title, description, fields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <div className={styles.formGrid}>
      <form className={styles.form}>
        {title && <h3 className={styles.formTitle}>{title}</h3>}
        {description && (
          <span className={styles.formDescription}>{description}</span>
        )}
        {fields &&
          fields.map(({ label, name, defaultValue, required }) => (
            <FormField
              key={name}
              label={label}
              name={name}
              defaultValue={defaultValue}
              register={register}
              required={required}
            />
          ))}
      </form>
      <Button
        enabled={isValid}
        handleClick={isValid ? handleSubmit(onSubmit) : () => {}}
        label="Submit"
      />
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      defaultValue: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
