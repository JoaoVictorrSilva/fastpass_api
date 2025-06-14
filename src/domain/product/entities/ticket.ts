import { Entity } from "@/core/shared/entity";

export type TicketStatus = "WAITING_PAYMENT" | "PAID" | "CANCELED";

export interface TicketProps {
    confirmation_hash: string;
    status: TicketStatus;
    user_id: number;
    product_id: number;
    created_at: Date;
    updated_at?: Date | null;
}

export class Ticket extends Entity<TicketProps> {
    constructor(props: TicketProps, id?: number) {
        super(props, id);
    }

    get confirmation_hash(): string {
        return this.props.confirmation_hash;
    }

    set confirmation_hash(value: string) {
        this.props.confirmation_hash = value;
    }

    get status(): TicketStatus {
        return this.props.status;
    }

    set status(value: TicketStatus) {
        this.props.status = value;
    }

    get user_id(): number {
        return this.props.user_id;
    }

    get product_id(): number {
        return this.props.product_id;
    }

    get created_at(): Date {
        return this.props.created_at;
    }
    get updated_at(): Date | null {
        return this.props.updated_at || null;
    }
}
