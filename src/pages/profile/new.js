import { Form } from "@/components/form/form";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { withProgressiveProfiling } from "@/containers/with-progressive-profiling";
import { useProgressiveProfiling } from "@/context/progressive-profiling-context";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

const New = () => {
  const { user } = useUser();
  const { createProfile } = useProgressiveProfiling();

  const submitForm = async (data) => {
    await createProfile(data);
  };

  const fields = [
    {
      label: "Name",
      name: "name",
      defaultValue: user.name || null,
      required: true,
    },
  ];

  return (
    <PageLayout>
      <ContentLayout
        title="Complete Your Profile"
        description="Create an account so you can get rewards with every purchase."
        documentTitle="New Profile"
      >
        <Form onSubmit={submitForm} fields={fields} />
      </ContentLayout>
    </PageLayout>
  );
};

export default withPageAuthRequired(withProgressiveProfiling(New));
