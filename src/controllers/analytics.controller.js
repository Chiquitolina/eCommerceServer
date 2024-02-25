import {fetchProducts} from './products.controller.js'

export const addAnalytic = async (req, res) => {
  const requestData = req.body;
  console.log(requestData);
  try {
    const products = await fetchProducts();

    // Encuentra el índice del producto usando el ID
    const productIndex = products.findIndex(
      (product) => product.id === requestData.id
    );
    if (productIndex === -1) {
      return res.status(404).send("Producto no encontrado");
    }

    const product = products[productIndex];

    // Preparar el objeto analytic
    const analytic = {
      idProduct: requestData.id,
      name: requestData.name,
      link: requestData.link,
      id:
        product.analytics && product.analytics.length > 0
          ? product.analytics[product.analytics.length - 1].id + 1
          : 1,
    };

    // Agregar analytic al producto
    product.analytics = product.analytics || [];
    product.analytics.push(analytic);

    // Guardar el producto actualizado
    const productsPath = path.join(__dirname, "../data/products.json");
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf8");

    res.status(200).json({ message: "Analytics agregado con éxito" });
  } catch (error) {
    console.error("Error al agregar analytics:", error);
    res.status(500).send("Error interno del servidor");
  }
};
export const deleteAnalytic = async (req, res) => {
  const requestData = req.body;
  try {
    const products = await fetchProducts();

    // Encuentra el índice del producto usando el ID
    const productIndex = products.findIndex(
      (product) => product.id === requestData.id
    );
    if (productIndex === -1) {
      return res.status(404).send("Producto no encontrado");
    }

    const product = products[productIndex];

    product.analytic.splice(requestData, 1);

    const productsPath = path.join(__dirname, "../data/products.json");
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf8");

    res.status(200).json({ message: "Analytics eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar analytics:", error);
    res.status(500).send("Error interno del servidor");
  }
};
