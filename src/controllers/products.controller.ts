import fs from "fs/promises";
import path from "path";
import { Request, Response } from 'express';

// Función auxiliar para cargar productos
const loadProducts = async () => {
  const productsPath = path.join(__dirname, "../data/products.json");
  const data = await fs.readFile(productsPath, "utf8");
  return JSON.parse(data);
};

// Función auxiliar para guardar productos
const saveProducts = async (products: any) => {
  const productsPath = path.join(__dirname, "../data/products.json");
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf8");
};

export const getProductById = async (req: Request, res: Response) :Promise<any> => {
  const productId = req.params.id; // Obtener el ID del producto de los parámetros de ruta
  try {
    const products = await loadProducts();
    const product = products.find(
      (product: any) => product.id.toString() === productId
    ); // Asegurarse de comparar como cadena
    if (!product) {
      console.log(`El producto con ID ${productId} no fue encontrado`);
      return res
        .status(404)
        .json({ error: `El producto con ID ${productId} no fue encontrado` });
    }
    console.log(`Producto solicitado:`, product); // Logear el producto solicitado
    return res.status(200).json(product);
  } catch (error) {
    console.error("Hubo un error al obtener el producto:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    // Loguear los query parameters para depuración
    console.log("Query parameters received:", req.query); // Deberías ver algo como { size: ['6.5', '7'] }
    console.log("Category:", req.params.category); // "hombre"
    console.log("Subcategory:", req.params.subcategory); // "calzado"
    
    const products = await loadProducts();
    const { category, subcategory } = req.params;
    let { sale, size, price_min, price_max } = req.query;

    let filteredProducts = products;

    // Filtra por categoría si se proporciona
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.category === category
      );
    }

    // Filtra por subcategoría si se proporciona
    if (subcategory) {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.subcategory === subcategory
      );
    }

    if (sale) {
      // Convertir el descuento a un array. Si es un solo valor, se convierte a array.
      const discountsArray = Array.isArray(sale)
        ? sale.map(Number)
        : [Number(sale)];
    
      filteredProducts = filteredProducts.filter((product: any) => {
        // Cambia `product.sale` a `product.discount` y convierte `discount` a número
        const productDiscount = Number(product.discount) || 0; // Asegúrate de que sea un número
        return discountsArray.includes(productDiscount);
      });
    }

    // Filtra por tamaño si se proporciona
    if (size) {
      /*size = Number(size); // Asegurarse de que el tamaño sea un número*/
      filteredProducts = filteredProducts.filter(
        (product: any) => product.sizes.some((s: any) => s.size === size && s.quantity > 0)
      );
    }

    // Filtra por rango de precios si se proporciona
    if (price_min || price_max) {
      const minPrice = price_min ? Number(price_min) : 0;
      const maxPrice = price_max ? Number(price_max) : Infinity;
      filteredProducts = filteredProducts.filter((product: any) => {
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    // Verifica si se encontraron productos filtrados
    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .send(
          "No se encontraron productos para la categoría y/o subcategoría especificada."
        );
    }

    // Responde con los productos filtrados
      res.status(200).json(filteredProducts);
  } catch (error) {
    console.error(
      "Error al obtener productos por categoría/subcategoría:",
      error
    );
    res.status(500).send("Error interno del servidor");
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const productId = req.params.id; // Extraer el ID de los parámetros de ruta
  console.log(productId);
  try {
    const products = await loadProducts();
    const productIndex = products.findIndex(
      (product: any) => product.id === productId
    );

    if (productIndex !== -1) {
      const [deletedProduct] = products.splice(productIndex, 1);
      await saveProducts(products);
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};

// Editar un producto
export const editProduct = async (req: Request, res: Response): Promise<any> => {
  const productId = req.params.id;
  const updatedData = req.body;
  console.log("ID del producto recibido:", productId);
  console.log(req.body);

  try {
    const products = await loadProducts();
    const productIndex = products.findIndex(
      (product:any) => product.id === productId
    );

    if (productIndex === -1) {
      return res.status(404).send("Producto no encontrado");
    }

    products[productIndex] = { ...products[productIndex], ...updatedData };
    await saveProducts(products);

    res.status(200).json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("Hubo un error al actualizar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Añadir un nuevo producto
export const addProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await loadProducts();
    const newId = (
      products.reduce(
        (maxId: any, product: any) => Math.max(maxId, parseInt(product.id, 10)),
        0
      ) + 1
    ).toString();

    const { id, ...bodyWithoutId } = req.body; // Eliminar el id de req.body si existe
    const newProduct = { id: newId, ...bodyWithoutId };

    products.push(newProduct);
    await saveProducts(products);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al añadir el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

/*export const addAnalytic = async (req, res) => {
  const requestData = req.body;
  try {
    let products = await fetchProducts(); // Suponiendo que esto devuelve todos los productos
    const productIndex = products.findIndex((p) => p.id === requestData.id); // Encuentra el índice del producto por ID

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
};*/
