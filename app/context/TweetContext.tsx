import { UseMutationResult } from "@tanstack/react-query";
import { createContext } from "react";

export interface TweetContextType {
  tweets: FetchedTweet[];
  isLoading: boolean;
  likeMutation: UseMutationResult<
    void,
    Error,
    {
      tweetId: string;
      isLiked: boolean;
    },
    unknown
  >;
  createTweet: UseMutationResult<any, Error, string, unknown>;
  confirmMutation: UseMutationResult<void, Error, {
    tweetId: string;
    content: string;
}, unknown>
}
export const TweetContext = createContext<TweetContextType | null>(null);
