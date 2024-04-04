import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UserType } from "@/types/User";

const useCurrentRole = () => {
  const userData = useSelector((state: RootState) => state.auth);
  return userData.userData?.type as UserType;
};

export { useCurrentRole };
