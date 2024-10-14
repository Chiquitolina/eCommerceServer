import fs from "fs/promises";
import path from "path";
import { Request, Response } from 'express';

const loadCategories = async () => {
  const productsPath = path.join(__dirname, "../data/categories.json");
  const data = await fs.readFile(productsPath, "utf8");
  return JSON.parse(data);
};

export const getCategories = async (req: Request, res: Response) : Promise<any> => {
  try {
    const categories = await loadCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Hubo un error al obtener las categorías:", error);
    res.status(500).send("Error interno del servidor");
  }
};


