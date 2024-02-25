import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { networkInterfaces } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchProducts() {
  const productsPath = path.join(__dirname, "../data/products.json");
  const data = await fs.readFile(productsPath, "utf8");
  return JSON.parse(data);
}

async function fetchProductById(productId) {
  const products = await fetchProducts();
  const product = products.find((product) => product.id === productId);
  if (!product) {
    throw new Error(`El producto con ID ${productId} no fue encontrado`);
  }
  return product;
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

export const deleteProduct = async (req, res) => {
  const requestData = req.body;
  const productId = requestData.id; // Extraer el ID del cuerpo de la solicitud
  console.log(productId);
  try {
      const products = await fetchProducts();
      const productIndex = products.findIndex(
        (product) => product.id === productId
    );
    if (productIndex !== -1) {
      const product = products[productIndex];
      // Eliminar el producto del arreglo de productos
      products.splice(productIndex, 1);
      const productsPath = path.join(__dirname, "../data/products.json");
      await fs.writeFile(
        productsPath,
        JSON.stringify(products, null, 2),
        "utf8"
      );
      // Aquí puedes realizar cualquier otra operación necesaria, como guardar el arreglo actualizado en la base de datos, si es aplicable.
      res.status(200).json(product);
    } else {
      // Si no se encuentra el producto con el ID proporcionado
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};

export const editProduct = async (req, res) => {
  const requestData = req.body;
  console.log("ID del producto recibido:", requestData.id);
  console.log(req.body); // Esto debería mostrarte el ID del producto.

  try {
    const products = await fetchProducts();
    const productIndex = products.findIndex(
      (product) => product.id === requestData.id
    );

    if (productIndex === -1) {
      return res.status(404).send("Producto no encontrado");
    }

    products[productIndex] = requestData;
    const productsPath = path.join(__dirname, "../data/products.json");
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf8");

    res.status(200).json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("Hubo un error al actualizar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const addProduct = async (req, res) => {
  try {
    let products = await fetchProducts();

    const newId = products.reduce((maxId, product) => Math.max(maxId, parseInt(product.id, 10)), 0) + 1;

    console.log(req.body); // Verificar qué contiene req.body

    const { id, ...bodyWithoutId } = req.body; // Eliminar el id de req.body si existe

    const newProduct = { id: newId, ...bodyWithoutId };

    products.push(newProduct)

    const productsPath = path.join(__dirname, "../data/products.json");

    await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf8");

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al añadir el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};
export const addAnalytic = async (req, res) => {
  const requestData = req.body;
  try {
    let products = await fetchProducts(); // Suponiendo que esto devuelve todos los productos
    const productIndex = products.findIndex(p => p.id === requestData.id); // Encuentra el índice del producto por ID

    if (productIndex === -1) {
      return res.status(404).send("Producto no encontrado");
    }

    // Preparar el objeto analytic
    const analytic = {
      idProduct: requestData.id,
      name: requestData.name,
      link: requestData.link,
    };

    // Autoincrementa el ID si hay elementos existentes en analytics
    const product = products[productIndex];
    if (product.analytics && product.analytics.length > 0) {
      const lastAnalyticId = product.analytics[product.analytics.length - 1].id;
      analytic.id = lastAnalyticId + 1;
    } else {
      analytic.id = 1; // Primer ID si es el primer elemento en analytics
    }

    // Agregar analytic al producto específico
    product.analytics.push(analytic);

    // Actualizar el producto en la lista de productos
    products[productIndex] = product;

    // Guardar la lista de productos actualizada
    const productsPath = path.join(__dirname, "../data/products.json");
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf8");

    res.status(200).json({ message: "Analytic agregado con éxito" });
  } catch (error) {
    console.error("Error al agregar analytic:", error);
    res.status(500).send("Error interno del servidor");
  }
  
};





