import { Entity } from "@/core/shared/entity";

export interface ProductProps {
    value: bigint;
    description: string;
    name: string;
    company_id: number;
    createdAt: Date;
    updatedAt?: Date;
}

export class Product extends Entity<ProductProps> {
    constructor(props: ProductProps, id?: number) {
        super(props, id);
    }

    get value(): bigint {
        return this.props.value;
    }

    get description(): string {
        return this.props.description;
    }

    get name(): string {
        return this.props.name;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }
    get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }
}
