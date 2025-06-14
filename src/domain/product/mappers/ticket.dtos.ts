import { TicketStatus } from "@prisma/client";

export interface TicketUrlDTO {
    id: number;
    status: TicketStatus;
    confirmation_url: string;
}
