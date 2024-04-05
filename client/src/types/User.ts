import { USER_ROLES } from "@/lib/users";

export type UserType = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type User = {
  username: string;
  role: UserType;
};
