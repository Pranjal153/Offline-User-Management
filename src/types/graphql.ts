export type ZellerCustomer = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export type ZellerCustomerConnection = {
  items?: ZellerCustomer[] | null;
  nextToken?: string | null;
};
