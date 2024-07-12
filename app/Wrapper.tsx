"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import TweetState from "./context/TweetState";
const queryClient = new QueryClient();

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TweetState>{children}</TweetState>
    </QueryClientProvider>
  );
}
