import { ProfileDetails } from "@/components/details/profile-details";
import { RewardsDetails } from "@/components/details/rewards-details";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { withProfile } from "@/containers/with-profile";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import styles from "./profile.module.css";

const Profile = () => {
  return (
    <PageLayout>
      <ContentLayout
        title="Manage Your Rewards Membership"
        description="Access your reward points and profile information"
        documentTitle="MyByte"
      >
        <div className={styles.profileDetailsGrid}>
          <ProfileDetails />
          <RewardsDetails />
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default withPageAuthRequired(withProfile(Profile));
