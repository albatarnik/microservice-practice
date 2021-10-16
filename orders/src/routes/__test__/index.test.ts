import request from "supertest";
import { app } from "../../app";
import { Helper } from "../../test/halper";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  return await Ticket.build({
    price: 20,
    title: "concert",
  }).save();
};
it("returns only the orders that belongs to a user", async () => {
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = Helper.signin();
  const user2 = Helper.signin();

  await request(app).post("/api/orders").set("Cookie", user1).send({
    ticketId: ticket1.id,
  });

  const { body: order2 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({
      ticketId: ticket2.id,
    });
  const { body: order3 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({
      ticketId: ticket3.id,
    });

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", user2)
    .send();

  expect(response.body[0].id).toEqual(order2.id);
  expect(response.body[1].id).toEqual(order3.id);
  expect(response.body[0].ticket.id).toEqual(ticket2.id);

  expect(response.body.length).toEqual(2);
  expect(response.status).toEqual(200);
});
