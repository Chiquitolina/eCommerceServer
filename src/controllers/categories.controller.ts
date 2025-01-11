import fs from "fs/promises";
import path from "path";
import { Request, Response } from "express";
import {
  categorySchema,
  subcategorySchema,
} from "../schemas/categories.schemas";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
  try {
    categorySchema.safeParse(req.body);

    const { name, subcategories } = req.body;

    const newCategory = await prisma.category.create({
      data: {
        name,
        subcategories: subcategories
          ? {
              connect: subcategories.map((id: number) => ({ id })), // Conectar subcategorías existentes por ID
            }
          : undefined,
      },
    });
    res.status(201).json({ category: newCategory });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    subcategorySchema.safeParse(req.body);

    const { name, categoryId } = req.body;

    const newSubcategory = await prisma.subcategory.create({
      data: {
        name,
        categoryId,
      },
    });

    res.status(201).json({ category: newSubcategory });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la subcategoría." });
  }
};

/********************************************************************************** */

const loadCategories = async () => {
  const productsPath = path.join(__dirname, "../data/categories.json");
  const data = await fs.readFile(productsPath, "utf8");
  return JSON.parse(data);
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await loadCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Hubo un error al obtener las categorías:", error);
    res.status(500).send("Error interno del servidor");
  }
};
