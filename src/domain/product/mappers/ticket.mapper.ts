import { Prisma, tickets } from "@prisma/client";
import { Ticket } from "../entities/ticket";
import { TicketUrlDTO } from "./ticket.dtos";

export class TicketMapper {
    static toDTO(ticket: Ticket): TicketUrlDTO {
        return {
            id: ticket.id!,
            status: ticket.status,
            confirmation_url: `/confirm?hash=${ticket.confirmation_hash}`,
        };
    }

    static toDomain(ticket: tickets): Ticket {
        return new Ticket(
            {
                confirmation_hash: ticket.confirmation_hash,
                status: ticket.status,
                user_id: ticket.user_id,
                product_id: ticket.product_id,
                created_at: ticket.created_at,
                updated_at: ticket.updated_at || null,
            },
            ticket.id,
        );
    }

    static toPersistence(ticket: Ticket): Prisma.ticketsCreateInput | Prisma.ticketsUpdateInput {
        const data: Prisma.ticketsCreateInput | Prisma.ticketsUpdateInput = {
            confirmation_hash: ticket.confirmation_hash,
            status: ticket.status,
            user: {
                connect: { id: ticket.user_id },
            },
            product: {
                connect: { id: ticket.product_id },
            },
            created_at: ticket.created_at,
            updated_at: ticket.updated_at,
        };

        return data;
    }
}
