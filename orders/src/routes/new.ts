import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
} from "@kamal-guru/common";
import { natsWrapper } from "../nats-wrapper";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
const EXPIRATION_WINDOW_SECONDS = 1 * 60;
const router = express.Router();
router.post(
  "/api/orders",
  [body("ticketId").not().isEmpty().withMessage("TicketId must be provided")],
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket
    });
    await order.save();

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
