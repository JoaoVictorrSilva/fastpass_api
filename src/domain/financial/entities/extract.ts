import { Entity } from "@/core/shared/entity";

export interface ExtractProps {
    value: bigint;
    moviment: "DEBIT" | "CREDIT";
    description: string;
    userFromId: number;
    userToId: number;

    createdAt: Date;
    updatedAt?: Date;
}

export class Extract extends Entity<ExtractProps> {
    constructor(props: ExtractProps, id?: number) {
        super(props, id);
    }
    get value(): bigint {
        return this.props.value;
    }
    get moviment(): "DEBIT" | "CREDIT" {
        return this.props.moviment;
    }
    get description(): string {
        return this.props.description;
    }
    get userFromId(): number {
        return this.props.userFromId;
    }
    get userToId(): number {
        return this.props.userToId;
    }
    get createdAt(): Date {
        return this.props.createdAt;
    }
    get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }
}

// This class represents a financial extract entity with properties such as id, value, moviment type, description, userId, and timestamps for creation and update.
