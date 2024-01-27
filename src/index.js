import express from "express";
import { fileURLToPath } from "url";
import morgan from "morgan";
import path from "path";
import router from "./routes/payment.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("dev"));

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://nora.com.ar",
    "http://localhost:4200",
  ], // Orígenes permitidos
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Encabezados permitidos
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Habilita preflight para todas las rutas

app.use(express.json());

app.use(router);
app.use('/admin', authRouter)

app.use("/", express.static(path.join(__dirname, "/public")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Escuchando el puerto 3000");
});
