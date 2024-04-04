import { z } from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Article cannot exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9 ]*$/,
      "Article can only contain alphanumeric characters"
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description cannot exceed 200 characters")
    .regex(
      /^[a-zA-Z0-9 ]*$/,
      "Description can only contain alphanumeric characters"
    ),
  category: z.enum(["Campaign", "Reporting"]),
});

export type Article = z.infer<typeof articleSchema>;
