"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTweets } from "@/app/context/TweetState";

export default function CreateTweet() {
  const { createTweet } = useTweets();
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTweet.mutate(content);
  };

  return (
    <section className="bg-slate-700 p-5 rounded shadow-xl sticky top-0">
      <form onSubmit={handleSubmit}>
        <Input
          value={content}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
          type="text"
          className="text-black text-lg"
          placeholder="What's on your mind?"
        />
        <Button type="submit" variant="secondary" className="mt-2">
          Send
        </Button>
      </form>
    </section>
  );
}
