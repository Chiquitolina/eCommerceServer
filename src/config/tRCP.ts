import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import { prisma } from '../db/prisma'; 
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
    prisma,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export { t, createContext };