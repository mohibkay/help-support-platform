import { TicketType } from "../types/Ticket";
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
