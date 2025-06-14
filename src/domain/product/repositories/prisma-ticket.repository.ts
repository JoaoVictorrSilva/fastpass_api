import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infraestructure/database/prisma.service";
import { Ticket } from "../entities/ticket";
import { TicketMapper } from "../mappers/ticket.mapper";
import { Prisma } from "@prisma/client";

export abstract class TicketRepository {
    abstract findByConfirmationHash(confirmationHash: string): Promise<Ticket | null>;
    abstract save(ticket: Ticket): Promise<Ticket>;
    abstract update(ticket: Ticket): Promise<Ticket>;
}

@Injectable()
export class PrismaTicketRepository implements TicketRepository {
    constructor(private readonly prisma: PrismaService) {}
    async findByConfirmationHash(confirmationHash: string): Promise<Ticket | null> {
        const ticket = await this.prisma.tickets.findUnique({
            where: { confirmation_hash: confirmationHash },
        });

        if (!ticket) {
            return null;
        }

        return TicketMapper.toDomain(ticket);
    }

    async update(ticket: Ticket): Promise<Ticket> {
        const ticketData = TicketMapper.toPersistence(ticket);

        const updatedTicket = await this.prisma.tickets.update({
            where: { id: ticket.id! },
            data: ticketData as Prisma.ticketsUpdateInput,
        });

        return TicketMapper.toDomain(updatedTicket);
    }

    async save(ticket: Ticket): Promise<Ticket> {
        const ticketData = TicketMapper.toPersistence(ticket);

        const savedTicket = await this.prisma.tickets.create({
            data: ticketData as Prisma.ticketsCreateInput,
        });

        return TicketMapper.toDomain(savedTicket);
    }
}
