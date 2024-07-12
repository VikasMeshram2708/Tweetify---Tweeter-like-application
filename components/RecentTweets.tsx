import { useTweets } from "@/app/context/TweetState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart } from "lucide-react";

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
  const { likeMutation } = useTweets();
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
          <p className="text-sm text-slate-300">@vikasmeshram</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, cum.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm sm:text-lg text-slate-300">
          {new Date().toLocaleDateString()}
        </p>
        <div className="flex gap-4">
          {liked ? (
            <Heart
              onClick={() => likeMutation.mutate({ tweetId, isLiked: false })}
              size={24}
              fill="red"
              className="cursor-pointer"
            />
          ) : (
            <Heart
              onClick={() => likeMutation.mutate({ tweetId, isLiked: true })}
              size={24}
              className="cursor-pointer"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
