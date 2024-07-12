import { useTweets } from "@/app/context/TweetState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";

interface Params {
  tweetId: string;
  author: string;
  authorEmail: string;
  authorContent: string;
  liked: boolean;
  createdAt: string;
}
export default function RecentTweets({
  tweetId,
  author,
  authorEmail,
  authorContent,
  liked,
  createdAt,
}: Params) {
  const { likeMutation, tweets, confirmMutation } = useTweets();
  const [newTweet, setNewTweet] = useState("");

  const { user } = useUser();
  const [toggleEdit, setToggleEdit] = useState(false);

  const filterTweet = (tweetId: string) => {
    const filteredTweet = tweets?.filter((item) => item?.tweetId === tweetId);
    console.log(filteredTweet[0].authorContent);
    setNewTweet(filteredTweet[0].authorContent);
  };

  return (
    <Card className="border-none bg-slate-600 text-slate-100">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@vikasmeshram"
          />
          <AvatarFallback className="bg-slate-500">VM</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-slate-100">{author}</h3>
          <p className="text-sm text-slate-300">@{authorEmail.split("@")[0]}</p>
        </div>
      </CardHeader>
      <CardContent>
        {toggleEdit && (
          <>
            <Input
              value={newTweet}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTweet(e?.target?.value)
              }
              className="text-black"
              type="text"
            />
            <Button
              onClick={() => {
                confirmMutation.mutate({
                  tweetId: tweetId,
                  content: newTweet,
                });
                setToggleEdit(false);
              }}
              variant={"destructive"}
              className="mt-3"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setToggleEdit(false)}
              variant={"destructive"}
              className="mt-3 ml-3"
            >
              Cancel
            </Button>
          </>
        )}
        <p className="text-slate-200">{authorContent}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm sm:text-lg text-slate-300">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-4 items-center">
          {user?.email === authorEmail && (
            <>
              <Trash2 className="cursor-pointer hover:text-red-500" />
              <Pencil
                onClick={() => {
                  setToggleEdit((prev) => !prev);
                  filterTweet(tweetId);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            </>
          )}
          {liked ? (
            <Heart
              onClick={() => likeMutation.mutate({ tweetId, isLiked: false })}
              size={24}
              fill="red"
              className="cursor-pointer hover:text-red-500"
            />
          ) : (
            <Heart
              onClick={() => likeMutation.mutate({ tweetId, isLiked: true })}
              size={24}
              className="cursor-pointer hover:text-red-500"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
