import * as z from "zod";

export const UpdateTweetSchema = z.object({
  tweetId: z.string(),
  content: z
    .string()
    .min(2, {
      message: "Content must be atleast 2 characters long.",
    })
    .max(250, {
      message: "Content name must not exceed more than 250 characters.",
    }),
});

export type UpdateTweetSchema = z.infer<typeof UpdateTweetSchema>;
