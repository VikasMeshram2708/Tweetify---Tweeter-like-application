import * as z from "zod";

export const TweetSchema = z.object({
  author: z
    .string()
    .min(2, {
      message: "Author name must be atleast 2 characters long.",
    })
    .max(100, {
      message: "Author name must not exceed more than 100 characters.",
    }),
  authorEmail: z.string().email(),
  liked: z.boolean().optional(),
  content: z
    .string()
    .min(2, {
      message: "Content must be atleast 2 characters long.",
    })
    .max(250, {
      message: "Content name must not exceed more than 250 characters.",
    }),
});

export type TweetSchema = z.infer<typeof TweetSchema>;
