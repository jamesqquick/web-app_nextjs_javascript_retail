import { prisma } from "@/utils/prisma";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { customerId } = req.query;

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!existingCustomer) {
    res.status(404).json({ message: "profile not found" });
    return;
  }

  await prisma.customer.delete({
    where: { id: customerId },
  });

  await prisma.account.delete({
    where: { customerId },
  });

  res.status(200).json({ message: "profile deleted" });
});
