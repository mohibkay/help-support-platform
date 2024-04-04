import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/schema/ticket";
import { useDispatch } from "react-redux";
import { updateTicketSuccess } from "../redux/ticketsSlice";
import { updateTicket } from "../redux/ticketsService";
import { useState } from "react";
import { TicketType } from "@/types/Ticket";

type FormData = {
  title: string;
  description: string;
};

const EditTicket = ({ ticket }: { ticket: TicketType }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: ticket.title,
      description: ticket.description,
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      const updatedTicket = await updateTicket(
        ticket.id,
        data.title,
        data.description
      );
      dispatch(updateTicketSuccess(updatedTicket));
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' onClick={() => setOpen(true)}>
          <Icons.Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle>Edit Ticket</DialogTitle>
          <DialogDescription className='space-y-4 my-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-4'
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Title' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Description' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full'>
                  Update
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTicket;
