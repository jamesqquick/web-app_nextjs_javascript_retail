import { prisma } from "@/utils/prisma";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const id = req.body.id;
  const customerId = req.body.customerId;
  const points = req.body.points;

  if (!(id || customerId)) {
    res
      .status(404)
      .json({ message: "missing id or customer id to look up account" });
    return;
  }

  if (points === undefined) {
    res.status(500).json({ message: "missing points value" });
    return;
  }

  let account;

  if (customerId) {
    account = await prisma.account.update({
      where: {
        customerId,
      },
      data: {
        balance: {
          increment: points,
        },
      },
    });
  } else if (id) {
    account = await prisma.account.update({
      where: {
        id,
      },
      data: {
        balance: {
          increment: points,
        },
      },
    });
  }

  res.status(200).json(account);
});
