export type TicketStatus = "OPEN" | "CLOSED" | "IN_PROGRESS";

export interface TicketType {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: TicketStatus;
}
