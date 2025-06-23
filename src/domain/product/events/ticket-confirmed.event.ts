import { Product } from "../entities/product";
import { Ticket } from "../entities/ticket";

export class TicketConfirmationEvent {
    constructor(
        public readonly product: Product,
        public readonly ticket: Ticket,
    ) {}
}
