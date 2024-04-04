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

const TicketsList: React.FC = () => {
  const [state, setState] = useState(false);
  console.log("🐬 ~ state:", state);
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
  }, [dispatch, state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 onClick={() => setState((state) => !state)}>Tickets List</h2>
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
