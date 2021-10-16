import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@kamal-guru/common";
import { natsWrapper } from "../nats-wrapper";
import { Order } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.status(200).send(order);
  }
);

export { router as deleteOrderRouter };
