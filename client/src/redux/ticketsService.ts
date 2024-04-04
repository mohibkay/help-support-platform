import { TicketStatus, TicketType } from "../types/Ticket";
import axiosClient from "../api/axios";

export const getTickets = async (): Promise<TicketType[]> => {
  try {
    const response = await axiosClient.get<TicketType[]>("/tickets");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tickets");
  }
};

export const createTicket = async (
  title: string,
  description: string
): Promise<TicketType> => {
  try {
    const response = await axiosClient.post<TicketType>("/tickets", {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create ticket");
  }
};

export const updateTicket = async (
  ticketId: number,
  title?: string | undefined,
  description?: string | undefined,
  status?: TicketStatus | undefined
): Promise<TicketType> => {
  try {
    const response = await axiosClient.put<TicketType>(`/tickets/${ticketId}`, {
      title,
      description,
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update ticket");
  }
};

export const deleteTicket = async (ticketId: number): Promise<void> => {
  try {
    await axiosClient.delete(`/tickets/${ticketId}`);
  } catch (error) {
    throw new Error("Failed to delete ticket");
  }
};
