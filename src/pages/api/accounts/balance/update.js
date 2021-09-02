import { prisma } from "@/utils/prisma";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = getSession(req, res);
    const { sub: customerId } = user;

    const { points } = req.body;

    if (
      points === undefined ||
      points === null ||
      isNaN(points) ||
      points < 1
    ) {
      res.status(400).json({ message: "missing valid points amount" });
      return;
    }

    const existingAccount = await prisma.account.findUnique({
      where: {
        customerId,
      },
    });

    if (!existingAccount) {
      res.status(404).json({ message: "account not found" });
      return;
    }

    const account = await prisma.account.update({
      where: {
        customerId,
      },
      data: {
        balance: {
          increment: points,
        },
      },
    });

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "can't update account" });
  }
});
