import { FieldListItem } from "@/components/lists/field-list-item/field-list-item";
import { List } from "@/components/lists/list/list";
import React from "react";
import styles from "./detail-list.module.css";

export const RewardsDetails = () => {
  const listTitle = "MyByte Rewards";

  const rewards = {
    accountId: "987654321",
    balance: 239,
    createdAt: new Date().getTime(),
  };

  if (rewards) {
    const { accountId, balance, createdAt } = rewards;

    const dateObject = new Date(createdAt);

    const rewardsDetails = {
      title: "MyByte Rewards",
      fields: [
        {
          label: "Member ID",
          value: accountId,
        },
        {
          label: "Points Balance",
          value: balance,
        },
        {
          label: "Member Since",
          value: dateObject.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        },
      ],
    };

    return (
      <div className={styles.detailList}>
        <List title={listTitle}>
          {rewardsDetails.fields.map((detail) => (
            <FieldListItem key={detail.label} {...detail} />
          ))}
        </List>
      </div>
    );
  }

  return null;
};
