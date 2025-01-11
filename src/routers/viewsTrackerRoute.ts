import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { t } from "../config/tRCP";
import { viewTrackerSchema } from "../schemas/viewTrack.schema";

export const viewsTrackerRoute = t.router({
  getIp: t.procedure.query(async ({ ctx }) => {
    try {
      // Recupera la IP del cliente
      const clientIp =
        ctx.req.headers["x-forwarded-for"] || ctx.req.socket.remoteAddress;

      // Imprime la IP en la consola del servidor
      console.log("Client IP Address:", clientIp);

      // Retorna la IP como parte de la respuesta
      return { success: true, ip: clientIp };
    } catch (error) {
      console.error("Error retrieving IP:", error);
      throw new Error("Failed to retrieve IP");
    }
  }),

  saveIp: t.procedure
    .input(viewTrackerSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const savedIp = await ctx.prisma.view.create({
          data: {
            ipAddress: input.ipAddress,
            location: {},
          },
        });

        return { success: true, savedIp };
      } catch (error) {
        console.error("Error saving IP:", error);
        throw new Error("Failed to save IP");
      }
    }),
});

export type ProductsRouter = typeof viewsTrackerRoute;
