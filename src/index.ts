import express, { Response, Request } from "express";
import path from "path";
import morgan from "morgan";
import authRouter from "./routes/auth.route";
import router from "./routes/payment.route";
import productRouter from "./routes/product.route";
import emailRouter from "./routes/email.route";
import categoriesRouter from "./routes/categories.route";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

const corsOptions = {
  origin: ['https://ecommerce-0028.onrender.com', 'http://localhost:3000', 'http://localhost:4200'],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
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
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});