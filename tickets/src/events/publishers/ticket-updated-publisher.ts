import { Publisher, Subjects, TicketUpdatedEvent } from '@kamal-guru/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
