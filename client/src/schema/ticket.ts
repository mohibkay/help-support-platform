import { z } from "zod";

export const ticketSchema = z.object({
  title: z
    .string()
    .max(30, "Title cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9 ]*$/, "Title can only contain alphanumeric characters"),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .regex(
      /^[a-zA-Z0-9 ]*$/,
      "Description can only contain alphanumeric characters"
    ),
});

export type Ticket = z.infer<typeof ticketSchema>;
