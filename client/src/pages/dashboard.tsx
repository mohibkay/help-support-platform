import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { logout } from "../redux/authSlice";
import { ROUTES } from "@/lib/routes";

import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <nav className='flex justify-between items-center'>
        <Link to={ROUTES.DASHBOARD}>HelpDesk</Link>
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
