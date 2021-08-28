import { Form } from "@/components/form/form";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { withProfile } from "@/containers/with-profile";
import { useProfile } from "@/context/profile-context";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const EditProfile = () => {
  const router = useRouter();
  const { customer, updateProfile } = useProfile();

  if (!customer) {
    router.push("/");
    return null;
  }

  const customerId = customer.customerId;

  const updateCustomer = async (data) => {
    if (!data) {
      return;
    }

    const { name } = data;

    const customerData = {
      id: customerId,
      name,
    };

    try {
      const { data } = await axios.post(
        `/api/profiles/update/${customerId}`,
        customerData
      );

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
      defaultValue: customer.name || null,
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
        <Form onSubmit={updateCustomer} fields={fields} />
      </ContentLayout>
    </PageLayout>
  );
};

export default withPageAuthRequired(withProfile(EditProfile));
