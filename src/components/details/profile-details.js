import { Button } from "@/components/buttons/button/button";
import { FieldListItem } from "@/components/lists/field-list-item/field-list-item";
import { List } from "@/components/lists/list/list";
import { useProgressiveProfiling } from "@/context/progressive-profiling-context";
import { useRouter } from "next/router";
import React from "react";
import styles from "./detail-list.module.css";

export const ProfileDetails = () => {
  const router = useRouter();
  const { customer } = useProgressiveProfiling();

  const listTitle = "Your Details";

  const editProfile = async () => {
    await router.push("/profile/edit");
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
        <Button label="Edit Profile" handleClick={editProfile} />
      </div>
    );
  }

  return <List title={listTitle} />;
};
