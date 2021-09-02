import { Form } from "@/components/form/form";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { withProgressiveProfiling } from "@/containers/with-progressive-profiling";
import { useProgressiveProfiling } from "@/context/progressive-profiling-context";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React from "react";

const Edit = () => {
  const router = useRouter();
  const { isProfileLoading, profile, updateProfile } =
    useProgressiveProfiling();

  if (isProfileLoading) {
    return null;
  }

  const onSubmit = async (formData) => {
    const { name } = formData;

    const profileData = {
      ...profile,
      customer: {
        ...profile.customer,
        name,
      },
    };

    await updateProfile(profileData);
    await router.push("/profile");
  };

  const {
    customer: { name },
  } = profile;

  const fields = [
    {
      label: "Name",
      name: "name",
      defaultValue: name || null,
      required: true,
    },
  ];

  return (
    <PageLayout>
      <ContentLayout
        title="Edit Your Profile"
        description="Update any of your personal information and preferences below."
        documentTitle="Edit Profile"
      >
        <Form onSubmit={onSubmit} fields={fields} />
      </ContentLayout>
    </PageLayout>
  );
};

export default withPageAuthRequired(withProgressiveProfiling(Edit));
