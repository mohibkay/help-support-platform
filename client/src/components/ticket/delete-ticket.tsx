import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  deleteTicketStart,
  deleteTicketSuccess,
  deleteTicketFailure,
} from "../../redux/ticket/ticketsSlice";
import { deleteTicket } from "../../redux/ticket/ticketsService";
import { useDispatch } from "react-redux";

const DeleteTicket = ({ ticketId }: { ticketId: number }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteTicket = async () => {
    try {
      dispatch(deleteTicketStart());
      await deleteTicket(ticketId);
      dispatch(deleteTicketSuccess(ticketId));
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(deleteTicketFailure(error.message));
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
          <Icons.Delete />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            ticket.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleDeleteTicket}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTicket;
