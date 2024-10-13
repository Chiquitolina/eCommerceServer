import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadCategories = async () => {
  const productsPath = path.join(__dirname, "../data/categories.json");
  const data = await fs.readFile(productsPath, "utf8");
  return JSON.parse(data);
};

export const getCategories = async (req, res) => {
  try {
    const categories = await loadCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Hubo un error al obtener las categorías:", error);
    res.status(500).send("Error interno del servidor");
  }
};


