import { ActionBanner } from "@/components/banners/action-banner/action-banner";
import { HeroBanner } from "@/components/banners/hero-banner/hero-banner";
import { Button } from "@/components/buttons/button/button";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { useRouter } from "next/router";
import React from "react";

const SignupBar = () => {
  const router = useRouter();

  return (
    <ActionBanner
      message={["Join WHATABYTE Rewards.", " Earn Points On Every Order."]}
      actionButton={
        <Button
          label="Visit Your Profile"
          handleClick={() => router.push("/profile")}
        />
      }
    />
  );
};

const HomePage = () => {
  return (
    <PageLayout>
      <ContentLayout documentTitle="Home">
        <HeroBanner
          title="Develop an Appetite"
          description="Get your favorites delivered for FREE on every order over $10!*"
          label="Order Now"
          handleClick={() => {}}
        />
        <SignupBar />
      </ContentLayout>
    </PageLayout>
  );
};

export default HomePage;
