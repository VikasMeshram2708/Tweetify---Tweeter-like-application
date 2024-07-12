import { prismaInstance } from "./PrismaInstance";

export const ConnectDB = async () => {
  try {
    await prismaInstance.$connect();
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Something went wrong. Please try again. :${error}`);
  } finally {
    await prismaInstance.$disconnect();
    console.log("Connection with DB released.");
  }
};
