import jwt from "jsonwebtoken";
import fs from "fs/promises";
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getUserCredentials = async () => {
  try {
    const productsPath = path.join(__dirname, "../data/creds.json");
    const credentials = await fs.readFile(productsPath, "utf8");   
    return JSON.parse(credentials);
  } catch (error) {
    console.log("Error al obtener las credenciales", error);
    throw error;
  }
};

export const authenticateUser = async (req, res) => {
  const { adminUser, adminPassword } = req.body;

  // Validación simple
  if (!adminUser || !adminPassword) {
    return res.status(400).send("Faltan credenciales");
  }

  try {
    const credentials = await getUserCredentials();
    if (
      adminUser === credentials.adminUser &&
      adminPassword === credentials.adminPassword
    ) {
      const token = jwt.sign({ adminUser }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Usar variable de entorno para el secreto de JWT
      res.json({ token });
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error: error.toString() });
  }
};
