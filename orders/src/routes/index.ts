import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@kamal-guru/common";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

// router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
//   res.status(200).send({});
// });

export { router as indexOrderRouter };
