import { Router } from "express";
import { createOrder, receiveWebhook } from "../controllers/payment.controller.js";

const router = Router()

router.post('/create-order', createOrder)

router.post('/failure', (req, res) => {console.log('failure')})

router.post('/success', (req, res) => {console.log('success')})

router.post('/pending', (req, res) => {console.log('pending')})

router.post('/web-hook', receiveWebhook)

export default router;
