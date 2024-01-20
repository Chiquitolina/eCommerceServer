import mercadopago from "mercadopago";
import dotenv from "dotenv";
import fs from "fs/promises"; // Usar fs.promises para operaciones asíncronas con promesas

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const createOrder = async (req, res) => {
  let data = req.body.items;
  let itemss = [];

  console.log(data);

  /* data.forEach((element) => {
    let item = {
      title: element.name,
      quantity: 1,
      currency_id: "ARS",
      unit_price: element.price,
    };
    console.log(item);
  });*/

  try {
    mercadopago.configure({
      access_token:
        "APP_USR-7164111176476079-103013-c07b7b3052b41805a443030050951190-1105995931",
    });

    const result = await mercadopago.preferences.create({
      items: data,
    });

    console.log(result);

    console.log(itemss);

    res.json({ message: result.body.init_point });
  } catch (error) {
    console.log("Error en la creación de la orden:", error.message);
    if (error.response) {
      // Manejar errores específicos de la respuesta
      console.log("Respuesta de error:", error.response);
    }
    // Envía una respuesta al cliente
    res.status(500).send("Error interno del servidor: " + error.message);
  }
};

async function fetchProducts() {
  const productsPath = path.join(__dirname, "../data/products.json");
  const data = await fs.readFile(productsPath, "utf8");
  return JSON.parse(data);
}

export const getProducts = async (req, res) => {
  try {
    const products = await fetchProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Hubo un error al obtener los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const addProduct = async (req, res) => {
  try {
    res.status(200).json(/* alguna respuesta basada en los productos */);
  } catch (error) {
    console.error("Hubo un error: ", error);
    res.status(500).send("Error interno del servidor");
  }
};

/*export const getNewProductId = async (req, res) => {
  try {
    const products = await fetchProducts();
    // Aquí puedes implementar la lógica para obtener el nuevo ID de producto
    // Por ejemplo, si el nuevo ID es simplemente el conteo de productos:
    const newProductId = products.length + 1;
    res.status(200).json({ newProductId });
  } catch (error) {
    console.error("Hubo un error al obtener el nuevo ID de producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};*/

export const healthCheck = async (req, res) => {
  res.status(200).send("OK");
};

/*export const receiveWebhook = async (req, res) => {
  const payment = req.query;

  if (payment.type === "payment") {
    const data = await mercadopago.payment.findById(payment["data.id"]);
    console.log(data);
  }
  res.sendStatus(204);
};*/
