import { ConnectDB } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Connect to DB
    await ConnectDB();

    // Query the DB
    const tweets = (await prismaInstance.tweet.findMany()).reverse();

    if (tweets?.length < 1) {
      return NextResponse.json(
        {
          message: "No Tweets!",
        },
        {
          status: 201,
        }
      );
    }

    // Return the response
    return NextResponse.json(
      {
        tweets,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
};
