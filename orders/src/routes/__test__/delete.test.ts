import request from "supertest";
import { app } from "../../app";
import { Helper } from "../../test/halper";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@kamal-guru/common";
import { Order } from "../../models/order";
it("user can cancel the order", async () => {
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
    .delete(`/api/orders/${saveOrderResponse.body.id}`)
    .set("Cookie", user1)
    .send()
    .expect(200);

  const order = await Order.findById(saveOrderResponse.body.id);

  expect(order!.status).toBe(OrderStatus.Cancelled);
});

it("user can't cancel an order that doesn't own", async () => {
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
    .delete(`/api/orders/${saveOrderResponse.body.id}`)
    .set("Cookie", Helper.signin())
    .send()
    .expect(401);

});
