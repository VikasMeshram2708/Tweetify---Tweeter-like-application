"use client";

import { ReactNode, useContext, useState } from "react";
import { TweetContext, TweetContextType } from "./TweetContext";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function TweetStateInner({ children }: { children: ReactNode }) {
  const [tweets, setTweets] = useState<FetchedTweet[]>([]);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const res = await fetch("/api/readtweets");
      const result = await res.json();
      setTweets(result?.tweets);
      return result?.tweets;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async ({
      tweetId,
      isLiked,
    }: {
      tweetId: string;
      isLiked: boolean;
    }) => {
      const res = await fetch("/api/liketweet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetId: tweetId,
          liked: isLiked,
        }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  return (
    <TweetContext.Provider value={{ tweets, isLoading, likeMutation }}>
      {children}
    </TweetContext.Provider>
  );
}

export default function TweetState({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TweetStateInner>{children}</TweetStateInner>
    </QueryClientProvider>
  );
}

export const useTweets = (): TweetContextType => {
  const context = useContext(TweetContext);
  if (!context) {
    throw new Error("useTweets must be used within a TweetProvider");
  }
  return context;
};
