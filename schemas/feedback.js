import * as z from "zod";

export const FeedbackSchema = z.object({
  title: z.string().min(6, "Title must be at least 6 characters"),
  source: z.enum(
    ["Website", "Mobile App", "Support", "Survey", "App Review", "Social Media", "Other"],
    {
      error: "Please select a source",
    },
  ),
  customerName: z
    .string()
    .min(3, "Customer name must be at least 3 characters"),
  feedbackMessage: z.string().min(10, "Message must be at least 10 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

    status: z.enum(["New", "Reviewed", "Resolved", "Closed"], {
      error: "Please select a status",
    }),
});
