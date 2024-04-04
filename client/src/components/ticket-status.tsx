import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { USERS } from "@/lib/users";
import { TicketStatus as Status } from "@/types/Ticket";
import { TICKET_STATUS } from "@/lib/ticket";

const TicketStatus = ({ status }: { status: Status }) => {
  const role = useCurrentRole();

  if (role === USERS.Advertiser) {
    return <Badge>{status}</Badge>;
  }
  if (role === USERS.Support) {
    return (
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={status} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(TICKET_STATUS).map((status) => (
            <SelectItem value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return null;
};

export default TicketStatus;
