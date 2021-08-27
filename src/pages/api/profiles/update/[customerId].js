import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { prisma } from "src/utils/prisma";
import { getProfile } from "src/utils/profile";

export default withApiAuthRequired(async function handler(req, res) {
  const { customerId } = req.query;
  const data = req.body;

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!existingCustomer) {
    res.status(404).json({ message: "profile not found" });
    return;
  }

  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: { ...data },
  });

  const account = await prisma.account.findUnique({
    where: { customerId },
  });

  const profile = await getProfile(customer, account);

  res.status(200).json(profile);
});
