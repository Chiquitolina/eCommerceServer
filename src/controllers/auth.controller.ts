import jwt from "jsonwebtoken";
import fs from "fs/promises";
import dotenv from "dotenv";
import { Request, Response } from 'express';
import path from "path";

dotenv.config(); // Cargar variables de entorno

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

export const authenticateUser = async (req: Request, res: Response): Promise<any> => {
  // Desestructuración con tipos explícitos para adminUser y adminPassword
  const { adminUser, adminPassword }: { adminUser?: string; adminPassword?: string } = req.body;

  // Validación simple de las credenciales
  if (!adminUser || !adminPassword) {
    return res.status(400).send("Faltan credenciales");
  }

  try {
    // Simulamos la función getUserCredentials, ya que no está definida
    const credentials = await getUserCredentials();

    // Comprobamos si las credenciales coinciden
    if (
      adminUser === credentials.adminUser &&
      adminPassword === credentials.adminPassword
    ) {
      // Firmar el JWT
      const token = jwt.sign({ adminUser }, process.env.JWT_SECRET || "claveclavel", { expiresIn: "1h" }); // Usar variable de entorno para el secreto

      // Enviar el token al cliente
      return res.json({ token });
    } else {
      return res.status(401).send("Credenciales inválidas");
    }
  } catch (error: any) {
    // Manejo de errores
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.toString() });
  }
};
