import request from "supertest";
import { app } from "../../app";
import mongose from "mongoose";
import { Helper } from "../../test/halper";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import { response } from "express";
it("shows the order if the user has access to it", async () => {
  const ticket = await Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const user1 = Helper.signin();
  const saveOrderResponse = await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({
      ticketId: ticket.id,
    });

  const response = await request(app)
    .get(`/api/orders/${saveOrderResponse.body.id}`)
    .set("Cookie", user1)
    .send()
    .expect(200);

  expect(response.body.id).toBe(saveOrderResponse.body.id);
});
