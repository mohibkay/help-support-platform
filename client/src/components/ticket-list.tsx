import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../redux/ticketsService";
import {
  getTicketsStart,
  getTicketsSuccess,
  getTicketsFailure,
} from "../redux/ticketsSlice";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { TicketType } from "@/types/Ticket";
import Ticket from "./ticket";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import CreateTicket from "./create-ticket";

const TicketsList: React.FC = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
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
    <div>
      <div className='flex justify-between space-x-4 items-center mb-2'>
        <h2>Tickets List</h2>
        <Button variant='outline' onClick={() => setShowCreateTicket(true)}>
          <Icons.Plus />
        </Button>
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

      {showCreateTicket && <CreateTicket />}
    </div>
  );
};

export default TicketsList;
