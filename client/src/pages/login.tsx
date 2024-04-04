import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../redux/authSlice";
import { loginApi } from "../redux/authService";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/User";
import { USERS } from "@/lib/users";
import { ROUTES } from "@/lib/routes";

const Login: React.FC = () => {
  const [userType, setUserType] = useState<UserType>(USERS.Advertiser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginApi(userType);
      console.log("🐬 ~ handleLogin ~ res:", res);
      dispatch(login({ userType, token: res.token }));
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login As</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Advertiser
            <input
              type='radio'
              value='advertiser'
              checked={userType === USERS.Advertiser}
              onChange={() => setUserType(USERS.Advertiser)}
            />
          </label>
          <label>
            Support
            <input
              type='radio'
              value='support'
              checked={userType === USERS.Support}
              onChange={() => setUserType(USERS.Support)}
            />
          </label>
        </div>
        <Button className='bg-black' type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
