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
import { TweetSchema } from "@/models/TweetSchema";
import { useUser } from "@auth0/nextjs-auth0/client";

// Create a client
const queryClient = new QueryClient();

function TweetStateInner({ children }: { children: ReactNode }) {
  const [tweets, setTweets] = useState<FetchedTweet[]>([]);
  const queryClient = useQueryClient();

  const { user } = useUser();

  const { isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const res = await fetch("/api/readtweets");
      const result = await res.json();
      setTweets(result?.tweets);
      return result?.tweets;
    },
  });

  // Like mutation
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

  // Create Tweet Mutation
  const createTweet = useMutation({
    mutationFn: async (content: string) => {
      // validate if user's logged in or not
      if (!user) {
        throw new Error("Login First.");
      }
      const tweetConfig: TweetSchema = {
        author: user.name || "",
        content: content,
        authorEmail: user.email || "",
      };
      const res = await fetch("/api/createtweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetConfig),
      });
      if (!res.ok) {
        throw new Error("Failed to create tweet");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <TweetContext.Provider value={{ tweets, isLoading, likeMutation,createTweet }}>
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
