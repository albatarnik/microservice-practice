import request from "supertest";
import { app } from "../../app";
import mongose from "mongoose";
import { Helper } from "../../test/halper";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
it("returns 404 if the ticket doesn'n exist", async () => {
  const ticketId = mongose.Types.ObjectId();
  request(app)
    .post("/api/orders")
    .set("Cookie", Helper.signin())
    .send({
      ticketId,
    })
    .expect(404);
});

it("return 400 if the ticket is already reserved", async () => {
  const ticket = await Ticket.build({
    title: "concert",
    price: 20,
  });

  await Order.build({
    ticket,
    userId: "asadsadsads",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  request(app)
    .post("/api/orders")
    .set("Cookie", Helper.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(400);
});

it("it return 201 if the ticket was not reserved", async () => {
  const ticket = await Ticket.build({
    title: "concert",
    price: 20,
  });
  request(app)
    .post("/api/orders")
    .set("Cookie", Helper.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);
});
