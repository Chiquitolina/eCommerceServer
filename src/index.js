import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import router from "./routes/payment.route.js"; // Asegúrate de que estas rutas existen
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import emailRouter from "./routes/email.route.js";
import categoriesRouter from "./routes/categories.route.js";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

const corsOptions = {
  origin: ['https://ecommerce-0028.onrender.com', 'http://localhost:4200'],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Permite enviar credenciales
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Asegúrate de servir la carpeta 'public' correctamente
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(router);
app.use('/admin', authRouter);
app.use(productRouter);
app.use(emailRouter);
app.use(categoriesRouter);

// Manejar rutas no encontradas
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});