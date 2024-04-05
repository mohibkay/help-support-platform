import { Badge } from "@/components/ui/badge";
import { TicketStatus as Status } from "@/types/Ticket";

const TicketStatus = ({ status }: { status: Status }) => (
  <Badge>{status}</Badge>
);

export default TicketStatus;
