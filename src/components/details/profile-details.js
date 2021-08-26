import { FieldListItem } from "@/components/lists/field-list-item/field-list-item";
import { List } from "@/components/lists/list/list";
import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import styles from "./detail-list.module.css";

export const ProfileDetails = () => {
  const listTitle = "Your Details";

  const { user } = useUser();

  if (!user) {
    return null;
  }

  const { name, email, phoneNumber } = user;

  const customer = {
    name,
    email,
    phoneNumber: phoneNumber || "None",
  };

  if (customer) {
    const { name, email, phoneNumber } = customer;

    const customerDetails = {
      fields: [
        {
          label: "Full Name",
          value: name,
        },
        {
          type: "email",
          label: "Email Address",
          value: email,
        },
        {
          label: "Phone Number",
          value: phoneNumber || "None",
        },
      ],
    };

    return (
      <div className={styles.detailList}>
        <List title={listTitle}>
          {customerDetails.fields.map((detail) => (
            <FieldListItem key={detail.label} {...detail} />
          ))}
        </List>
      </div>
    );
  }

  return null;
};
