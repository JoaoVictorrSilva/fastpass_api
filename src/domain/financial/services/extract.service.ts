import { Injectable } from "@nestjs/common";
import { ExtractRepository } from "../repositories/prisma-extract.repository";
import { OnEvent } from "@nestjs/event-emitter";
import { TicketConfirmationEvent } from "@/domain/product/services/tickets.service";
import { Extract } from "../entities/extract";

@Injectable()
export class ExtractService {
    constructor(private readonly extractRepository: ExtractRepository) {}

    @OnEvent("ticket.confirmed")
    async generateTicketExtract(ticketEvent: TicketConfirmationEvent) {
        const { ticket, product } = ticketEvent;

        const extractData = new Extract({
            userFromId: ticket.user_id,
            userToId: product.company_id,
            description: `Ticket ${ticket.id} paied for product ${product.id}`,
            value: product.value,
            moviment: "DEBIT",
            createdAt: new Date(),
        });

        await this.extractRepository.save(extractData);
    }
}
