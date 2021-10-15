import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@kamal-guru/common";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("TicketId must be provided")],
  validateRequest,
  async (req: Request, res: Response) => {
    res.status(201).send({});
  }
);

export { router as newOrderRouter };
