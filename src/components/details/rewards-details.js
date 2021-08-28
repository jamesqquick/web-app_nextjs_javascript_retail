import { Button } from "@/components/buttons/button/button";
import { FieldListItem } from "@/components/lists/field-list-item/field-list-item";
import { List } from "@/components/lists/list/list";
import { useProfile } from "@/context/profile-context";
import { getRandomPointsValue } from "@/utils/random";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./detail-list.module.css";

export const RewardsDetails = () => {
  const { rewards, updateRewards } = useProfile();
  const [randomPointsAdjustment, setRandomPointsAdjustment] =
    useState(undefined);

  const listTitle = "MyByte Rewards";

  const adjustRewardsBalance = async () => {
    if (!rewards) {
      return null;
    }

    try {
      const { accountId } = rewards;

      const { data } = await axios.post("/api/accounts/adjust", {
        id: accountId,
        points: randomPointsAdjustment,
      });

      const { id, createdAt, balance } = data;

      const rewardsUpdate = {
        accountId: id,
        createdAt,
        balance,
      };

      updateRewards(rewardsUpdate);

      setRandomPointsAdjustment(getRandomPointsValue());
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        const { message } = data;

        console.error(message);
      }
    }
  };

  useEffect(() => {
    setRandomPointsAdjustment(getRandomPointsValue());
  }, []);

  if (!rewards) {
    return <List title={listTitle} />;
  }

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
        <Button
          label={`Adjust Points Balance by ${randomPointsAdjustment}`}
          handleClick={() => adjustRewardsBalance()}
        />
      </div>
    );
  }

  return null;
};
