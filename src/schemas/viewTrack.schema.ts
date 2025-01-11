import { z } from "zod";
import { isValidIp } from "../utils/validators";

export const viewTrackerSchema = z.object({
    ipAddress: z
      .string()
      .refine(isValidIp, {
        message: "Invalid IP address",
      }),
    location: z
      .object({
        country: z.string(),
        city: z.string(),
        region: z.string().optional(), // Región es opcional
      })
      .optional(), // La ubicación completa es opcional
  });

type viewTracker = z.infer<typeof viewTrackerSchema>;
