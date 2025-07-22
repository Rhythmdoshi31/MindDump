import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  client: ReturnType<typeof prismaClientSingleton> | undefined;
};

const client = globalThis.client || prismaClientSingleton();

export default client;

if (process.env.NODE_ENV !== "production") globalThis.client = client;