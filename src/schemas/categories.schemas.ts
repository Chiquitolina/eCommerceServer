import { z } from "zod";

export const subcategorySchema = z.object({
  name: z.string().min(1, "El nombre de la subcategoría es obligatorio"),
  categoryId: z.number().int().positive("El id de la categoría es obligatorio"), // categoryId es necesario
});

export const categorySchema = z.object({
  name: z.string().min(1, "El nombre de la categoría es obligatorio"),
  subcategoryIds: z.array(z.number().int().positive("El id de la subcategoría es obligatorio")).optional(),
});

type Category = z.infer<typeof categorySchema>;
type Subcategory = z.infer<typeof subcategorySchema>;
