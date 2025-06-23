import { Injectable } from "@nestjs/common";
import { ExtractRepository } from "../repositories/prisma-extract.repository";
import { Extract } from "../entities/extract";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { TicketConfirmationEvent } from "@/domain/product/events/ticket-confirmed.event";
import { ExtractCreatedEvent } from "../events/extract-created.event";

@Injectable()
export class ExtractService {
    constructor(
        private readonly extractRepository: ExtractRepository,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @OnEvent("ticket.confirmed")
    async generateTicketExtract(payload: TicketConfirmationEvent) {
        const { ticket, product } = payload;

        const extractData = new Extract({
            userFromId: ticket.user_id,
            userToId: product.user_id,
            description: `Ticket ${ticket.id} paied for product ${product.id}`,
            value: product.value,
            moviment: "DEBIT",
            createdAt: new Date(),
        });

        const savedExtract = await this.extractRepository.save(extractData);
        this.eventEmitter.emit("extract.created", new ExtractCreatedEvent(savedExtract));
    }
}
