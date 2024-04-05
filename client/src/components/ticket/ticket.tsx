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
import RoleGate from "../auth/role-gate";
import { USER_ROLES } from "@/lib/users";
import TicketStatus from "./ticket-status";
import TicketStatusSelector from "./ticket-status-selector";

const Ticket = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  createdBy,
  status,
}: TicketType) => {
  const ticket = {
    id,
    title,
    description,
    createdAt,
    createdBy,
    status,
    updatedAt,
  };
  const readableCreatedAt = formatDate(new Date(createdAt));
  const readableUpdatedAt = formatDate(new Date(updatedAt));

  return (
    <Card>
      <CardHeader className='flex flex-row items-baseline justify-between'>
        <CardTitle>{title}</CardTitle>
        <RoleGate allowedRoles={[USER_ROLES.ADVERTISER]}>
          <div>
            <EditTicket ticket={ticket} />
            <DeleteTicket ticketId={id} />
          </div>
        </RoleGate>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className='flex flex-col'>
        <RoleGate allowedRoles={[USER_ROLES.ADVERTISER]}>
          <TicketStatus status={ticket.status} />
        </RoleGate>
        <RoleGate allowedRoles={[USER_ROLES.SUPPORT]}>
          <TicketStatusSelector status={ticket.status} ticketId={id} />
        </RoleGate>
        <p className='flex flex-col mt-4'>
          <span>Created: {readableCreatedAt}</span>
          <span>Updated: {readableUpdatedAt}</span>
          <span>Created By: {createdBy}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Ticket;
