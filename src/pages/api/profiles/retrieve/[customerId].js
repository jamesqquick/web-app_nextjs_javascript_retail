import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { prisma } from "src/utils/prisma";
import { getProfile } from "src/utils/profile";

export default withApiAuthRequired(async function handler(req, res) {
  const { customerId } = req.query;

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!customer) {
    res.status(404).json({ message: "profile not found" });
    return;
  }

  const account = await prisma.account.findUnique({
    where: { customerId },
  });

  if (!account) {
    res.status(404).json({ message: "profile not found" });
    return;
  }

  const profile = await getProfile(customer, account);

  res.status(200).json(profile);
});
