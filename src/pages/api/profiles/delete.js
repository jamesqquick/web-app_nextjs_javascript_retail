import { prisma } from "@/utils/prisma";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = getSession(req, res);
    const { sub: customerId } = user;

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

    await prisma.customer.delete({
      where: { id: customerId },
    });

    await prisma.account.delete({
      where: { customerId },
    });

    res.status(200).json({ message: "profile deleted" });
  } catch (error) {
    res.status(500).json({ message: "can't delete profile" });
  }
});
