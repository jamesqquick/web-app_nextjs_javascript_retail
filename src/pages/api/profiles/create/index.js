import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { prisma } from "src/utils/prisma";
import { getProfile } from "src/utils/profile";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res);
  const { sub: customerId } = user;

  const newCustomerData = req.body;
  const { name, email, emailVerified } = newCustomerData;

  const existingCustomer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (existingCustomer) {
    res.status(500).json({ message: "unable to create profile" });
    return;
  }

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
});
