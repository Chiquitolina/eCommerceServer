import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { t } from "../config/tRCP";

export const productRouter = t.router({
  
});

export type ProductsRouter = typeof productRouter;
