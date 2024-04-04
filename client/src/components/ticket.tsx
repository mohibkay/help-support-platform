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

const Ticket = ({
  id,
  title,
  description,
  createdAt,
  createdBy,
}: TicketType) => {
  const readableDate = formatDate(new Date(createdAt));
  const ticket = { id, title, description, createdAt, createdBy };

  return (
    <Card>
      <CardHeader className='flex flex-row items-baseline justify-between'>
        <CardTitle>{title}</CardTitle>
        <div className='-space-x-4'>
          <EditTicket ticket={ticket} />
          <DeleteTicket ticketId={id} />
        </div>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <p className='flex flex-col'>
          <span>{readableDate}</span>
          <span>Created By: {createdBy}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Ticket;
