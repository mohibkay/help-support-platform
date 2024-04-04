import { ReactNode } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { ROUTES } from "@/lib/routes";

import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

export default RequireAuth;
