import { USER_ROLES } from "../config.js";

const users = [
  {
    id: 1,
    username: "advertiser1",
    password: "password1",
    role: USER_ROLES.ADVERTISER,
  },
  {
    id: 3,
    username: "support1",
    password: "password1",
    role: USER_ROLES.SUPPORT,
  },
];

export { users };
