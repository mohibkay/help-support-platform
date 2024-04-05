import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { USER_ROLES } from "@/lib/users";
import { TicketStatus as Status } from "@/types/Ticket";
import { TICKET_STATUS } from "@/lib/ticket";
import { useDispatch } from "react-redux";
import { updateTicket } from "@/redux/ticket/ticketsService";
import { updateTicketSuccess } from "@/redux/ticket/ticketsSlice";

const TicketStatus = ({
  status,
  ticketId,
}: {
  status: Status;
  ticketId: number;
}) => {
  const role = useCurrentRole();
  const dispatch = useDispatch();

  const updateTicketStatusHandler = async (newStatus: Status) => {
    try {
      const updatedTicket = await updateTicket(
        ticketId,
        undefined,
        undefined,
        newStatus
      );
      dispatch(updateTicketSuccess(updatedTicket));
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  if (role === USER_ROLES.ADVERTISER) {
    return <Badge>{status}</Badge>;
  }

  if (role === USER_ROLES.SUPPORT) {
    return (
      <Select onValueChange={updateTicketStatusHandler}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={status} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(TICKET_STATUS).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return null;
};

export default TicketStatus;
