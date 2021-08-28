import { Button } from "@/components/buttons/button/button";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { withProfile } from "@/containers/with-profile";
import { useProfile } from "@/context/profile-context";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./email-verification.module.css";

const EmailVerification = () => {
  const router = useRouter();
  const { query } = router;
  const { message, email, success } = query;
  const { customer, updateCustomer } = useProfile();

  useEffect(() => {
    const refetch = async () => {
      try {
        const { data } = await axios.post(
          "/api/customers/complete-email-verification"
        );

        updateCustomer(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          const { message } = data;

          console.error(message);
        }
      }
    };

    if (!customer.emailVerified) {
      refetch();
    }
  }, [customer]);

  return (
    <PageLayout>
      <ContentLayout
        title="Email Verification"
        description={message}
        documentTitle="Email Verification"
      >
        <div className={styles.emailVerificationContainer}>
          {success && (
            <>
              <h2>{email} verified!</h2>
              <Button
                label="Visit your account"
                handleClick={() => router.push("/profile")}
              />
            </>
          )}
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default withPageAuthRequired(withProfile(EmailVerification));
