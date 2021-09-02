import { prisma } from "@/utils/prisma";
import { getProfile } from "@/utils/profile";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = getSession(req, res);
    const { sub: customerId } = user;

    const existingCustomer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer) {
      res.status(404).json({ message: "customer not found" });
      return;
    }

    const existingAccount = await prisma.account.findUnique({
      where: { customerId },
    });

    if (!existingAccount) {
      res.status(404).json({ message: "account not found" });
      return;
    }

    const profile = await getProfile(existingCustomer, existingAccount);

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "can't read profile" });
  }
});
