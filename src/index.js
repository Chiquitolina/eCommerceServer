import express from "express";
import { fileURLToPath } from "url";
import morgan from "morgan";
import path from "path";
import router from "./routes/payment.route.js";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "http://www.nora.com.ar", // Reemplaza con el origen de tu frontend de Angular
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Encabezados permitidos
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Habilita preflight para todas las rutas

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use(router);

app.use("/", express.static(path.join(__dirname, "/public")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(3000, () => {
  console.log("Escuchando el puerto 3000");
});
