import * as z from "zod";

export const LikeTweetSchema = z.object({
  tweetId: z.string(),
  liked: z.boolean(),
});

export type LikeTweetSchema = z.infer<typeof LikeTweetSchema>;
