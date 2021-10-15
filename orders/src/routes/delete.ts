import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@kamal-guru/common";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete("/api/orders/{orderId}", requireAuth, async (req: Request, res: Response) => {
  res.status(201).send({});
});

export { router as deleteOrderRouter };
