import { Button } from "@/components/buttons/button/button";
import { ContentLayout } from "@/components/layouts/content-layout/content-layout";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { getRandomPointsValue } from "@/utils/random";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./api-tester.module.css";

const ApiTester = () => {
  const [randomPointsAdjustment, setRandomPointsAdjustment] =
    useState(undefined);
  const [response, setResponse] = useState("");
  const { user } = useUser();

  useEffect(() => {
    setRandomPointsAdjustment(getRandomPointsValue());
  }, []);

  if (!user) {
    return null;
  }

  const readProfile = async () => {
    try {
      const { data } = await axios.get(`/api/profiles/read`);

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        setResponse(JSON.stringify(data, null, 2));
      }
    }
  };

  const deleteProfile = async () => {
    try {
      const { data } = await axios.get(`/api/profiles/delete`);

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        setResponse(JSON.stringify(data, null, 2));
      }
    }
  };

  const createProfile = async () => {
    try {
      const { data } = await axios.post("/api/profiles/create", {
        name: "Audy Zero",
        email: "audy.zero@example.com",
        emailVerified: true,
      });

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        setResponse(JSON.stringify(data, null, 2));
      }
    }
  };

  const updateProfile = async () => {
    try {
      const { data } = await axios.put(`/api/profiles/update`, {
        customer: {
          name: "Audi Ceroth",
          email: "audy@example.com",
          emailVerified: false,
        },
      });

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        setResponse(JSON.stringify(data, null, 2));
      }
    }
  };

  const increaseBalance = async () => {
    try {
      const { data } = await axios.put(`/api/accounts/balance/update`, {
        points: randomPointsAdjustment,
      });

      setResponse(JSON.stringify(data, null, 2));
      setRandomPointsAdjustment(getRandomPointsValue());
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        setResponse(JSON.stringify(data, null, 2));
      }
    }
  };

  return (
    <PageLayout>
      <ContentLayout
        title="API Testing Harness"
        description="Access and test API endpoints to manage profiles"
        documentTitle="Test API"
      >
        <div className={styles.profileDetailsGrid}>
          <div className={styles.apiTesterButtons}>
            <Button label="Get Profile" handleClick={() => readProfile()} />
            <Button
              label="Create Profile"
              handleClick={() => createProfile()}
            />
            <Button
              label="Update Profile"
              handleClick={() => updateProfile()}
            />
            <Button
              label="Delete Profile"
              handleClick={() => deleteProfile()}
            />
            <Button
              label={`Increase balance by ${randomPointsAdjustment}`}
              handleClick={() => increaseBalance()}
            />
          </div>
          <div className={styles.apiTesterResponseContainer}>
            <pre className={styles.apiTesterResponse}>{response}</pre>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default withPageAuthRequired(ApiTester);
