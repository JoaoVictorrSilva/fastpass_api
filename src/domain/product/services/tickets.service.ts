import { Injectable } from "@nestjs/common";
import { TicketRepository } from "../repositories/prisma-ticket.repository";
import { Ticket } from "../entities/ticket";
import { Product } from "../entities/product";
import { TicketMapper } from "../mappers/ticket.mapper";
import { TicketUrlDTO } from "../mappers/ticket.dtos";
import { CodeGenerator } from "@/infraestructure/cryptography/random-bytes-generator";
import { TicketsGateway } from "../gateways/tickets.gateway";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProductRepository } from "../repositories/prisma-product.repository";

export interface TicketConfirmationEvent {
    product: Product;
    ticket: Ticket;
}

@Injectable()
export class TicketsService {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly productRepository: ProductRepository,
        private readonly codeGenerator: CodeGenerator,
        private readonly ticketGateway: TicketsGateway,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async createTicket({ productId, userId }: { productId: number; userId: number }): Promise<TicketUrlDTO> {
        const ticket = await this.ticketRepository.save(
            new Ticket({
                product_id: productId,
                user_id: userId,
                status: "WAITING_PAYMENT",
                confirmation_hash: this.codeGenerator.generate(),
                created_at: new Date(),
            }),
        );

        return TicketMapper.toDTO(ticket);
    }

    async confirmTicket(confirmationHash: string): Promise<Ticket> {
        const ticket = await this.ticketRepository.findByConfirmationHash(confirmationHash);
        if (!ticket) {
            throw new Error("Ticket not found");
        }

        this.eventEmitter.emit("ticket.confirmed", {
            product: await this.productRepository.findById(ticket.product_id),
            ticket: ticket,
        });
        this.ticketGateway.emitPaymentConfirmed(ticket.id!);

        ticket.status = "PAID";
        return this.ticketRepository.update(ticket);
    }

    async cancelTicket(confirmationHash: string): Promise<Ticket> {
        const ticket = await this.ticketRepository.findByConfirmationHash(confirmationHash);
        if (!ticket) {
            throw new Error("Ticket not found");
        }

        ticket.status = "CANCELED";
        return this.ticketRepository.update(ticket);
    }
}
