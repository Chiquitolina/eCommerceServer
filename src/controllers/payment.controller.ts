import mercadopago from "mercadopago";
import dotenv from "dotenv";
import fs from "fs/promises";
import { Request, Response } from 'express';
import path from "path";

dotenv.config();

export const createOrder = async (req: Request, res: Response): Promise<any> => {
  let data = req.body.items;
  let itemsMercadoPago: any = [];

  console.log(data);

  data.forEach((element: any) => {
    let item = {
      title: element.product.name,
      quantity: element.cantidad,
      currency_id: "ARS",
      unit_price: Number(element.product.price),
    };
    itemsMercadoPago.push(item);
  });

  try {
    // Crear la preferencia de pago
    const result = await mercadopago.preferences.create({
      items: itemsMercadoPago,
    });

    console.log(result);

    res.json({ message: result.body.init_point });
  } catch (error: any) {
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

export const getProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await fetchProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Hubo un error al obtener los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const addProduct = async (req: Request, res: Response): Promise<any> => {
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

export const healthCheck = async (req: Request, res: Response): Promise<any> => {
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
