import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { logout } from "../redux/authSlice";
import { ROUTES } from "@/lib/routes";

import { Button } from "@/components/ui/button";
import TicketList from "@/components/ticket-list";
import ArticleList from "@/components/article-list";

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
      <div className='flex justify-between items-center mt-6'>
        <TicketList />
        <ArticleList />
      </div>
    </>
  );
};

export default Dashboard;
