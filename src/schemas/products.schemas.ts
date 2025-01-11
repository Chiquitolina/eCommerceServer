import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  price: z.number().positive({ message: "El precio debe ser un número positivo" }),
  discount: z.number().int().min(0).max(100).optional(), // Descuento entre 0 y 100 (opcional)
  categoryId: z.number().int().positive({ message: "El ID de categoría debe ser positivo" }),
  subcategoryId: z.number().int().positive({ message: "El ID de subcategoría debe ser positivo" }),
  currency: z.string().length(3, { message: "La moneda debe tener exactamente 3 caracteres" }), // Ej: "ARS"
  image: z.string().url({ message: "Debe ser una URL válida" }),
  miniimgs: z.array(z.any()).optional(), // Mini imágenes como array sin validación
  ratio: z.string().regex(/^\d+\s*-\s*\d+$/, { message: "El formato del ratio debe ser 'n - m'" }),
  sizes: z.array(z.any()).optional(), // Sizes como array sin validación
});

type Product = z.infer<typeof ProductSchema>;
