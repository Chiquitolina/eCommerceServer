import { Router } from "express";
import {
  createOrder,
  getProducts,
  healthCheck,
} from "../controllers/payment.controller.ts";

const router = Router();

router.post("/create-order", createOrder);

router.get("/health-check", healthCheck);

router.post("/failure", (req, res) => {
  console.log("failure");
});

router.post("/success", (req, res) => {
  console.log("success");
});

router.post("/pending", (req, res) => {
  console.log("pending");
});

export default router;
