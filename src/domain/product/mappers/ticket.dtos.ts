import { TicketStatus } from "@prisma/client";

export interface TicketUrlDTO {
    id: number;
    product_id: number;
    product_name: string;
    product_value: number;
    status: TicketStatus;
    confirmation_hash: string;
}
