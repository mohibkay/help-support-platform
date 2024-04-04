import { UserType } from "@/types/User";

const userList = [
  { id: 1, username: "advertiser1", password: "password1", type: "Advertiser" },
  { id: 3, username: "support1", password: "password1", type: "Support" },
];

const USERS: { [key in UserType]: UserType } = {
  Advertiser: "Advertiser",
  Support: "Support",
};

export { USERS, userList };
