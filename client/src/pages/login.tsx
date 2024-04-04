import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../redux/auth/authSlice";
import { loginApi } from "../redux/auth/authService";
import { UserType } from "@/types/User";
import { USERS } from "@/lib/users";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [userType, setUserType] = useState<UserType>(USERS.Advertiser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginApi(userType);
      const userData = { username: res.username, type: userType };
      dispatch(login({ userType, token: res.token, userData }));
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
              checked={userType === USERS.Advertiser}
              onChange={() => setUserType(USERS.Advertiser)}
            />
          </label>
          <label>
            Support
            <input
              type='radio'
              value='support'
              className='ml-2'
              checked={userType === USERS.Support}
              onChange={() => setUserType(USERS.Support)}
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
