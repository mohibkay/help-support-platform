// import axiosPrivate from "@/api/axios";
import axios from "axios";
import { userList } from "@/lib/users";
import { UserType } from "@/types/User";

const baseURL = "http://localhost:3000/api";
const loginUrl = `${baseURL}/users/login`;

export const loginApi = async (userType: UserType) => {
  console.log("🐬 ~ loginApi ~ userType:", userType);
  const user = userList.find((user) => user.type === userType);

  if (!user) {
    throw new Error("User not found");
  }

  const { username, password } = user;
  const response = await axios.post(loginUrl, {
    username,
    password,
  });
  return response.data;
};
