import { prisma } from "@/utils/prisma";
import { getProfile } from "@/utils/profile";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = getSession(req, res);
    const { sub: customerId } = user;

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

    let updatedCustomer = null;
    let updatedAccount = null;

    if (customer) {
      updatedCustomer = await prisma.customer.update({
        where: { id: customerId },
        data: { ...customer },
      });
    }

    if (rewards) {
      updatedAccount = await prisma.account.update({
        where: { customerId },
        data: { ...rewards },
      });
    }

    const profile = await getProfile(
      updatedCustomer || existingCustomer,
      updatedAccount || existingAccount
    );

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "can't update profile" });
  }
});
