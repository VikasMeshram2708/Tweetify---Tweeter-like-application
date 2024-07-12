import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function RecentTweets() {
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
          <h3 className="font-semibold text-slate-100">Vikas Meshram</h3>
          <p className="text-sm text-slate-300">@vikasmeshram</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, cum.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-slate-300">
          {new Date().toLocaleDateString()}
        </p>
        <div className="flex gap-4">
          <Heart className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
