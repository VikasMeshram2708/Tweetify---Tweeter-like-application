import { UseMutationResult } from "@tanstack/react-query";
import { createContext } from "react";

export interface TweetContextType {
  tweets: FetchedTweet[];
  isLoading: boolean
  likeMutation: UseMutationResult<void, Error, {
    tweetId: string;
    isLiked: boolean;
}, unknown>
}
export const TweetContext = createContext<TweetContextType | null>(null);
