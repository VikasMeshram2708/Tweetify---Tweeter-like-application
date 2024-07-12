import { ConnectDB } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { TweetSchema } from "@/models/TweetSchema";
import { UpdateTweetSchema } from "@/models/UpdateTweet";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody: UpdateTweetSchema = await request.json();

    // Sanitize the incoming data
    UpdateTweetSchema.parse(reqBody);

    // Connect to DB
    await ConnectDB();

    // Query the DB
    await prismaInstance.tweet.update({
      where: {
        tweetId: reqBody.tweetId,
      },
      data: {
        authorContent: reqBody.content,
      },
    });

    // Return the response
    return NextResponse.json(
      {
        message: "tweeted updated",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const err = error as Error;
    if (err instanceof PrismaClientUnknownRequestError) {
      return NextResponse.json(
        {
          message: err?.message,
        },
        {
          status: 500,
        }
      );
    }
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          message: err?.errors[0]?.message,
        },
        {
          status: 500,
        }
      );
    }
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
