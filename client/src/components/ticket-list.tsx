import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../redux/ticketsService";
import {
  getTicketsStart,
  getTicketsSuccess,
  getTicketsFailure,
} from "../redux/ticketsSlice";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { TicketType } from "@/types/Ticket";
import Ticket from "./ticket";
import CreateTicket from "./create-ticket";
import RoleGate from "./auth/role-gate";
import { USERS } from "@/lib/users";

const TicketsList: React.FC = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading, error } = useSelector(
    (state: RootState) => state.tickets
  );

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        dispatch(getTicketsStart());
        const fetchedTickets = await getTickets();
        dispatch(getTicketsSuccess(fetchedTickets));
      } catch (error) {
        dispatch(getTicketsFailure(error.message));
      }
    };

    fetchTickets();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex-1'>
      <div className='flex justify-between space-x-4 items-center mb-2'>
        <h2>Tickets List</h2>
        <RoleGate allowedRoles={[USERS.Advertiser]}>
          <CreateTicket />
        </RoleGate>
      </div>
      <ul className='space-y-4'>
        {tickets.map(
          ({
            id,
            title,
            description,
            createdAt,
            updatedAt,
            createdBy,
            status,
          }: TicketType) => (
            <li key={id}>
              <Ticket
                id={id}
                title={title}
                description={description}
                createdAt={createdAt}
                updatedAt={updatedAt}
                createdBy={createdBy}
                status={status}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TicketsList;
