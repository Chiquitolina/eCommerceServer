import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = process.env.JWT_SECRET;

const getUserCredentialas = async () => {
  try {

    const authPath = path.join(__dirname, "../data/products.json");

    const credentials = await fs.readFile(authPath, "utf8");

    return JSON.parse(credentials);
  } catch (error) {
    console.log("Error al traer las credenciales", error);
    throw error;
  }
};

export const authenticateUser = async (req, res) => {
  const { adminUser, adminPassword } = req.body;
  console.log(process.env.JWT_SECRET);

  try {
    const credentiales = await getUserCredentialas();
    if (
      adminUser == credentiales.adminUser &&
      adminPassword == credentiales.adminPassword
    ) {
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign({ adminUser }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).send("Credenciales no válidas");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.toString() });
  }
};
