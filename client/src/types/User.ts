export type UserType = "Advertiser" | "Support";

export type User = {
  username: string;
  type: UserType;
};
