export const getProfile = async (customer, account) => {
  return {
    customer: {
      customerId: customer.id,
      name: customer.name,
      email: customer.email,
      emailVerified: customer.emailVerified,
      phoneNumber: customer.phoneNumber,
    },
    rewards: {
      accountId: account.id,
      createdAt: account.createdAt,
      balance: account.balance,
    },
  };
};
