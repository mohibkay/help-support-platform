import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { logout } from "../redux/auth/authSlice";
import { ROUTES } from "@/lib/routes";

import { Button } from "@/components/ui/button";
import TicketList from "@/components/ticket/ticket-list";
import ArticleList from "@/components/article/article-list";
import { RootState } from "@/redux/store";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <nav className='flex justify-between items-center'>
        <Link to={ROUTES.DASHBOARD}>HelpDesk</Link>
        <>
          {userData.userData?.username && (
            <p>Welcome, {userData.userData?.username}</p>
          )}
          <Button onClick={handleLogout}>Logout</Button>
        </>
      </nav>
      <div className='flex gap-x-6 justify-between items-start mt-6'>
        <TicketList />
        <ArticleList />
      </div>
    </>
  );
};

export default Dashboard;
