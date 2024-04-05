import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../redux/auth/authSlice";
import { loginApi } from "../redux/auth/authService";
import { UserType } from "@/types/User";
import { USER_ROLES } from "@/lib/users";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [userType, setUserType] = useState<UserType>(USER_ROLES.ADVERTISER);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginApi(userType);
      const userData = { username: res.username, role: userType };
      dispatch(login({ userRole: userType, token: res.token, userData }));
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login As</h2>
      <form onSubmit={handleLogin}>
        <div className='space-x-6 mt-4'>
          <label>
            Advertiser
            <input
              type='radio'
              value='advertiser'
              className='ml-2'
              checked={userType === USER_ROLES.ADVERTISER}
              onChange={() => setUserType(USER_ROLES.ADVERTISER)}
            />
          </label>
          <label>
            Support
            <input
              type='radio'
              value='support'
              className='ml-2'
              checked={userType === USER_ROLES.SUPPORT}
              onChange={() => setUserType(USER_ROLES.SUPPORT)}
            />
          </label>
        </div>
        <Button type='submit' className='mt-8 px-6'>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
