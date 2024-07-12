"use client";

import {
  BookUser,
  Home,
  LogInIcon,
  LogOut,
  MessageCircleHeart,
  Store,
  Twitter,
  User,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

interface iLinks {
  id: number;
  title: string;
  redirectUrl: string;
  icon: JSX.Element;
}

const links: iLinks[] = [
  {
    id: 1,
    title: "Home",
    redirectUrl: "/",
    icon: <Home />,
  },
  {
    id: 2,
    icon: <User />,
    redirectUrl: "mytweets",
    title: "My Tweets",
  },
  {
    id: 2,
    title: "About Us",
    redirectUrl: "/about",
    icon: <Store />,
  },
  {
    id: 3,
    title: "Contact Us",
    redirectUrl: "/contact",
    icon: <BookUser />,
  },
  {
    id: 4,
    title: "Liked Tweets",
    redirectUrl: "/liked",
    icon: <MessageCircleHeart />,
  },
];

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width:820px)");

  const { user } = useUser();

  return (
    <nav
      className={`sticky top-0 h-[100vh] bg-slate-800 text-slate-100 ${
        isDesktop ? "p-4" : "p-2"
      } flex flex-col ${isDesktop ? "w-96" : "w-14"}`}
    >
      <div className="mb-5 flex items-center justify-between">
        {isDesktop ? (
          <h1 className="text-3xl font-bold text-slate-50">Tweetify</h1>
        ) : (
          <Twitter className="ml-2" />
        )}
      </div>
      <ul className="space-y-2 flex-grow">
        {links.map((item) => (
          <div
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-700 transition-colors duration-200"
            key={item?.id}
          >
            <TooltipProvider>
              <Tooltip>
                {isDesktop ? (
                  <TooltipTrigger className="flex items-center gap-3">
                    <p className="text-slate-300 cursor-pointer">{item.icon}</p>
                    {item?.title}
                  </TooltipTrigger>
                ) : (
                  <p className="text-slate-300">{item.icon}</p>
                )}
                <TooltipContent>
                  <p>{item?.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </ul>
      {isDesktop ? (
        user ? (
          <div className="bg-red-500">
            <Link
              href="/api/auth/logout"
              className="flex items-center gap-3 px-4 py-2 rounded-lg"
            >
              <LogOut />
              <Avatar>
                <AvatarImage src={user.picture!} alt="user" />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              <p className="text-lg">{user.name}</p>
            </Link>
          </div>
        ) : (
          <Button variant="secondary">
            <Link href="/api/auth/login">Login / Sign up</Link>
          </Button>
        )
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {/** Login Icon **/}
              <LogInIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Login / Sign up</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </nav>
  );
}
