import { prisma } from "@/utils/prisma";
import { getProfile } from "@/utils/profile";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { customerId } = req.query;
  const { customer, rewards } = req.body;

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  const existingAccount = await prisma.account.findUnique({
    where: { customerId },
  });

  if (!(existingCustomer && existingAccount)) {
    res.status(404).json({ message: "profile not found" });
    return;
  }

  const updatedCustomer = await prisma.customer.update({
    where: { id: customerId },
    data: { ...customer },
  });

  const updatedAccount = await prisma.account.update({
    where: { customerId },
    data: { ...rewards },
  });

  const profile = await getProfile(updatedCustomer, updatedAccount);

  res.status(200).json(profile);
});
