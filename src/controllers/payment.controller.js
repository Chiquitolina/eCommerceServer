import mercadopago from "mercadopago";
import dotenv from "dotenv";
import fs from "fs/promises"; // Usar fs.promises para operaciones asíncronas con promesas

dotenv.config();

export const createOrder = async (req, res) => {
  let data = req.body.items;
  let itemss = [];

  data.forEach((element) => {
    let item = {
      title: element.product.name,
      quantity: element.cantidad,
      currency_id: "ARS",
      unit_price: element.product.price,
    };
    itemss.push(item);
  });

  try {
    mercadopago.configure({
      access_token:
        "APP_USR-7164111176476079-103013-c07b7b3052b41805a443030050951190-1105995931",
    });

    const result = await mercadopago.preferences.create({
      items: itemss,
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
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

export const getProducts = async (req, res) => {
  try {
    const data = await fs.readFile("src/data/products.json");
    const json = JSON.parse(data);
    res.status(200).json(json);
  } catch (error) {
    console.log("Hubo un error al leer el archivo:", error);
    res.status(500).send("Error interno del servidor");
  }
};

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
