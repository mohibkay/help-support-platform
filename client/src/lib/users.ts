const USER_ROLES = {
  ADVERTISER: 5001,
  SUPPORT: 5002,
};

const userList = [
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

export { userList, USER_ROLES };
