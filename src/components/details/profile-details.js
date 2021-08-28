import { Button } from "@/components/buttons/button/button";
import { FieldListItem } from "@/components/lists/field-list-item/field-list-item";
import { List } from "@/components/lists/list/list";
import { useProfile } from "@/context/profile-context";
import { useRouter } from "next/router";
import React from "react";
import styles from "./detail-list.module.css";

export const ProfileDetails = () => {
  const router = useRouter();
  const { customer } = useProfile();

  const listTitle = "Your Details";

  if (!customer) {
    return <List title={listTitle} />;
  }

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
        <Button
          label="Edit Profile"
          handleClick={() => router.push("/edit-profile")}
        />
      </div>
    );
  }

  return null;
};
