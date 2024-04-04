import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { TicketType } from "@/types/Ticket";
import EditTicket from "./edit-ticket";
import DeleteTicket from "./delete-ticket";
import RoleGate from "./auth/role-gate";
import { USERS } from "@/lib/users";
import TicketStatus from "./ticket-status";

const Ticket = ({
  id,
  title,
  description,
  createdAt,
  createdBy,
  status,
}: TicketType) => {
  const readableDate = formatDate(new Date(createdAt));
  const ticket = {
    id,
    title,
    description,
    createdAt,
    createdBy,
    status,
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-baseline justify-between'>
        <CardTitle>{title}</CardTitle>
        <RoleGate allowedRoles={[USERS.Advertiser]}>
          <div className='-space-x-4'>
            <EditTicket ticket={ticket} />
            <DeleteTicket ticketId={id} />
          </div>
        </RoleGate>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className='flex flex-col'>
        <TicketStatus status={ticket.status} ticketId={id} />
        <p className='flex flex-col mt-4'>
          <span>{readableDate}</span>
          <span>Created By: {createdBy}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Ticket;
