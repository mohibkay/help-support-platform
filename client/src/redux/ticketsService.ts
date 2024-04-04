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
