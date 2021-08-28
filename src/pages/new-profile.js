import { Form } from "@/components/form/form";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { withProfile } from "@/containers/with-profile";
import { useProfile } from "@/context/profile-context";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const NewProfile = () => {
  const router = useRouter();
  const { user } = useUser();
  const { updateProfile } = useProfile();

  const customerId = user.sub;
  const apiEndpoint = "/api/profiles/create";

  const createCustomer = async (data) => {
    if (!data) {
      return;
    }

    const { name } = data;

    const customerData = {
      id: customerId,
      name,
      email: user.email,
      emailVerified: user.email_verified,
    };

    try {
      const { data } = await axios.post(apiEndpoint, customerData);

      if (data) {
        updateProfile(data);
        await router.push("/profile");
        return null;
      }
    } catch (error) {
      updateProfile(null);
      return null;
    }
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
        <Form onSubmit={createCustomer} fields={fields} />
      </ContentLayout>
    </PageLayout>
  );
};

export default withPageAuthRequired(withProfile(NewProfile));
