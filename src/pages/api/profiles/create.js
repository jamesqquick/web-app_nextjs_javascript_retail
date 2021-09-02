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

    if (existingCustomer) {
      res.status(400).json({ message: "profile already exists" });
      return;
    }

    const { name, email, emailVerified } = req.body;

    const timeInMS = new Date().getTime();
    const accountId = timeInMS.toString();
    const createdAt = timeInMS;
    const defaultBalance = 0;

    const account = await prisma.account.create({
      data: {
        id: accountId,
        customerId,
        createdAt,
        balance: defaultBalance,
      },
    });

    const customer = await prisma.customer.create({
      data: {
        id: customerId,
        name,
        email,
        emailVerified,
        accountId: account.id,
      },
    });

    const profile = await getProfile(customer, account);

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "can't create profile" });
  }
});
