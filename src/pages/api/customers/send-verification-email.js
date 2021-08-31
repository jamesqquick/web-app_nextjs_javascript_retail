import { sendVerificationEmail } from "@/utils/auth0";
import { prisma } from "@/utils/prisma";
import {
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const { accessToken } = await getAccessToken(req, res);

  const { sub: customerId } = user;

  const apiServerRootUrl = process.env.AUTH0_ISSUER_BASE_URL;
  const auth0UserInfoUrl = `${apiServerRootUrl}/userinfo`;

  const existingCustomer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (existingCustomer && !existingCustomer.emailVerified) {
    try {
      const { data } = await axios.get(auth0UserInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { email_verified: emailVerifiedFromAuth0 } = data;

      if (emailVerifiedFromAuth0) {
        res.status(409).json({ message: "email already verified" });
        return;
      }

      if (!emailVerifiedFromAuth0) {
        await sendVerificationEmail(customerId);

        res.status(204).end();
        return;
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        const { message } = data;

        res.status(500).json({ message: message || data });
        return;
      }

      res.status(500).json({
        message: error.message || "unable to request verification email",
      });
    }
  }

  res.status(204).end();
});
