import { Injectable } from "@nestjs/common";
import { ExtractRepository } from "../repositories/prisma-extract.repository";
import { TicketConfirmationEvent } from "@/domain/product/services/tickets.service";
import { Extract } from "../entities/extract";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class ExtractService {
    constructor(
        private readonly extractRepository: ExtractRepository,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @OnEvent("ticket.confirmed")
    async generateTicketExtract(ticketEvent: TicketConfirmationEvent) {
        const { ticket, product } = ticketEvent;

        const extractData = new Extract({
            userFromId: ticket.user_id,
            userToId: product.user_id,
            description: `Ticket ${ticket.id} paied for product ${product.id}`,
            value: product.value,
            moviment: "DEBIT",
            createdAt: new Date(),
        });

        const savedExtract = await this.extractRepository.save(extractData);
        console.log("Extract created:", savedExtract);
        this.eventEmitter.emit("extract.created", savedExtract);
    }
}
