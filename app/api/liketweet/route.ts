import { ConnectDB } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { LikeTweetSchema } from "@/models/LikeTweet";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody: LikeTweetSchema = await request.json();

    // Sanitize the incoming data
    LikeTweetSchema.parse(reqBody);

    // Connect to DB
    await ConnectDB();

    // Query the DB
    await prismaInstance.tweet.update({
      where: {
        tweetId: reqBody.tweetId,
      },
      data: {
        liked: reqBody?.liked,
      },
    });

    // Return the response
    return NextResponse.json(
      {
        message: `tweet status changed to :${reqBody?.liked}`,
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
