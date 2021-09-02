export const getProfile = async (customer, account) => {
  return {
    customer: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      emailVerified: customer.emailVerified,
      phoneNumber: customer.phoneNumber,
    },
    rewards: {
      id: account.id,
      createdAt: account.createdAt,
      balance: account.balance,
    },
  };
};
