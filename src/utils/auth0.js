import { ManagementClient } from "auth0";
import * as dotenv from "dotenv";

dotenv.config();

const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
};

if (!(authConfig.domain && authConfig.clientId && authConfig.clientSecret)) {
  process.exit(1);
}

const managementAPI = new ManagementClient({
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
});

export const sendVerificationEmail = async (customerId) => {
  await managementAPI.sendEmailVerification({
    user_id: customerId,
  });
};
