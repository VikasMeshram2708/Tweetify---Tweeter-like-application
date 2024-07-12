"use client";

import CreateTweet from "@/components/CreateTweet";
import RecentTweets from "@/components/RecentTweets";
import Sidebar from "@/components/Sidebar";
import { useTweets } from "./context/TweetState";

export default function Home() {
  const { tweets, isLoading } = useTweets();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <div className="container mt-10">
            {/* Create Tweet Component */}
            <CreateTweet />
            <div className="mt-5 grid gap-3">
              {isLoading ? (
                <h1 className="text-white text-3xl">Loading...</h1>
              ) : (
                tweets?.map((tweet) => (
                  <RecentTweets
                    key={tweet?.tweetId}
                    tweetId={tweet?.tweetId}
                    author={tweet?.author}
                    authorContent={tweet?.authorContent}
                    authorEmail={tweet?.authorEmail}
                    createdAt={tweet?.createdAt}
                    liked={tweet?.liked}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
