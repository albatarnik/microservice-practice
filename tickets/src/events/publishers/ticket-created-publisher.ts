import { Publisher, Subjects, TicketCreatedEvent } from '@kamal-guru/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
